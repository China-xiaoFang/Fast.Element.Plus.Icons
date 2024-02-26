import { defineComponent } from "vue";
import { useRoute } from 'vue-router'
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "LayoutBreadcrumb",
    setup() {
        const route = useRoute()
        // 这里使用别名，避免被国际化工具匹配到
        const { t: translateTitle } = useI18n();

        return () => (
            <el-breadcrumb separator="/" class="fast-layout-breadcrumb">
                <el-breadcrumb-item to={{ path: '/dashboard' }}>
                    {translateTitle("pagesTitles.首页")}
                </el-breadcrumb-item>
                <>
                    {
                        route.meta.categories?.map((item: string) => (
                            <el-breadcrumb-item>{{ item }}</el-breadcrumb-item>
                        ))
                    }
                </>
            </el-breadcrumb>
        );
    },
});
