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

using Fast.Admin.Core.Enum.Menus;
using Fast.Admin.Entity.System.Menu;
using Yitter.IdGenerator;

namespace Fast.Admin.Service.System.CodeFirst.DataSource;

/// <summary>
/// <see cref="SysMenuDataSource"/> 系统菜单数据源
/// <remarks>模块，菜单，按钮</remarks>
/// </summary>
internal class SysMenuDataSource
{
    /// <summary>
    /// 初始化的模块，菜单，按钮数据
    /// </summary>
    /// <param name="db"></param>
    public static async Task Involve(ISqlSugarClient db)
    {
        var sysModuleList = new List<SysModuleModel>();
        var sysMenuList = new List<SysMenuModel>();
        var sysButtonList = new List<SysButtonModel>();

        var sysModule1 = new SysModuleModel
        {
            Id = YitIdHelper.NextId(),
            ModuleName = "Fast",
            Color = "#9933FA",
            Icon = "local-logo",
            ViewType = ModuleViewTypeEnum.SuperAdmin,
            IsSystem = YesOrNotEnum.Y,
            Sort = 999,
            Status = CommonStatusEnum.Enable
        };
        sysModuleList.Add(sysModule1);

        var sysMenu1_1 = new SysMenuModel
        {
            Id = YitIdHelper.NextId(),
            MenuName = "接口管理",
            MenuTitle = "",
            ParentId = 0,
            ModuleId = sysModule1.Id,
            MenuType = MenuTypeEnum.Catalog,
            Icon = "fa-book",
            Router = null,
            Component = null,
            Link = null,
            Visible = YesOrNotEnum.Y,
            IsSystem = YesOrNotEnum.Y,
            Sort = 999,
            Status = CommonStatusEnum.Enable
        };
        sysMenuList.Add(sysMenu1_1);

        var sysMenu1_2 = new SysMenuModel
        {
            Id = YitIdHelper.NextId(),
            MenuName = "系统接口",
            MenuTitle = "系统接口",
            ParentId = sysMenu1_1.Id,
            ModuleId = sysModule1.Id,
            MenuType = MenuTypeEnum.Menu,
            Icon = "fa-book",
            Router = "/sysApiInfo/paged",
            Component = "sysApiInfo/index",
            Link = null,
            Visible = YesOrNotEnum.Y,
            IsSystem = YesOrNotEnum.Y,
            Sort = 998,
            Status = CommonStatusEnum.Enable
        };
        sysMenuList.Add(sysMenu1_2);

        var sysButton1_2_1 = new SysButtonModel
        {
            Id = YitIdHelper.NextId(),
            ButtonCode = "SysApiInfo:Paged",
            ButtonName = "系统接口查询",
            MenuId = sysMenu1_2.Id,
            Sort = 997
        };
        sysButtonList.Add(sysButton1_2_1);

        var sysButton1_2_2 = new SysButtonModel
        {
            Id = YitIdHelper.NextId(),
            ButtonCode = "SysApiInfo:Manage",
            ButtonName = "系统接口管理",
            MenuId = sysMenu1_2.Id,
            Sort = 996
        };
        sysButtonList.Add(sysButton1_2_2);

        var sysMenu1_3 = new SysMenuModel
        {
            Id = YitIdHelper.NextId(),
            MenuName = "接口文档",
            MenuTitle = "接口文档",
            ParentId = sysMenu1_1.Id,
            ModuleId = sysModule1.Id,
            MenuType = MenuTypeEnum.Internal,
            Icon = "fa-book",
            Router = null,
            Component = null,
            Link = "http://127.0.0.1:5001",
            Visible = YesOrNotEnum.Y,
            IsSystem = YesOrNotEnum.Y,
            Sort = 995,
            Status = CommonStatusEnum.Enable
        };
        sysMenuList.Add(sysMenu1_3);

        await db.Insertable(sysModuleList).ExecuteCommandAsync();
        await db.Insertable(sysMenuList).ExecuteCommandAsync();
        await db.Insertable(sysButtonList).ExecuteCommandAsync();
    }
}