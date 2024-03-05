import { YesOrNotEnum } from "@/api/enums/yes-or-not-enum";

/**
 * Fast.Admin.Service.Authentication.Auth.Dto.GetLoginUserInfoOutput.GetLoginModuleInfoDto 获取登录模块信息
 *
 * @export
 * @interface GetLoginModuleInfoDto
 */
export interface GetLoginModuleInfoDto {
    /**
     * 模块Id
     *
     * @type {number}
     * @memberof GetLoginModuleInfoDto
     */
    id?: number;

    /**
     * 模块名称
     *
     * @type {string}
     * @memberof GetLoginModuleInfoDto
     */
    moduleName?: string | null;

    /**
     * 颜色
     *
     * @type {string}
     * @memberof GetLoginModuleInfoDto
     */
    color?: string | null;

    /**
     * 图标
     *
     * @type {string}
     * @memberof GetLoginModuleInfoDto
     */
    icon?: string | null;

    /**
     * @type {YesOrNotEnum}
     * @memberof GetLoginModuleInfoDto
     */
    isDefault?: YesOrNotEnum;
}
