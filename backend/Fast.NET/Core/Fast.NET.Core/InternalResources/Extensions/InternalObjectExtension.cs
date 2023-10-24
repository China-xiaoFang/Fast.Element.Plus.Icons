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

using System.ComponentModel;

// ReSharper disable once CheckNamespace
namespace Fast.NET;

/// <summary>
/// <see cref="object"/> 内部拓展类
/// </summary>
internal static class InternalObjectExtension
{
    /// <summary>
    /// 将一个对象转换为指定类型
    /// </summary>
    /// <param name="obj">待转换的对象</param>
    /// <param name="type">目标类型</param>
    /// <returns>转换后的对象</returns>
    internal static object ChangeType(this object obj, Type type)
    {
        if (type == null)
            return obj;
        if (type == typeof(string))
            return obj?.ToString();
        if (type == typeof(Guid) && obj != null)
            return Guid.Parse(obj.ToString());
        if (type == typeof(bool) && obj != null && obj is not bool)
        {
            var objStr = obj.ToString()?.ToLower();
            if (objStr == "1" || objStr == "true" || objStr == "yes" || objStr == "on")
                return true;
            return false;
        }

        if (obj == null)
            return type.IsValueType ? Activator.CreateInstance(type) : null;

        var underlyingType = Nullable.GetUnderlyingType(type);
        if (type.IsInstanceOfType(obj))
            return obj;
        if ((underlyingType ?? type).IsEnum)
        {
            if (underlyingType != null && string.IsNullOrWhiteSpace(obj.ToString()))
                return null;
            return Enum.Parse(underlyingType ?? type, obj.ToString());
        }
        // 处理DateTime -> DateTimeOffset 类型

        if (obj is DateTime dateTime && (underlyingType ?? type) == typeof(DateTimeOffset))
        {
            return DateTime.SpecifyKind(dateTime, DateTimeKind.Local);
        }
        // 处理 DateTimeOffset -> DateTime 类型

        if (obj is DateTimeOffset dateTimeOffset && (underlyingType ?? type) == typeof(DateTime))
        {
            return dateTimeOffset.ParseToDateTime();
        }

        if (typeof(IConvertible).IsAssignableFrom(underlyingType ?? type))
        {
            try
            {
                return Convert.ChangeType(obj, underlyingType ?? type, null);
            }
            catch
            {
                return underlyingType == null ? Activator.CreateInstance(type) : null;
            }
        }

        var converter = TypeDescriptor.GetConverter(type);
        if (converter.CanConvertFrom(obj.GetType()))
            return converter.ConvertFrom(obj);

        var constructor = type.GetConstructor(Type.EmptyTypes);
        if (constructor != null)
        {
            var o = constructor.Invoke(null);
            var propertyArr = type.GetProperties();
            var oldType = obj.GetType();

            foreach (var property in propertyArr)
            {
                var p = oldType.GetProperty(property.Name);
                if (property.CanWrite && p != null && p.CanRead)
                {
                    property.SetValue(o, ChangeType(p.GetValue(obj, null), property.PropertyType), null);
                }
            }

            return o;
        }

        return obj;
    }
}