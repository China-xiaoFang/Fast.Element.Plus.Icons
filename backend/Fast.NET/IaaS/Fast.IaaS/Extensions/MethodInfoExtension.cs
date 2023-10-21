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

using System.Reflection;
using Fast.NET;

namespace Fast.IaaS.Extensions;

/// <summary>
/// <see cref="MethodInfo"/> 拓展类
/// </summary>
[InternalSuppressSniffer]
public static class MethodInfoExtension
{
    /// <summary>
    /// 判断方法是否是异步
    /// </summary>
    /// <param name="methodInfo"><see cref="MemberInfo"/></param>
    /// <returns><see cref="bool"/></returns>
    public static bool IsAsync(this MethodInfo methodInfo)
    {
        return InternalMethodInfoExtension.IsAsync(methodInfo);
    }

    /// <summary>
    /// 获取方法真实返回类型
    /// </summary>
    /// <param name="methodInfo"><see cref="MethodInfo"/></param>
    /// <returns><see cref="Type"/></returns>
    public static Type GetRealReturnType(this MethodInfo methodInfo)
    {
        return InternalMethodInfoExtension.GetRealReturnType(methodInfo);
    }

    /// <summary>
    /// 查找方法指定特性，如果没找到则继续查找声明类
    /// </summary>
    /// <typeparam name="TAttribute"></typeparam>
    /// <param name="methodInfo"></param>
    /// <param name="inherit"></param>
    /// <returns></returns>
    public static TAttribute GetFoundAttribute<TAttribute>(this MethodInfo methodInfo, bool inherit) where TAttribute : Attribute
    {
        return InternalMethodInfoExtension.GetFoundAttribute<TAttribute>(methodInfo, inherit);
    }

    /// <summary>
    /// 查找方法指定特性，如果没找到则继续查找声明类
    /// </summary>
    /// <param name="methodInfo"></param>
    /// <param name="attributeType"></param>
    /// <param name="inherit"></param>
    /// <returns></returns>
    public static Attribute GetFoundAttribute(this MethodInfo methodInfo, Type attributeType, bool inherit)
    {
        return InternalMethodInfoExtension.GetFoundAttribute(methodInfo, attributeType, inherit);
    }

    /// <summary>
    /// 获取方法参数数量
    /// </summary>
    /// <param name="methodInfo"><see cref="MemberInfo"/></param>
    /// <returns><see cref="int"/></returns>
    public static int GetMethodParameterCount(this MethodInfo methodInfo)
    {
        return methodInfo.GetParameters().Length;
    }
}