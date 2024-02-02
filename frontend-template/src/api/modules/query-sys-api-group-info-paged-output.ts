/**
 * Fast.Admin.Service.System.SysApiGroupInfo.Dto.QuerySysApiGroupInfoPagedOutput 系统接口分组信息分页输出
 *
 * @export
 * @interface QuerySysApiGroupInfoPagedOutput
 */
export interface QuerySysApiGroupInfoPagedOutput {
    /**
     * @type {number}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    updatedTime?: Date | null;

    /**
     * 分组名称
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    name?: string | null;

    /**
     * 分组标题
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    title?: string | null;

    /**
     * 分组描述
     *
     * @type {string}
     * @memberof QuerySysApiGroupInfoPagedOutput
     */
    description?: string | null;
}
