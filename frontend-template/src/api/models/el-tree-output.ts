/**
 * Fast.Admin.Core.Outputs.ElTreeOutput<T> Element-Plus 树形通用输出
 *
 * @export
 * @interface ElTreeOutput<T>
 */
export interface ElTreeOutput<T> {
    /**
     * 值
     *
     * @type {T}
     * @memberof ElTreeOutput<T>
     */
    value?: T;
    /**
     * 显示
     *
     * @type {string}
     * @memberof ElTreeOutput<T>
     */
    label?: string | null;
    /**
     * 禁用
     *
     * @type {boolean}
     * @memberof ElTreeOutput<T>
     */
    disabled?: boolean | null;
    /**
     * 子节点
     *
     * @type {Array<ElTreeOutput<T>>}
     * @memberof ElTreeOutput<T>
     */
    children?: Array<ElTreeOutput<T>> | null;
    /**
     * 附加数据
     *
     * @type {any}
     * @memberof ElTreeOutput<T>
     */
    data?: any | null;
    /**
     * 显示数量
     *
     * @type {boolean}
     * @memberof ElTreeOutput<T>
     */
    showNum?: boolean | null;
    /**
     * 数量
     *
     * @type {number}
     * @memberof ElTreeOutput<T>
     */
    quantity?: number | null;
}
