/**
 * Fast.Admin.Service.System.SysConfig.Dto.QuerySysConfigDetailOutput 系统配置详情输出
 *
 * @export
 * @interface QuerySysConfigDetailOutput
 */
export interface QuerySysConfigDetailOutput {
    /**
     * @type {number}
     * @memberof QuerySysConfigDetailOutput
     */
    id?: number;

    /**
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    createdUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysConfigDetailOutput
     */
    createdTime?: Date | null;

    /**
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    updatedUserName?: string | null;

    /**
     * @type {Date}
     * @memberof QuerySysConfigDetailOutput
     */
    updatedTime?: Date | null;

    /**
     * 编码
     *
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    code?: string | null;

    /**
     * 名称
     *
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    name?: string | null;

    /**
     * 值
     *
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    value?: string | null;

    /**
     * 描述
     *
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    description?: string | null;

    /**
     * 备注
     *
     * @type {string}
     * @memberof QuerySysConfigDetailOutput
     */
    remark?: string | null;
}
