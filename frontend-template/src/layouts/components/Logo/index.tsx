import { defineComponent } from "vue";
import { useConfig } from "@/stores/config";
import { useSiteConfig } from "@/stores/siteConfig";
import LogoImg from "@/assets/logo.png"

export default defineComponent({
    name: "LayoutLogo",
    setup() {
        const configStore = useConfig();
        const siteConfigStore = useSiteConfig();

        return () => (
            <div class="fast-layout-logo">
                <img class="logo-img" src={LogoImg} alt="logo" />
                {
                    configStore.layout.menuCollapse ? (null) : (
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
