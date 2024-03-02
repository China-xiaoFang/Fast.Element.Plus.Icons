import { createRouter, createWebHistory } from "vue-router";
import { defaultRoute } from "./modules/defaultRoute";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { loading } from "@/hooks/loading";
import langAutoLoadMap from "@/lang/autoLoad";
import { mergeMessage } from "@/lang/index";
import { useConfig } from "@/stores/config";
import { useSiteConfig } from "@/stores/siteConfig";
import { useTitle } from "@vueuse/core";
import { useUserInfo } from "@/stores/userInfo";
import { i18n } from "@/lang";
import { ElMessage, ElNotification } from "element-plus";
import { handleDynamicRoute } from "@/router/utils";
import { getGreet, getUrlParams } from "@/utils";

const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: defaultRoute,
});

/**
 * 配置 NProgress
 */
NProgress.configure({
    // 动画方式
    easing: "ease",
    // 递增进度条的速度
    speed: 500,
    // 是否显示加载ico
    showSpinner: false,
    // 自动递增间隔
    trickleSpeed: 200,
    // 初始化时的最小百分比
    minimum: 0.3,
});

/**
 * 路由加载前
 */
router.beforeEach(async (to, from, next) => {
    // 开启进度条
    NProgress.start();

    // 判断是否已经存在加载动画
    if (!window.existLoading) {
        // 显示加载动画
        loading.show();
        window.existLoading = true;
    }

    const userInfoStore = useUserInfo();

    // 判断是否存在Token
    if (!userInfoStore.state.token) {
        // 判断当前页面是否需要登录
        if (!to.meta.noLogin) {
            ElMessage.warning(i18n.global.t("router.请登录"));
            next({ path: "/login", query: { redirect: encodeURIComponent(to.fullPath) } });
            return;
        }
    } else {
        // 判断 pinia 中的动态路由生成的状态，必须存在Token才加载
        if (!userInfoStore.state.asyncRouterGen) {
            try {
                // 刷新用户信息
                await userInfoStore.refreshUserInfo();

                // 加载动态路由
                handleDynamicRoute();

                // 确保路由添加完成
                userInfoStore.state.asyncRouterGen = true;

                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                    ElNotification({
                        title: i18n.global.t("router.欢迎"),
                        message: `${getGreet()}${userInfoStore.userInfo.nickName ?? userInfoStore.userInfo.userName}`,
                        type: "success",
                        duration: 1000,
                    });
                }, 1000);

                // 由于新添加的路由在本次不存在，所以进行重定向
                next({ ...(to.redirectedFrom ?? to), replace: true });
                return;
            } catch (error: any) {
                // 退出登录
                userInfoStore.logout();
                return;
            }
        }

        // 判断登录后是否禁止查看该页面
        if (to.meta.authForbidView) {
            // 重定向到首页
            next({ path: "/" });
            return;
        }

        // 判断是否存在重定向路径，如果有则跳转
        const redirect = decodeURIComponent((from.query.redirect as string) || "");
        if (redirect) {
            const _query = getUrlParams(redirect);
            // 设置 replace: true, 因此导航将不会留下历史记录
            next({ path: redirect, replace: true, query: _query });
            return;
        }
    }

    // 按需动态加载页面的语言包
    let loadPath: string[] = [];

    // 判断当前路由是否存在按需加载的语言包
    if (to.path in langAutoLoadMap) {
        loadPath.push(...langAutoLoadMap[to.path as keyof typeof langAutoLoadMap]);
    }

    const configStore = useConfig();

    const prefix = `./${configStore.lang.defaultLang}/`;

    for (const key in loadPath) {
        // 替换语言
        loadPath[key] = loadPath[key].replaceAll("${lang}", configStore.lang.defaultLang);
        // 判断是否存在语言包句柄中
        if (loadPath[key] in window.loadLangHandle) {
            window.loadLangHandle[loadPath[key]]().then((res: { default: anyObj }) => {
                // 这里默认删除 ./${lang}/ 前缀
                const pathName = loadPath[key].slice(prefix.length, loadPath[key].lastIndexOf("."));
                /**
                 * 这里处理 index.ts 文件后缀的问题
                 * 原：utils.axios.index.
                 * 处理后：utils.axios.
                 */
                const prefixName = pathName.endsWith("index") ? pathName.substring(0, pathName.lastIndexOf("/")) : pathName;
                mergeMessage(res.default, prefixName);
            });
        }
    }

    // 刷新页面标题
    const title = useTitle();
    const siteConfigStore = useSiteConfig();
    title.value = `${to.meta.title}${siteConfigStore.state.siteName ? " - " + siteConfigStore.state.siteName : ""}`;
    next();
});

/**
 * 路由加载后
 */
router.afterEach(() => {
    if (window.existLoading) {
        loading.hide();
    }
    NProgress.done();
});

export default router;
