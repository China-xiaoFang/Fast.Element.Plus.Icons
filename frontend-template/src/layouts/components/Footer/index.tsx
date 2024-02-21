import { defineComponent } from "vue";
import { useSiteConfig } from "@/stores/siteConfig";

export default defineComponent({
    name: "LayoutFooter",
    setup() {
        const siteConfigStore = useSiteConfig();

        return () => (
            <el-footer class="fast-layout-footer">
                <div>
                    Copyright
                    {siteConfigStore.state.copyrightValidStartYear !== null && <> @ {siteConfigStore.state.copyrightValidStartYear}</>}
                    {siteConfigStore.state.copyrightValidEndYear !== null && <>~{siteConfigStore.state.copyrightValidEndYear} </>}
                    {siteConfigStore.state.copyrighted && (
                        <>
                            {" "}
                            {siteConfigStore.state.copyrightedUrl ? (
                                <a href={siteConfigStore.state.copyrightedUrl}>{siteConfigStore.state.copyrighted}</a>
                            ) : (
                                <>{siteConfigStore.state.copyrighted}</>
                            )}{" "}
                        </>
                    )}
                    {siteConfigStore.state.version && <> {siteConfigStore.state.version} </>}
                    {siteConfigStore.state.icpInfo && (
                        <>
                            {" "}
                            <a href="https://beian.miit.gov.cn/">{siteConfigStore.state.icpInfo}</a>{" "}
                        </>
                    )}
                    {siteConfigStore.state.publicProvince && siteConfigStore.state.publicCode && (
                        <>
                            {" "}
                            <img src="/src/assets/images/publicLogo.png" />{" "}
                            <a href={`https://beian.mps.gov.cn/#/query/webSearch?code=${siteConfigStore.state.publicCode}`}>
                                {siteConfigStore.state.publicProvince}
                                {siteConfigStore.state.publicCode}号
                            </a>{" "}
                        </>
                    )}
                </div>
            </el-footer>
        );
    },
});
