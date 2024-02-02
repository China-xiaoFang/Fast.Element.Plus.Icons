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

using Fast.Admin.Core.Authentication;
using Fast.Admin.Entity.System.Menu;
using Fast.Admin.Entity.Tenant.ButtonScope;
using Fast.Admin.Entity.Tenant.MenuScope;
using Fast.Admin.Entity.Tenant.Organization;
using Fast.Admin.Service.Authentication.Auth.Dto;
using Mapster;

namespace Fast.Admin.Service.Authentication.Auth;

/// <summary>
/// <see cref="AuthService"/> 授权服务
/// </summary>
public class AuthService : IAuthService, ITransientDependency
{
    private readonly IUser _user;
    private readonly ISqlSugarClient _repository;
    private readonly ISqlSugarRepository<TenUserModel> _tenRepository;

    public AuthService(IUser user, ISqlSugarClient repository, ISqlSugarRepository<TenUserModel> tenRepository)
    {
        _user = user;
        _repository = repository;
        _tenRepository = tenRepository;
    }

    /// <summary>
    /// 获取登录用户信息
    /// </summary>
    /// <returns></returns>
    /// <exception cref="UserFriendlyException"></exception>
    public async Task<GetLoginUserInfoOutput> GetLoginUserInfo()
    {
        var result = _user.Adapt<GetLoginUserInfoOutput>();

        var moduleQueryable = _repository.Queryable<SysModuleModel>().Where(wh => wh.Status == CommonStatusEnum.Enable);

        // 带权限的菜单Id
        var authMenuIdList = new List<long>();
        // 带权限的按钮Id
        var authButtonIdList = new List<long>();

        // 判断是否为超级管理员
        if (_user.IsSuperAdmin)
        {
            moduleQueryable = moduleQueryable.Where(wh =>
                wh.ViewType == ModuleViewTypeEnum.SuperAdmin || wh.ViewType == ModuleViewTypeEnum.All);
        }
        // 判断是否为系统管理员
        else if (_user.IsSystemAdmin)
        {
            moduleQueryable = moduleQueryable.Where(wh =>
                wh.ViewType == ModuleViewTypeEnum.SystemAdmin || wh.ViewType == ModuleViewTypeEnum.All);
        }
        else
        {
            moduleQueryable = moduleQueryable.Where(wh => wh.ViewType == ModuleViewTypeEnum.All);

            // 获取当前登录用户的角色
            var roleList = await _tenRepository.Queryable<TenUserRoleModel>().Includes(e => e.TenRole)
                .Where(wh => wh.UserId == _user.UserId).ToListAsync();

            result.RoleIdList = roleList.Select(sl => sl.RoleId).ToList();
            result.RoleNameList = roleList.Select(sl => sl.TenRole.RoleName).ToList();

            // 获取当前用户和角色对应的菜单权限Id
            authMenuIdList = (await _tenRepository.UnionAll(
                _tenRepository.Queryable<TenUserMenuModel>().Where(wh => wh.UserId == _user.UserId)
                    .Select(sl => new SysMenuModel {Id = sl.MenuId}),
                _tenRepository.Queryable<TenRoleMenuModel>().Where(wh => result.RoleIdList.Contains(wh.RoleId))
                    .Select(sl => new SysMenuModel {Id = sl.MenuId})).Distinct().ToListAsync()).Select(sl => sl.Id).ToList();

            // 获取当前用户和角色对应的按钮权限Id
            authButtonIdList = (await _tenRepository.UnionAll(
                _tenRepository.Queryable<TenUserButtonModel>().Where(wh => wh.UserId == _user.UserId)
                    .Select(sl => new SysButtonModel {Id = sl.ButtonId}),
                _tenRepository.Queryable<TenRoleButtonModel>().Where(wh => result.RoleIdList.Contains(wh.RoleId))
                    .Select(sl => new SysButtonModel {Id = sl.ButtonId})).Distinct().ToListAsync()).Select(sl => sl.Id).ToList();
        }

        // TODO：权限判断

        var moduleList = await moduleQueryable.OrderByDescending(ob => ob.Sort)
            .Select<GetLoginUserInfoOutput.GetLoginModuleInfoDto>().ToListAsync();

        var moduleIdList = moduleList.Select(sl => sl.Id).ToList();

        // 查询当前模块下的菜单
        var menuQueryable = _repository.Queryable<SysMenuModel>()
            .Where(wh => wh.Status == CommonStatusEnum.Enable && moduleIdList.Contains(wh.ModuleId));
        if (authMenuIdList.Any())
        {
            menuQueryable = menuQueryable.Where(wh => authMenuIdList.Contains(wh.Id));
        }

        var menuList = await menuQueryable.OrderByDescending(ob => ob.Sort).Select<GetLoginUserInfoOutput.GetLoginMenuInfoDto>()
            .ToListAsync();

        result.MenuCodeList = menuList.Select(sl => sl.MenuCode).ToList();

        // 查询按钮编码
        var buttonQueryable = _repository.Queryable<SysButtonModel>();

        if (authButtonIdList.Any())
        {
            buttonQueryable = buttonQueryable.Where(wh => authButtonIdList.Contains(wh.Id));
        }

        result.ButtonCodeList = await buttonQueryable.OrderByDescending(ob => ob.Sort).Select(sl => sl.ButtonCode).ToListAsync();

        // 更新缓存
        await _user.Refresh(result);

        // 放入模块，模块的Id必须存在菜单中
        var menuModuleIdList = menuList.Select(sl => sl.ModuleId).Distinct().ToList();
        result.ModuleList = moduleList.Where(wh => menuModuleIdList.Contains(wh.Id)).ToList();

        var resMenuList = menuList.Adapt<List<GetLoginUserInfoOutput.GetLoginMenuInfoDto>>();

        // 放入菜单，组装树形
        result.MenuList = new TreeBuildUtil<GetLoginUserInfoOutput.GetLoginMenuInfoDto, long>().Build(resMenuList);

        return result;
    }
}