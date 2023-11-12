using Fast.SpecificationProcessor.DynamicApplication;
using Fast.SqlSugar.Repository;
using Fast.Test.Api.Controllers;
using Fast.Test.Api.Entities;
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

    private readonly ISqlSugarRepository<Entity1> _testRepository1;
    private readonly ISqlSugarRepository<Entity2> _testRepository2;

    public AuthApplication(ILogger<WeatherForecastController> logger, ITestService testService,
        ISqlSugarRepository<Entity1> testRepository1, ISqlSugarRepository<Entity2> testRepository2)
    {
        Logger1 = logger;
        _testService = testService;
        _testRepository1 = testRepository1;
        _testRepository2 = testRepository2;
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