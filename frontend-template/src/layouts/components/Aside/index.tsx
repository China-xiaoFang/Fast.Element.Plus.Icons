import { computed, defineComponent } from "vue";
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";
import LayoutLogo from "@/layouts/components/Logo";

export default defineComponent({
    name: "LayoutAside",
    setup() {
        const configStore = useConfig();
        const navTabsStore = useNavTabs();

        // 菜单宽度
        const menuWidth = computed(() => configStore.menuWidth());

        return () => (
            <>
                {
                    !navTabsStore.state.tabFullScreen ? (
                        <el-aside
                            class={`fast-layout-aside-${configStore.layout.layoutMode} ${configStore.layout.shrink ? 'shrink' : ''}`}
                            style={{ width: menuWidth }}
                        >
                            {
                                configStore.layout.menuShowTopBar ? (
                                    <LayoutLogo />
                                ) : (null)
                            }
                            {/* 这里是菜单 */}
                        </el-aside>
                    ) : (null)
                }
            </>

        );
    },
});
