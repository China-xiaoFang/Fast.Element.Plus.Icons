using Fast.DependencyInjection;

namespace Fast.Test.Api.Services;

public class TestService : ITestService, ITransientDependency
{
    /// <summary>
    /// 测试
    /// </summary>
    /// <returns></returns>
    public string Test()
    {
        return "Hello World!";
    }
}