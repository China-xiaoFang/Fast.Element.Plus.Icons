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

using Fast.Logging.App;
using Fast.Logging.Implantation.Console;
using Fast.Logging.Implantation.File;
using Fast.Logging.Templates;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Fast.Logging.Extensions;

/// <summary>
/// <see cref="WebApplicationBuilder"/> 日志服务拓展类
/// </summary>
public static class LoggingWebApplicationBuilderExtension
{
    /// <summary>
    /// 添加控制台默认格式化器
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="configure">添加更多配置</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddConsoleFormatter(this WebApplicationBuilder builder,
        Action<ConsoleFormatterExtendOptions> configure = default)
    {
        builder.InitializeLogging();

        builder.Services.AddLogging(options => options.AddConsoleFormatter(configure));

        return builder;
    }

    /// <summary>
    /// 添加文件日志服务
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="fileName">日志文件完整路径或文件名，推荐 .log 作为拓展名</param>
    /// <param name="append">追加到已存在日志文件或覆盖它们</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddFileLogging(this WebApplicationBuilder builder, string fileName, bool append = true)
    {
        builder.InitializeLogging();

        builder.Services.AddLogging(options => options.AddFile(fileName, append));

        return builder;
    }

    /// <summary>
    /// 添加文件日志服务
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="fileName">日志文件完整路径或文件名，推荐 .log 作为拓展名</param>
    /// <param name="configure">文件日志记录器配置选项委托</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddFileLogging(this WebApplicationBuilder builder, string fileName,
        Action<FileLoggerOptions> configure)
    {
        builder.InitializeLogging();

        builder.Services.AddLogging(options => options.AddFile(fileName, configure));

        return builder;
    }

    /// <summary>
    /// 添加文件日志服务（从配置文件中读取配置）
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="configure">文件日志记录器配置选项委托</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddFileLogging(this WebApplicationBuilder builder,
        Action<FileLoggerOptions> configure = default)
    {
        builder.InitializeLogging();

        builder.Services.AddLogging(options => options.AddFile(configure));

        return builder;
    }

    /// <summary>
    /// 添加文件日志服务（从配置文件中读取配置）
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="configurationKey">获取配置文件对应的 Key</param>
    /// <param name="configure">文件日志记录器配置选项委托</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddFileLogging(this WebApplicationBuilder builder, Func<string> configurationKey,
        Action<FileLoggerOptions> configure = default)
    {
        builder.InitializeLogging();

        builder.Services.AddLogging(options => options.AddFile(configurationKey, configure));

        return builder;
    }

    /// <summary>
    /// 添加日志服务
    /// 197001/01/24.log
    /// </summary>
    /// <param name="builder"><see cref="WebApplicationBuilder"/></param>
    /// <param name="fileSizeLimitBytes">日志文件大小 控制每一个日志文件最大存储大小，默认无限制，单位是 B，也就是 1024 才等于 1KB</param>
    /// <returns><see cref="WebApplicationBuilder"/></returns>
    public static WebApplicationBuilder AddLogging(this WebApplicationBuilder builder, long fileSizeLimitBytes = 10 * 1024 * 1024)
    {
        builder.InitializeLogging();

        const string monthFormat = "{0:yyyy}{0:MM}";

        const string dayFormat = "{0:dd}";

        const string hourFormat = "{0:HH}";

        const string logFileFormat = $"{monthFormat}/{dayFormat}/{hourFormat}";

        builder.Services.AddLogging(loggingBuilder =>
        {
            loggingBuilder.AddFile($"logs/error/{logFileFormat}.log",
                options => { SetLogOptions(options, LogLevel.Error, fileSizeLimitBytes); });
            // Environments other than the development environment are not logged.
            if (!InternalApp.WebHostEnvironment.IsDevelopment())
                return;
            loggingBuilder.AddFile($"logs/info/{logFileFormat}.log",
                options => { SetLogOptions(options, LogLevel.Information, fileSizeLimitBytes); });
            loggingBuilder.AddFile($"logs/warn/{logFileFormat}.log",
                options => { SetLogOptions(options, LogLevel.Warning, fileSizeLimitBytes); });
        });

        return builder;
    }

    /// <summary>
    /// 配置日志
    /// </summary>
    /// <param name="options"></param>
    /// <param name="logLevel"></param>
    /// <param name="fileSizeLimitBytes">日志文件大小 控制每一个日志文件最大存储大小，默认无限制，单位是 B，也就是 1024 才等于 1KB</param>
    private static void SetLogOptions(FileLoggerOptions options, LogLevel logLevel, long fileSizeLimitBytes)
    {
        options.WithTraceId = true;
        options.WithStackFrame = true;
        options.FileNameRule = fileName => string.Format(fileName, DateTime.Now, logLevel.ToString());
        options.WriteFilter = logMsg => logMsg.LogLevel == logLevel;
        options.FileSizeLimitBytes = fileSizeLimitBytes;
        options.MessageFormat = logMsg =>
        {
            var msg = new List<string>
            {
                $"{logMsg.LogName}",
                $"##日志时间## {DateTime.Now:yyyy-MM-dd HH:mm:ss}",
                $"##日志等级## {logLevel}",
                $"##日志内容## {logMsg.Message}",
            };
            if (!string.IsNullOrEmpty(logMsg.Exception?.ToString()))
                msg.Add($"##异常信息## {logMsg.Exception}");

            // Generating template strings.
            var template = TP.Wrapper("WMS.Admin", "", msg.ToArray());
            return template;
        };
    }

    /// <summary>
    /// 初始化日志
    /// </summary>
    /// <param name="builder"></param>
    private static void InitializeLogging(this WebApplicationBuilder builder)
    {
        InternalApp.WebHostEnvironment = builder.Environment;

        builder.WebHost.ConfigureServices((hostContext, services) =>
        {
            // 存储配置对象 
            InternalApp.Configuration = hostContext.Configuration;

            // 存储服务提供器
            InternalApp.InternalServices = services;
        });
    }
}