/**
 * Fast.Admin.Core.Outputs.ElSelectorOutput<T> Element-Plus 下拉框通用输出
 *
 * @export
 * @interface ElSelectorOutput<T>
 */
export interface ElSelectorOutput<T> {
    /**
     * 显示
     *
     * @type {string}
     * @memberof ElSelectorOutput<T>
     */
    label?: string | null;
    /**
     * 值
     *
     * @type {T}
     * @memberof ElSelectorOutput<T>
     */
    value?: T;
    /**
     * 禁用
     *
     * @type {boolean}
     * @memberof ElSelectorOutput<T>
     */
    disabled?: boolean | null;
    /**
     * 子节点
     *
     * @type {Array<ElSelectorOutput<T>>}
     * @memberof ElSelectorOutput<T>
     */
    children?: Array<ElSelectorOutput<T>> | null;
    /**
     * 附加数据
     *
     * @type {any}
     * @memberof ElSelectorOutput<T>
     */
    data?: any | null;
}
