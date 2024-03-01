import { defineAsyncComponent, defineComponent, h, reactive } from "vue";
import { useConfig } from "@/stores/config";
// import { useNavTabs } from "@/stores/navTabs";
// import { useSiteConfig } from "@/stores/siteConfig";
import { useUserInfo } from "@/stores/userInfo";
import { useRoute } from "vue-router";
import { onMounted, onBeforeMount } from "vue";
import { Session } from "@/utils/storage";
// import { handleAdminRoute, getFirstRoute, routePush } from "@/router/utils";
import router from "@/router";
import { useEventListener } from "@vueuse/core";
import { CACHE_BEFORE_RESIZE_LAYOUT } from "@/stores/constant";
// import { isEmpty } from "lodash-es";
import { setNavTabsWidth } from "@/layouts/utils";
import { useI18n } from "vue-i18n";
import { ElMessage, ElNotification } from "element-plus";
import { handleDynamicRoute, routePush } from "@/router/utils";
import { getGreet, getUrlParams } from "@/utils";

export default defineComponent({
    name: "Layout",
    setup() {
        const { t } = useI18n();

        // const navTabsStore = useNavTabs();
        const configStore = useConfig();

        const route = useRoute();
        // const siteConfigStore = useSiteConfig();
        const userInfoStore = useUserInfo();

        const state = reactive({
            autoMenuCollapseLock: false,
        });

        onMounted(() => {
            if (!userInfoStore.token) {
                ElMessage.warning(t("layouts.请登录"));
                return router.push({ path: "/login", query: { redirect: encodeURIComponent(route.fullPath) } })
            }

            // 刷新用户信息
            userInfoStore.refreshUserInfo().then(() => {
                // 加载动态路由
                handleDynamicRoute();

                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                    ElNotification({
                        title: t("layouts.欢迎"),
                        message: `${getGreet()}${userInfoStore.nickName ?? userInfoStore.userName}`,
                        type: "success",
                        duration: 1500,
                    });
                }, 1000);

                // 判断是否存在重定向路径，如果有则跳转
                const redirect = decodeURIComponent((route.query?.redirect as string) || "");
                if (redirect) {
                    const _query = getUrlParams(redirect);
                    // 设置 replace: true, 因此导航将不会留下历史记录
                    routePush({ path: redirect, replace: true, query: _query })
                    return;
                }
            })

            // init();
            setNavTabsWidth();
            useEventListener(window, "resize", setNavTabsWidth);
        });
        onBeforeMount(() => {
            onAdaptiveLayout();
            useEventListener(window, "resize", onAdaptiveLayout);
        });

        const onAdaptiveLayout = () => {
            let defaultBeforeResizeLayout = {
                layoutMode: configStore.layout.layoutMode,
                menuCollapse: configStore.layout.menuCollapse,
            };
            let beforeResizeLayout = Session.get<any>(CACHE_BEFORE_RESIZE_LAYOUT);
            if (!beforeResizeLayout) Session.set(CACHE_BEFORE_RESIZE_LAYOUT, defaultBeforeResizeLayout);

            const clientWidth = document.body.clientWidth;
            if (clientWidth < 1024) {
                /**
                 * 锁定窗口改变自动调整 menuCollapse
                 * 避免已是小窗且打开了菜单栏时，意外的自动关闭菜单栏
                 */
                if (!state.autoMenuCollapseLock) {
                    state.autoMenuCollapseLock = true;
                    configStore.setLayout("menuCollapse", true);
                }
                configStore.setLayout("shrink", true);
                configStore.setLayoutMode("Classic");
            } else {
                state.autoMenuCollapseLock = false;
                let beforeResizeLayoutTemp = beforeResizeLayout || defaultBeforeResizeLayout;

                configStore.setLayout("menuCollapse", beforeResizeLayoutTemp.menuCollapse);
                configStore.setLayout("shrink", false);
                configStore.setLayoutMode(beforeResizeLayoutTemp.layoutMode);
            }
        };

        return () => h(defineAsyncComponent(() => import(`@/layouts/container/${configStore.layout.layoutMode}/index.tsx`)))
    },
});
