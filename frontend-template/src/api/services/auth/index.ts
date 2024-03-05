import axios from "@/utils/axios";
import { GetLoginUserInfoOutput, LoginInput, LoginOutput, TenantLoginInput } from "./models";

/**
 * 获取登录用户信息
 * @returns
 */
export const getLoginUserInfo = () => {
    return axios<GetLoginUserInfoOutput>({
        url: "/getLoginUserInfo",
        method: "get",
    });
};

/**
 * 登录
 * @param input
 * @returns
 */
export const login = (input: LoginInput) => {
    return axios<LoginOutput>({
        url: "/login",
        method: "post",
        data: input,
    });
};

/**
 * 租户登录
 * @param input
 * @returns
 */
export const tenantLogin = (input: TenantLoginInput) => {
    return axios({
        url: "/tenantLogin",
        method: "post",
        data: input,
    });
};

/**
 * 退出登录
 * @returns
 */
export const logout = () => {
    return axios({
        url: "/logout",
        method: "post",
    });
};
