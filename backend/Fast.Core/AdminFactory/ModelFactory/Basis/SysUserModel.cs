﻿namespace Fast.Core.AdminFactory.ModelFactory.Basis;

/// <summary>
/// 系统用户表Model类
/// </summary>
[SugarTable("Sys_User", "系统用户表")]
[DataBaseType(SysDataBaseTypeEnum.Tenant)]
public class SysUserModel : BaseEntity
{
    /// <summary>
    /// 账号
    /// </summary>
    [SugarColumn(ColumnDescription = "账号", ColumnDataType = "Nvarchar(20)", IsNullable = false)]
    public string Account { get; set; }

    /// <summary>
    /// 密码
    /// </summary>
    [SugarColumn(ColumnDescription = "密码", ColumnDataType = "Nvarchar(50)", IsNullable = false)]
    public string Password { get; set; }

    /// <summary>
    /// 姓名
    /// </summary>
    [SugarColumn(ColumnDescription = "姓名", ColumnDataType = "Nvarchar(20)", IsNullable = false)]
    public string Name { get; set; }

    /// <summary>
    /// 昵称
    /// </summary>
    [SugarColumn(ColumnDescription = "昵称", ColumnDataType = "Nvarchar(20)", IsNullable = true)]
    public string NickName { get; set; }

    /// <summary>
    /// 头像
    /// </summary>
    [SugarColumn(ColumnDescription = "头像", ColumnDataType = "Nvarchar(max)", IsNullable = false)]
    public string Avatar { get; set; }

    /// <summary>
    /// 生日
    /// </summary>
    [SugarColumn(ColumnDescription = "生日", ColumnDataType = "datetimeoffset", IsNullable = true)]
    public DateTime? Birthday { get; set; }

    /// <summary>
    /// 性别
    /// </summary>
    [SugarColumn(ColumnDescription = "性别", IsNullable = false)]
    public GenderEnum Sex { get; set; }

    /// <summary>
    /// 邮箱
    /// </summary>
    [SugarColumn(ColumnDescription = "邮箱", ColumnDataType = "Nvarchar(50)", IsNullable = true)]
    public string Email { get; set; }

    /// <summary>
    /// 手机
    /// </summary>
    [SugarColumn(ColumnDescription = "手机", ColumnDataType = "Nvarchar(20)", IsNullable = true)]
    public string Phone { get; set; }

    /// <summary>
    /// 电话
    /// </summary>
    [SugarColumn(ColumnDescription = "电话", ColumnDataType = "Nvarchar(20)", IsNullable = true)]
    public string Tel { get; set; }

    /// <summary>
    /// 最后登录Ip
    /// </summary>
    [SugarColumn(ColumnDescription = "最后登录Ip", ColumnDataType = "Nvarchar(15)", IsNullable = true)]
    public string LastLoginIp { get; set; }

    /// <summary>
    /// 最后登录时间
    /// </summary>
    [SugarColumn(ColumnDescription = "最后登录时间", ColumnDataType = "datetimeoffset", IsNullable = true)]
    public DateTime? LastLoginTime { get; set; }

    /// <summary>
    /// 管理员类型
    /// </summary>
    [SugarColumn(ColumnDescription = "管理员类型", IsNullable = false)]
    public AdminTypeEnum AdminType { get; set; }

    /// <summary>
    /// 状态
    /// </summary>
    [SugarColumn(ColumnDescription = "状态", IsNullable = false)]
    public CommonStatusEnum Status { get; set; } = CommonStatusEnum.Enable;
}