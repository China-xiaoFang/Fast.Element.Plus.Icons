import { defineComponent, onMounted, reactive, withModifiers } from "vue";
import { useNavTabs } from "@/stores/navTabs";
import { useI18n } from "vue-i18n";
import FIcon from "@/components/FIcon";

export default defineComponent({
    name: "LayoutCloseFullScreen",
    setup() {
        const navTabs = useNavTabs();
        const { t } = useI18n();

        const state = reactive({
            closeBoxTop: 20,
        });
        onMounted(() => {
            setTimeout(() => {
                state.closeBoxTop = -30;
            }, 300);
        });
        /*
         * 鼠标滑到顶部显示关闭全屏按钮
         * 要检查 hover 的元素在外部，直接使用事件而不是css
         */
        const onMouseover = () => {
            state.closeBoxTop = 20;
        };
        const onMouseout = () => {
            state.closeBoxTop = -30;
        };
        const onCloseFullScreen = () => {
            navTabs.setFullScreen(false);
        };

        return () => (
            <div
                title={t("layouts.components.CloseFullScreen.退出全屏")}
                onMouseover={() => withModifiers(onMouseover, ["stop"])}
                onMouseout={() => withModifiers(onMouseout, ["stop"])}
            >
                <div
                    onClick={() => withModifiers(onCloseFullScreen, ["stop"])}
                    class="fast-layout-close-full-screen"
                    style={{ top: state.closeBoxTop + 'px' }}
                >
                    <FIcon name="el-icon-Close" />
                </div>
                <div class="fast-layout-close-full-screen-on"></div>
            </div>
        );
    },
});
