import { defineComponent, h, reactive, resolveComponent } from "vue";
import { useConfig } from "@/stores/config";
// import { useNavTabs } from "@/stores/navTabs";
// import { useSiteConfig } from "@/stores/siteConfig";
// import { useUserInfo } from "@/stores/userInfo";
// import { useRoute } from "vue-router";
import { onMounted, onBeforeMount } from "vue";
import { Session } from "@/utils/storage";
// import { handleAdminRoute, getFirstRoute, routePush } from "@/router/utils";
// import router from "@/router";
import { useEventListener } from "@vueuse/core";
import { CACHE_BEFORE_RESIZE_LAYOUT } from "@/stores/constant";
// import { isEmpty } from "lodash-es";
import { setNavTabsWidth } from "@/layouts/utils";
// import { useI18n } from "vue-i18n";
// import { ElMessage } from "element-plus";
import LayoutClassic from "@/layouts/container/Classic/index"

export default defineComponent({
    name: "Layout",
    components: {
        LayoutClassic
    },
    setup() {
        // const { t } = useI18n();

        // const navTabsStore = useNavTabs();
        const configStore = useConfig();

        // const route = useRoute();
        // const siteConfigStore = useSiteConfig();
        // const userInfoStore = useUserInfo();

        const state = reactive({
            autoMenuCollapseLock: false,
        });

        onMounted(() => {
            // console.log("我刷新了");
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

        return () => (
            h(resolveComponent(`Layout${configStore.layout.layoutMode}`))
        )
    },
});
