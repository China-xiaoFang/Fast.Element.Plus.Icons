import { defineComponent } from "vue";
import { useConfig } from "@/stores/config";
import { useSiteConfig } from "@/stores/siteConfig";

export default defineComponent({
    name: "LayoutLogo",
    setup() {
        const configStore = useConfig();
        const siteConfigStore = useSiteConfig();

        return () => (
            <div class="fast-layout-logo">
                {
                    configStore.layout.menuCollapse ? (
                        <img class="logo-img" src="~assets/logo.png" alt="logo" />
                    ) : (
                        <div
                            class="website-name"
                            style={{ color: configStore.getColorVal('menuActiveColor') }}
                        >
                            {siteConfigStore.state.siteName}
                        </div>
                    )
                }
            </div>
        );
    },
});
