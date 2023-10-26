namespace Fast.IaaS.Definition;

/// <summary>
/// <see cref="UserAgentInfo"/> 用户代理信息
/// </summary>
public class UserAgentInfo
{
    /// <summary>
    /// 设备
    /// </summary>
    public string Device { get; set; }

    /// <summary>
    /// 操作系统（版本）
    /// </summary>
    public string OS { get; set; }

    /// <summary>
    /// 浏览器（版本）
    /// </summary>
    public string Browser { get; set; }
}