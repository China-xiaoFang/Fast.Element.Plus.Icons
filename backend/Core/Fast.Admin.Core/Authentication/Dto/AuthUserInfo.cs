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

using Fast.Admin.Core.Enum.Common;

namespace Fast.Admin.Core.Authentication.Dto;

/// <summary>
/// <see cref="AuthUserInfo"/> 授权用户信息
/// </summary>
public class AuthUserInfo : IAuthUserInfo
{
    /// <summary>
    /// 租户Id
    /// </summary>
    public long TenantId { get; set; }

    /// <summary>
    /// 租户编号
    /// </summary>
    public string TenantNo { get; set; }

    /// <summary>
    /// 用户Id
    /// </summary>
    public long UserId { get; set; }

    /// <summary>
    /// 用户账号
    /// </summary>
    public string Account { get; set; }

    /// <summary>
    /// 用户工号
    /// </summary>
    public string JobNumber { get; set; }

    /// <summary>
    /// 用户名称
    /// </summary>
    public string UserName { get; set; }

    /// <summary>
    /// 昵称
    /// </summary>
    public string NickName { get; set; }

    /// <summary>
    /// 头像
    /// </summary>
    public string Avatar { get; set; }

    /// <summary>
    /// 生日
    /// </summary>
    public DateTime? Birthday { get; set; }

    /// <summary>
    /// 性别
    /// </summary>
    public GenderEnum Sex { get; set; }

    /// <summary>
    /// 邮箱
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// 手机
    /// </summary>
    public string Mobile { get; set; }

    /// <summary>
    /// 电话
    /// </summary>
    public string Tel { get; set; }

    /// <summary>
    /// 部门Id
    /// </summary>
    public long DepartmentId { get; set; }

    /// <summary>
    /// 部门名称
    /// </summary>
    public string DepartmentName { get; set; }

    /// <summary>
    /// 是否超级管理员
    /// </summary>
    public bool IsSuperAdmin { get; set; }

    /// <summary>
    /// 是否系统管理员
    /// </summary>
    public bool IsSystemAdmin { get; set; }

    /// <summary>
    /// 最后登录设备
    /// </summary>
    public string LastLoginDevice { get; set; }

    /// <summary>
    /// 最后登录操作系统（版本）
    /// </summary>
    public string LastLoginOS { get; set; }

    /// <summary>
    /// 最后登录浏览器（版本）
    /// </summary>
    public string LastLoginBrowser { get; set; }

    /// <summary>
    /// 最后登录省份
    /// </summary>
    public string LastLoginProvince { get; set; }

    /// <summary>
    /// 最后登录城市
    /// </summary>
    public string LastLoginCity { get; set; }

    /// <summary>
    /// 最后登录Ip
    /// </summary>
    public string LastLoginIp { get; set; }

    /// <summary>
    /// 最后登录时间
    /// </summary>
    public DateTime? LastLoginTime { get; set; }

    /// <summary>
    /// App 运行环境
    /// </summary>
    public AppEnvironmentEnum AppEnvironment { get; set; }

    /// <summary>
    /// App来源
    /// </summary>
    public string AppOrigin { get; set; }

    /// <summary>
    /// 角色Id集合
    /// </summary>
    public virtual List<long> RoleIdList { get; set; }

    /// <summary>
    /// 角色名称集合
    /// </summary>
    public List<string> RoleNameList { get; set; }

    /// <summary>
    /// 菜单编码集合
    /// </summary>
    public virtual List<string> MenuCodeList { get; set; }

    /// <summary>
    /// 按钮编码集合
    /// </summary>
    public virtual List<string> ButtonCodeList { get; set; }
}