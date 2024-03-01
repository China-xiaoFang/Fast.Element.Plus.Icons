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

using Fast.Admin.Entity.System.Config;
using Fast.Admin.Service.System.SysConfig.Dto;
using Fast.SqlSugar.Extensions;
using Mapster;

namespace Fast.Admin.Service.System.SysConfig;

/// <summary>
/// <see cref="SysConfigService"/> 系统配置服务
/// </summary>
public class SysConfigService : ISysConfigService, ITransientDependency
{
    private readonly ISqlSugarRepository<SysConfigModel> _repository;

    public SysConfigService(ISqlSugarRepository<SysConfigModel> repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// 系统配置分页
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<PagedResult<QuerySysConfigPagedOutput>> Paged(PagedInput input)
    {
        return await _repository.Entities.ToPagedListAsync<SysConfigModel, QuerySysConfigPagedOutput>(input);
    }

    /// <summary>
    /// 系统配置详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<QuerySysConfigDetailOutput> Detail(long id)
    {
        return await _repository.Entities.Where(wh => wh.Id == id).Select<QuerySysConfigDetailOutput>().FirstAsync();
    }

    /// <summary>
    /// 添加系统配置
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    /// <exception cref="UserFriendlyException"></exception>
    public async Task Add(AddSysConfigInput input)
    {
        // 编码不能重复
        if (await _repository.IsExistsAsync(wh => wh.Code == input.Code))
        {
            throw new UserFriendlyException("编码重复！");
        }

        var model = input.Adapt<SysConfigModel>();

        await _repository.InsertAsync(model);
    }

    /// <summary>
    /// 更新系统配置
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    /// <exception cref="UserFriendlyException"></exception>
    public async Task Update(UpdateSysConfigInput input)
    {
        var model = await _repository.FirstOrDefaultAsync(f => f.Id == input.Id);

        if (model == null)
        {
            throw new UserFriendlyException("数据不存在！");
        }

        model.Adapt(input);

        await _repository.UpdateAsync(model);
    }
}