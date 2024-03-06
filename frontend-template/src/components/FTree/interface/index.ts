import { ElTreeOutput } from "@/api/models/el-tree-output";

/**
 * FTreeProps 属性
 * @interface Props
 */
export interface Props<TInput = anyObj, T = number> {
    /**
     * 树形数据
     */
    data?: ElTreeOutput<T>[];
    /**
     * 自动请求
     */
    requestAuto?: boolean;
    /**
     * 初始化请求参数 ==> 非必传（默认为{}）
     */
    initParam?: TInput;
    /**
     * 请求树形数据的api
     * @param params
     */
    requestApi?: (params?: TInput) => ApiPromise<Array<ElTreeOutput<T>>>;
    /**
     * 返回数据的回调函数，可以对数据进行处理 ==> 非必传
     * @param data
     */
    dataCallback?: (data: ElTreeOutput<T>[]) => void;
    /**
     * 标题 ==> 非必传
     */
    title?: string;
    /**
     * 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
     */
    rowKey?: string;
    /**
     * 显示的label ==> 非必传，默认为 “label”
     */
    label?: string;
    /**
     * 默认选中的值 ==> 非必传
     */
    defaultValue?: string | number | string[] | number[];
    /**
     * Tree的宽度 ==> 非必传，默认为 220
     */
    width?: number;
    /**
     * 隐藏全部 ==> 非必传，默认为 false
     */
    hideAll?: boolean;
    /**
     * 隐藏过滤 ==> 非必传，默认为 false
     */
    hideFilter?: boolean;
    /**
     * 全部值 ==> 非必传
     */
    allValue?: number | string | boolean | undefined;
}

/**
 * FTable state 属性
 */
export interface State<TInput = anyObj, T = number> {
    /**
     * 表格加载
     */
    loading: boolean;
    /**
     * 源树形数据
     */
    orgTreeData: ElTreeOutput<T>[];
    /**
     * 树形数据
     */
    treeData: ElTreeOutput<T>[];
    /**
     * 过滤值
     */
    filterValue: string;
    /**
     * 折叠
     */
    hamburger: boolean;
    /**
     * 是否选中数据
     */
    selected: string | number | string[] | number[];
}

/**
 * FTree Emits 属性
 */
export interface Emits {}
