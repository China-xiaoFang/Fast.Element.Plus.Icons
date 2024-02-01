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

using Fast.Admin.Entity.System.Api;
using Fast.Admin.Service.System.SysApiInfo.Dto;
using Fast.SqlSugar.Extensions;

namespace Fast.Admin.Service.System.SysApiInfo;

/// <summary>
/// <see cref="SysApiInfoService"/> 系统接口信息服务
/// </summary>
public class SysApiInfoService : ISysApiInfoService, ITransientDependency
{
    private readonly ISqlSugarRepository<SysApiInfoModel> _repository;

    public SysApiInfoService(ISqlSugarRepository<SysApiInfoModel> repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// 接口信息分页
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<PagedResult<QuerySysApiInfoPagedOutput>> Paged(QuerySysApiInfoPagedInput input)
    {
        return await _repository.Entities.Includes(e => e.SysButtonApiList, e => e.SysButton)
            .WhereIF(!input.ApiGroupId.IsNullOrZero(), wh => wh.ApiGroupId == input.ApiGroupId)
            .WhereIF(input.Method != null, wh => wh.Method == input.Method)
            .WhereIF(input.ApiAction != null, wh => wh.ApiAction == input.ApiAction).ToPagedListAsync(input,
                sl => new QuerySysApiInfoPagedOutput
                {
                    ButtonList = sl.SysButtonApiList.Select(dSl => new QuerySysApiInfoPagedOutput.QuerySysApiInfoButtonDto
                    {
                        ButtonCode = dSl.SysButton.ButtonCode, ButtonName = dSl.SysButton.ButtonName
                    }).ToList()
                }, true);
    }

    /// <summary>
    /// 接口信息详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<QuerySysApiInfoDetailOutput> Detail(long id)
    {
        return await _repository.Entities.Where(wh => wh.Id == id).Select(
            sl => new QuerySysApiInfoDetailOutput
            {
                ButtonList = sl.SysButtonApiList.Select(dSl => new QuerySysApiInfoPagedOutput.QuerySysApiInfoButtonDto
                {
                    ButtonCode = dSl.SysButton.ButtonCode, ButtonName = dSl.SysButton.ButtonName
                }).ToList()
            }, true).FirstAsync();
    }
}