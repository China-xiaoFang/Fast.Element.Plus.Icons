import { HttpRequestActionEnum } from "@/api/enums/http-request-action-enum";
import { HttpRequestMethodEnum } from "@/api/enums/http-request-method-enum";
import { QuerySysApiInfoButtonDto } from "./query-sys-api-info-button-dto";

/**
 * Fast.Admin.Service.System.SysApiInfo.Dto.QuerySysApiInfoPagedOutput 系统接口信息分页输出
 *
 * @export
 * @interface QuerySysApiInfoPagedOutput
 */
export interface QuerySysApiInfoPagedOutput {
    /**
     * @type {number}
     * @memberof QuerySysApiInfoPagedOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysApiInfoPagedOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiInfoPagedOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysApiInfoPagedOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiInfoPagedOutput
     */
    updatedTime?: Date | null;

    /**
     * 接口分组Id
     *
     * @type {number}
     * @memberof QuerySysApiInfoPagedOutput
     */
    apiGroupId?: number;

    /**
     * 模块名称
     *
     * @type {string}
     * @memberof QuerySysApiInfoPagedOutput
     */
    moduleName?: string | null;

    /**
     * 接口地址
     *
     * @type {string}
     * @memberof QuerySysApiInfoPagedOutput
     */
    url?: string | null;

    /**
     * 接口名称
     *
     * @type {string}
     * @memberof QuerySysApiInfoPagedOutput
     */
    name?: string | null;

    /**
     * @type {HttpRequestMethodEnum}
     * @memberof QuerySysApiInfoPagedOutput
     */
    method?: HttpRequestMethodEnum;

    /**
     * @type {HttpRequestActionEnum}
     * @memberof QuerySysApiInfoPagedOutput
     */
    apiAction?: HttpRequestActionEnum;

    /**
     * 按钮集合
     *
     * @type {Array<QuerySysApiInfoButtonDto>}
     * @memberof QuerySysApiInfoPagedOutput
     */
    buttonList?: Array<QuerySysApiInfoButtonDto> | null;
}
