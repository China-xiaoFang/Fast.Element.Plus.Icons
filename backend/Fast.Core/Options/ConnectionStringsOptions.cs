﻿namespace Fast.Core.Options;

/// <summary>
/// 数据库配置
/// </summary>
public class ConnectionStringsOptions
{
    /// <summary>
    /// 连接Id
    /// </summary>
    public string DefaultConnectionId { get; set; }

    /// <summary>
    /// 服务器Ip地址
    /// </summary>
    public string DefaultServiceIp { get; set; }

    /// <summary>
    /// 端口号
    /// </summary>
    public string DefaultPort { get; set; }

    /// <summary>
    /// 数据库名称
    /// </summary>
    public string DefaultDbName { get; set; }

    /// <summary>
    /// 数据库用户
    /// </summary>
    public string DefaultDbUser { get; set; }

    /// <summary>
    /// 数据库密码
    /// </summary>
    public string DefaultDbPwd { get; set; }

    /// <summary>
    /// 数据库类型
    /// </summary>
    public DbType DefaultDbType { get; set; }

    /// <summary>
    /// 超时时间，单位秒
    /// </summary>
    public int CommandTimeOut { get; set; }

    /// <summary>
    /// SqlSugar Sql执行最大秒数，如果超过记录警告日志
    /// </summary>
    public double SugarSqlExecMaxSeconds { get; set; }

    /// <summary>
    /// 差异日志
    /// </summary>
    public bool DiffLog { get; set; }
}