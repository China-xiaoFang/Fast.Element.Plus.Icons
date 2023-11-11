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

using System.Net.Http.Headers;
using Fast.NET;

namespace Fast.IaaS.Utils;

/// <summary>
/// <see cref="HttpClient"/> 远程请求工具类
/// </summary>
public static class RemoteRequestUtil
{
    /// <summary>
    /// Http Get 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="param"><see cref="object"/> Url拼接的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (T result, HttpResponseHeaders headers) Get<T>(string url, object param = null,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.Get<T>(url, param, headers, timeout);
    }

    /// <summary>
    /// Http Get 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="param"><see cref="object"/> Url拼接的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(T result, HttpResponseHeaders headers)> GetAsync<T>(string url, object param = null,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.GetAsync<T>(url, param, headers, timeout);
    }

    /// <summary>
    /// Http Get 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="param"><see cref="object"/> Url拼接的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (string result, HttpResponseHeaders headers) Get(string url, object param = null,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.Get(url, param, headers, timeout);
    }

    /// <summary>
    /// Http Get 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="param"><see cref="object"/> Url拼接的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(string result, HttpResponseHeaders headers)> GetAsync(string url, object param = null,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.GetAsync(url, param, headers, timeout);
    }

    /// <summary>
    /// Http Post 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (T result, HttpResponseHeaders headers) Post<T>(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.Post<T>(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Post 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(T result, HttpResponseHeaders headers)> PostAsync<T>(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.PostAsync<T>(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Post 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (string result, HttpResponseHeaders headers) Post(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.Post(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Post 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(string result, HttpResponseHeaders headers)> PostAsync(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.PostAsync(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Put 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (T result, HttpResponseHeaders headers) Put<T>(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.Put<T>(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Put 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(T result, HttpResponseHeaders headers)> PutAsync<T>(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.PutAsync<T>(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Put 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (string result, HttpResponseHeaders headers) Put(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.Put(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Put 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="data"><see cref="object"/> 写入请求Body中的参数</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(string result, HttpResponseHeaders headers)> PutAsync(string url, object data,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.PutAsync(url, data, headers, timeout);
    }

    /// <summary>
    /// Http Delete 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (T result, HttpResponseHeaders headers) Delete<T>(string url, IDictionary<string, string> headers = null,
        int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.Delete<T>(url, headers, timeout);
    }

    /// <summary>
    /// Http Delete 请求
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(T result, HttpResponseHeaders headers)> DeleteAsync<T>(string url,
        IDictionary<string, string> headers = null, int timeout = 60) where T : class
    {
        return InternalRemoteRequestUtil.DeleteAsync<T>(url, headers, timeout);
    }

    /// <summary>
    /// Http Delete 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static (string result, HttpResponseHeaders headers) Delete(string url, IDictionary<string, string> headers = null,
        int timeout = 60)
    {
        return InternalRemoteRequestUtil.Delete(url, headers, timeout);
    }

    /// <summary>
    /// Http Delete 请求
    /// </summary>
    /// <param name="url"><see cref="string"/> 请求的Url</param>
    /// <param name="headers"><see cref="IDictionary{TKey,TValue}"/> 请求头部信息</param>
    /// <param name="timeout"><see cref="int"/> 请求超时时间，默认60秒</param>
    /// <returns></returns>
    public static Task<(string result, HttpResponseHeaders headers)> DeleteAsync(string url,
        IDictionary<string, string> headers = null, int timeout = 60)
    {
        return InternalRemoteRequestUtil.DeleteAsync(url, headers, timeout);
    }
}