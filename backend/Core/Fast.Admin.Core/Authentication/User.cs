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

using Fast.Admin.Core.Authentication.Dto;
using Fast.Admin.Core.Constants;
using Fast.Admin.Core.Entity.System.Account;
using Fast.Admin.Core.Enum.System;
using Fast.JwtBearer.Services;
using Mapster;

namespace Fast.Admin.Core.Authentication;

/// <summary>
/// <see cref="User"/> 授权用户信息
/// <remarks>作用域注册，保证当前请求管道中是唯一的，并且只会加载一次</remarks>
/// </summary>
public sealed class User : AuthUserInfo, IUser, IScopedDependency
{
    private readonly ICache _cache;

    private readonly IJwtBearerCryptoService _jwtBearerCryptoService;

    private readonly HttpContext _httpContext;

    public User(ICache cache, IJwtBearerCryptoService jwtBearerCryptoService, IHttpContextAccessor httpContextAccessor)
    {
        _cache = cache;
        _jwtBearerCryptoService = jwtBearerCryptoService;
        _httpContext = httpContextAccessor.HttpContext;

        // 判断是否为空，如果是，则不是正常请求
        if (_httpContext == null)
            return;

        // 判断是否为 WebSocket 请求
        var isWebSocketRequest = _httpContext.IsWebSocketRequest();

        if (isWebSocketRequest)
        {
            // WebSocket 请求，从Url地址后面获取标识
            AppEnvironment = System.Enum.Parse<AppEnvironmentEnum>(_httpContext.Request.Query[ClaimConst.ApiOrigin]);
            TenantNo = _httpContext.Request.Query[ClaimConst.TenantNo].ToString().Base64ToString();
            JobNumber = _httpContext.Request.Query[ClaimConst.JobNumber].ToString().Base64ToString();
        }
        else
        {
            AppEnvironment = System.Enum.Parse<AppEnvironmentEnum>(_httpContext.Request.Headers[ClaimConst.ApiOrigin]);
            TenantNo = _httpContext.Request.Headers[ClaimConst.TenantNo].ToString().Base64ToString();
            JobNumber = _httpContext.Request.Headers[ClaimConst.JobNumber].ToString().Base64ToString();
        }

        // App 来源判断
        // TODO：这里需要根据App授权信息，判断是否存在访问的权限
        switch (AppEnvironment)
        {
            case AppEnvironmentEnum.Web:
            {
                if (isWebSocketRequest)
                {
                    // WebSocket 请求，从Url地址后面获取 标识
                    AppOrigin = _httpContext.Request.Query[ClaimConst.AppOrigin];
                }
                else
                {
                    // 获取Web站点Url
                    AppOrigin = _httpContext.Request.Headers[ClaimConst.AppOrigin].ToString();
                }
            }
                break;
            case AppEnvironmentEnum.Pc:
            case AppEnvironmentEnum.WeChatMiniProgram:
            case AppEnvironmentEnum.AndroidApp:
            case AppEnvironmentEnum.IOSApp:
            case AppEnvironmentEnum.Other:
                break;
            default:
                throw new UnauthorizedAccessException("未知的客户端环境！");
        }

        if (AppOrigin.IsEmpty())
        {
            throw new UnauthorizedAccessException("未知的主机标识！");
        }
    }

    /// <summary>
    /// 设置授权用户
    /// </summary>
    /// <param name="authUserInfo"><see cref="IAuthUserInfo"/> 授权用户信息</param>
    public void SetAuthUser(AuthUserInfo authUserInfo)
    {
        // 判断授权用户信息是否为空
        if (authUserInfo == null)
        {
            throw new UnauthorizedAccessException("授权用户信息不存在！");
        }

        authUserInfo.Adapt(this);
    }

    /// <summary>
    /// 统一登录
    /// </summary>
    /// <param name="sysTenantAccount"><see cref="SysTenantAccountModel"/> 租户系统账户信息</param>
    /// <param name="appEnvironment"><see cref="AppEnvironmentEnum"/> 登录环境</param>
    /// <returns></returns>
    public async Task Login(SysTenantAccountModel sysTenantAccount, AppEnvironmentEnum appEnvironment)
    {
        if (sysTenantAccount == null)
        {
            throw new UnauthorizedAccessException("账号信息不存在！");
        }

        try
        {
            var authUserInfo = new AuthUserInfo
            {
                TenantId = sysTenantAccount.TenantId,
                TenantNo = sysTenantAccount.SysTenant.TenantNo,
                UserId = sysTenantAccount.UserId,
                Mobile = sysTenantAccount.SysAccount.Account,
                JobNumber = sysTenantAccount.JobNumber,
                UserName = sysTenantAccount.SysAccount.UserName,
                NickName = sysTenantAccount.NickName,
                Avatar = sysTenantAccount.Avatar,
                Birthday = sysTenantAccount.SysAccount.Birthday,
                Sex = sysTenantAccount.SysAccount.Sex,
                Email = sysTenantAccount.SysAccount.Email,
                Tel = sysTenantAccount.SysAccount.Tel,
                DepartmentId = sysTenantAccount.DepartmentId,
                DepartmentName = sysTenantAccount.DepartmentName,
                IsSuperAdmin = sysTenantAccount.AdminType == AdminTypeEnum.SuperAdmin,
                IsSystemAdmin = sysTenantAccount.AdminType == AdminTypeEnum.SystemAdmin,
                LastLoginDevice = sysTenantAccount.LastLoginDevice,
                LastLoginOS = sysTenantAccount.LastLoginOS,
                LastLoginBrowser = sysTenantAccount.LastLoginBrowser,
                LastLoginProvince = sysTenantAccount.LastLoginProvince,
                LastLoginCity = sysTenantAccount.LastLoginCity,
                LastLoginIp = sysTenantAccount.LastLoginIp,
                LastLoginTime = sysTenantAccount.LastLoginTime,
                AppEnvironment = appEnvironment,
                AppOrigin = _httpContext.Request.Headers[ClaimConst.AppOrigin].ToString()
            };

            // 生成 Token 令牌，默认20分钟
            var accessToken = _jwtBearerCryptoService.GenerateToken(new Dictionary<string, object>
            {
                {nameof(ClaimConst.ApiOrigin), appEnvironment.ToString()},
                {nameof(ClaimConst.TenantNo), sysTenantAccount.SysTenant.TenantNo},
                {nameof(ClaimConst.JobNumber), sysTenantAccount.JobNumber},
                {nameof(sysTenantAccount.LastLoginIp), sysTenantAccount.LastLoginIp},
                {nameof(sysTenantAccount.LastLoginTime), sysTenantAccount.LastLoginTime},
            });

            // 生成刷新Token，有效期24小时
            var refreshToken = _jwtBearerCryptoService.GenerateRefreshToken(accessToken);

            // 获取缓存Key
            var cacheKey = CacheConst.GetCacheKey(CacheConst.AuthUserInfo, authUserInfo.TenantNo, appEnvironment.ToString(),
                authUserInfo.JobNumber);

            // 设置缓存信息
            await _cache.SetAsync(cacheKey, authUserInfo);

            // 设置Token令牌
            _httpContext.Response.Headers["access-token"] = accessToken;

            // 设置刷新Token令牌
            _httpContext.Response.Headers["x-access-token"] = refreshToken;

            // 设置Swagger自动登录
            _httpContext.SignInToSwagger(accessToken);
        }
        catch (Exception ex)
        {
            throw new UnauthorizedAccessException($"401 登录鉴权失败：{ex.Message}");
        }
    }

    /// <summary>
    /// 刷新登录信息
    /// </summary>
    /// <param name="authUserInfo"><see cref="SysTenantAccountModel"/> 租户系统账户信息</param>
    /// <returns></returns>
    public async Task Refresh(AuthUserInfo authUserInfo)
    {
        // 设置授权用户信息
        SetAuthUser(authUserInfo);

        // 获取缓存Key
        var cacheKey = CacheConst.GetCacheKey(CacheConst.AuthUserInfo, authUserInfo.TenantNo,
            authUserInfo.AppEnvironment.ToString(), authUserInfo.JobNumber);

        // 设置授权信息缓存
        await _cache.SetAsync(cacheKey, authUserInfo);
    }

    /// <summary>
    /// 统一退出登录
    /// </summary>
    /// <returns></returns>
    public async Task Logout()
    {
        /*
         * 首先确定，退出登录有两种情况，
         *  1.正常情况，点击退出登录，这个时候的Token是存在的，且没有过期的。
         *  2.401的情况下，系统调用退出登录的接口，这个时候虽然存在Token，但是Token肯定是过期的。
         */

        // 这里直接从请求头中获取Token
        var token = _jwtBearerCryptoService.GetJwtBearerToken(_httpContext);

        if (!token.IsEmpty())
        {
            // 读取 Token 信息
            var jwtSecurityToken = _jwtBearerCryptoService.SecurityReadJwtToken(token);

            // 从 Token 中读取 TenantNo 和 JobNumber
            var tenantNo = jwtSecurityToken.Payload[nameof(ClaimConst.TenantNo)].ToString();
            var jobNumber = jwtSecurityToken.Payload[nameof(ClaimConst.JobNumber)].ToString();
            var appEnvironment = jwtSecurityToken.Payload[nameof(ClaimConst.ApiOrigin)].ToString();

            if (!tenantNo.IsEmpty() && !jobNumber.IsEmpty())
            {
                // 获取缓存Key
                var tokenCacheKey = CacheConst.GetCacheKey(CacheConst.ExpiredToken, tenantNo, $"{jobNumber}:{token[^10..]}");
                // 将当前 Token 放入过期缓存中，建议设置缓存过期时间为 Token 过期时间 - 当前时间
                await _cache.SetAsync(tokenCacheKey, token, jwtSecurityToken.ValidTo - DateTimeOffset.UtcNow);

                // 退出登录需要传入 刷新Token
                var refreshToken = _jwtBearerCryptoService.GetJwtBearerToken(_httpContext, "X-Authorization");

                if (!refreshToken.IsEmpty())
                {
                    var jwtSecurityRefreshToken = _jwtBearerCryptoService.SecurityReadJwtToken(refreshToken);

                    // 获取缓存Key
                    var refreshTokenCacheKey = CacheConst.GetCacheKey(CacheConst.ExpiredRefreshToken, tenantNo,
                        $"{jobNumber}:{refreshToken[^10..]}");
                    // 将当前 Token 放入过期缓存中，建议设置缓存过期时间为 Token 过期时间 - 当前时间
                    await _cache.SetAsync(refreshTokenCacheKey, refreshToken,
                        jwtSecurityRefreshToken.ValidTo - DateTimeOffset.UtcNow);
                }

                // 获取缓存Key
                var userCacheKey = CacheConst.GetCacheKey(CacheConst.AuthUserInfo, tenantNo, appEnvironment, jobNumber);

                // 清除缓存用户信息
                await _cache.DelAsync(userCacheKey);

                // 设置Swagger退出登录
                _httpContext.SignOutToSwagger();
            }
        }
    }
}