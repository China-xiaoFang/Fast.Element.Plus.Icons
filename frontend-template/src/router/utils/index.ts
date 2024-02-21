import router from "@/router";
import { isNavigationFailure, NavigationFailureType } from "vue-router";
import type { RouteLocationRaw } from "vue-router";
import { ElNotification } from "element-plus";
import { i18n } from "@/lang";
import { GetLoginMenuInfoDto } from "@/api/modules/get-login-menu-info-dto";
import { MenuTypeEnum } from "@/api/modules/enums/menu-type-enum";

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
