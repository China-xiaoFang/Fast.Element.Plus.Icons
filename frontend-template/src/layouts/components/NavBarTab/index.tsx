import { Transition, defineComponent, nextTick, onMounted, reactive, ref, withModifiers } from "vue";
import { useRoute, useRouter, onBeforeRouteUpdate, type RouteLocationNormalized } from "vue-router";
import { useNavTabs } from "@/stores/navTabs";
import { useTemplateRefsList } from "@vueuse/core";
import FContextMenu from "@/components/FContextMenu";
import type { ContextMenuItem, ContextMenuItemClickEmitArg } from "@/components/FContextMenu/interface";
import FIcon from "@/components/FIcon";
import useCurrentInstance from "@/hooks/useCurrentInstance";
import horizontalScroll from "@/utils/horizontalScroll";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "LayoutNavBarTab",
    setup() {
        const route = useRoute();
        const router = useRouter();
        const navTabsStore = useNavTabs();

        const { proxy } = useCurrentInstance();
        const tabScrollbarRef = ref();
        const tabsRefs = useTemplateRefsList<HTMLDivElement>();

        const fContextMenuRef = ref();

        const { t } = useI18n();

        const state: {
            contextMenuItems: ContextMenuItem[];
        } = reactive({
            contextMenuItems: [
                { name: "refresh", label: t("layouts.components.NavBarTab.重新加载"), icon: "fa fa-refresh" },
                { name: "close", label: t("layouts.components.NavBarTab.关闭标签"), icon: "fa fa-times" },
                { name: "fullScreen", label: t("layouts.components.NavBarTab.当前标签全屏"), icon: "el-icon-FullScreen" },
                { name: "closeOther", label: t("layouts.components.NavBarTab.关闭其他标签"), icon: "fa fa-minus" },
                { name: "closeAll", label: t("layouts.components.NavBarTab.关闭全部标签"), icon: "fa fa-stop" },
            ],
        });

        const activeBoxStyle = reactive({
            width: "0",
            transform: "translateX(0px)",
        });

        /**
         * Tab 点击
         * @param menu
         */
        const onClickTabHandle = (menu: RouteLocationNormalized) => {
            router.push(menu);
        };

        /**
         * Tab 右键点击
         * @param menu
         * @param el
         */
        const onContextMenuHandle = (menu: RouteLocationNormalized, el: MouseEvent) => {
            // 禁用刷新
            state.contextMenuItems[0].disabled = route.path !== menu.path;
            // 禁用关闭其他和关闭全部
            state.contextMenuItems[4].disabled = state.contextMenuItems[3].disabled = navTabsStore.state.navBarTabs.length == 1 ? true : false;

            const { clientX, clientY } = el;
            fContextMenuRef.value.onShowContextmenu(menu, {
                x: clientX,
                y: clientY,
            });
        };

        /**
         * Tab 激活状态切换
         * @param dom
         */
        const selectNavTabHandle = (dom: HTMLDivElement) => {
            if (!dom) {
                return;
            }
            activeBoxStyle.width = dom.clientWidth + "px";
            activeBoxStyle.transform = `translateX(${dom.offsetLeft}px)`;

            let scrollLeft = dom.offsetLeft + dom.clientWidth - tabScrollbarRef.value.clientWidth;
            if (dom.offsetLeft < tabScrollbarRef.value.scrollLeft) {
                tabScrollbarRef.value.scrollTo(dom.offsetLeft, 0);
            } else if (scrollLeft > tabScrollbarRef.value.scrollLeft) {
                tabScrollbarRef.value.scrollTo(scrollLeft, 0);
            }
        };

        /**
         * 跳转到最后一个 Tab 页
         */
        const toLastTab = () => {
            const lastTab = navTabsStore.state.navBarTabs.slice(-1)[0];
            if (lastTab) {
                router.push(lastTab);
            } else {
                router.push("/");
            }
        };

        /**
         * 关闭 Tab
         * @param route
         */
        const onClickCloseTabHandle = (route: RouteLocationNormalized) => {
            navTabsStore.closeTab(route);
            proxy.eventBus.emit("onTabViewClose", route);
            if (navTabsStore.state.activeTab?.path === route.path) {
                toLastTab();
            } else {
                navTabsStore.setActiveRoute(navTabsStore.state.activeTab!);
                nextTick(() => {
                    selectNavTabHandle(tabsRefs.value[navTabsStore.state.activeIndex]);
                });
            }

            fContextMenuRef.value.onHideContextmenu();
        };

        /**
         * 关闭其他 Tab
         * @param route
         */
        const closeOtherTab = (route: RouteLocationNormalized) => {
            navTabsStore.closeTabs(route);
            navTabsStore.setActiveRoute(route);
            if (navTabsStore.state.activeTab?.path !== route.path) {
                router.push(route!.path);
            }
        };

        /**
         * 关闭全部 Tab
         * @param route
         */
        const closeAllTab = (route: RouteLocationNormalized) => {
            navTabsStore.closeTabs(false);
        };

        const onContextmenuItem = async (item: ContextMenuItemClickEmitArg) => {
            const { name, menu } = item;
            if (!menu) return;
            switch (name) {
                case "refresh":
                    proxy.eventBus.emit("onTabViewRefresh", menu);
                    break;
                case "close":
                    onClickCloseTabHandle(menu);
                    break;
                case "closeOther":
                    closeOtherTab(menu);
                    break;
                case "closeAll":
                    closeAllTab(menu);
                    break;
                case "fullScreen":
                    if (route.path !== menu?.path) {
                        router.push(menu?.path as string);
                    }
                    navTabsStore.setFullScreen(true);
                    break;
            }
        };

        const updateTab = function (newRoute: RouteLocationNormalized) {
            // 添加tab
            navTabsStore.addTab(newRoute);
            // 激活当前tab
            navTabsStore.setActiveRoute(newRoute);

            nextTick(() => {
                selectNavTabHandle(tabsRefs.value[navTabsStore.state.activeIndex]);
            });
        };

        onBeforeRouteUpdate(async (to) => {
            updateTab(to);
        });

        onMounted(() => {
            updateTab(router.currentRoute.value);
            new horizontalScroll(tabScrollbarRef.value);
        });

        return () => (
            <div class="fast-layout-nav-tabs" ref={tabScrollbarRef}>
                {
                    navTabsStore.state.navBarTabs.map((item, index) => (
                        <div
                            onClick={() => onClickTabHandle(item)}
                            onContextmenu={withModifiers((event: Event) => onContextMenuHandle(item, event as MouseEvent), ["prevent"])}
                            // onContextmenu={(e) => { e.preventDefault(); onContextMenuHandle(item, e) }}
                            class={["fast-layout-nav-tabs-item", navTabsStore.state.activeIndex == index ? "active" : ""]}
                            ref={tabsRefs.value.set}
                            key={index}
                        >
                            {item.meta.title}
                            {
                                !item.meta.affix ? (
                                    <Transition
                                        name="el-fade-in"
                                        onAfterLeave={() => { selectNavTabHandle(tabsRefs.value[navTabsStore.state.activeIndex]) }}
                                    >
                                        <FIcon
                                            class="close-icon"
                                            onClick={withModifiers(() => onClickCloseTabHandle(item), ["stop"])}
                                            size="15"
                                            name="el-icon-Close" />
                                    </Transition>
                                ) : (null)
                            }
                        </div>
                    ))
                }
                <div
                    style={activeBoxStyle}
                    class="fa-layout-nav-tabs-active-box"
                />
                <FContextMenu
                    ref={fContextMenuRef}
                    items={state.contextMenuItems}
                    onClick={onContextmenuItem}
                />
            </div>
        );
    },
});
