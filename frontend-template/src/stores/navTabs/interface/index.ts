/**
 * Stores NavTabs 变量定义
 */
import { GetLoginModuleInfoDto } from "@/api/modules/get-login-module-info-dto";
import { GetLoginMenuInfoDto } from "@/api/modules/get-login-menu-info-dto";
import type { RouteLocationNormalized } from "vue-router";

/**
 * 导航选项卡
 * @interface NavTabs
 */
export interface NavTabs {
    /**
     * 激活tab的index
     * @type {number}
     * @memberof NavTabs
     */
    activeIndex: number;
    /**
     * 激活的tab
     * @type {RouteLocationNormalized}
     * @memberof NavTabs
     */
    activeTab: RouteLocationNormalized | null;
    /**
     * 激活的module
     * @type {GetLoginModuleInfoDto}
     * @memberof NavTabs
     */
    activeModule: GetLoginModuleInfoDto | null;
    /**
     * 导航栏tab列表
     * @type {Array<RouteLocationNormalized>}
     * @memberof NavTabs
     */
    navBarTabs: RouteLocationNormalized[];
    /**
     * 当前tab是否全屏
     * @type {boolean}
     * @memberof NavTabs
     */
    tabFullScreen: boolean;
    /**
     * 从后台加载到的当前选中模块下的菜单列表
     * @type {Array<GetLoginMenuInfoDto>}
     * @memberof NavTabs
     */
    tabs: GetLoginMenuInfoDto[];
}
