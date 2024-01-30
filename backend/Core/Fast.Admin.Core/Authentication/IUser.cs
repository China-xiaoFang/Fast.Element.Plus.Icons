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
using Fast.Admin.Core.Entity.System.Account;

namespace Fast.Admin.Core.Authentication;

/// <summary>
/// <see cref="IUser"/> 授权用户信息
/// <remarks>作用域注册，保证当前请求管道中是唯一的，并且只会加载一次</remarks>
/// </summary>
public interface IUser : IAuthUserInfo
{
    /// <summary>
    /// 设置授权用户
    /// </summary>
    /// <param name="authUserInfo"><see cref="SysTenantAccountModel"/> 租户系统账户信息</param>
    internal void SetAuthUser(AuthUserInfo authUserInfo);

    /// <summary>
    /// 统一登录
    /// </summary>
    /// <param name="sysTenantAccount"><see cref="SysTenantAccountModel"/> 租户系统账户信息</param>
    /// <param name="appEnvironment"><see cref="AppEnvironmentEnum"/> 登录环境</param>
    /// <returns></returns>
    Task Login(SysTenantAccountModel sysTenantAccount, AppEnvironmentEnum appEnvironment);

    /// <summary>
    /// 刷新登录信息
    /// </summary>
    /// <param name="authUserInfo"><see cref="SysTenantAccountModel"/> 租户系统账户信息</param>
    /// <returns></returns>
    Task Refresh(AuthUserInfo authUserInfo);

    /// <summary>
    /// 统一退出登录
    /// </summary>
    /// <returns></returns>
    Task Logout();
}