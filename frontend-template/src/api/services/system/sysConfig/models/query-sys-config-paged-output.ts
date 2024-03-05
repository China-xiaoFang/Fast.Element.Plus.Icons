/**
 * Fast.Admin.Service.System.SysConfig.Dto.QuerySysConfigPagedOutput 系统配置分页输出
 *
 * @export
 * @interface QuerySysConfigPagedOutput
 */
export interface QuerySysConfigPagedOutput {
    /**
     * @type {number}
     * @memberof QuerySysConfigPagedOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysConfigPagedOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysConfigPagedOutput
     */
    updatedTime?: Date | null;

    /**
     * 编码
     *
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    code?: string | null;

    /**
     * 名称
     *
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    name?: string | null;

    /**
     * 值
     *
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    value?: string | null;

    /**
     * 描述
     *
     * @type {string}
     * @memberof QuerySysConfigPagedOutput
     */
    description?: string | null;
}
