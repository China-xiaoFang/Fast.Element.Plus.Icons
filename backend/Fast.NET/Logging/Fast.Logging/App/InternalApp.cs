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

using System.Diagnostics;
using Fast.NET;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Fast.Logging.App;

/// <summary>
/// <see cref="InternalApp"/> 内部 App 上下文
/// </summary>
internal static class InternalApp
{
    /// <summary>
    /// 应用服务
    /// </summary>
    internal static IServiceCollection InternalServices;

    /// <summary>
    /// 根服务
    /// </summary>
    internal static IServiceProvider RootServices;

    /// <summary>
    /// 配置对象
    /// </summary>
    internal static IConfiguration Configuration;

    /// <summary>
    /// 请求上下文
    /// </summary>
    internal static HttpContext HttpContext =>
        InternalPenetrates.CatchOrDefault(() => RootServices?.GetService<IHttpContextAccessor>()?.HttpContext);

    /// <summary>
    /// 获取Web主机环境
    /// </summary>
    internal static IWebHostEnvironment WebHostEnvironment;

    /// <summary>
    /// 获取当前请求 TraceId
    /// </summary>
    /// <returns></returns>
    internal static string GetTraceId()
    {
        return Activity.Current?.Id ?? (RootServices == null
            ? default
            : InternalPenetrates.CatchOrDefault(() => RootServices?.GetService<IHttpContextAccessor>()?.HttpContext)
                ?.TraceIdentifier);
    }

    /// <summary>
    /// 获取请求生存周期的服务
    /// </summary>
    /// <param name="serviceType"></param>
    /// <returns></returns>
    internal static object GetRequiredService(Type serviceType)
    {
        // 第一选择，判断是否是单例注册且单例服务不为空，如果是直接返回根服务提供器
        if (RootServices != null && InternalServices
                .Where(u => u.ServiceType == (serviceType.IsGenericType ? serviceType.GetGenericTypeDefinition() : serviceType))
                .Any(u => u.Lifetime == ServiceLifetime.Singleton))
        {
            return RootServices.GetRequiredService(serviceType);
        }
        // 第二选择是获取 HttpContext 对象的 RequestServices

        if (HttpContext != null)
        {
            return HttpContext.RequestServices.GetRequiredService(serviceType);
        }
        // 第三选择，创建新的作用域并返回服务提供器

        if (RootServices != null)
        {
            var scoped = RootServices.CreateScope();

            var result = scoped.ServiceProvider.GetRequiredService(serviceType);

            scoped.Dispose();

            return result;
        }

        {
            // 第四选择，构建新的服务对象（性能最差）
            var serviceProvider = InternalServices.BuildServiceProvider();

            var result = serviceProvider.GetRequiredService(serviceType);

            serviceProvider.Dispose();

            return result;
        }
    }

    /// <summary>
    /// 获取请求生存周期的服务
    /// </summary>
    /// <typeparam name="TService"></typeparam>
    /// <returns></returns>
    internal static TService GetRequiredService<TService>() where TService : class
    {
        var serviceType = typeof(TService);

        // 第一选择，判断是否是单例注册且单例服务不为空，如果是直接返回根服务提供器
        if (RootServices != null && InternalServices
                .Where(u => u.ServiceType == (serviceType.IsGenericType ? serviceType.GetGenericTypeDefinition() : serviceType))
                .Any(u => u.Lifetime == ServiceLifetime.Singleton))
        {
            return RootServices.GetRequiredService<TService>();
        }
        // 第二选择是获取 HttpContext 对象的 RequestServices

        if (HttpContext != null)
        {
            return HttpContext.RequestServices.GetRequiredService<TService>();
        }
        // 第三选择，创建新的作用域并返回服务提供器

        if (RootServices != null)
        {
            var scoped = RootServices.CreateScope();

            var result = scoped.ServiceProvider.GetRequiredService<TService>();

            scoped.Dispose();

            return result;
        }

        {
            // 第四选择，构建新的服务对象（性能最差）
            var serviceProvider = InternalServices.BuildServiceProvider();

            var result = serviceProvider.GetRequiredService<TService>();

            serviceProvider.Dispose();

            return result;
        }
    }
}