﻿using Fast.Core.Cache.Enum;

namespace Fast.Core.Cache.Options;

/// <summary>
/// 缓存配置
/// </summary>
public class CacheOptions
{
    /// <summary>
    /// 缓存类型
    /// </summary>
    public CacheTypeEnum CacheType { get; set; }

    /// <summary>
    /// Redis配置
    /// </summary>
    public string RedisConnectionString { get; set; }
}