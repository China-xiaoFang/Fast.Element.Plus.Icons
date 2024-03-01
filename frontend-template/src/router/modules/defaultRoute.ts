import { RouteRecordRaw } from "vue-router";
import Layout from "@/layouts/index";

/**
 * 默认路由
 * 必须带有 Name 属性
 */
export const defaultRoute: RouteRecordRaw[] = [
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
    {
        path: "/login",
        component: () => import("@/views/login/index.vue"),
        name: "Login",
        meta: {
            title: "登录",
            authForbidView: true,
        },
    },
    {
        path: "/403",
        component: () => import("@/views/common/403/index.vue"),
    },
    {
        path: "/404",
        component: () => import("@/views/common/404/index.vue"),
    },
    {
        path: "/empty",
        component: () => import("@/views/common/empty/index.vue"),
    },
    {
        path: "/:path(.*)*",
        redirect: "/404",
    },
];
