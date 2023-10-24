// Apache开源许可证
//
// 版权所有 © 2018-2023 1.8K仔
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

using Fast.SpecificationProcessor.App;
using Fast.SpecificationProcessor.SpecificationDocument.Builders;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Fast.SpecificationProcessor.SpecificationDocument.Extensions;

/// <summary>
/// <see cref="WebApplicationBuilder"/>规范化接口服务拓展类
/// </summary>
public static class SpecificationDocumentWebApplicationBuilderExtension
{
    /// <summary>
    /// 添加规范化文档服务
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="configure">自定义配置</param>
    /// <returns>服务集合</returns>
    public static WebApplicationBuilder AddSpecificationDocuments(this WebApplicationBuilder builder,
        Action<SwaggerGenOptions> configure = default)
    {
        builder.WebHost.ConfigureServices((hostContext, services) =>
        {
            // 存储配置对象 
            InternalApp.Configuration = hostContext.Configuration;
        });

        // 判断是否启用规范化文档
        if (InternalApp.Configuration.GetValue("AppSettings:InjectSpecificationDocument", true) != true)
            return builder;

#if !NET5_0
        builder.Services.AddEndpointsApiExplorer();
#endif

        // 添加Swagger生成器服务
        builder.Services.AddSwaggerGen(options => SpecificationDocumentBuilder.BuildGen(options, configure));

        return builder;
    }
}