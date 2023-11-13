// Apache开源许可证
//
// 版权所有 © 2018-2023 1.8K仔
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

using Fast.SqlSugar.IBaseEntities;
using Fast.SqlSugar.Options;
using SqlSugar;
using SystemDbType = System.Data.DbType;

namespace Fast.SqlSugar.Internal;

/// <summary>
/// <see cref="Penetrates"/> 常量，公共方法配置类
/// </summary>
internal static class Penetrates
{
    /// <summary>
    /// 连接字符串配置
    /// </summary>
    internal static ConnectionSettingsOptions ConnectionSettings { get; set; }

    /// <summary>
    /// 雪花Id配置
    /// </summary>
    internal static SnowflakeSettingsOptions SnowflakeSettings { get; set; }

    /// <summary>
    /// 默认连接配置
    /// </summary>
    internal static ConnectionConfig DefaultConnectionConfig { get; set; }

    /// <summary>
    /// 格式化参数拼接成完整的SQL语句
    /// </summary>
    /// <param name="sql"></param>
    /// <param name="pars"></param>
    /// <returns></returns>
    internal static string ParameterFormat(string sql, IReadOnlyList<SugarParameter> pars)
    {
        //应逆向替换，否则由于 SqlSugar 多个表的过滤器问题导致替换不完整  如 @TenantId1  @TenantId10
        for (var i = pars.Count - 1; i >= 0; i--)
        {
            sql = pars[i].DbType switch
            {
                SystemDbType.String or SystemDbType.DateTime or SystemDbType.Date or SystemDbType.Time or SystemDbType.DateTime2
                    or SystemDbType.DateTimeOffset or SystemDbType.Guid or SystemDbType.VarNumeric
                    or SystemDbType.AnsiStringFixedLength or SystemDbType.AnsiString
                    or SystemDbType.StringFixedLength => sql.Replace(pars[i].ParameterName, "'" + pars[i].Value + "'"),
                SystemDbType.Boolean when string.IsNullOrEmpty(pars[i].Value?.ToString()) => sql.Replace(pars[i].ParameterName,
                    "NULL"),
                SystemDbType.Boolean => sql.Replace(pars[i].ParameterName, Convert.ToBoolean(pars[i].Value) ? "1" : "0"),
                _ => sql.Replace(pars[i].ParameterName, pars[i].Value?.ToString())
            };
        }

        return sql;
    }

    /// <summary>
    /// Entity Value 检测
    /// </summary>
    /// <param name="propertyName"><see cref="string"/> 属性名称</param>
    /// <param name="emptyList"><see cref="ICollection{T}"/> 空对象检测集合</param>
    /// <param name="entityInfo"><see cref="DataFilterModel"/> 实体信息</param>
    /// <returns></returns>
    internal static bool EntityValueCheck(string propertyName, ICollection<dynamic> emptyList, DataFilterModel entityInfo)
    {
        try
        {
            // 转换为动态类型
            var dynamicEntityInfo = (dynamic) entityInfo.EntityValue;
            var value = propertyName switch
            {
                nameof(IPrimaryKeyEntity<long>.Id) => dynamicEntityInfo.Id,
                nameof(IBaseTEntity.TenantId) => dynamicEntityInfo.TenantId,
                nameof(IBaseEntity.DepartmentId) => dynamicEntityInfo.DepartmentId,
                nameof(IBaseEntity.DepartmentName) => dynamicEntityInfo.DepartmentName,
                nameof(IBaseEntity.CreatedUserId) => dynamicEntityInfo.CreatedUserId,
                nameof(IBaseEntity.CreatedUserName) => dynamicEntityInfo.CreatedUserName,
                nameof(IBaseEntity.CreatedTime) => dynamicEntityInfo.CreatedTime,
                nameof(IBaseEntity.UpdatedUserId) => dynamicEntityInfo.UpdatedUserId,
                nameof(IBaseEntity.UpdatedUserName) => dynamicEntityInfo.UpdatedUserName,
                nameof(IBaseEntity.UpdatedTime) => dynamicEntityInfo.UpdatedTime,
                _ => throw new NotImplementedException()
            };

            return emptyList == null || emptyList.Any(empty => empty == value);
        }
        catch (Exception)
        {
            return false;
        }
    }

    /// <summary>
    /// 设置Entity Value
    /// </summary>
    /// <param name="fieldName"></param>
    /// <param name="emptyList"></param>
    /// <param name="setValue"></param>
    /// <param name="entityInfo"></param>
    internal static void SetEntityValue(string fieldName, ICollection<dynamic> emptyList, dynamic setValue,
        ref DataFilterModel entityInfo)
    {
        // 判断属性名称是否等于传入的字段名称
        if (entityInfo.PropertyName == fieldName)
        {
            if (EntityValueCheck(fieldName, emptyList, entityInfo))
            {
                entityInfo.SetValue(setValue);
            }
        }
    }
}