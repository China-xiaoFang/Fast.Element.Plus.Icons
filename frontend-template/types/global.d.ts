/**
 * 拓展 Window 对象
 * @interface Window
 */
interface Window {
    /**
     * 是否存在 Loading
     * @type {boolean}
     * @memberof Window
     */
    existLoading: boolean;
    /**
     * 加载语言包句柄
     * @type {Record<string, any>}
     * @memberof Window
     */
    loadLangHandle: Record<string, any>;
    /**
     * 懒加载时间
     * @type {number}
     * @memberof Window
     */
    lazy: number;
}

/**
 * 匿名对象
 * @interface anyObj
 */
interface anyObj {
    [key: string]: any;
}

/**
 * 请求加密输入
 * @interface RequestDecryptInput
 */
interface RequestDecryptInput {
    /**
     * 请求数据
     * @type {string}
     * @memberof RequestDecryptInput
     */
    data: string;
    /**
     * 时间戳
     * @description 一定要是毫秒时间戳，13位
     * @type {number}
     * @memberof RequestDecryptInput
     */
    timestamp: number;
}

/**
 * Api 响应对象
 * @interface ApiResponse
 */
interface ApiResponse<T = any> {
    /**
     * 执行成功
     * @type {boolean}
     * @memberof ApiResponse
     */
    success: boolean;
    /**
     * 状态码
     * @type {number}
     * @memberof ApiResponse
     */
    code: number;
    /**
     * 错误信息
     * @type {string}
     * @memberof ApiResponse
     */
    message: string;
    /**
     * 数据
     * @type {T}
     * @memberof ApiResponse
     */
    data: T;
    /**
     * 时间戳
     * @type {number}
     * @memberof ApiResponse
     */
    timestamp: number;
}

/**
 * Api Promise
 */
type ApiPromise<T = any> = Promise<ApiResponse<T>>;

/**
 * 分页返回结果
 * @interface PagedResult
 */
interface PagedResult<T = any> {
    /**
     * 当前页
     * @type {number}
     * @memberof PagedResult
     */
    pageIndex: number;
    /**
     * 当前页码
     * @type {number}
     * @memberof PagedResult
     */
    pageSize: number;
    /**
     * 总页数
     * @type {number}
     * @memberof PagedResult
     */
    totalPage?: number;
    /**
     * 总条数
     * @type {number}
     * @memberof PagedResult
     */
    totalRows: number;
    /**
     * Data
     * @type {Array<T>}
     * @memberof PagedResult
     */
    rows?: Array<T> | null;
    /**
     * 是否有上一页
     * @type {boolean}
     * @memberof PagedResult
     */
    hasPrevPages?: boolean;
    /**
     * 是否有下一页
     * @type {boolean}
     * @memberof PagedResult
     */
    hasNextPages?: boolean;
}

/**
 * 通用分页排序
 * @interface PagedSortInput
 */
interface PagedSortInput {
    /**
     * 排序字段英文
     * @type {string}
     * @memberof PagedSortInput
     */
    enField?: string | null;
    /**
     * 排序字段中文
     * @type {string}
     * @memberof PagedSortInput
     */
    cnField?: string | null;
    /**
     * 排序方法
     * @type {string}
     * @memberof PagedSortInput
     */
    mode?: "ascending" | "descending" | null;
}

/**
 * 通用搜索输入
 * @interface PagedInput
 */
interface PagedInput {
    /**
     * 当前页面索引值，默认为1
     * @type {number}
     * @memberof PagedInput
     */
    pageIndex?: number;
    /**
     * 页码容量
     * @type {number}
     * @memberof PagedInput
     */
    pageSize?: number;
    /**
     * 搜索值
     * @type {string}
     * @memberof PagedInput
     */
    searchValue?: string | null;
    /**
     * 搜索时间
     * @type {Array<Date>}
     * @memberof PagedInput
     */
    searchTimeList?: Array<Date> | null;
    /**
     * 排序集合
     * @type {Array<PagedSortInput>}
     * @memberof PagedInput
     */
    pageSortList?: Array<PagedSortInput> | null;
    /**
     * 启用分页
     * @type {boolean}
     * @memberof PagedInput
     */
    enablePaged?: boolean;
}
