import { AppEnvironmentEnum } from "./enums/app-environment-enum";
import { GenderEnum } from "./enums/gender-enum";
import { GetLoginMenuInfoDto } from "./get-login-menu-info-dto";
import { GetLoginModuleInfoDto } from "./get-login-module-info-dto";

/**
 * Fast.Admin.Service.Authentication.Auth.Dto.GetLoginUserInfoOutput 获取登录用户信息输出
 *
 * @export
 * @interface GetLoginUserInfoOutput
 */
export interface GetLoginUserInfoOutput {
    /**
     * 租户Id
     *
     * @type {number}
     * @memberof GetLoginUserInfoOutput
     */
    tenantId?: number;

    /**
     * 租户编号
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    tenantNo?: string | null;

    /**
     * 用户Id
     *
     * @type {number}
     * @memberof GetLoginUserInfoOutput
     */
    userId?: number;

    /**
     * 用户账号
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    account?: string | null;

    /**
     * 用户工号
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    jobNumber?: string | null;

    /**
     * 用户名称
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    userName?: string | null;

    /**
     * 昵称
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    nickName?: string | null;

    /**
     * 头像
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    avatar?: string | null;

    /**
     * 生日
     *
     * @type {Date}
     * @memberof GetLoginUserInfoOutput
     */
    birthday?: Date | null;

    /**
     * @type {GenderEnum}
     * @memberof GetLoginUserInfoOutput
     */
    sex?: GenderEnum;

    /**
     * 邮箱
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    email?: string | null;

    /**
     * 手机
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    mobile?: string | null;

    /**
     * 电话
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    tel?: string | null;

    /**
     * 部门Id
     *
     * @type {number}
     * @memberof GetLoginUserInfoOutput
     */
    departmentId?: number;

    /**
     * 部门名称
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    departmentName?: string | null;

    /**
     * 是否超级管理员
     *
     * @type {boolean}
     * @memberof GetLoginUserInfoOutput
     */
    isSuperAdmin?: boolean;

    /**
     * 是否系统管理员
     *
     * @type {boolean}
     * @memberof GetLoginUserInfoOutput
     */
    isSystemAdmin?: boolean;

    /**
     * 最后登录设备
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginDevice?: string | null;

    /**
     * 最后登录操作系统（版本）
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginOS?: string | null;

    /**
     * 最后登录浏览器（版本）
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginBrowser?: string | null;

    /**
     * 最后登录省份
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginProvince?: string | null;

    /**
     * 最后登录城市
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginCity?: string | null;

    /**
     * 最后登录Ip
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginIp?: string | null;

    /**
     * 最后登录时间
     *
     * @type {Date}
     * @memberof GetLoginUserInfoOutput
     */
    lastLoginTime?: Date | null;

    /**
     * @type {AppEnvironmentEnum}
     * @memberof GetLoginUserInfoOutput
     */
    appEnvironment?: AppEnvironmentEnum;

    /**
     * App来源
     *
     * @type {string}
     * @memberof GetLoginUserInfoOutput
     */
    appOrigin?: string | null;

    /**
     * 角色名称集合
     *
     * @type {Array<string>}
     * @memberof GetLoginUserInfoOutput
     */
    roleNameList?: Array<string> | null;

    /**
     * 按钮编码集合
     *
     * @type {Array<string>}
     * @memberof GetLoginUserInfoOutput
     */
    buttonCodeList?: Array<string> | null;

    /**
     * 模块集合
     *
     * @type {Array<GetLoginModuleInfoDto>}
     * @memberof GetLoginUserInfoOutput
     */
    moduleList?: Array<GetLoginModuleInfoDto> | null;

    /**
     * 菜单集合
     *
     * @type {Array<GetLoginMenuInfoDto>}
     * @memberof GetLoginUserInfoOutput
     */
    menuList?: Array<GetLoginMenuInfoDto> | null;
}
