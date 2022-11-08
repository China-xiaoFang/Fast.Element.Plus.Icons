﻿using Fast.Core.SqlSugar.BaseModel.Interface;

namespace Fast.Core.SqlSugar.BaseModel;

/// <summary>
/// 租户实体基类
/// </summary>
public class BaseTEntity : BaseEntity, IBaseTenant
{
    /// <summary>
    /// 租户Id
    /// </summary>
    [SugarColumn(ColumnDescription = "租户Id", IsNullable = true)]
    public virtual long? TenantId { get; set; }
}