﻿using Fast.Admin.Model.Enum;
using Fast.Admin.Model.Model.Sys.Dic;
using SqlSugar;

namespace Fast.Admin.Model.Model.Tenant.Dic;

/// <summary>
/// 租户字典数据表Model类
/// </summary>
[SugarTable("Ten_Dict_Data", "租户字典数据表")]
[SugarDbType(SugarDbTypeEnum.Tenant)]
public class TenDictDataModel : SysDictDataModel
{
}