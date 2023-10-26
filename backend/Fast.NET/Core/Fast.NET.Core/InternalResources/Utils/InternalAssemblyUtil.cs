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


using System.Reflection;
using Microsoft.Extensions.DependencyModel;

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="Assembly"/> 工具类
/// </summary>
/// <exclude />
internal static class InternalAssemblyUtil
{
    /// <summary>
    /// 获取入口程序集
    /// </summary>
    /// <param name="referenced"><see cref="bool"/> 是否包含引用的，默认为 true</param>
    /// <returns><see cref="IEnumerable{Assembly}"/></returns>
    /// <exclude />
    internal static IEnumerable<Assembly> GetEntryAssembly(bool referenced = true)
    {
        var assemblies = new List<Assembly>();
        // 获取入口程序集
        var entryAssembly = Assembly.GetEntryAssembly();

        // 判断是否包含引用的，不包含直接返回
        if (!referenced)
        {
            return new List<Assembly> {entryAssembly};
        }

        // 需排除的程序集后缀
        var excludeAssemblyNames = new[] {"Database.Migrations"};

        // 非独立发布/非单文件发布
        if (!string.IsNullOrWhiteSpace(entryAssembly?.Location))
        {
            // TODO：这里引用了一个包，想办法手写去掉
            // 读取项目程序集 或 Fast 官方发布的包，或手动添加引用的dll，或配置特定的包前缀
            return DependencyContext.Default?.RuntimeLibraries
                .Where(wh => (wh.Type == "project" && !excludeAssemblyNames.Any(a => wh.Name.EndsWith(a))) ||
                             (wh.Type == "package" && (wh.Name.StartsWith(nameof(Fast)))))
                .Select(sl => Reflect.GetAssembly(sl.Name));
        }

        // 独立发布/单文件发布
        throw new Exception("暂时不支持单文件或独立发布！");
    }

    /// <summary>
    /// 获取程序集中所有类型
    /// </summary>
    /// <remarks>这里默认获取所有 Public 声明的</remarks>
    /// <param name="assembly"><see cref="Assembly"/> 程序集</param>
    /// <param name="typeFilter"><see cref="Func{TResult}"/> 类型过滤条件</param>
    /// <returns></returns>
    /// <exclude />
    internal static IEnumerable<Type> GetAssemblyTypes(Assembly assembly, Func<Type, bool> typeFilter = null)
    {
        var types = Array.Empty<Type>();

        try
        {
            types = assembly.GetTypes();
        }
        catch
        {
            Console.WriteLine($"Error load `{assembly.FullName}` assembly.");
        }

        return types.Where(wh => wh.IsPublic && (typeFilter == null || typeFilter(wh)));
    }
}