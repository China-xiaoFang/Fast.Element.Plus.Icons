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

using Fast.UAParser.UAParser;

namespace Fast.UAParser.Internal;

/// <summary>
/// <see cref="OS"/> 用户代理操作系统信息
/// </summary>
public sealed class OS
{
    /// <summary>
    /// 
    /// </summary>
    /// <param name="family">操作系统的型号</param>
    /// <param name="major">操作系统的主要版本</param>
    /// <param name="minor">操作系统的次要版本</param>
    /// <param name="patch">操作系统的补丁版本</param>
    /// <param name="patchMinor">操作系统的次要补丁版本</param>
    public OS(string family, string major, string minor, string patch, string patchMinor)
    {
        Family = family;
        Major = major;
        Minor = minor;
        Patch = patch;
        PatchMinor = patchMinor;
    }

    /// <summary>
    /// 操作系统的型号
    /// </summary>
    public string Family { get; }

    /// <summary>
    /// 操作系统的主要版本，如果有的话
    /// </summary>
    public string Major { get; }

    /// <summary>
    /// 操作系统的次要版本，如果有的话
    /// </summary>
    public string Minor { get; }

    /// <summary>
    /// 操作系统的补丁版本，如果有的话
    /// </summary>
    public string Patch { get; }

    /// <summary>
    /// 操作系统的次要补丁版本，如果有的话
    /// </summary>
    public string PatchMinor { get; }

    /// <summary>
    /// 操作系统的可读描述
    /// </summary>
    /// <returns></returns>
    public override string ToString()
    {
        var str = VersionString.Format(Major, Minor, Patch, PatchMinor);
        return Family + (!string.IsNullOrEmpty(str) ? " " + str : null);
    }
}