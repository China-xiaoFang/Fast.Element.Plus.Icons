using Fast.Sugar.BaseModel.Interface;
using SqlSugar;

// ReSharper disable once CheckNamespace
namespace Fast.Sugar.BaseModel;

/// <summary>
/// 租户实体基类
/// </summary>
public class BaseTEntity : BaseEntity, IBaseTenant
{
    /// <summary>
    /// 租户Id
    /// </summary>
    [SugarColumn(ColumnDescription = "租户Id", IsNullable = true, CreateTableFieldSort = 997)]
    public virtual long TenantId { get; set; }
}