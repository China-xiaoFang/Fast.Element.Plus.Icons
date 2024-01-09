﻿// Apache开源许可证
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
using Fast.Admin.Core.Constants;
using Fast.Admin.Core.Entity.Log.Entities;
using Fast.Admin.Core.Entity.System.Entities;
using Fast.Admin.Core.Enum.Common;
using Fast.Admin.Core.Enum.Db;
using Fast.Admin.Core.Enum.System;
using Fast.SqlSugar.Attributes;
using Fast.SqlSugar.Handlers;
using Fast.SqlSugar.Options;
using Mapster;
using Microsoft.Extensions.Logging;
using SqlSugar;

namespace Fast.Admin.Core.Handlers;

/// <summary>
/// <see cref="SqlSugarEntityHandler"/> Sugar实体处理
/// </summary>
public class SqlSugarEntityHandler : ISqlSugarEntityHandler
{
    private readonly ICache _cache;

    /// <summary>
    /// 这里为了防止死循环 Aop 的发生，直接注入 ISqlSugarClient，并且禁用 Aop 处理
    /// </summary>
    private readonly ISqlSugarClient _sqlSugarClient;

    private readonly HttpContext _httpContext;
    private readonly ILogger<SqlSugarEntityHandler> _logger;

    public SqlSugarEntityHandler(ICache cache, ISqlSugarClient sqlSugarClient, IHttpContextAccessor httpContextAccessor,
        ILogger<SqlSugarEntityHandler> logger)
    {
        _cache = cache;
        sqlSugarClient.Ado.IsEnableLogEvent = true;
        _sqlSugarClient = sqlSugarClient;
        _httpContext = httpContextAccessor.HttpContext;
        _logger = logger;
    }

    /// <summary>
    /// 获取缓存连接字符串设置
    /// </summary>
    /// <param name="fastDbType"></param>
    /// <param name="tenantId"></param>
    /// <param name="isSystem"></param>
    /// <returns></returns>
    /// <exception cref="ArgumentNullException"></exception>
    private async Task<ConnectionSettingsOptions> GetCacheConnectionSettings(FastDbTypeEnum fastDbType, long tenantId,
        YesOrNotEnum isSystem)
    {
        // 获取缓存Key
        var cacheKey = CacheConst.GetCacheKey(CacheConst.TenantDataBaseInfo, tenantId, System.Enum.GetName(fastDbType));

        // 优先从 HttpContext.Items 中获取
        var connectionSettingsObj =
            _httpContext?.Items[nameof(Fast) + nameof(ConnectionSettingsOptions) + System.Enum.GetName(fastDbType)];

        if (connectionSettingsObj is ConnectionSettingsOptions connectionSettings)
        {
            return connectionSettings;
        }

        return await _cache.GetAndSetAsync(cacheKey, async () =>
        {
            var sysTenantDataBaseModel = await _sqlSugarClient.Queryable<SysTenantDataBaseModel>().Where(wh =>
                    wh.IsSystem == isSystem && wh.FastDbType == fastDbType && wh.TenantId == tenantId && wh.IsDeleted == false)
                .SingleAsync();

            if (sysTenantDataBaseModel == null)
            {
                var errorMessage = $"未能找到对应类型【{System.Enum.GetName(fastDbType)}】所存在的DataBase信息！";
                // 写入错误日志
                _logger.LogError($"TenantId：{tenantId}；${errorMessage}");
                throw new ArgumentNullException(errorMessage);
            }

            var data = sysTenantDataBaseModel.Adapt<ConnectionSettingsOptions>();

            // 放入 HttpContext.Items 中
            if (_httpContext != null)
            {
                _httpContext.Items[nameof(Fast) + nameof(ConnectionSettingsOptions) + System.Enum.GetName(fastDbType)] = data;
            }

            return data;
        });
    }

    /// <summary>
    /// 获取日志上下文
    /// </summary>
    /// <returns></returns>
    private async Task<ISqlSugarClient> GetLogSqlSugarClient()
    {
        // 获取系统日志库连接字符串配置
        var logConnectionSettings =
            await GetCacheConnectionSettings(FastDbTypeEnum.SysCoreLog, SystemConst.DefaultSystemTenantId, YesOrNotEnum.Y);

        // 类型转换
        var _db = _sqlSugarClient as SqlSugarClient;

        // 判断是否日志库是否存在与当前上下文中
        if (!_db!.IsAnyConnection(logConnectionSettings.ConnectionId))
        {
            // 不存在添加
            _db.AddConnection(SqlSugarContext.GetConnectionConfig(logConnectionSettings));
        }

        return _db.GetConnection(logConnectionSettings.ConnectionId);
    }

    /// <summary>
    /// 获取 IUser，如果未登录或者报错，则为空
    /// </summary>
    /// <returns></returns>
    private IUser GetUser()
    {
        try
        {
            return FastContext.GetService<IUser>();
        }
        catch
        {
            return default;
        }
    }

    /// <summary>根据实体类型获取连接字符串</summary>
    /// <typeparam name="TEntity"></typeparam>
    /// <param name="sqlSugarClient"><see cref="T:SqlSugar.ISqlSugarClient" /> 默认库SqlSugar客户端</param>
    /// <param name="sugarDbType">实体类头部的 <see cref="T:Fast.SqlSugar.Attributes.SugarDbTypeAttribute" /> 特性，如果不存在可能为空</param>
    /// <returns></returns>
    public async Task<ConnectionSettingsOptions> GetConnectionSettings<TEntity>(ISqlSugarClient sqlSugarClient,
        SugarDbTypeAttribute sugarDbType)
    {
        // 获取枚举字符串
        var fastDbTypeStr = sugarDbType.Type?.ToString();

        // 判断是否为空
        if (sugarDbType.Type == null || fastDbTypeStr.IsEmpty())
        {
            return null;
        }

        // 获取数据库类型
        var fastDbType = System.Enum.Parse<FastDbTypeEnum>(sugarDbType.Type.ToString());

        // 租户Id
        var tenantId = 0L;

        // 是否为系统库
        var isSystem = YesOrNotEnum.N;

        // 数据库类型判断
        switch (fastDbType)
        {
            // 默认系统库
            case FastDbTypeEnum.SysCore:
                return null;
            // 系统日志库
            case FastDbTypeEnum.SysCoreLog:
                tenantId = SystemConst.DefaultSystemTenantId;
                isSystem = YesOrNotEnum.Y;
                break;
            case FastDbTypeEnum.SysAdminCore:
            default:
                tenantId = GetUser().TenantId;
                break;
        }

        // 获取缓存Key
        var cacheKey = CacheConst.GetCacheKey(CacheConst.TenantDataBaseInfo, tenantId, System.Enum.GetName(fastDbType));

        return await _cache.GetAndSetAsync(cacheKey, async () =>
        {
            var sysTenantDataBaseModel = await _sqlSugarClient.Queryable<SysTenantDataBaseModel>().Where(wh =>
                    wh.IsSystem == isSystem && wh.FastDbType == fastDbType && wh.TenantId == tenantId && wh.IsDeleted == false)
                .SingleAsync();

            if (sysTenantDataBaseModel == null)
            {
                var errorMessage = $"未能找到对应类型【{System.Enum.GetName(fastDbType)}】所存在的DataBase信息！";
                // 写入错误日志
                _logger.LogError($"TenantId：{tenantId}；${errorMessage}");
                throw new ArgumentNullException(errorMessage);
            }

            return sysTenantDataBaseModel.Adapt<ConnectionSettingsOptions>();
        });
    }

    /// <summary>执行Sql</summary>
    /// <param name="rawSql"><see cref="T:System.String" /> 原始Sql语句</param>
    /// <param name="parameters"><see cref="T:SqlSugar.SugarParameter" /> Sql参数</param>
    /// <param name="executionTime"><see cref="T:System.TimeSpan" /> 执行时间</param>
    /// <param name="handlerSql"><see cref="T:System.String" /> 参数化处理后的Sql语句</param>
    /// <returns></returns>
    public async Task ExecuteAsync(string rawSql, SugarParameter[] parameters, TimeSpan executionTime, string handlerSql)
    {
        // 获取日志上下文
        var _db = await GetLogSqlSugarClient();

        var _user = GetUser();

        var dateTime = DateTime.Now;

        // 组装数据
        var sysLogSqlExecModel = new SysLogSqlExecModel
        {
            DepartmentId = _user?.DepartmentId,
            DepartmentName = _user?.DepartmentName,
            CreatedUserId = _user?.UserId,
            CreatedUserName = _user?.UserName,
            CreatedTime = dateTime,
            Account = _user?.UserAccount,
            UserJobNo = _user?.UserJobNo,
            RawSql = rawSql,
            Parameters = parameters,
            PureSql = handlerSql,
            ExecuteTime = dateTime,
            TenantId = _user?.TenantId
        };
        sysLogSqlExecModel.RecordCreate(_httpContext);

        // 保存数据
        await _db.Insertable(sysLogSqlExecModel).ExecuteCommandAsync();
    }

    /// <summary>执行Sql超时</summary>
    /// <param name="fileName"><see cref="T:System.String" /> 文件名称</param>
    /// <param name="fileLine"><see cref="T:System.Int32" /> 文件行数</param>
    /// <param name="methodName"><see cref="T:System.String" /> 方法名称</param>
    /// <param name="rawSql"><see cref="T:System.String" /> 未处理的Sql语句</param>
    /// <param name="parameters"><see cref="T:SqlSugar.SugarParameter" /> Sql参数</param>
    /// <param name="executeTime"><see cref="T:System.TimeSpan" /> 执行时间</param>
    /// <param name="handlerSql"><see cref="T:System.String" /> 参数化处理后的Sql语句</param>
    /// <param name="message"><see cref="T:System.String" /></param>
    /// <returns></returns>
    public async Task ExecuteTimeoutAsync(string fileName, int fileLine, string methodName, string rawSql,
        SugarParameter[] parameters, TimeSpan executeTime, string handlerSql, string message)
    {
        // 获取日志上下文
        var _db = await GetLogSqlSugarClient();

        var _user = GetUser();

        var dateTime = DateTime.Now;

        // 组装数据
        var sysLogSqlTimeoutModel = new SysLogSqlTimeoutModel
        {
            DepartmentId = _user?.DepartmentId,
            DepartmentName = _user?.DepartmentName,
            CreatedUserId = _user?.UserId,
            CreatedUserName = _user?.UserName,
            CreatedTime = dateTime,
            Account = _user?.UserAccount,
            UserJobNo = _user?.UserJobNo,
            FileName = fileName,
            FileLine = fileLine,
            MethodName = methodName,
            TimeoutSeconds = executeTime.TotalSeconds,
            RawSql = rawSql,
            Parameters = parameters,
            PureSql = handlerSql,
            TimeoutTime = dateTime,
            TenantId = _user?.TenantId
        };
        sysLogSqlTimeoutModel.RecordCreate(_httpContext);

        // 保存数据
        await _db.Insertable(sysLogSqlTimeoutModel).ExecuteCommandAsync();
    }

    /// <summary>执行Sql差异</summary>
    /// <param name="diffType"><see cref="T:SqlSugar.DiffType" /> 差异类型</param>
    /// <param name="tableName"><see cref="T:System.String" /> 表名称</param>
    /// <param name="tableDescription"><see cref="T:System.String" /> 表描述</param>
    /// <param name="diffDescription"><see cref="T:System.String" /> 差异描述</param>
    /// <param name="beforeColumnList"><see cref="T:System.String" /> 执行前列信息</param>
    /// <param name="afterColumnList"><see cref="T:System.String" /> 执行后列信息</param>
    /// <param name="rawSql"><see cref="T:System.String" /> 未处理的Sql语句</param>
    /// <param name="parameters"><see cref="T:SqlSugar.SugarParameter" /> Sql参数</param>
    /// <param name="executeTime"><see cref="T:System.TimeSpan" /> 执行时间</param>
    /// <param name="handlerSql"><see cref="T:System.String" /> 参数化处理后的Sql语句</param>
    /// <returns></returns>
    public async Task ExecuteDiffLogAsync(DiffType diffType, string tableName, string tableDescription, string diffDescription,
        List<List<DiffLogColumnInfo>> beforeColumnList, List<List<DiffLogColumnInfo>> afterColumnList, string rawSql,
        SugarParameter[] parameters, TimeSpan? executeTime, string handlerSql)
    {
        // 获取日志上下文
        var _db = await GetLogSqlSugarClient();

        var _user = GetUser();

        var dateTime = DateTime.Now;

        var localDiffType = diffType switch
        {
            DiffType.insert => DiffLogTypeEnum.Insert,
            DiffType.update => DiffLogTypeEnum.Update,
            DiffType.delete => DiffLogTypeEnum.Delete,
            _ => DiffLogTypeEnum.None
        };

        // 组装数据
        var sysLogSqlDiffModel = new SysLogSqlDiffModel
        {
            DepartmentId = _user?.DepartmentId,
            DepartmentName = _user?.DepartmentName,
            CreatedUserId = _user?.UserId,
            CreatedUserName = _user?.UserName,
            CreatedTime = dateTime,
            Account = _user?.UserAccount,
            UserJobNo = _user?.UserJobNo,
            TableName = tableName,
            TableDescription = tableDescription,
            DiffDescription = diffDescription,
            BeforeColumnList = beforeColumnList,
            AfterColumnList = afterColumnList,
            ExecuteSeconds = executeTime?.TotalSeconds,
            RawSql = rawSql,
            Parameters = parameters,
            PureSql = handlerSql,
            DiffType = localDiffType,
            DiffTime = dateTime,
            TenantId = _user?.TenantId
        };
        sysLogSqlDiffModel.RecordCreate(_httpContext);

        // 保存数据
        await _db.Insertable(sysLogSqlDiffModel).ExecuteCommandAsync();
    }

    /// <summary>执行Sql错误</summary>
    /// <param name="fileName"><see cref="T:System.String" /> 文件名称</param>
    /// <param name="fileLine"><see cref="T:System.Int32" /> 文件行数</param>
    /// <param name="methodName"><see cref="T:System.String" /> 方法名称</param>
    /// <param name="rawSql"><see cref="T:System.String" /> 原始Sql语句</param>
    /// <param name="parameters"><see cref="T:SqlSugar.SugarParameter" /> Sql参数</param>
    /// <param name="handlerSql"><see cref="T:System.String" /> 参数化处理后的Sql语句</param>
    /// <param name="message"><see cref="T:System.String" /></param>
    /// <returns></returns>
    public async Task ExecuteErrorAsync(string fileName, int fileLine, string methodName, string rawSql,
        SugarParameter[] parameters, string handlerSql, string message)
    {
        // 获取日志上下文
        var _db = await GetLogSqlSugarClient();

        var _user = GetUser();

        var dateTime = DateTime.Now;

        // 组装数据
        var sysLogSqlExModel = new SysLogSqlExModel
        {
            DepartmentId = _user?.DepartmentId,
            DepartmentName = _user?.DepartmentName,
            CreatedUserId = _user?.UserId,
            CreatedUserName = _user?.UserName,
            CreatedTime = dateTime,
            Account = _user?.UserAccount,
            UserJobNo = _user?.UserJobNo,
            FileName = fileName,
            FileLine = fileLine,
            MethodName = methodName,
            RawSql = rawSql,
            Parameters = parameters,
            PureSql = handlerSql,
            ExceptionTime = dateTime,
            TenantId = _user?.TenantId
        };
        sysLogSqlExModel.RecordCreate(_httpContext);

        // 保存数据
        await _db.Insertable(sysLogSqlExModel).ExecuteCommandAsync();
    }

    /// <summary>指派租户Id</summary>
    /// <returns></returns>
    public long? AssignTenantId()
    {
        return GetUser()?.TenantId;
    }

    /// <summary>指派部门Id</summary>
    /// <returns></returns>
    public long? AssignDepartmentId()
    {
        return GetUser()?.DepartmentId;
    }

    /// <summary>指派部门名称</summary>
    /// <returns></returns>
    public string AssignDepartmentName()
    {
        return GetUser()?.DepartmentName;
    }

    /// <summary>指派用户Id</summary>
    /// <returns></returns>
    public long? AssignUserId()
    {
        return GetUser()?.UserId;
    }

    /// <summary>指派用户名称</summary>
    /// <returns></returns>
    public string AssignUserName()
    {
        return GetUser()?.UserName;
    }

    /// <summary>是否为超级管理员</summary>
    /// <returns></returns>
    public bool IsSuperAdmin()
    {
        return GetUser()?.IsSuperAdmin ?? false;
    }

    /// <summary>是否为管理员</summary>
    /// <returns></returns>
    public bool IsAdmin()
    {
        return false;
    }
}