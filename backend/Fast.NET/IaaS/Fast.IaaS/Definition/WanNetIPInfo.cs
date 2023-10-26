namespace Fast.IaaS.Definition;

/// <summary>
/// <see cref="WanNetIPInfo"/> 公网IP信息
/// </summary>
public class WanNetIPInfo
{
    /// <summary>
    /// Ip地址
    /// </summary>
    public string Ip { get; set; }

    /// <summary>
    /// 省份
    /// </summary>
    public string Province { get; set; }

    /// <summary>
    /// 省份邮政编码
    /// </summary>
    public string ProvinceZipCode { get; set; }

    /// <summary>
    /// 城市
    /// </summary>
    public string City { get; set; }

    /// <summary>
    /// 城市邮政编码
    /// </summary>
    public string CityZipCode { get; set; }

    /// <summary>
    /// 地理信息
    /// </summary>
    public string Address { get; set; }

    /// <summary>
    /// 运营商
    /// </summary>
    public string Operator => Address[(Province.Length + City.Length)..].Trim();
}