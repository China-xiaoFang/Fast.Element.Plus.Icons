import { RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index";

/**
 * 动态路由
 * 用来放置有权限的路由，但是在后端不进行返回的页面
 * 必须带有 Name 属性
 */
export const asyncRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        name: "layout",
        component: Layout,
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                component: () => import("@/views/dashboard/index.vue"),
                name: "Dashboard",
                meta: {
                    title: "首页",
                    affix: true,
                    keepAlive: true,
                    menuId: 10086,
                },
            },
        ],
    },
];
