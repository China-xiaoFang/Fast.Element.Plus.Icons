/**
 * Stores UserInfo 变量定义
 */

import { GetLoginUserInfoOutput } from "@/api/modules/get-login-user-info-output";

/**
 * 用户信息
 * @interface UserInfo
 */
export interface UserInfo extends GetLoginUserInfoOutput {
    /**
     * Token
     * @type {string}
     * @memberof UserInfo
     */
    token: string;
    /**
     * Refresh Token
     * @type {string}
     * @memberof UserInfo
     */
    refreshToken: string;
    /**
     * 动态生成路由
     * @type {boolean}
     * @memberof UserInfo
     */
    asyncRouterGen: boolean;
}
