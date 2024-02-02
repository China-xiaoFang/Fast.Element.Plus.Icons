using Fast.IaaS;

namespace Fast.Admin.Entity.System.Api;

/// <summary>
/// 系统接口信息表Model类
/// </summary>
[SugarTable("Sys_Api_Info", "系统接口信息表")]
[SugarDbType]
public class SysApiInfoModel : BaseEntity
{
    /// <summary>
    /// 接口分组Id
    /// </summary>
    [SugarColumn(ColumnDescription = "接口分组Id", IsNullable = false)]
    public long ApiGroupId { get; set; }

    /// <summary>
    /// 模块名称
    /// </summary>
    [SugarSearchValue, SugarColumn(ColumnDescription = "模块名称", ColumnDataType = "Nvarchar(100)", IsNullable = false)]
    public string ModuleName { get; set; }

    /// <summary>
    /// 接口地址
    /// </summary>
    [SugarSearchValue, SugarColumn(ColumnDescription = "接口地址", ColumnDataType = "Nvarchar(100)", IsNullable = false)]
    public string Url { get; set; }

    /// <summary>
    /// 接口名称
    /// </summary>
    [SugarSearchValue, SugarColumn(ColumnDescription = "接口名称", ColumnDataType = "Nvarchar(100)", IsNullable = true)]
    public string Name { get; set; }

    /// <summary>
    /// 接口请求方式
    /// </summary>
    [SugarColumn(ColumnDescription = "接口请求方式", ColumnDataType = "tinyint", IsNullable = false)]
    public HttpRequestMethodEnum Method { get; set; }

    /// <summary>
    /// 接口操作方式
    /// </summary>
    [SugarColumn(ColumnDescription = "接口操作方式", ColumnDataType = "tinyint", IsNullable = false)]
    public HttpRequestActionEnum ApiAction { get; set; }

    /// <summary>
    /// 系统接口分组信息
    /// </summary>
    [Navigate(NavigateType.OneToOne, nameof(ApiGroupId), nameof(Id))]
    public SysApiGroupInfoModel SysApiGroupInfo { get; set; }

    /// <summary>
    /// 系统接口按钮权限集合
    /// </summary>
    [Navigate(NavigateType.OneToMany, nameof(SysApiButtonModel.ApiId), nameof(Id))]
    public List<SysApiButtonModel> SysButtonApiList { get; set; }
}