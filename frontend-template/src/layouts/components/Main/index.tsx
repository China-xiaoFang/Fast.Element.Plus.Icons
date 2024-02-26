import { defineComponent, ref, reactive, onMounted, watch, onBeforeMount, onUnmounted, nextTick, provide, Transition, KeepAlive } from "vue";
import { useRoute, type RouteLocationNormalized } from "vue-router";
import { mainHeight as layoutMainScrollbarStyle } from "@/layouts/utils";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";
import type { ScrollbarInstance } from "element-plus";

export default defineComponent({
    name: "LayoutMain",
    setup() {
        const { proxy } = useCurrentInstance();

        const route = useRoute();
        const configStore = useConfig();
        const navTabsStore = useNavTabs();
        const mainScrollbarRef = ref<ScrollbarInstance>();

        const state: {
            componentKey: string;
            keepAliveComponentNameList: string[];
        } = reactive({
            componentKey: route.path,
            keepAliveComponentNameList: [],
        });

        const addKeepAliveComponentName = function (keepAliveName: string | undefined) {
            if (keepAliveName) {
                let exist = state.keepAliveComponentNameList.find((name: string) => {
                    return name === keepAliveName;
                });
                if (exist) return;
                state.keepAliveComponentNameList.push(keepAliveName);
            }
        };

        onBeforeMount(() => {
            proxy.eventBus.on("onTabViewRefresh", (menu: RouteLocationNormalized) => {
                state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter((name: string) => menu.meta.keepalive !== name);
                state.componentKey = "";
                nextTick(() => {
                    state.componentKey = menu.path;
                    addKeepAliveComponentName(menu.meta.keepalive as string);
                });
            });
            proxy.eventBus.on("onTabViewClose", (menu: RouteLocationNormalized) => {
                state.keepAliveComponentNameList = state.keepAliveComponentNameList.filter((name: string) => menu.meta.keepalive !== name);
            });
        });

        onUnmounted(() => {
            proxy.eventBus.off("onTabViewRefresh");
            proxy.eventBus.off("onTabViewClose");
        });

        onMounted(() => {
            // 确保刷新页面时也能正确取得当前路由 keepalive 参数
            if (typeof navTabsStore.state.activeTab?.meta.keepalive == "string") {
                addKeepAliveComponentName(navTabsStore.state.activeTab?.meta.keepalive);
            }
        });

        watch(
            () => route.path,
            () => {
                state.componentKey = route.path;
                if (typeof navTabsStore.state.activeTab?.meta.keepalive == "string") {
                    addKeepAliveComponentName(navTabsStore.state.activeTab?.meta.keepalive);
                }
            }
        );

        provide("mainScrollbarRef", mainScrollbarRef);

        return () => (
            <el-main class="fast-layout-main">
                <el-scrollbar
                    ref={mainScrollbarRef}
                    class="fast-layout-main-scrollbar"
                    style={layoutMainScrollbarStyle()}
                >
                    <router-view>
                        {{
                            default: ({ Component }) => (
                                <Transition
                                    mode="out-in"
                                    name={configStore.layout.mainAnimation}
                                >
                                    <KeepAlive include={state.keepAliveComponentNameList}>
                                        <Component key={state.componentKey} />
                                    </KeepAlive>
                                </Transition>
                            )
                        }}
                    </router-view>
                </el-scrollbar>
            </el-main>
        );
    },
});
