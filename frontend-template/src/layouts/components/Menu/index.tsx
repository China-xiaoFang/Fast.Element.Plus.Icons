import { SetupContext, computed, defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { useRoute, onBeforeRouteUpdate, type RouteLocationNormalizedLoaded } from 'vue-router'
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";
import LayoutMenuItem from "@/layouts/components/MenuItem";

export default defineComponent({
    name: "LayoutMenu",
    setup(_, { attrs }: SetupContext) {
        const configStore = useConfig();
        const navTabsStore = useNavTabs();
        const route = useRoute()

        const menusRef = ref();

        const state = reactive({
            defaultActive: '',
        })

        const menusScrollbarHeight = computed(() => {
            let menuTopBarHeight = 0
            if (configStore.layout.menuShowTopBar) {
                menuTopBarHeight = 50
            }
            if (configStore.layout.layoutMode == 'Default') {
                return 'calc(100vh - ' + (32 + menuTopBarHeight) + 'px)'
            } else {
                return 'calc(100vh - ' + menuTopBarHeight + 'px)'
            }
        })

        /**
         * 激活当前路由的菜单
         * @param currentRoute 
         */
        const currentRouteActive = (currentRoute: RouteLocationNormalizedLoaded) => {
            state.defaultActive = currentRoute.path
        }

        /**
         * 滚动条滚动到激活菜单所在位置
         */
        const verticalMenusScroll = () => {
            nextTick(() => {
                let activeMenu: HTMLElement | null = document.querySelector('.el-menu.fast-layout-menu li.is-active')
                if (!activeMenu) return false
                menusRef.value?.setScrollTop(activeMenu.offsetTop)
            })
        }

        onMounted(() => {
            currentRouteActive(route)
            verticalMenusScroll()
        })

        onBeforeRouteUpdate((to) => {
            currentRouteActive(to)
        })

        return () => (
            <el-scrollbar ref={menusRef} style={{ height: menusScrollbarHeight, backgroundColor: configStore.getColorVal("menuBackground") }}>
                <el-menu
                    {...attrs}
                    class="fast-layout-menu"
                    style={{
                        "--el-menu-bg-color": configStore.getColorVal("menuBackground"),
                        "--el-menu-text-color": configStore.getColorVal("menuColor"),
                        "--el-menu-active-color": configStore.getColorVal("menuActiveColor"),
                    }}
                    collapseTransition={false}
                    uniqueOpened={configStore.layout.menuUniqueOpened}
                    defaultActive={state.defaultActive}
                    collapse={configStore.layout.menuCollapse}
                >
                    <LayoutMenuItem menus={navTabsStore.state.tabs} />
                </el-menu>
            </el-scrollbar>
        );
    },
});
