import { PropType } from "vue";
import type { FTableColumn, FTableBreakPoint } from "./interface";
import "./style/index.scss";
declare const FTable: import("vue").DefineComponent<{
    data: {
        type: PropType<anyObj[]>;
        default: any[];
    };
    requestAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    initParam: {
        type: PropType<any>;
        default: {};
    };
    requestApi: {
        type: PropType<(params: PagedInput & anyObj) => ApiPromise<PagedResult<anyObj>> | ApiPromise<Array<anyObj>>>;
        require: boolean;
    };
    dataCallback: {
        type: PropType<(data: anyObj) => void>;
        require: boolean;
    };
    columns: {
        type: PropType<FTableColumn<anyObj>[]>;
        default: any[];
    };
    pagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchFormColumns: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: () => {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    showSearchForm: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeaderCard: {
        type: BooleanConstructor;
        default: boolean;
    };
    showRefreshBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSearchBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    showColumnBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    toolButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeData: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeChildrenName: {
        type: StringConstructor;
        default: string;
    };
    singleChoice: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<anyObj[]>;
        default: any[];
    };
    requestAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    initParam: {
        type: PropType<any>;
        default: {};
    };
    requestApi: {
        type: PropType<(params: PagedInput & anyObj) => ApiPromise<PagedResult<anyObj>> | ApiPromise<Array<anyObj>>>;
        require: boolean;
    };
    dataCallback: {
        type: PropType<(data: anyObj) => void>;
        require: boolean;
    };
    columns: {
        type: PropType<FTableColumn<anyObj>[]>;
        default: any[];
    };
    pagination: {
        type: BooleanConstructor;
        default: boolean;
    };
    searchFormColumns: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: () => {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    showSearchForm: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeaderCard: {
        type: BooleanConstructor;
        default: boolean;
    };
    showRefreshBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSearchBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    showColumnBtn: {
        type: BooleanConstructor;
        default: boolean;
    };
    toolButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeData: {
        type: BooleanConstructor;
        default: boolean;
    };
    treeChildrenName: {
        type: StringConstructor;
        default: string;
    };
    singleChoice: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    data: anyObj[];
    columns: FTableColumn<anyObj>[];
    rowKey: string;
    searchFormColumns: number | Record<FTableBreakPoint, number>;
    requestAuto: boolean;
    initParam: any;
    pagination: boolean;
    showSearchForm: boolean;
    showHeaderCard: boolean;
    showRefreshBtn: boolean;
    showSearchBtn: boolean;
    showColumnBtn: boolean;
    toolButton: boolean;
    treeData: boolean;
    treeChildrenName: string;
    singleChoice: boolean;
}, {}>;
export default FTable;
