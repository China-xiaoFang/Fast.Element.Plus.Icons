import { SetupContext, defineComponent, nextTick, onMounted, reactive, ref } from "vue";
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";
import { useUserInfo } from "@/stores/userInfo";
import { GetLoginModuleInfoDto } from "@/api/modules/get-login-module-info-dto";
import FIcon from "@/components/FIcon";

export default defineComponent({
    name: "LayoutNavModule",
    setup(_, { attrs }: SetupContext) {
        const configStore = useConfig();
        const navTabsStore = useNavTabs();
        const userInfoStore = useUserInfo();
        const route = useRoute()

        const menusRef = ref();

        const state = reactive({
            defaultActive: '',
            currentModuleId: null
        })

        /**
         * 激活当前路由的模块
         * @param currentRoute 
         */
        const currentRouteActive = (moduleId: number | null) => {
            if (moduleId) {
                state.currentModuleId = moduleId;
            } else {
                // 判断是否存在历史模块，如果存在则不改变
                if (!state.currentModuleId) {
                    // 默认激活第一个模块
                    state.currentModuleId = userInfoStore.moduleList[0].id;
                }
            }
            state.defaultActive = `${state.currentModuleId}`;
            // 查找当前模块下所有的菜单
            navTabsStore.setTabsViewMenus(userInfoStore.menuList.filter(f => f.moduleId == state.currentModuleId));
        }

        /**
         * 滚动条滚动到激活菜单所在位置
         */
        const verticalMenusScroll = () => {
            nextTick(() => {
                let activeMenu: HTMLElement | null = document.querySelector('.el-menu.fast-layout-nav-module li.is-active')
                if (!activeMenu) return false
                menusRef.value?.setScrollLeft(activeMenu.offsetLeft)
            })
        }

        onMounted(() => {
            currentRouteActive(route.meta.moduleId);
            verticalMenusScroll()
        })

        onBeforeRouteUpdate((to) => {
            currentRouteActive(to.meta.moduleId)
        })

        return () => (
            <el-scrollbar>
                <el-menu
                    {...attrs}
                    class="fast-layout-nav-module"
                    mode="horizontal"
                    collapseTransition={false}
                    defaultActive={state.defaultActive}
                >
                    {
                        userInfoStore.moduleList.map((module: GetLoginModuleInfoDto) => (
                            <el-menu-item index={module.id} onclick={() => currentRouteActive(module.id)}>
                                <FIcon color={configStore.getColorVal("menuColor")} name={module.icon ? module.icon : configStore.layout.menuDefaultIcon} />
                                <span>{module.moduleName}</span>
                            </el-menu-item>
                        ))
                    }
                </el-menu>
            </el-scrollbar >
        );
    },
});
