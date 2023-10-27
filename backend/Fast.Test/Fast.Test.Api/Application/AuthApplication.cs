﻿using Fast.SpecificationProcessor.DynamicApplication;
using Fast.Test.Api.Controllers;
using Fast.Test.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Fast.Test.Api.Application;

/// <summary>
/// 授权接口
/// </summary>
[ApiDescriptionSettings(Name = "auth", Order = 1)]
public class AuthApplication : IDynamicApplication
{
    private readonly ITestService _testService;

    public ILogger<WeatherForecastController> Logger1 { get; }

    public AuthApplication(ILogger<WeatherForecastController> logger, ITestService testService)
    {
        Logger1 = logger;
        _testService = testService;
    }

    /// <summary>
    /// 获取登录用户信息
    /// </summary>
    /// <returns></returns>
    [HttpGet("/getLoginUser")]
    public string Get()
    {
        return "我是Get请求";
    }

    /// <summary>
    /// 退出登录
    /// </summary>
    /// <returns></returns>
    [HttpPost("/logout")]
    public string Post()
    {
        return "我是Post请求";
    }

    /// <summary>
    /// 测试
    /// </summary>
    /// <returns></returns>
    [HttpGet("/test")]
    public async Task<string> Test()
    {
        Console.WriteLine("我执行了-----------");
        return "1";
    }
}