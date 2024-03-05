/**
 * Fast.IaaS.HttpRequestActionEnum Http请求行为枚举
 * @export
 * @enum {string}
 */
export enum HttpRequestActionEnum {
    /**
     * 未知
     */
    None = 0,
    /**
     * 鉴权
     */
    Auth = 1,
    /**
     * 分页查询
     */
    Paged = 11,
    /**
     * 查询
     */
    Query = 12,
    /**
     * 添加
     */
    Add = 21,
    /**
     * 批量添加
     */
    BatchAdd = 22,
    /**
     * 更新
     */
    Update = 31,
    /**
     * 批量更新
     */
    BatchUpdate = 32,
    /**
     * 删除
     */
    Delete = 41,
    /**
     * 批量删除
     */
    BatchDelete = 42,
    /**
     * 下载
     */
    Download = 51,
    /**
     * 上传
     */
    Upload = 61,
    /**
     * 导出
     */
    Export = 71,
    /**
     * 导入
     */
    Import = 81,
}
