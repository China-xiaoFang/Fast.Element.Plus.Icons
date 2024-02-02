// Apache开源许可证
//
// 版权所有 © 2018-2024 1.8K仔
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

using System.Collections;
using System.Text.Json.Serialization;
using Fast.Admin.Core.Authentication.Dto;
using Fast.Admin.Core.Enum.Menus;

namespace Fast.Admin.Service.Authentication.Auth.Dto;

/// <summary>
/// <see cref="GetLoginUserInfoOutput"/> 获取登录用户信息输出
/// </summary>
public class GetLoginUserInfoOutput : AuthUserInfo
{
    /// <summary>
    /// 角色Id集合
    /// </summary>
    [JsonIgnore]
    public override List<long> RoleIdList { get; set; }

    /// <summary>
    /// 菜单编码集合
    /// </summary>
    [JsonIgnore]
    public override List<string> MenuCodeList { get; set; }

    /// <summary>
    /// 模块集合
    /// </summary>
    public List<GetLoginModuleInfoDto> ModuleList { get; set; }

    /// <summary>
    /// 菜单集合
    /// </summary>
    public List<GetLoginMenuInfoDto> MenuList { get; set; }

    /// <summary>
    /// <see cref="GetLoginModuleInfoDto"/> 获取登录模块信息
    /// </summary>
    public class GetLoginModuleInfoDto
    {
        /// <summary>
        /// 模块Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 模块名称
        /// </summary>
        public string ModuleName { get; set; }

        /// <summary>
        /// 颜色
        /// </summary>
        public string Color { get; set; }

        /// <summary>
        /// 图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 是否为默认打开的
        /// <remarks>只能存在一个</remarks>
        /// </summary>
        public YesOrNotEnum IsDefault { get; set; }
    }

    /// <summary>
    /// <see cref="GetLoginMenuInfoDto"/> 获取登录菜单信息
    /// </summary>
    public class GetLoginMenuInfoDto : ITreeNode<long>
    {
        /// <summary>
        /// 菜单Id
        /// </summary>
        public long Id { get; set; }

        /// <summary>
        /// 菜单编码
        /// </summary>
        public string MenuCode { get; set; }

        /// <summary>
        /// 菜单名称
        /// </summary>
        public string MenuName { get; set; }

        /// <summary>
        /// 菜单标题
        /// </summary>
        public string MenuTitle { get; set; }

        /// <summary>
        /// 父级Id
        /// </summary>
        public long ParentId { get; set; }

        /// <summary>
        /// 模块Id
        /// </summary>
        public long ModuleId { get; set; }

        /// <summary>
        /// 菜单类型
        /// </summary>
        public MenuTypeEnum MenuType { get; set; }

        /// <summary>
        /// 图标
        /// </summary>
        public string Icon { get; set; }

        /// <summary>
        /// 路由地址
        /// </summary>
        public string Router { get; set; }

        /// <summary>
        /// 组件地址
        /// </summary>
        public string Component { get; set; }

        /// <summary>
        /// 内链/外链地址
        /// </summary>
        public string Link { get; set; }

        /// <summary>
        /// 是否显示
        /// </summary>
        public YesOrNotEnum Visible { get; set; }

        /// <summary>
        /// 子节点
        /// </summary>
        public List<GetLoginMenuInfoDto> Children { get; set; }

        /// <summary>获取节点id</summary>
        /// <returns></returns>
        public long GetId()
        {
            return Id;
        }

        /// <summary>获取节点父id</summary>
        /// <returns></returns>
        public long GetPid()
        {
            return ParentId;
        }

        /// <summary>获取排序字段</summary>
        /// <returns></returns>
        public long Sort()
        {
            return 0;
        }

        /// <summary>设置Children</summary>
        /// <param name="children"></param>
        public void SetChildren(IList children)
        {
            Children = (List<GetLoginMenuInfoDto>) children;
        }
    }
}