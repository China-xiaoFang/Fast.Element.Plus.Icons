import { PropType, defineComponent } from "vue";
import { useConfig } from "@/stores/config";
import { GetLoginMenuInfoDto } from "@/api/modules/get-login-menu-info-dto";
import FIcon from "@/components/FIcon";
import LayoutMenuItem from "./index"
import { onClickMenu } from "@/router/utils";

export default defineComponent({
    name: "LayoutMenuItem",
    props: {
        menus: {
            type: Array as PropType<GetLoginMenuInfoDto[]>,
            default: []
        },
    },
    setup(props: { menus: GetLoginMenuInfoDto[] }) {
        const configStore = useConfig();

        return () => (
            <>
                {
                    props.menus.map((menu: GetLoginMenuInfoDto) => {
                        menu.children && menu.children.length > 0 ? (
                            <el-sub-menu index={menu.id}>
                                {{
                                    title: () => (
                                        <>
                                            <FIcon color={configStore.getColorVal("menuColor")} name={menu.icon ? menu.icon : configStore.layout.menuDefaultIcon} />
                                            <span>{menu.menuName}</span>
                                        </>
                                    ),
                                    default: () => (
                                        <LayoutMenuItem menus={menu.children} />
                                    )
                                }}
                            </el-sub-menu>
                        ) : (
                            <el-menu-item index={menu.id} onclick={() => onClickMenu(menu)}>
                                <FIcon color={configStore.getColorVal("menuColor")} name={menu.icon ? menu.icon : configStore.layout.menuDefaultIcon} />
                                <span>{menu.menuName}</span>
                            </el-menu-item>
                        )
                    })
                }
            </>
        );
    },
});
