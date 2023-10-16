using Fast.NET;
using Microsoft.AspNetCore.Http;

namespace Fast.CommunalResources.Extensions;

/// <summary>
/// <see cref="Exception"/> 拓展类
/// </summary>
[SuppressSniffer]
public static class ExceptionExtension
{
    /// <summary>
    /// 设置异常状态码
    /// </summary>
    /// <param name="exception"><see cref="AppException"/></param>
    /// <param name="statusCode"><see cref="int"/></param>
    /// <returns><see cref="AppException"/></returns>
    public static AppException StatusCode(this AppException exception, int statusCode = StatusCodes.Status500InternalServerError)
    {
        exception.StatusCode = statusCode;
        return exception;
    }

    /// <summary>
    /// 设置额外数据
    /// </summary>
    /// <param name="exception"><see cref="AppException"/></param>
    /// <param name="data"><see cref="object"/></param>
    /// <returns><see cref="AppException"/></returns>
    public static AppException WithData(this AppException exception, object data)
    {
        exception.Data = data;
        return exception;
    }

    /// <summary>
    /// 设置异常状态码
    /// </summary>
    /// <param name="exception"><see cref="UserFriendlyException"/></param>
    /// <param name="statusCode"><see cref="int"/></param>
    /// <returns><see cref="UserFriendlyException"/></returns>
    public static UserFriendlyException StatusCode(this UserFriendlyException exception,
        int statusCode = StatusCodes.Status400BadRequest)
    {
        exception.StatusCode = statusCode;
        return exception;
    }

    /// <summary>
    /// 设置额外数据
    /// </summary>
    /// <param name="exception"><see cref="UserFriendlyException"/></param>
    /// <param name="data"><see cref="object"/></param>
    /// <returns><see cref="UserFriendlyException"/></returns>
    public static UserFriendlyException WithData(this UserFriendlyException exception, object data)
    {
        exception.Data = data;
        return exception;
    }
}