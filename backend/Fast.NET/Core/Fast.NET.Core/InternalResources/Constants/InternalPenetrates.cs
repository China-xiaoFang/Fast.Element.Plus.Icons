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

using System.Collections.Concurrent;
using System.Diagnostics;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="InternalPenetrates"/> 内部常量，公共方法配置类
/// </summary>
internal static class InternalPenetrates
{
    /// <summary>
    /// 应用有效程序集
    /// </summary>
    internal static readonly IEnumerable<Assembly> Assemblies;

    /// <summary>
    /// 有效程序集类型
    /// </summary>
    internal static readonly IEnumerable<Type> EffectiveTypes;

    /// <summary>
    /// ApiController 缓存
    /// </summary>
    internal static readonly ConcurrentDictionary<Type, bool> CacheIsApiController;

    /// <summary>
    /// 类型 IDynamicApplication
    /// <remarks>如果没有引用 Fast.DynamicApplication 则为空</remarks>
    /// </summary>
    internal static readonly Type IDynamicApplicationType;

    static InternalPenetrates()
    {
        // 加载程序集
        Assemblies = InternalAssemblyUtil.GetEntryAssembly();

        var internalSuppressSnifferAttributeType = typeof(InternalSuppressSnifferAttribute);

        // 获取有效的类型集合
        // ReSharper disable once PossibleMultipleEnumeration
        EffectiveTypes = Assemblies.SelectMany(s =>
            // 排除使用了 InternalSuppressSnifferAttribute 特性的类型
            InternalAssemblyUtil.GetAssemblyTypes(s, wh => !wh.IsDefined(internalSuppressSnifferAttributeType, false)));

        {
            // 判断是否安装了 DynamicApplication 程序集
            // ReSharper disable once PossibleMultipleEnumeration
            var assembly = Assemblies.FirstOrDefault(f => f.GetName().Name?.Equals("Fast.DynamicApplication") == true);
            if (assembly != null)
            {
                // 获取 IDynamicApplication 类型，方便使用
                IDynamicApplicationType = Reflect.GetType(assembly, "Fast.DynamicApplication.IDynamicApplication");
            }
        }

        CacheIsApiController = new ConcurrentDictionary<Type, bool>();
    }

    /// <summary>
    /// 获取当前线程 Id
    /// </summary>
    /// <returns></returns>
    internal static int GetThreadId()
    {
        return Environment.CurrentManagedThreadId;
    }

    /// <summary>
    /// 获取一段代码执行耗时
    /// </summary>
    /// <param name="action">委托</param>
    /// <returns><see cref="long"/></returns>
    internal static long GetExecutionTime(Action action)
    {
        // 空检查
        if (action == null)
            throw new ArgumentNullException(nameof(action));

        // 计算接口执行时间
        var timeOperation = Stopwatch.StartNew();
        action();
        timeOperation.Stop();
        return timeOperation.ElapsedMilliseconds;
    }

    /// <summary>
    /// 是否是 Api 控制器
    /// </summary>
    /// <param name="type"><see cref="Type"/></param>
    /// <returns><see cref="bool"/></returns>
    internal static bool IsApiController(Type type)
    {
        return CacheIsApiController.GetOrAdd(type, Function);

        // 本地静态方法
        static bool Function(Type type)
        {
            // 排除 OData 控制器
            if (type.Assembly.GetName().Name?.StartsWith("Microsoft.AspNetCore.OData") == true)
            {
                return false;
            }

            // 不能是非公开，基元类型，值类型，抽象类，接口，泛型类
            if (!type.IsPublic || type.IsPrimitive || type.IsValueType || type.IsAbstract || type.IsInterface ||
                type.IsGenericType)
            {
                return false;
            }

            // 继承 ControllerBase 或 实现 IDynamicApplication 的类型
            if ((!typeof(Controller).IsAssignableFrom(type) && typeof(ControllerBase).IsAssignableFrom(type)) ||
                IDynamicApplicationType?.IsAssignableFrom(type) == true)
            {
                return true;
            }

            return false;
        }
    }
}