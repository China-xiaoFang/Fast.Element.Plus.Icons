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
                {
                    configStore.layout.menuCollapse ? (null) : (
                        <>
                            <img class="logo-img" src={LogoImg} alt="logo" />
                            <div
                                class="website-name"
                                style={{ color: configStore.getColorVal('menuActiveColor') }}
                            >
                                {siteConfigStore.state.siteName}
                            </div>
                        </>
                    )
                }
            </div>
        );
    },
});
