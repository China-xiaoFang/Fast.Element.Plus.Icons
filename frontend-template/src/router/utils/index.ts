import router from "@/router";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
import type { RouteLocationRaw, RouteRecordRaw } from "vue-router";
import { ElNotification } from "element-plus";
import { i18n } from "@/lang";
import { MenuTypeEnum } from "@/api/enums/menu-type-enum";
import { useUserInfo } from "@/stores/userInfo";
import { genNonceStr } from "@/utils";
import { GetLoginMenuInfoDto } from "@/api/services/auth/models/get-login-menu-info-dto";

/**
 * 路由跳转，带错误检查
 * @param to 导航位置，同 router.push
 */
export const routePush = async (to: RouteLocationRaw) => {
    try {
        const failure = await router.push(to);
        if (isNavigationFailure(failure, NavigationFailureType.aborted)) {
            ElNotification({
                message: i18n.global.t("router.utils.导航失败，导航守卫拦截！"),
                type: "error",
            });
        } else if (isNavigationFailure(failure, NavigationFailureType.duplicated)) {
            ElNotification({
                message: i18n.global.t("router.utils.导航失败，已在导航目标位置！"),
                type: "warning",
            });
        }
    } catch (error) {
        ElNotification({
            message: i18n.global.t("router.utils.导航失败，路由无效！"),
            type: "error",
        });
        console.error(error);
    }
};

/**
 * 路由点击
 * @param menu
 */
export const onClickMenu = (menu: GetLoginMenuInfoDto) => {
    switch (menu.menuType) {
        case MenuTypeEnum.Menu:
            routePush({ path: menu.router });
            break;
        case MenuTypeEnum.Internal:
            routePush({ path: `/iframe${menu.router}` });
            break;
        case MenuTypeEnum.Outside:
            window.open(menu.link, "_blank");
            break;
        default:
            ElNotification({
                message: i18n.global.t("router.utils.导航失败，菜单类型无法识别！"),
                type: "error",
            });
            break;
    }

    // 待定....
};

const modules = import.meta.glob("/src/views/**/**.vue");

/** 加载组件 */
const loadComponent = (component: string, menuType: MenuTypeEnum) => {
    switch (menuType) {
        case MenuTypeEnum.Menu:
            if (component) {
                if (component.includes("/")) {
                    return modules[`/src/views/${component}.vue`];
                }
                return modules[`/src/views/${component}/index.vue`];
            } else {
                return () => import("@/views/common/empty/index.vue");
            }
        case MenuTypeEnum.Internal:
            return () => import("@/layouts/iframe/index.vue");
        default:
            return () => import("@/views/common/empty/index.vue");
    }
};

/** 加载组件名称 */
const loadComponentName = (name: string) => {
    if (name) {
        if (name.includes("/")) {
            let cArr = name.split("/");
            let result = "";
            cArr.forEach((item) => {
                result += item.slice(0, 1).toUpperCase() + item.slice(1);
            });
            return result;
        }
        return name;
    } else {
        return genNonceStr(8);
    }
};

/**
 * 扁平化路由
 * @param menuList
 * @param categories
 * @returns
 */
const flatteningMenu = (menuList: GetLoginMenuInfoDto[], categories: string[] = null): RouteRecordRaw[] => {
    let routeList: RouteRecordRaw[] = [];

    menuList.map((item) => {
        if (item.menuType == MenuTypeEnum.Menu || item.menuType == MenuTypeEnum.Internal) {
            categories.push(item.menuName);
            const path = item.menuType == MenuTypeEnum.Menu ? item.router : `/iframe${item.router}`;
            routeList.push({
                path: path,
                // 这里由于 keep-alive 必须设置 name 的问题，所以根据组件的地址，生成固定的 name，需要在每个页面增加 name，不然 keep-alive 会失效
                name: loadComponentName(path),
                component: loadComponent(item.component, item.menuType),
                meta: {
                    keepAlive: item.menuType == MenuTypeEnum.Menu ? true : false,
                    title: item.menuTitle,
                    authForbidView: false,
                    type: item.menuType == MenuTypeEnum.Menu ? "tab" : "iframe",
                    iframeUrl: item.link,
                    categories: categories,
                    menuId: item.id,
                    moduleId: item.moduleId,
                },
            });
        }

        // 判断是否存在子节点
        if (item.children && item.children.length > 0) {
            routeList = [...routeList, ...flatteningMenu(item.children, categories)];
        }
    });

    return routeList;
};

/**
 * 处理动态路由
 */
export const handleDynamicRoute = () => {
    const userInfoStore = useUserInfo();

    // 扁平化路由
    let routeList: RouteRecordRaw[] = [];

    userInfoStore.userInfo.menuList.map((item) => {
        let routeName = [];
        if (item.menuType == MenuTypeEnum.Menu || item.menuType == MenuTypeEnum.Internal) {
            routeName.push(item.menuName);
            routeList.push({
                path: item.menuType == MenuTypeEnum.Menu ? item.router : `/iframe${item.router}`,
                // 这里由于 keep-alive 必须设置 name 的问题，所以根据组件的地址，生成固定的 name，需要在每个页面增加 name，不然 keep-alive 会失效
                name: loadComponentName(item.menuName),
                component: loadComponent(item.component, item.menuType),
                meta: {
                    keepAlive: item.menuType == MenuTypeEnum.Menu ? true : false,
                    title: item.menuTitle,
                    authForbidView: true,
                    type: item.menuType == MenuTypeEnum.Menu ? "tab" : "iframe",
                    iframeUrl: item.link,
                    categories: routeName,
                    menuId: item.id,
                    moduleId: item.moduleId,
                },
            });
        }

        // 判断是否存在子节点
        if (item.children && item.children.length > 0) {
            routeList = [...routeList, ...flatteningMenu(item.children, routeName)];
        }
    });

    // 循环添加到 layout 中
    routeList.forEach((rItem) => {
        router.addRoute("layout", rItem);
    });
};
