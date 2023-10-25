using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection;
using Fast.Sugar.Options;
using SqlSugar;

// ReSharper disable once CheckNamespace
namespace Fast.Sugar.Util;

/// <summary>
/// 数据库工具类
/// 各种类型数据库的兼容
/// </summary>
static class DataBaseUtil
{
    /// <summary>
    /// 得到数据库连接字符串
    /// </summary>
    /// <param name="dbInfo"></param>
    /// <returns></returns>
    public static string GetConnectionStr(ConnectionConfigOption dbInfo)
    {
        var connectionStr = "";
        // 目前只验证了Sql Server 和 MySql
        switch (dbInfo.DbType)
        {
            case DbType.MySql:
                connectionStr =
                    $"Data Source={dbInfo.ServiceIp};Database={dbInfo.DbName};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};pooling=true;port={dbInfo.Port};sslmode=none;CharSet=utf8;Convert Zero Datetime=True;Allow Zero Datetime=True;";
                break;
            case DbType.SqlServer:
                connectionStr =
                    $"Data Source={dbInfo.ServiceIp};Initial Catalog={dbInfo.DbName};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};MultipleActiveResultSets=true;max pool size=100;";
                break;
            case DbType.Sqlite:
                connectionStr = $"Data Source={dbInfo.DbName};Version=3;";
                break;
            case DbType.Oracle:
                connectionStr = $"Data Source={dbInfo.ServiceIp};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.PostgreSQL:
                connectionStr =
                    $"Host={dbInfo.ServiceIp};Port={dbInfo.Port};Database={dbInfo.DbName};Username={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.Dm:
                connectionStr = $"Data Source={dbInfo.ServiceIp}, {dbInfo.Port};User Id={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.Kdbndp:
                connectionStr = $"Data Source={dbInfo.ServiceIp}:{dbInfo.Port};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.Oscar:
                connectionStr =
                    $"Data Source={dbInfo.ServiceIp}:{dbInfo.Port};Initial Catalog={dbInfo.DbName};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.MySqlConnector:
                connectionStr =
                    $"Data Source={dbInfo.ServiceIp};Database={dbInfo.DbName};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.Access:
                connectionStr = $"Data Source={dbInfo.DbName};Provider=Microsoft.ACE.OLEDB.12.0;Persist Security Info=False;";
                break;
            case DbType.OpenGauss:
                connectionStr =
                    $"Host={dbInfo.ServiceIp};Port={dbInfo.Port};Username={dbInfo.DbUser};Password={dbInfo.DbPwd};Database={dbInfo.DbName};";
                break;
            case DbType.Custom:
                // 自定义数据库类型的连接字符串配置
                //connectionStr = dbInfo.CustomConnectionStr;
                break;
            case DbType.QuestDB:
                connectionStr =
                    $"Server={dbInfo.ServiceIp}:{dbInfo.Port};Database={dbInfo.DbName};User Id={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.HG:
                connectionStr =
                    $"Server={dbInfo.ServiceIp}:{dbInfo.Port};Database={dbInfo.DbName};User Id={dbInfo.DbUser};Password={dbInfo.DbPwd};";
                break;
            case DbType.ClickHouse:
                connectionStr =
                    $"Host={dbInfo.ServiceIp};Port={dbInfo.Port};Username={dbInfo.DbUser};Password={dbInfo.DbPwd};Database={dbInfo.DbName};";
                break;
            case DbType.GBase:
                connectionStr =
                    $"Server={dbInfo.ServiceIp};Port={dbInfo.Port};User ID={dbInfo.DbUser};Password={dbInfo.DbPwd};Database={dbInfo.DbName};";
                break;
            case DbType.Odbc:
                // ODBC 数据库连接字符串配置
                //connectionStr = dbInfo.CustomConnectionStr;
                break;
            default:
                throw new SqlSugarException("数据库类型配置异常！");
        }

        return connectionStr;
    }

    /// <summary>
    /// 目前只验证了Sql Server 和 MySql
    /// </summary>
    /// <param name="dbType"></param>
    /// <returns></returns>
    public static ConfigureExternalServices GetSugarExternalServices(DbType dbType)
    {
        var externalServices = new ConfigureExternalServices
        {
            EntityNameService = (type, entityInfo) =>
            {
                // 全局开启创建表按照字段排序，避免重复代码
                entityInfo.IsCreateTableFiledSort = true;

                // Table Name 配置，如果使用SqlSugar的规范，其实这里是不会走的
                var tableAttribute = type.GetCustomAttribute<TableAttribute>();
                if (tableAttribute != null)
                {
                    entityInfo.DbTableName = tableAttribute.Name;
                }
            },
            EntityService = (propertyInfo, columnInfo) =>
            {
                // 主键配置，如果使用SqlSugar的规范，其实这里是不会走的
                var keyAttribute = propertyInfo.GetCustomAttribute<KeyAttribute>();
                if (keyAttribute != null)
                {
                    columnInfo.IsPrimarykey = true;
                }

                // 列名配置，如果使用SqlSugar的规范，其实这里是不会走的
                var columnAttribute = propertyInfo.GetCustomAttribute<ColumnAttribute>();
                if (columnAttribute != null)
                {
                    columnInfo.DbColumnName = columnAttribute.Name;
                }

                // 可空类型配置
                if (propertyInfo.PropertyType.IsGenericType &&
                    propertyInfo.PropertyType.GetGenericTypeDefinition() == typeof(Nullable<>))
                {
                    columnInfo.IsNullable = true;
                }

                // 这里的所有数据库类型，默认是根据SqlServer配置的
                var columnDbType = columnInfo.DataType?.ToUpper();
                if (columnDbType == null)
                    return;
                // String
                if (columnDbType.StartsWith("NVARCHAR"))
                {
                    var length = columnDbType.Substring("NVARCHAR(".Length, columnDbType.Length - "NVARCHAR(".Length - 1);
                    SetDbTypeNvarchar(dbType, length, ref columnInfo);
                }

                // DateTime
                if (columnDbType == "DATETIMEOFFSET")
                {
                    SetDbTypeDateTime(dbType, ref columnInfo);
                }
            }
        };
        return externalServices;
    }

    /// <summary>
    /// 设置Nvarchar类型
    /// </summary>
    /// <param name="dbType"></param>
    /// <param name="length"></param>
    /// <param name="columnInfo"></param>
    private static void SetDbTypeNvarchar(DbType dbType, string length, ref EntityColumnInfo columnInfo)
    {
        switch (dbType)
        {
            case DbType.MySql:
                columnInfo.DataType = length.ToLower() == "max" ? "longtext" : $"varchar({length})";
                break;
            case DbType.SqlServer:
                columnInfo.DataType = $"Nvarchar({length})";
                break;
            case DbType.Sqlite:
                columnInfo.DataType = "TEXT";
                break;
            case DbType.Oracle:
                columnInfo.DataType = $"NVARCHAR2({length})";
                break;
            case DbType.PostgreSQL:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.Dm:
                columnInfo.DataType = $"NVARCHAR2({length})";
                break;
            case DbType.Kdbndp:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.Oscar:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.MySqlConnector:
                columnInfo.DataType = length.ToLower() == "max" ? "longtext" : $"varchar({length})";
                break;
            case DbType.Access:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.OpenGauss:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.Custom:
                break;
            case DbType.QuestDB:
                columnInfo.DataType = "STRING";
                break;
            case DbType.HG:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.ClickHouse:
                columnInfo.DataType = "STRING";
                break;
            case DbType.GBase:
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            case DbType.Odbc:
                // ODBC 数据库设置
                columnInfo.DataType = $"VARCHAR({length})";
                break;
            default:
                throw new SqlSugarException("数据库类型配置异常！");
        }
    }

    /// <summary>
    /// 设置DateTime类型
    /// </summary>
    /// <param name="dbType"></param>
    /// <param name="columnInfo"></param>
    private static void SetDbTypeDateTime(DbType dbType, ref EntityColumnInfo columnInfo)
    {
        switch (dbType)
        {
            case DbType.MySql:
                columnInfo.DataType = "datetime";
                break;
            case DbType.SqlServer:
                columnInfo.DataType = "datetimeoffset";
                break;
            case DbType.Sqlite:
                columnInfo.DataType = "TEXT";
                break;
            case DbType.Oracle:
                columnInfo.DataType = "TIMESTAMP WITH TIME ZONE";
                break;
            case DbType.PostgreSQL:
                columnInfo.DataType = "TIMESTAMP WITH TIME ZONE";
                break;
            case DbType.Dm:
                columnInfo.DataType = "TIMESTAMP";
                break;
            case DbType.Kdbndp:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.Oscar:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.MySqlConnector:
                columnInfo.DataType = "datetime";
                break;
            case DbType.Access:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.OpenGauss:
                columnInfo.DataType = "TIMESTAMP WITH TIME ZONE";
                break;
            case DbType.Custom:
                break;
            case DbType.QuestDB:
                columnInfo.DataType = "TIMESTAMP";
                break;
            case DbType.HG:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.ClickHouse:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.GBase:
                columnInfo.DataType = "DATETIME";
                break;
            case DbType.Odbc:
                // ODBC 数据库设置
                columnInfo.DataType = "DATETIME";
                break;
            default:
                throw new SqlSugarException("数据库类型配置异常！");
        }
    }
}