import { MenuTypeEnum } from "@/api/enums/menu-type-enum";
import { YesOrNotEnum } from "@/api/enums/yes-or-not-enum";

/**
 * Fast.Admin.Service.Authentication.Auth.Dto.GetLoginUserInfoOutput.GetLoginMenuInfoDto 获取登录菜单信息
 *
 * @export
 * @interface GetLoginMenuInfoDto
 */
export interface GetLoginMenuInfoDto {
    /**
     * 菜单Id
     *
     * @type {number}
     * @memberof GetLoginMenuInfoDto
     */
    id?: number;

    /**
     * 菜单编码
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    menuCode?: string | null;

    /**
     * 菜单名称
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    menuName?: string | null;

    /**
     * 菜单标题
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    menuTitle?: string | null;

    /**
     * 父级Id
     *
     * @type {number}
     * @memberof GetLoginMenuInfoDto
     */
    parentId?: number;

    /**
     * 模块Id
     *
     * @type {number}
     * @memberof GetLoginMenuInfoDto
     */
    moduleId?: number;

    /**
     * @type {MenuTypeEnum}
     * @memberof GetLoginMenuInfoDto
     */
    menuType?: MenuTypeEnum;

    /**
     * 图标
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    icon?: string | null;

    /**
     * 路由地址
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    router?: string | null;

    /**
     * 组件地址
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    component?: string | null;

    /**
     * 内链/外链地址
     *
     * @type {string}
     * @memberof GetLoginMenuInfoDto
     */
    link?: string | null;

    /**
     * @type {YesOrNotEnum}
     * @memberof GetLoginMenuInfoDto
     */
    visible?: YesOrNotEnum;

    /**
     * 子节点
     *
     * @type {Array<GetLoginMenuInfoDto>}
     * @memberof GetLoginMenuInfoDto
     */
    children?: Array<GetLoginMenuInfoDto> | null;
}
