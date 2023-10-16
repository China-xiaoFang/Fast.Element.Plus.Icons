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
using System.Reflection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.RazorPages;

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="UnifyContext"/> 规范化结果上下文
/// </summary>
[SuppressSniffer]
internal static class UnifyContext
{
    /// <summary>
    /// 类型 UnifyProviderAttribute
    /// </summary>
    internal static Type UnifyProviderAttributeType { get; }

    /// <summary>
    /// 类型 NonUnifyAttribute
    /// </summary>
    internal static Type NonUnifyAttributeType { get; }

    /// <summary>
    /// 类型 IUnifyResultProvider
    /// </summary>
    internal static Type IUnifyResultProviderType { get; }

    /// <summary>
    /// 方法 规范化提供器 缓存
    /// </summary>
    internal static ConcurrentDictionary<string, Attribute> CacheMethodInfoUnifyProviderAttributes = new();

    /// <summary>
    /// 规范化结果提供器
    /// </summary>
    internal static ConcurrentDictionary<string, UnifyMetadata> UnifyProviders = new();

    static UnifyContext()
    {
        // 这里因为多个项目之间没有引用，所以使用了 名称 获取了类型

        UnifyProviderAttributeType = Type.GetType("Fast.UnifyResult.Attributes.UnifyProviderAttribute");

        if (UnifyProviderAttributeType == null)
        {
            throw new System.Exception("Unable to find Fast.UnifyResult.Attributes.UnifyProviderAttribute class.");
        }

        NonUnifyAttributeType = Type.GetType("Fast.UnifyResult.Attributes.NonUnifyAttribute");

        if (NonUnifyAttributeType == null)
        {
            throw new System.Exception("Unable to find Fast.UnifyResult.Attributes.NonUnifyAttribute class.");
        }

        IUnifyResultProviderType = Type.GetType("Fast.UnifyResult.IUnifyResultProvider");

        if (IUnifyResultProviderType == null)
        {
            throw new System.Exception("Unable to find Fast.UnifyResult.IUnifyResultProvider class.");
        }
    }

    /// <summary>
    /// 检查请求成功是否进行规范化处理
    /// </summary>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <param name="method"><see cref="MethodInfo"/></param>
    /// <param name="unifyResult"><see cref="object"/> 类型 IUnifyResultProvider</param>
    /// <param name="isWebRequest"><see cref="bool"/></param>
    /// <param name="nonUnifyAttributeType"><see cref="Type"/> 禁止规范化处理特性，不传默认 NonUnifyAttribute</param>
    /// <returns>返回 true 跳过处理，否则进行规范化处理</returns>
    /// <returns><see cref="bool"/></returns>
    internal static bool CheckSucceededNonUnify(HttpContext httpContext, MethodInfo method, out object unifyResult,
        bool isWebRequest = true, Type nonUnifyAttributeType = null)
    {
        // 解析规范化元数据
        var unityMetadata = GetMethodUnityMetadata(method);

        // 判断是否跳过规范化处理
        // ReSharper disable once ReplaceWithSingleAssignment.False
        var isSkip = false;

        // 判断返回类型是否包含了规范化处理的返回类型
        if (method.GetRealReturnType().HasImplementedRawGeneric(unityMetadata.ResultType))
        {
            isSkip = true;
        }

        nonUnifyAttributeType ??= NonUnifyAttributeType;

        // 这是不使用 method.GetCustomAttribute<NonUnifyAttribute>() != null 的原因是，避免直接继承了 NonUnifyAttribute 使用自定义的特性
        var producesResponseTypeAttributeType = typeof(ProducesResponseTypeAttribute);
        var iApiResponseMetadataProviderType = typeof(IApiResponseMetadataProvider);
        if (!isSkip && method.CustomAttributes.Any(a =>
                // 判断方法头部是否贴有 NonUnifyAttribute 特性
                nonUnifyAttributeType.IsAssignableFrom(a.AttributeType) ||
                // 判断方法头部是否贴有 原生的 HTTP 响应类型的特性 ProducesResponseTypeAttribute
                producesResponseTypeAttributeType.IsAssignableFrom(a.AttributeType) ||
                // 判断方法头部是否贴有 IApiResponseMetadataProvider 特性
                iApiResponseMetadataProviderType.IsAssignableFrom(a.AttributeType)))
        {
            isSkip = true;
        }

        // 判断方法所在的类是否贴有 NonUnifyAttribute 特性
        if (!isSkip && method.ReflectedType?.IsDefined(nonUnifyAttributeType, true) == true)
        {
            isSkip = true;
        }

        // 判断方法所属类型的程序集的名称以 "Microsoft.AspNetCore.OData" 
        if (!isSkip && method.ReflectedType?.Assembly?.GetName()?.Name?.StartsWith("Microsoft.AspNetCore.OData") == true)
        {
            isSkip = true;
        }

        // 判断是否为 Web 请求
        if (!isWebRequest)
        {
            unifyResult = null;
            return isSkip;
        }

        if (isSkip)
        {
            unifyResult = null;
        }
        else
        {
            unifyResult = httpContext.RequestServices.GetService(unityMetadata.ProviderType);
        }

        return unifyResult == null || isSkip;
    }

    /// <summary>
    /// 检查请求失败（验证失败、抛异常）是否进行规范化处理
    /// </summary>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <param name="method"><see cref="MethodInfo"/></param>
    /// <param name="unifyResult"><see cref="object"/> 类型 IUnifyResultProvider</param>
    /// <param name="nonUnifyAttributeType"><see cref="Type"/> 禁止规范化处理特性，不传默认 NonUnifyAttribute</param>
    /// <returns>返回 true 跳过处理，否则进行规范化处理</returns>
    /// <returns><see cref="bool"/></returns>
    internal static bool CheckFailedNonUnify(HttpContext httpContext, MethodInfo method, out object unifyResult,
        Type nonUnifyAttributeType = null)
    {
        // 解析规范化元数据
        var unityMetadata = GetMethodUnityMetadata(method);

        // 判断是否跳过规范化处理
        // ReSharper disable once ReplaceWithSingleAssignment.False
        var isSkip = false;

        // 这是不使用 method.GetCustomAttribute<NonUnifyAttribute>() != null 的原因是，避免直接继承了 NonUnifyAttribute 使用自定义的特性
        nonUnifyAttributeType ??= NonUnifyAttributeType;

        // 判断方法头部是否贴有 NonUnifyAttribute 特性
        if (method.CustomAttributes.Any(a => nonUnifyAttributeType.IsAssignableFrom(a.AttributeType)))
        {
            isSkip = true;
        }

        var producesResponseTypeAttributeType = typeof(ProducesResponseTypeAttribute);
        var iApiResponseMetadataProviderType = typeof(IApiResponseMetadataProvider);

        if (!isSkip && !method.CustomAttributes.Any(a =>
                // 判断方法头部是否贴有 原生的 HTTP 响应类型的特性 ProducesResponseTypeAttribute
                producesResponseTypeAttributeType.IsAssignableFrom(a.AttributeType) ||
                // 判断方法头部是否贴有 IApiResponseMetadataProvider 特性
                iApiResponseMetadataProviderType.IsAssignableFrom(a.AttributeType)) &&
            // 判断方法所在的类是否贴有 NonUnifyAttribute 特性
            method.ReflectedType?.IsDefined(nonUnifyAttributeType, true) == true)
        {
            isSkip = true;
        }

        // 判断方法所属类型的程序集的名称以 "Microsoft.AspNetCore.OData" 
        if (!isSkip && method.ReflectedType?.Assembly?.GetName()?.Name?.StartsWith("Microsoft.AspNetCore.OData") == true)
        {
            isSkip = true;
        }

        if (isSkip)
        {
            unifyResult = null;
        }
        else
        {
            unifyResult = httpContext.RequestServices.GetService(unityMetadata.ProviderType);
        }

        return unifyResult == null || isSkip;
    }

    /// <summary>
    /// 检查短路状态码（>=400）是否进行规范化处理
    /// </summary>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <param name="unifyResult"><see cref="object"/> 类型 IUnifyResultProvider</param>
    /// <param name="nonUnifyAttributeType"><see cref="Type"/> 禁止规范化处理特性，不传默认 NonUnifyAttribute</param>
    /// <returns>返回 true 跳过处理，否则进行规范化处理</returns>
    internal static bool CheckStatusCodeNonUnify(HttpContext httpContext, out object unifyResult,
        Type nonUnifyAttributeType = null)
    {
        // 获取终点路由特性
        var endpointFeature = httpContext.Features.Get<IEndpointFeature>();
        if (endpointFeature == null)
        {
            unifyResult = null;
            return true;
        }

        // 判断是否跳过规范化处理
        // ReSharper disable once ReplaceWithSingleAssignment.False
        var isSkip = false;

        nonUnifyAttributeType ??= NonUnifyAttributeType;

        // 判断终点路由是否存在 NonUnifyAttribute 特性
        if (httpContext.GetMetadata(nonUnifyAttributeType) != null)
        {
            isSkip = true;
        }

        // 判断终点路由是否存在 NonUnifyAttribute 特性
        if (!isSkip && endpointFeature?.Endpoint?.Metadata?.GetMetadata(nonUnifyAttributeType) != null)
        {
            isSkip = true;
        }

        // 判断请求头部是否包含 odata.metadata=
        if (!isSkip && httpContext?.Request?.Headers["accept"].ToString()
                ?.Contains("odata.metadata=", StringComparison.OrdinalIgnoreCase) == true)
        {
            isSkip = true;
        }

        // 判断请求头部是否包含 odata.streaming=
        if (!isSkip && httpContext?.Request?.Headers["accept"].ToString()
                ?.Contains("odata.streaming=", StringComparison.OrdinalIgnoreCase) == true)
        {
            isSkip = true;
        }

        if (isSkip)
        {
            unifyResult = null;
        }
        else
        {
            // 解析规范化元数据
            var unifyProviderAttribute = endpointFeature?.Endpoint?.Metadata?.GetType()
                ?.GetMethod(nameof(EndpointMetadataCollection.GetMetadata))?.MakeGenericMethod(UnifyProviderAttributeType)
                .Invoke(httpContext.GetEndpoint()?.Metadata, null);

            // 获取规范化提供器名称
            var unifyProviderName = UnifyProviderAttributeType.GetProperty("Name")?.GetValue(unifyProviderAttribute)?.ToString();

            if (UnifyProviders.TryGetValue(unifyProviderName ?? string.Empty, out var unityMetadata))
            {
                unifyResult = httpContext.RequestServices.GetService(unityMetadata.ProviderType);
            }
            else
            {
                unifyResult = null;
            }
        }

        return unifyResult == null || isSkip;
    }

    /// <summary>
    /// 检查是否是有效的结果（可进行规范化的结果）
    /// </summary>
    /// <param name="result"><see cref="IActionResult"/></param>
    /// <param name="data"><see cref="object"/></param>
    /// <returns></returns>
    internal static bool CheckValidResult(IActionResult result, out object data)
    {
        data = default;

        // 排除以下结果，跳过规范化处理
        var isDataResult = result switch
        {
            ViewResult => false,
            PartialViewResult => false,
            FileResult => false,
            ChallengeResult => false,
            SignInResult => false,
            SignOutResult => false,
            RedirectToPageResult => false,
            RedirectToRouteResult => false,
            RedirectResult => false,
            RedirectToActionResult => false,
            LocalRedirectResult => false,
            ForbidResult => false,
            ViewComponentResult => false,
            PageResult => false,
            NotFoundResult => false,
            NotFoundObjectResult => false,
            _ => true,
        };

        // 目前支持返回值 ActionResult
        if (isDataResult)
            data = result switch
            {
                // 处理内容结果
                ContentResult content => content.Content,
                // 处理对象结果
                ObjectResult obj => obj.Value,
                // 处理 JSON 对象
                JsonResult json => json.Value,
                _ => null,
            };

        return isDataResult;
    }

    /// <summary>
    /// 获取方法规范化元数据
    /// </summary>
    /// <param name="method"></param>
    /// <returns></returns>
    internal static UnifyMetadata GetMethodUnityMetadata(MethodInfo method)
    {
        if (method == default)
            return default;

        // 组装缓存字典的Key，这里使用 完全限定的类名(唯一的).方法名.参数名称
        var cacheKey = method.DeclaringType?.FullName + "." + method.Name + "(" +
                       string.Join(",", method.GetParameters().Select(p => p.ParameterType.FullName)) + ")";

        // 尝试从缓存中读取
        if (!CacheMethodInfoUnifyProviderAttributes.TryGetValue(cacheKey, out var unifyProviderAttribute))
        {
            // 不存在，再获取
            unifyProviderAttribute = method.GetFoundAttribute(UnifyProviderAttributeType, true);

            // 放入缓存中
            CacheMethodInfoUnifyProviderAttributes.AddOrUpdate(cacheKey, _ => unifyProviderAttribute,
                (_, _) => unifyProviderAttribute);
        }

        // 获取规范化提供器名称
        var unifyProviderName = UnifyProviderAttributeType.GetProperty("Name")?.GetValue(unifyProviderAttribute)?.ToString();

        // 获取元数据
        var isExists = UnifyProviders.TryGetValue(unifyProviderName ?? string.Empty, out var metadata);
        if (!isExists)
        {
            // 不存在则将默认的返回
            UnifyProviders.TryGetValue(string.Empty, out metadata);
        }

        return metadata;
    }
}

/// <summary>
/// <see cref="UnifyContext{TAttribute, TIProvider}"/> 规范化结果上下文
/// </summary>
/// <typeparam name="TAttribute">必须是 UnifyProviderAttribute 特性</typeparam>
/// <typeparam name="TIProvider">必须是 IUnifyResultProvider 接口</typeparam>
[SuppressSniffer]
internal static class UnifyContext<TAttribute, TIProvider> where TAttribute : Attribute where TIProvider : class
{
    /// <summary>
    /// 构造函数
    /// </summary>
    static UnifyContext()
    {
        // 泛型检测
        if (typeof(TAttribute).Name != "UnifyProviderAttribute")
        {
            throw new ArgumentException("The generic TAttribute must be the UnifyProviderAttribute attribute.");
        }

        if (typeof(TIProvider).Name != "IUnifyResultProvider")
        {
            throw new ArgumentException("The generic TIProvider must be an IUnifyResultProvider interface.");
        }
    }
}