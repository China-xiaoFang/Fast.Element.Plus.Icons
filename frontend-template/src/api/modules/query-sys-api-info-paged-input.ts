import { HttpRequestActionEnum } from "./enums/http-request-action-enum";
import { HttpRequestMethodEnum } from "./enums/http-request-method-enum";

/**
 * Fast.Admin.Service.System.SysApiInfo.Dto.QuerySysApiInfoPagedInput 系统接口信息分页输入
 *
 * @export
 * @interface QuerySysApiInfoPagedInput
 */
export interface QuerySysApiInfoPagedInput {
    /**
     * @type {number}
     * @memberof QuerySysApiInfoPagedInput
     */
    pageIndex?: number;

    /**
     * @type {number}
     * @memberof QuerySysApiInfoPagedInput
     */
    pageSize?: number;

    /**
     * @type {string}
     * @memberof QuerySysApiInfoPagedInput
     */
    searchValue?: string | null;

    /**
     * @type {Array<Date>}
     * @memberof QuerySysApiInfoPagedInput
     */
    searchTimeList?: Array<Date> | null;

    /**
     * @type {Array<PagedSortInput>}
     * @memberof QuerySysApiInfoPagedInput
     */
    pagedSortList?: Array<PagedSortInput> | null;

    /**
     * @type {boolean}
     * @memberof QuerySysApiInfoPagedInput
     */
    enablePaged?: boolean;

    /**
     * 接口分组Id
     *
     * @type {number}
     * @memberof QuerySysApiInfoPagedInput
     */
    apiGroupId?: number | null;

    /**
     * @type {HttpRequestMethodEnum}
     * @memberof QuerySysApiInfoPagedInput
     */
    method?: HttpRequestMethodEnum;

    /**
     * @type {HttpRequestActionEnum}
     * @memberof QuerySysApiInfoPagedInput
     */
    apiAction?: HttpRequestActionEnum;
}
