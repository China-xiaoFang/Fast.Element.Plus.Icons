namespace Fast.Admin.Entity.System.Api;

/// <summary>
/// 系统接口分组信息表Model类
/// </summary>
[SugarTable("Sys_Api_Group_Info", "系统接口分组信息表")]
[SugarDbType]
public class SysApiGroupInfoModel : BaseEntity
{
    /// <summary>
    /// 分组名称
    /// </summary>
    [SugarSearchValue, SugarColumn(ColumnDescription = "分组名称", ColumnDataType = "Nvarchar(100)", IsNullable = false)]
    public string Name { get; set; }

    /// <summary>
    /// 分组标题
    /// </summary>
    [SugarSearchValue, SugarColumn(ColumnDescription = "分组标题", ColumnDataType = "Nvarchar(100)", IsNullable = true)]
    public string Title { get; set; }

    /// <summary>
    /// 分组描述
    /// </summary>
    [SugarColumn(ColumnDescription = "分组描述", ColumnDataType = "Nvarchar(MAX)", IsNullable = true)]
    public string Description { get; set; }

    /// <summary>
    /// 系统接口信息
    /// </summary>
    [Navigate(NavigateType.OneToMany, nameof(SysApiInfoModel.ApiGroupId), nameof(Id))]
    public List<SysApiInfoModel> SysApiInfoList { get; set; }
}