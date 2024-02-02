import { HttpRequestActionEnum } from "./enums/http-request-action-enum";
import { HttpRequestMethodEnum } from "./enums/http-request-method-enum";
import { QuerySysApiInfoButtonDto } from "./query-sys-api-info-button-dto";

/**
 * Fast.Admin.Service.System.SysApiInfo.Dto.QuerySysApiInfoDetailOutput 系统接口信息详情输出
 *
 * @export
 * @interface QuerySysApiInfoDetailOutput
 */
export interface QuerySysApiInfoDetailOutput {
    /**
     * @type {number}
     * @memberof QuerySysApiInfoDetailOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysApiInfoDetailOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiInfoDetailOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysApiInfoDetailOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiInfoDetailOutput
     */
    updatedTime?: Date | null;

    /**
     * 接口分组Id
     *
     * @type {number}
     * @memberof QuerySysApiInfoDetailOutput
     */
    apiGroupId?: number;

    /**
     * 模块名称
     *
     * @type {string}
     * @memberof QuerySysApiInfoDetailOutput
     */
    moduleName?: string | null;

    /**
     * 接口地址
     *
     * @type {string}
     * @memberof QuerySysApiInfoDetailOutput
     */
    url?: string | null;

    /**
     * 接口名称
     *
     * @type {string}
     * @memberof QuerySysApiInfoDetailOutput
     */
    name?: string | null;

    /**
     * @type {HttpRequestMethodEnum}
     * @memberof QuerySysApiInfoDetailOutput
     */
    method?: HttpRequestMethodEnum;

    /**
     * @type {HttpRequestActionEnum}
     * @memberof QuerySysApiInfoDetailOutput
     */
    apiAction?: HttpRequestActionEnum;

    /**
     * 按钮集合
     *
     * @type {Array<QuerySysApiInfoButtonDto>}
     * @memberof QuerySysApiInfoDetailOutput
     */
    buttonList?: Array<QuerySysApiInfoButtonDto> | null;
}
