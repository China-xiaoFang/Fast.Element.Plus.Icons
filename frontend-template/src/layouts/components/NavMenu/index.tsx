import { defineComponent, reactive } from "vue";
import { editDefaultLang } from "@/lang";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";
import { useI18n } from "vue-i18n";
import { useConfig } from "@/stores/config";
import { useUserInfo } from "@/stores/userInfo";
import { fullUrl } from "@/utils";
import { CACHE_USER_INFO } from "@/stores/constant";
import { Local, Session } from "@/utils/storage";
import FIcon from "@/components/FIcon";

export default defineComponent({
    name: "LayoutNavMenu",
    setup() {
        const { t } = useI18n();

        const configStore = useConfig();
        const userInfo = useUserInfo();

        const state = reactive({
            /**
             * 全屏显示
             */
            isFullScreen: false,
            /**
             * 当前选中的导航菜单
             */
            currentNavMenu: "",
            /**
             * 显示用户信息弹出层
             */
            showUserInfoPopover: false,
        });

        /**
         * 导航菜单改变
         * @param status
         * @param name
         */
        const onChangeNavMenuHandle = (status: boolean, name: string) => {
            state.currentNavMenu = status ? name : "";
        };

        /**
         * 全屏
         */
        const onClickFullScreenHandle = () => {
            if (!screenfull.isEnabled) {
                ElMessage.warning(t("layouts.components.NavMenu.您的浏览器不支持全屏，请更换浏览器再试~"));
                return false;
            }
            screenfull.toggle();
            screenfull.onchange(() => {
                state.isFullScreen = screenfull.isFullscreen;
            });
        };

        /**
         * 用户信息点击
         */
        const onClickUserInfoHandle = () => {
            state.showUserInfoPopover = false;
        };

        /**
         * 清理缓存点击
         * @param type
         */
        const onClickClearCacheHandle = (type: string) => {
            if (type == "storage" || type == "all") {
                const userInfo = Local.get(CACHE_USER_INFO);
                Session.clear();
                Local.clear();
                Local.set(CACHE_USER_INFO, userInfo);
                if (type == "storage") return;
            }
        };

        return () => (
            <div class="fast-layout-nav-menu">
                <router-link class="h100" target="_blank" title={t("pagesTitles.首页")} to="/">
                    <div class="fast-layout-nav-menu-item">
                        <FIcon
                            class="fast-layout-nav-menu-icon"
                            name="el-icon-Monitor"
                            size="18"
                        />
                    </div>
                </router-link>
                <el-dropdown
                    onVisibleChange={(status: boolean) => onChangeNavMenuHandle(status, "lang")}
                    class="h100"
                    size="large"
                    hideTimeout={50}
                    placement="bottom"
                    trigger="click"
                    hideOnClick={true}
                >
                    {{
                        default: () => (
                            <div class={["fast-layout-nav-menu-item pt2", state.currentNavMenu === "lang" ? "hover" : ""]}>
                                <FIcon
                                    class="fast-layout-nav-menu-icon"
                                    name="local-lang"
                                    size="18"
                                />
                            </div>
                        ),
                        dropdown: () => (
                            <el-dropdown-menu class="dropdown-menu-box">
                                {
                                    configStore.lang.langArray.map((item) => (
                                        <el-dropdown-item key={item.name} onClick={() => editDefaultLang(item.name)}>
                                            {item.value}
                                        </el-dropdown-item>
                                    ))
                                }
                            </el-dropdown-menu>
                        ),
                    }}
                </el-dropdown>
                <div class={["fast-layout-nav-menu-item", state.isFullScreen ? "hover" : ""]} onClick={onClickFullScreenHandle}>
                    {state.isFullScreen ? (
                        <FIcon
                            class="fast-layout-nav-menu-icon"
                            name="local-full-screen-cancel"
                            size="18"
                        />
                    ) : (
                        <FIcon
                            class="fast-layout-nav-menu-icon"
                            name="el-icon-FullScreen"
                            size="18"
                        />
                    )}
                </div>
                <el-dropdown
                    onVisibleChange={(status: boolean) => onChangeNavMenuHandle(status, "clear")}
                    class="h100"
                    size="large"
                    hideTimeout={50}
                    placement="bottom"
                    trigger="click"
                    hideOnClick={true}
                >
                    {{
                        default: () => (
                            <div class={["fast-layout-nav-menu-item pt2", state.currentNavMenu === "clear" ? "hover" : ""]}>
                                <FIcon
                                    class="fast-layout-nav-menu-icon"
                                    name="el-icon-Delete"
                                    size="18"
                                />
                            </div>
                        ),
                        dropdown: () => (
                            <el-dropdown-menu class="dropdown-menu-box">
                                <>
                                    {userInfo.isSuperAdmin || userInfo.isSystemAdmin ? (
                                        <el-dropdown-item onClick={() => onClickClearCacheHandle("tp")}>
                                            {t("layouts.components.NavMenu.清理系统缓存")}
                                        </el-dropdown-item>
                                    ) : null}
                                    <el-dropdown-item onClick={() => onClickClearCacheHandle("storage")}>
                                        {t("layouts.components.NavMenu.清理浏览器缓存")}
                                    </el-dropdown-item>
                                    {userInfo.isSuperAdmin ? (
                                        <el-dropdown-item divided onClick={() => onClickClearCacheHandle("all")}>
                                            {t("layouts.components.NavMenu.一键清理所有")}
                                        </el-dropdown-item>
                                    ) : null}
                                </>
                            </el-dropdown-menu>
                        ),
                    }}
                </el-dropdown>
                <el-popover
                    onShow={onChangeNavMenuHandle(true, "userInfo")}
                    onHide={onChangeNavMenuHandle(false, "userInfo")}
                    placement="bottom-end"
                    hideAfter={0}
                    width={260}
                    trigger="click"
                    popper-class="user-info-box"
                    v-model:visible={state.showUserInfoPopover}
                >
                    {{
                        reference: () => (
                            <div class={["user-info", state.currentNavMenu === "userInfo" ? "hover" : ""]}>
                                <el-avatar size={25} fit="fill">
                                    <img src={userInfo.getAvatar()} alt="" />
                                </el-avatar>
                                <div class="user-name">{userInfo.nickName ?? userInfo.userName}</div>
                            </div>
                        ),
                        default: () => (
                            <div>
                                <div class="user-info-base">
                                    <el-avatar size={70} fit="fill">
                                        <img src={userInfo.getAvatar()} alt="" />
                                    </el-avatar>
                                    <div class="user-info-other">
                                        <div class="user-info-name">{userInfo.nickName ?? userInfo.userName}</div>
                                        <div class="user-info-last-time">{userInfo.lastLoginTime}</div>
                                    </div>
                                </div>
                                <div class="user-info-footer">
                                    <el-button onClick={onClickUserInfoHandle} type="primary" plain>
                                        {t("layouts.components.NavMenu.个人资料")}
                                    </el-button>
                                    <el-button onClick={userInfo.logout} type="danger" plain>
                                        {t("layouts.components.NavMenu.注销")}
                                    </el-button>
                                </div>
                            </div>
                        ),
                    }}
                </el-popover>
                <div class="fast-layout-nav-menu-item" onClick={() => configStore.setLayout("showSettingDrawer", true)}>
                    <FIcon  class="fast-layout-nav-menu-icon" name="fa fa-cogs" size="18" />
                </div>
            </div>
        );
    },
});
