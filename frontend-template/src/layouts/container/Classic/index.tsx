import { defineComponent } from "vue";
import "./style/index.scss"
import LayoutAside from "@/layouts/components/Aside";
import LayoutHamburger from "@/layouts/components/Hamburger";
import LayoutBreadcrumb from "@/layouts/components/Breadcrumb";
import LayoutNavModule from "@/layouts/components/NavModule";
import LayoutNavBarTab from "@/layouts/components/NavBarTab";
import LayoutNavMenu from "@/layouts/components/NavMenu";
import LayoutMain from "@/layouts/components/Main";
import LayoutFooter from "@/layouts/components/Footer";
import LayoutCloseFullScreen from "@/layouts/components/CloseFullScreen";
import { useConfig } from "@/stores/config";
import { useNavTabs } from "@/stores/navTabs";

export default defineComponent({
    name: "LayoutClassic",
    setup() {
        const configStore = useConfig();
        const navTabsStore = useNavTabs();

        return () => (
            <>
                <el-container class="fast-layout-container">
                    <LayoutAside />
                    <el-container class="fast-layout-content-wrapper">
                        {
                            navTabsStore.state.tabFullScreen ? (null) : (
                                <el-header class="fast-layout-header">
                                    <div class="fast-layout-nav-bar">
                                        <LayoutHamburger />
                                        {
                                            configStore.layout.shrink ? (null) : (
                                                <>
                                                    <LayoutBreadcrumb />
                                                    <LayoutNavModule />
                                                </>
                                            )
                                        }
                                        <LayoutNavMenu />
                                    </div>
                                    <LayoutNavBarTab />
                                </el-header>
                            )
                        }
                        <LayoutMain />
                        <LayoutFooter />
                    </el-container>
                </el-container>
                {
                    navTabsStore.state.tabFullScreen ? (
                        <LayoutCloseFullScreen />
                    ) : (null)
                }
            </>
        );
    },
});
