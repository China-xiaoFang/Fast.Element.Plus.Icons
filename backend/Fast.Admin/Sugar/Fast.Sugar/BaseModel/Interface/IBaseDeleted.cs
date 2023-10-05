// ReSharper disable once CheckNamespace
namespace Fast.Sugar.BaseModel;

/// <summary>
/// IsDeleted 软删除 接口定义类
/// </summary>
public interface IBaseDeleted : IDbEntity
{
    /// <summary>
    /// 软删除
    /// </summary>
    bool IsDeleted { get; set; }
}