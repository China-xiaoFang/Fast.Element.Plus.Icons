import { defineStore } from "pinia";
import { STORE_USER_INFO } from "@/stores/constant";
import { ElMessage } from "element-plus";
import type { UserInfo } from "./interface";
import { type AxiosResponse } from "axios";
import * as authApi from "@/api/services/auth";
import router from "@/router";
import { fullUrl } from "@/utils";
import { GenderEnum } from "@/api/enums/gender-enum";
import manAvatar from "@/assets/images/manAvatar.png";
import womanAvatar from "@/assets/images/womanAvatar.png";
import { reactive } from "vue";
import { GetLoginUserInfoOutput } from "@/api/services/auth/models/get-login-user-info-output";

export const useUserInfo = defineStore(
    "userInfo",
    () => {
        const state: UserInfo = reactive({
            // Token
            token: "",
            // Refresh Token
            refreshToken: "",
            // 动态生成路由
            asyncRouterGen: false,
        });

        /**
         * 用户信息
         */
        const localUserInfo: GetLoginUserInfoOutput = reactive({});

        /**
         * 设置用户信息
         * @param info
         */
        const setUserInfo = (userInfo: GetLoginUserInfoOutput): void => {
            Object.keys(userInfo).forEach((key) => {
                localUserInfo[key] = userInfo[key];
            });
        };

        /**
         * 删除 Token
         */
        const removeToken = (): void => {
            (state.token = ""), (state.refreshToken = "");
        };

        /**
         * 设置 Token
         * @param axiosResponse
         */
        const setToken = (axiosResponse: AxiosResponse): void => {
            // 从请求头部中获取 Token
            const token = axiosResponse.headers["access-token"];
            // 从请求头部中获取 Refresh Token
            const refreshToken = axiosResponse.headers["x-access-token"];
            // 判断是否为无效 Token
            if (token === "invalid_token") {
                // 删除 Token
                removeToken();
            } else if (token && refreshToken && refreshToken !== "invalid_token") {
                // 设置 Token
                state.token = token;
                state.refreshToken = refreshToken;
            }
        };

        /**
         * 获取 Token
         * @description 从缓存中获取
         * @returns
         */
        const getToken = (): { token: string | null; refreshToken: string | null } => {
            return { token: state.token, refreshToken: state.refreshToken };
        };

        /**
         * 解析Token
         * @description 如果Token过期，会解析不出来
         * @param token 可以传入，也可以直接获取 pinia 中的
         * @param refreshToken 可以传入，也可以直接获取 pinia 中的
         * @returns
         */
        const resolveToken = (
            token: string | null = null,
            refreshToken: string | null = null
        ): { token: string | null; refreshToken: string | null; tokenData: anyObj | null } => {
            token ??= state.token;
            refreshToken ??= state.refreshToken;
            if (token) {
                // 解析 JwtToken
                const jwtToken = JSON.parse(
                    decodeURIComponent(encodeURIComponent(window.atob(token.replace(/_/g, "/").replace(/-/g, "+").split(".")[1])))
                ) as anyObj;
                // 获取 Token 的过期时间
                var exp = new Date(jwtToken.exp * 1000);
                if (new Date() >= exp) {
                    return { token: `Bearer ${token}`, refreshToken: `Bearer ${refreshToken}`, tokenData: jwtToken };
                }
                return { token: `Bearer ${token}`, refreshToken: null, tokenData: jwtToken };
            }
            return { token: null, refreshToken: null, tokenData: null };
        };

        /**
         * 获取头像
         * @returns
         */
        const getAvatar = (): string => {
            if (localUserInfo.avatar) {
                return fullUrl(localUserInfo.avatar);
            } else {
                switch (localUserInfo.sex) {
                    case GenderEnum.Unknown:
                    case GenderEnum.Man:
                        return manAvatar;
                    case GenderEnum.Woman:
                        return womanAvatar;
                }
            }
        };

        /**
         * 刷新用户信息
         */
        const refreshUserInfo = async (): Promise<void> => {
            const userInfo = await authApi.getLoginUserInfo();
            if (userInfo.success) {
                setUserInfo(userInfo.data);
            } else {
                throw new Error(userInfo.message);
            }
        };

        /**
         * 登录
         */
        const login = (): void => {
            ElMessage.success("登录成功");
            // 确保 getLoginUser 获取用户信息
            state.asyncRouterGen = false;
            // 进入系统
            router.push({ path: "/" });
        };

        /**
         * 退出登录
         */
        const logout = (): void => {
            removeToken();
            // 调用退出登录的接口
            authApi.logout().finally(() => {
                // next({ path: "/login", query: })
                router.push({ path: "/login", query: { redirect: encodeURIComponent(router.currentRoute.value.fullPath) } });
            });
        };

        return {
            state,
            userInfo: localUserInfo,
            setUserInfo,
            removeToken,
            setToken,
            getToken,
            resolveToken,
            getAvatar,
            refreshUserInfo,
            login,
            logout,
        };
    },
    {
        persist: {
            key: STORE_USER_INFO,
            // 这里是配置 pinia 只需要持久化 token 和 refreshToken 即可，而不是整个 store
            paths: ["state.token", "state.refreshToken"],
        },
    }
);
