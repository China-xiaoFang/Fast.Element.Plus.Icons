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
        // 重定向到首页
        redirect: "/dashboard",
        children: [
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () => import("@/views/dashboard/index.vue"),
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
            noLogin: true,
        },
    },
    {
        path: "/403",
        component: () => import("@/views/common/403/index.vue"),
        meta: {
            title: "无权限操作",
        },
    },
    {
        path: "/404",
        component: () => import("@/views/common/404/index.vue"),
        meta: {
            title: "页面找不到了",
        },
    },
    {
        path: "/empty",
        component: () => import("@/views/common/empty/index.vue"),
        meta: {
            title: "空页面",
        },
    },
    {
        path: "/:path(.*)*",
        redirect: "/404",
    },
];
