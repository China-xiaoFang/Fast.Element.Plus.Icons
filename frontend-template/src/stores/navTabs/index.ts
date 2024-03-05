import { defineStore } from "pinia";
import { reactive } from "vue";
import { i18n } from "@/lang";
import { STORE_NAV_TABS } from "@/stores/constant";
import type { NavTabs } from "./interface";
import type { RouteLocationNormalized } from "vue-router";
import { isEmpty } from "lodash-es";
import { MenuTypeEnum } from "@/api/enums/menu-type-enum";
import { GetLoginMenuInfoDto } from "@/api/services/auth/models/get-login-menu-info-dto";

export const useNavTabs = defineStore(
    "navTabs",
    () => {
        /**
         * 固定的tab
         */
        const affixTabs: RouteLocationNormalized[] = [
            {
                name: "Dashboard",
                path: "/dashboard",
                meta: {
                    title: "首页",
                    keepAlive: true,
                    affix: true,
                    menuId: 10086,
                },
                query: null,
                params: null,
                matched: null,
                fullPath: null,
                hash: null,
                redirectedFrom: null,
            },
        ];
        /**
         * 固定的菜单
         */
        const affixMenu: GetLoginMenuInfoDto[] = [
            {
                id: 10086,
                menuCode: "Dashboard",
                menuName: "首页",
                menuTitle: "首页",
                menuType: MenuTypeEnum.Menu,
                icon: "",
                router: "/dashboard",
            },
        ];

        const state: NavTabs = reactive({
            // 激活tab的index
            activeIndex: 0,
            // 激活的tab
            activeTab: null,
            // 激活的module
            activeModule: null,
            // 导航栏tab列表
            navBarTabs: [...affixTabs],
            // 当前tab是否全屏
            tabFullScreen: false,
            // 从后台加载到的当前选中模块下的菜单列表
            tabs: [],
        });

        /**
         * 添加 Tab
         * @param route 路由
         * @returns
         */
        const addTab = (route: RouteLocationNormalized): void => {
            if (typeof route.meta.title == "string") {
                // 这里使用别名，避免被国际化工具匹配到
                const { t: translateTitle } = i18n.global;
                // 这里默认直接使用 pageTitle. 中的翻译内容
                route.meta.title = translateTitle(`pageTitle.${route.meta.title}`);
            }

            // 判断是否存在于已经添加的tab中
            const findIndex = state.navBarTabs.findIndex((f) => f.path === route.path);
            if (findIndex >= 0) {
                // 存在，更新
                state.navBarTabs[findIndex].params = !isEmpty(route.params) ? route.params : state.navBarTabs[findIndex].params;
                state.navBarTabs[findIndex].query = !isEmpty(route.query) ? route.query : state.navBarTabs[findIndex].query;
            } else {
                // 不存在，添加
                state.navBarTabs.push(route);
            }
        };

        /**
         * 关闭 Tab
         * @param route
         */
        const closeTab = (route: RouteLocationNormalized): void => {
            const findIndex = state.navBarTabs.findIndex((f) => f.path === route.path);
            if (findIndex >= 0) {
                state.navBarTabs.splice(findIndex, 1);
            }
        };

        /**
         * 关闭多个 Tab
         * @param retainRoute 保留的路由，否则关闭全部标签
         */
        const closeTabs = (retainRoute: RouteLocationNormalized | false = false): void => {
            if (retainRoute) {
                state.navBarTabs = [...affixTabs, retainRoute];
            } else {
                state.navBarTabs = [...affixTabs];
            }
        };

        /**
         * 设置活动路由
         * @param route
         * @returns
         */
        const setActiveRoute = (route: RouteLocationNormalized): void => {
            const currentRouteIndex = state.navBarTabs.findIndex((f) => f.path === route.path);
            if (currentRouteIndex === -1) return;
            state.activeTab = route;
            state.activeIndex = currentRouteIndex;
        };

        /**
         * 设置路由列表
         * @param data
         */
        const setTabsViewMenus = (data: GetLoginMenuInfoDto[]): void => {
            state.tabs = [...affixMenu, ...data];
        };

        /**
         * 设置全屏
         * @param fullScreen
         */
        const setFullScreen = (fullScreen: boolean): void => {
            state.tabFullScreen = fullScreen;
        };

        return { state, addTab, closeTab, closeTabs, setActiveRoute, setTabsViewMenus, setFullScreen };
    },
    {
        persist: {
            key: STORE_NAV_TABS,
            // 这里是配置 pinia 只需要持久化 tabFullScreen 和 activeModule 即可，而不是整个 store
            paths: ["state.tabFullScreen", "state.activeModule"],
        },
    }
);
