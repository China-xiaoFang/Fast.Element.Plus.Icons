// Apache开源许可证
//
// 版权所有 © 2018-2024 1.8K仔
//
// 特此免费授予获得本软件及其相关文档文件（以下简称“软件”）副本的任何人以处理本软件的权利，
// 包括但不限于使用、复制、修改、合并、发布、分发、再许可、销售软件的副本，
// 以及允许拥有软件副本的个人进行上述行为，但须遵守以下条件：
//
// 在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。
//
// 软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
// 在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，
// 无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。

using Fast.Admin.Core.Authentication;
using Fast.Admin.Core.Authentication.Dto;
using Fast.Admin.Core.Constants;
using Fast.JwtBearer.Handlers;
using Fast.JwtBearer.Services;
using Fast.UnifyResult.Contexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection;

namespace Fast.Admin.Core.Handlers;

/// <summary>
/// <see cref="JwtBearerHandle"/> Jwt验证提供器
/// </summary>
public class JwtBearerHandle : IJwtBearerHandle
{
    private readonly IJwtBearerCryptoService _jwtBearerCryptoService;

    public JwtBearerHandle(IJwtBearerCryptoService jwtBearerCryptoService)
    {
        _jwtBearerCryptoService = jwtBearerCryptoService;
    }

    /// <summary>
    /// 授权处理
    /// <remarks>这里已经判断了 Token 是否有效，并且已经处理了自动刷新 Token。只需要处理其余的逻辑即可。如果返回 false或抛出异常，搭配 AuthorizeFailHandle 则抛出 HttpStatusCode = 401 状态码，否则走默认处理 AuthorizationHandlerContext.Fail() 会返回 HttpStatusCode = 403 状态码</remarks>
    /// </summary>
    /// <param name="context"><see cref="T:Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext" /></param>
    /// <param name="httpContext"><see cref="T:Microsoft.AspNetCore.Http.HttpContext" /></param>
    /// <returns><see cref="T:System.Boolean" /></returns>
    public async Task<bool> AuthorizeHandle(AuthorizationHandlerContext context, HttpContext httpContext)
    {
        // 获取 ICache，IUser
        var _cache = httpContext.RequestServices.GetService<ICache>();
        // 尝试解析 IUser，当前请求生命周期，只会解析一次
        var _user = httpContext.RequestServices.GetService<IUser>();

        // 由于生命周期的问题，这里的Token不能直接获取
        var token = _jwtBearerCryptoService.GetJwtBearerToken(httpContext);

        // 判断 Token 是否过期，采用 "{JobNumber}:{Token后面10位字符}"，进行缓存过期容错值
        if (await _cache.ExistsAsync(CacheConst.GetCacheKey(CacheConst.ExpiredToken, _user.TenantNo,
                $"{_user.JobNumber}:{token[^10..]}")))
        {
            throw new UserFriendlyException("Token 已过期！");
        }

        // Token 过期了，读取 RefreshToken
        var refreshToken = _jwtBearerCryptoService.GetJwtBearerToken(httpContext, "X-Authorization");

        if (!refreshToken.IsEmpty())
        {
            // 判断 刷新Token 是否过期，采用 "{JobNumber}:{Token后面10位字符}"，进行缓存过期容错值
            if (await _cache.ExistsAsync(CacheConst.GetCacheKey(CacheConst.ExpiredToken, _user.TenantNo,
                    $"{_user.JobNumber}:{refreshToken[^10..]}")))
            {
                throw new UserFriendlyException("Refresh Token 已过期！");
            }
        }

        // 获取缓存Key
        var cacheKey = CacheConst.GetCacheKey(CacheConst.AuthUserInfo, _user.TenantNo, _user.AppEnvironment.ToString(),
            _user.JobNumber);

        // 获取缓存信息
        var authUserInfo = _cache.Get<AuthUserInfo>(cacheKey);

        // 设置授权用户
        _user.SetAuthUser(authUserInfo);

        return true;
    }

    /// <summary>
    /// 授权失败处理
    /// <remarks>如果返回 null，则走默认处理 AuthorizationHandlerContext.Fail()</remarks>
    /// </summary>
    /// <param name="context"><see cref="T:Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext" /></param>
    /// <param name="httpContext"><see cref="T:Microsoft.AspNetCore.Http.HttpContext" /></param>
    /// <param name="exception"><see cref="T:System.Exception" /></param>
    /// <returns></returns>
    public async Task<object> AuthorizeFailHandle(AuthorizationHandlerContext context, HttpContext httpContext,
        Exception exception)
    {
        return await Task.FromResult(UnifyContext.GetRestfulResult(StatusCodes.Status401Unauthorized, false, null,
            exception?.Message ?? "401 未经授权", httpContext));
    }

    /// <summary>
    /// 权限判断处理
    /// <remarks>这里只需要判断你的权限逻辑即可，如果返回 false或抛出异常 则抛出 HttpStatusCode = 403 状态码</remarks>
    /// </summary>
    /// <param name="context"><see cref="T:Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext" /></param>
    /// <param name="requirement"><see cref="T:Microsoft.AspNetCore.Authorization.IAuthorizationRequirement" /></param>
    /// <param name="httpContext"><see cref="T:Microsoft.AspNetCore.Http.HttpContext" /></param>
    /// <returns></returns>
    public async Task<bool> PermissionHandle(AuthorizationHandlerContext context, IAuthorizationRequirement requirement,
        HttpContext httpContext)
    {
        // 获取 IUser
        var _user = httpContext.RequestServices.GetService<IUser>();

        // 超级管理员有所有的权限
        if (_user.IsSuperAdmin)
        {
            return true;
        }

        // 系统管理员要判断部分菜单是否存在权限
        // TODO:一些权限判断
        if (_user.IsSystemAdmin)
        {
            return true;
        }

        return false;
    }

    /// <summary>
    /// 权限判断失败处理
    /// <remarks>如果返回 null，则走默认处理 AuthorizationHandlerContext.Fail()</remarks>
    /// </summary>
    /// <param name="context"><see cref="T:Microsoft.AspNetCore.Authorization.AuthorizationHandlerContext" /></param>
    /// <param name="requirement"><see cref="T:Microsoft.AspNetCore.Authorization.IAuthorizationRequirement" /></param>
    /// <param name="httpContext"><see cref="T:Microsoft.AspNetCore.Http.HttpContext" /></param>
    /// <param name="exception"><see cref="T:System.Exception" /></param>
    /// <returns></returns>
    public async Task<object> PermissionFailHandle(AuthorizationHandlerContext context, IAuthorizationRequirement requirement,
        HttpContext httpContext, Exception exception)
    {
        return await Task.FromResult<object>(null);
    }
}