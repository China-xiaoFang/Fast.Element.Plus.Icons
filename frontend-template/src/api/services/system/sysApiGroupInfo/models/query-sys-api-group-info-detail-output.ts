/**
 * Fast.Admin.Service.System.SysApiGroupInfo.Dto.QuerySysApiGroupInfoDetailOutput 系统接口分组详情输出
 *
 * @export
 * @interface QuerySysApiGroupInfoDetailOutput
 */
export interface QuerySysApiGroupInfoDetailOutput {
    /**
     * @type {number}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    updatedTime?: Date | null;

    /**
     * 分组名称
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    name?: string | null;

    /**
     * 分组标题
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    title?: string | null;

    /**
     * 分组描述
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoDetailOutput
     */
    description?: string | null;
}
