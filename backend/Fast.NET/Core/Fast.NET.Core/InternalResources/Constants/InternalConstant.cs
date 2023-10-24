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

// ReSharper disable once CheckNamespace

namespace Fast.NET;

/// <summary>
/// <see cref="InternalConstant"/> 内部常用常量
/// </summary>
/// <exclude />
internal class InternalConstant
{
    /// <summary>
    /// 默认DateTime
    /// </summary>
    /// <exclude />
    public static DateTime DefaultTime => TimeZoneInfo.ConvertTime(new DateTime(1970, 1, 1), TimeZoneInfo.Local);

    /// <summary>
    /// 时间戳
    /// </summary>
    /// <exclude />
    //public static long TimeStamp => Convert.ToInt64((DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0)).TotalSeconds);
    public static long TimeStamp => DateTimeOffset.UtcNow.ToUnixTimeSeconds();

    /// <summary>
    /// Sql Server 最小时间
    /// </summary>
    /// <exclude />
    public static DateTime SqlServerMinTime => new(1753, 01, 01, 00, 00, 00);

    /// <summary>
    /// Sql Server 最大时间
    /// </summary>
    /// <exclude />
    public static DateTime SqlServerMaxTime => new(9999, 12, 31, 23, 59, 59);
}