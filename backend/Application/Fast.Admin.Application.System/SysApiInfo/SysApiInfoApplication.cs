// Apache开源许可证
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

using Fast.Admin.Service.System.SysApiInfo;
using Fast.Admin.Service.System.SysApiInfo.Dto;

namespace Fast.Admin.Application.System.SysApiInfo;

/// <summary>
/// <see cref="SysApiInfoApplication"/> 系统接口信息
/// </summary>
[ApiDescriptionSettings(ApiGroupConst.Auth, Name = "sysApiInfo", Order = 100)]
public class SysApiInfoApplication : IDynamicApplication
{
    private readonly ISysApiInfoService _sysApiInfoService;

    public SysApiInfoApplication(ISysApiInfoService sysApiInfoService)
    {
        _sysApiInfoService = sysApiInfoService;
    }

    /// <summary>
    /// 接口信息分页
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    [HttpPost("/sysApiInfo/paged", "SysApiInfo:Paged"), ApiInfo("接口信息分页", HttpRequestActionEnum.Paged)]
    public async Task<PagedResult<QuerySysApiInfoPagedOutput>> Paged(QuerySysApiInfoPagedInput input)
    {
        return await _sysApiInfoService.Paged(input);
    }

    /// <summary>
    /// 接口信息详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    [HttpGet("/sysApiInfo/detail", "SysApiInfo:Paged"), ApiInfo("接口信息详情", HttpRequestActionEnum.Query)]
    public async Task<QuerySysApiInfoDetailOutput> Detail([LongRequired(ErrorMessage = "详情Id不能为空")] long id)
    {
        return await _sysApiInfoService.Detail(id);
    }
}