/**
 * Fast.Admin.Core.Outputs.ElSelectorOutput Element-Plus 下拉框通用输出
 *
 * @export
 * @interface ElSelectorOutput
 */
export interface ElSelectorOutput {
    /**
     * 显示
     *
     * @type {string}
     * @memberof ElSelectorOutput
     */
    label?: string | null;

    /**
     * 值
     *
     * @type {any}
     * @memberof ElSelectorOutput
     */
    value?: any | null;

    /**
     * 附加数据
     *
     * @type {any}
     * @memberof ElSelectorOutput
     */
    data?: any | null;

    /**
     * 子节点
     *
     * @type {Array<ElSelectorOutput>}
     * @memberof ElSelectorOutput
     */
    children?: Array<ElSelectorOutput> | null;
}
