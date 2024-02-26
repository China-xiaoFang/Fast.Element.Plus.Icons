/**
 * 解决 Vue-router meta. 没有提示的情况
 */
declare module "vue-router" {
    interface RouteMeta {
        /**
         * 页面标题
         */
        title?: string;
        /**
         * 是否固定在 Tab 中
         */
        affix?: boolean;
        /**
         * 登录后是否禁止查看该页面
         * 默认是 false，为 true 是代表登录后此页面不能再进入，否则跳转到首页
         */
        authForbidView?: boolean;
        /**
         * 路由类型
         * @description 可选值 "tab" | "iframe"
         * @description "tab" 标签，也就是实际的路由页面
         * @description "iframe" iframe 页面
         */
        type?: "tab" | "iframe";
        /**
         * iframe 页面的地址
         */
        iframeUrl?: string;
        /**
         * 分类
         */
        categories?: string[];
        /**
         * 菜单Id
         */
        menuId?: number;
        /**
         * 模块Id
         */
        moduleId?: number;
    }
}

export {};
