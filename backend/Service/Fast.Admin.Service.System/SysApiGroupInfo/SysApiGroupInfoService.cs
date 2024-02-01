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

using System.Reflection;
using Fast.Admin.Entity.System.Api;
using Fast.Admin.Entity.System.Menu;
using Fast.Admin.Service.System.SysApiGroupInfo.Dto;
using Fast.DynamicApplication;
using Fast.NET.Core;
using Fast.SqlSugar.Extensions;
using Microsoft.Extensions.Configuration;
using Yitter.IdGenerator;

namespace Fast.Admin.Service.System.SysApiGroupInfo;

/// <summary>
/// <see cref="SysApiGroupInfoService"/> 系统接口分组服务
/// </summary>
public class SysApiGroupInfoService : ISysApiGroupInfoService, ITransientDependency
{
    private readonly ISqlSugarRepository<SysApiGroupInfoModel> _repository;

    public SysApiGroupInfoService(ISqlSugarRepository<SysApiGroupInfoModel> repository)
    {
        _repository = repository;
    }

    /// <summary>
    /// 接口分组分页选择器
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<PagedResult<ElSelectorOutput>> Selector(PagedInput input)
    {
        return await _repository.Entities.ToPagedListAsync(input, sl => new ElSelectorOutput {Label = sl.Name, Value = sl.Id});
    }

    /// <summary>
    /// 接口分组分页
    /// </summary>
    /// <param name="input"></param>
    /// <returns></returns>
    public async Task<PagedResult<QuerySysApiGroupInfoPagedOutput>> Paged(PagedInput input)
    {
        return await _repository.Entities.ToPagedListAsync<SysApiGroupInfoModel, QuerySysApiGroupInfoPagedOutput>(input);
    }

    /// <summary>
    /// 接口分组详情
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<QuerySysApiGroupInfoDetailOutput> Detail(long id)
    {
        return await _repository.Entities.Where(wh => wh.Id == id).Select<QuerySysApiGroupInfoDetailOutput>().FirstAsync();
    }

    /// <summary>
    /// 刷新接口分组和接口信息
    /// </summary>
    /// <returns></returns>
    public async Task Refresh()
    {
        // 读取数据库中的所有数据
        var sysApiGroupInfoList = await _repository.ToListAsync();
        var sysApiInfoList = await _repository.Queryable<SysApiInfoModel>().ToListAsync();
        var sysButtonList = await _repository.Queryable<SysButtonModel>().ToListAsync();

        // 读取 SwaggerSettings:GroupOpenApiInfos 节点的内容
        var swaggerGroupOpenApiInfos = FastContext.Configuration.GetSection("SwaggerSettings:GroupOpenApiInfos")
            .Get<List<IDictionary<string, object>>>();

        var addSysApiGroupInfoModelList = new List<SysApiGroupInfoModel>();
        var addSysApiInfoModelList = new List<SysApiInfoModel>();
        var addSysApiButtonModelList = new List<SysApiButtonModel>();

        var iDynamicApplicationType = typeof(IDynamicApplication);

        var allApplicationTypeList = FastContext.EffectiveTypes
            .Where(wh => iDynamicApplicationType.IsAssignableFrom(wh) && !wh.IsInterface).Select(sl =>
                new {ApiDescriptionSettings = sl.GetCustomAttribute<ApiDescriptionSettingsAttribute>(), Type = sl}).ToList();

        // 循环
        foreach (var groupOpenApiInfo in swaggerGroupOpenApiInfos)
        {
            var sysApiGroupInfoModel = sysApiGroupInfoList.FirstOrDefault(f => f.Name == groupOpenApiInfo["Group"].ToString());

            if (sysApiGroupInfoModel != null)
            {
                // 存在，则更新数据
                sysApiGroupInfoModel.Title = groupOpenApiInfo["Title"].ToString();
                sysApiGroupInfoModel.Description = groupOpenApiInfo["Description"].ToString();
                continue;
            }

            // 原来的数据中不存在
            sysApiGroupInfoModel =
                addSysApiGroupInfoModelList.FirstOrDefault(f => f.Name == groupOpenApiInfo["Group"].ToString());

            if (sysApiGroupInfoModel == null)
            {
                if (groupOpenApiInfo["Group"].ToString() == "Default")
                {
                    sysApiGroupInfoModel = new SysApiGroupInfoModel
                    {
                        Id = 10086,
                        Name = "Default",
                        Title = groupOpenApiInfo["Title"].ToString(),
                        Description = groupOpenApiInfo["Description"].ToString(),
                    };
                }
                else
                {
                    sysApiGroupInfoModel = new SysApiGroupInfoModel
                    {
                        Id = YitIdHelper.NextId(),
                        Name = groupOpenApiInfo["Group"].ToString(),
                        Title = groupOpenApiInfo["Title"].ToString(),
                        Description = groupOpenApiInfo["Description"].ToString(),
                    };
                }

                // 放入添加集合
                addSysApiGroupInfoModelList.Add(sysApiGroupInfoModel);
            }

            // 查找对应的接口信息
            var curApplicationTypeList = allApplicationTypeList.Where(wh => wh.ApiDescriptionSettings.Groups?.Length >= 1 &&
                                                                            wh.ApiDescriptionSettings.Groups.First() ==
                                                                            sysApiGroupInfoModel.Name);

            var httpMethodAttributeType = typeof(HttpMethodAttribute);
            foreach (var applicationType in curApplicationTypeList)
            {
                // 查找当前类型所有的方法
                foreach (var methodInfo in applicationType.Type.GetMethods())
                {
                    foreach (var attribute in methodInfo.GetCustomAttributes()
                                 .Where(wh => httpMethodAttributeType.IsInstanceOfType(wh)))
                    {
                        if (attribute is HttpMethodAttribute httpMethodAttribute)
                        {
                            var apiInfoAttribute = methodInfo.GetCustomAttribute<ApiInfoAttribute>();

                            var sysApiInfo = sysApiInfoList.FirstOrDefault(f => f.Url == httpMethodAttribute.Template);

                            if (sysApiInfo != null)
                            {
                                // 存在，则更新
                                sysApiInfo.ApiGroupId = sysApiGroupInfoModel.Id;
                                sysApiInfo.ModuleName = applicationType.ApiDescriptionSettings.Name;
                                sysApiInfo.Name = apiInfoAttribute?.ApiName;
                                sysApiInfo.Method = httpMethodAttribute.Method;
                                sysApiInfo.ApiAction = apiInfoAttribute?.ApiAction ?? HttpRequestActionEnum.None;
                            }
                            else
                            {
                                // 不存在，新增
                                sysApiInfo = new SysApiInfoModel
                                {
                                    Id = YitIdHelper.NextId(),
                                    ApiGroupId = sysApiGroupInfoModel.Id,
                                    ModuleName = applicationType.ApiDescriptionSettings.Name,
                                    Url = httpMethodAttribute.Template,
                                    Name = apiInfoAttribute?.ApiName,
                                    Method = httpMethodAttribute.Method,
                                    ApiAction = apiInfoAttribute?.ApiAction ?? HttpRequestActionEnum.None,
                                };
                                addSysApiInfoModelList.Add(sysApiInfo);
                            }

                            if (httpMethodAttribute.Tags.Any())
                            {
                                foreach (var tag in httpMethodAttribute.Tags)
                                {
                                    var sysButtonInfo = sysButtonList.FirstOrDefault(f => f.ButtonCode == tag);

                                    if (sysButtonInfo != null)
                                    {
                                        addSysApiButtonModelList.Add(new SysApiButtonModel
                                        {
                                            ApiId = sysApiInfo.Id, ButtonId = sysButtonInfo.Id
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        // 更新数据
        try
        {
            // 开启事务
            await _repository.Ado.BeginTranAsync();

            // 先删除所有的接口按钮关系
            await _repository.Deleteable<SysApiButtonModel>().ExecuteCommandAsync();

            // 更新接口分组数据
            await _repository.UpdateAsync(sysApiGroupInfoList);

            // 更新接口信息数据
            await _repository.Updateable(sysApiInfoList).ExecuteCommandAsync();

            // 添加接口分组数据
            await _repository.InsertAsync(addSysApiGroupInfoModelList);

            // 添加接口信息数据
            await _repository.Insertable(addSysApiInfoModelList).ExecuteCommandAsync();

            // 添加接口按钮关心数据
            await _repository.Insertable(addSysApiButtonModelList).ExecuteCommandAsync();

            // 提交事务
            await _repository.Ado.CommitTranAsync();
        }
        catch
        {
            // 回滚事务
            await _repository.Ado.RollbackTranAsync();
            throw;
        }
    }
}