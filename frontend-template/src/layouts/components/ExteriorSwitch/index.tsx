import { defineComponent } from "vue";
import { FIcon } from "@/components";

export default defineComponent({
    name: "LayoutExteriorSwitch",
    setup() {
        return () => (
            <div class="fast-layout-theme-toggle-content">
                <div class="switch">
                    <div class="switch-action">
                        <FIcon name="local-dark" color="#f2f2f2" size="13px" class="switch-icon dark-icon" />
                        <FIcon name="local-light" color="#303133" size="13px" class="switch-icon light-icon" />
                    </div>
                </div>
            </div>
        );
    },
});
