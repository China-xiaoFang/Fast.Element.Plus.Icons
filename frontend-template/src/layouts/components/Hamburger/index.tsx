import { defineComponent } from "vue";
import { FIcon } from "@/components";
import { useConfig } from "@/stores/config";
// import { showShade } from "@/hooks/pageShade";
import { setNavTabsWidth } from "@/layouts/utils";
import { Session } from "@/utils/storage";
import { CACHE_BEFORE_RESIZE_LAYOUT } from "@/stores/constant";

export default defineComponent({
    name: "LayoutHamburger",
    setup() {
        const configStore = useConfig();

        const onMenuCollapse = () => {
            // 判断是否收缩布局，且没有水平折叠菜单
            if (configStore.layout.shrink && !configStore.layout.menuCollapse) {
                // 关闭遮罩层
            }

            configStore.setLayout("menuCollapse", !configStore.layout.menuCollapse);

            // 记录切换到手机端前上次的布局方式
            Session.set(CACHE_BEFORE_RESIZE_LAYOUT, {
                layoutMode: configStore.layout.layoutMode,
                menuCollapse: configStore.layout.menuCollapse,
            });

            // 等待侧边栏动画结束后重新计算导航栏宽度
            setTimeout(() => {
                setNavTabsWidth();
            }, 350);
        };

        return () => (
            <FIcon
                size="18"
                onClick={onMenuCollapse}
                name={configStore.layout.menuCollapse ? 'fa fa-indent' : 'fa fa-dedent'}
                class={["fast-layout-hamburger", configStore.layout.menuCollapse ? "unfold" : ""]}
                color={configStore.getColorVal('menuActiveColor')}
            />
        );
    },
});
