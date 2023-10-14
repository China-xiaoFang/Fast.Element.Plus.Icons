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

using Fast.UAParser.Providers;

namespace Fast.UAParser.Internal;

/// <summary>
/// <see cref="ClientInfo"/> 用户代理客户端信息
/// </summary>
public class ClientInfo : IUAParserOutput
{
    /// <summary>
    /// 用户代理字符串，作为 UAParser 的输入
    /// </summary>
    public string String { get; }

    /// <summary>
    /// 从用户代理字符串解析得到的操作系统信息
    /// </summary>
    public OS OS { get; }

    /// <summary>
    /// 从用户代理字符串解析得到的设备信息
    /// </summary>
    public Device Device { get; }

    /// <summary>
    /// 从用户代理字符串解析得到的浏览器信息
    /// </summary>
    public UserAgent UA { get; }

    /// <summary>
    ///  使用用户代理字符串解析结果构造 ClientInfo 的实例
    /// </summary>
    /// <param name="inputString">用户代理字符串</param>
    /// <param name="os">操作系统信息</param>
    /// <param name="device">设备信息</param>
    /// <param name="userAgent">浏览器信息</param>
    public ClientInfo(string inputString, OS os, Device device, UserAgent userAgent)
    {
        String = inputString;
        OS = os;
        Device = device;
        UA = userAgent;
    }

    /// <summary>
    /// 用户代理客户端信息的可读描述
    /// </summary>
    /// <returns></returns>
    public override string ToString() => $"{OS} {Device} {UA}";
}