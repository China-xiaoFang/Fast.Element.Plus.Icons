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

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="AppException"/> 应用程序异常类
/// </summary>
public class AppException : Exception
{
    /// <summary>
    /// <inheritdoc cref="AppException" />
    /// </summary>
    public AppException() : base("Internal Server Error.")
    {
        ErrorCode = StatusCodes.Status500InternalServerError;
    }

    /// <summary>
    /// <inheritdoc cref="AppException" />
    /// </summary>
    /// <param name="message">异常信息</param>
    public AppException(string message) : base(message ?? "Internal Server Error.")
    {
        ErrorMessage = message;
        ErrorCode = StatusCodes.Status500InternalServerError;
    }

    /// <summary>
    /// <inheritdoc cref="AppException" />
    /// </summary>
    /// <param name="message">异常信息</param>
    /// <param name="errorCode">错误编码</param>
    public AppException(string message, object errorCode) : base(message ?? "Internal Server Error.")
    {
        ErrorMessage = message;
        ErrorCode = errorCode;
    }

    /// <summary>
    /// <inheritdoc cref="AppException" />
    /// </summary>
    /// <param name="message">异常信息</param>
    /// <param name="innerException">内部异常</param>
    public AppException(string message, Exception innerException) : base(message ?? "Internal Server Error.", innerException)
    {
        ErrorMessage = message;
        ErrorCode = StatusCodes.Status500InternalServerError;
    }

    /// <summary>
    /// <inheritdoc cref="AppException" />
    /// </summary>
    /// <param name="message">异常信息</param>
    /// <param name="errorCode">错误编码</param>
    /// <param name="innerException">内部异常</param>
    public AppException(string message, object errorCode, Exception innerException) : base(message ?? "Internal Server Error.",
        innerException)
    {
        ErrorMessage = message;
        ErrorCode = errorCode;
    }

    /// <summary>
    /// 错误码
    /// </summary>
    public object ErrorCode { get; set; }

    /// <summary>
    /// 错误码（没被复写过的 ErrorCode ）
    /// </summary>
    public object OriginErrorCode { get; set; }

    /// <summary>
    /// 错误消息（支持 Object 对象）
    /// </summary>
    public object ErrorMessage { get; set; }

    /// <summary>
    /// 状态码
    /// </summary>
    public int StatusCode { get; set; } = StatusCodes.Status400BadRequest;

    /// <summary>
    /// 额外数据
    /// </summary>
    public new object Data { get; set; }
}