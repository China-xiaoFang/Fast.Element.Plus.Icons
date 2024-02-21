<template>
    <el-container class="fast-layout-container">
        <LayoutAside />
        <el-container class="fast-layout-content-wrapper">
            <div class="fast-layout-nav-bar">
                <LayoutHamburger />
                <LayoutBreadcrumb />
                <!-- 模块 -->
                <NavMenus />
            </div>
            <LayoutNavBarTab />
            <LayoutMain />
            <LayoutFooter />
        </el-container>
    </el-container>
    <LayoutCloseFullScreen v-if="navTabsStore.state.tabFullScreen" />
</template>

<script setup lang="ts">
import LayoutAside from "@/layouts/components/Aside";

import LayoutHamburger from "@/layouts/components/Hamburger";
import LayoutBreadcrumb from "@/layouts/components/Breadcrumb";
import LayoutNavBarTab from "@/layouts/components/NavBarTab";

import NavMenus from "@/layouts/components/NavMenus.vue";

import LayoutMain from "@/layouts/components/Main";
import LayoutFooter from "@/layouts/components/Footer";
import LayoutCloseFullScreen from "@/layouts/components/CloseFullScreen";
import { useNavTabs } from "@/stores/navTabs";

const navTabsStore = useNavTabs();
</script>

<style scoped>
.layout-container {
    height: 100%;
    width: 100%;
}
.content-wrapper {
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
