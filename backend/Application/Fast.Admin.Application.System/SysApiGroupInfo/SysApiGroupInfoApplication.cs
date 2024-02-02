using Fast.Admin.Core.Outputs;
using Fast.Admin.Service.System.SysApiGroupInfo;
using Fast.Admin.Service.System.SysApiGroupInfo.Dto;

namespace Fast.Admin.Application.System.SysApiGroupInfo;

/// <summary>
/// <see cref="SysApiGroupInfoApplication"/> 系统接口分组
/// </summary>
[ApiDescriptionSettings(ApiGroupConst.System, Name = "sysApiGroupInfo", Order = 100)]
public class SysApiGroupInfoApplication : IDynamicApplication
{
    private readonly ISysApiGroupInfoService _sysApiGroupInfoService;

    public SysApiGroupInfoApplication(ISysApiGroupInfoService sysApiGroupInfoService)
    {
        _sysApiGroupInfoService = sysApiGroupInfoService;
    }

    /// <summary>
    /// 接口分组分页选择器
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysApiGroupInfo/selector", "SysApiInfo:Paged"), ApiInfo("接口分组分页选择器", HttpRequestActionEnum.Query)]
    public async Task<PagedResult<ElSelectorOutput>> Selector(PagedInput input)
    {
        return await _sysApiGroupInfoService.Selector(input);
    }

    /// <summary>
    /// 接口分组分页
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysApiGroupInfo/paged", "SysApiInfo:Paged"), ApiInfo("接口分组分页", HttpRequestActionEnum.Paged)]
    public async Task<PagedResult<QuerySysApiGroupInfoPagedOutput>> Paged(PagedInput input)
    {
        return await _sysApiGroupInfoService.Paged(input);
    }

    /// <summary>
    /// 接口分组详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("/sysApiGroupInfo/detail", "SysApiInfo:Paged"), ApiInfo("接口分组详情", HttpRequestActionEnum.Query)]
    public async Task<QuerySysApiGroupInfoDetailOutput> Detail([LongRequired(ErrorMessage = "详情Id不能为空")] long id)
    {
        return await _sysApiGroupInfoService.Detail(id);
    }

    /// <summary>
    /// 刷新接口分组和接口信息
    /// </summary>
    /// <returns></returns>
    [HttpPost("/sysApiGroupInfo/refresh", "SysApiInfo:Paged", "SysApiInfo:Manage"),
     ApiInfo("刷新接口分组和接口信息", HttpRequestActionEnum.BatchUpdate)]
    public async Task Refresh()
    {
        await _sysApiGroupInfoService.Refresh();
    }
}