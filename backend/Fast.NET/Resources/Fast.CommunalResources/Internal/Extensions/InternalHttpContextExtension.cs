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

using Microsoft.AspNetCore.Http;
using System.Net.Http;

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="HttpContext"/> 内部拓展类
/// </summary>
internal static class InternalHttpContextExtension
{
    /// <summary>
    /// 判断是否是 WebSocket 请求
    /// </summary>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <returns><see cref="bool"/></returns>
    internal static bool IsWebSocketRequest(this HttpContext httpContext)
    {
        return httpContext.WebSockets.IsWebSocketRequest || httpContext.Request.Path == "/ws";
    }

    /// <summary>
    /// 获取 Action 特性
    /// </summary>
    /// <typeparam name="TAttribute"></typeparam>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <returns></returns>
    internal static TAttribute GetMetadata<TAttribute>(this HttpContext httpContext) where TAttribute : class
    {
        return httpContext.GetEndpoint()?.Metadata?.GetMetadata<TAttribute>();
    }

    /// <summary>
    /// 获取 Action 特性
    /// </summary>
    /// <param name="metadata"><see cref="EndpointMetadataCollection"/></param>
    /// <param name="attributeType"><see cref="Type"/></param>
    /// <returns><see cref="object"/></returns>
    internal static object GetMetadata(this EndpointMetadataCollection metadata, Type attributeType)
    {
        return metadata?.GetType()?.GetMethod(nameof(EndpointMetadataCollection.GetMetadata))
            ?.MakeGenericMethod(attributeType).Invoke(metadata, null);
    }

    /// <summary>
    /// 获取 Action 特性
    /// </summary>
    /// <param name="httpContext"><see cref="HttpContext"/></param>
    /// <param name="attributeType"><see cref="Type"/></param>
    /// <returns><see cref="object"/></returns>
    internal static object GetMetadata(this HttpContext httpContext, Type attributeType)
    {
        return httpContext.GetEndpoint()?.Metadata.GetMetadata(attributeType);
    }
}