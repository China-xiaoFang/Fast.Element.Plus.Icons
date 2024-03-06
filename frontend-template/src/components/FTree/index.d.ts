import { PropType } from "vue";
import "./style/index.scss";
declare const FTree: import("vue").DefineComponent<{
    data: {
        type: PropType<anyObj[]>;
        default: any[];
    };
    requestAuto: {
        type: BooleanConstructor;
        default: boolean;
    };
    initParam: {
        type: PropType<anyObj>;
        default: {};
    };
    requestApi: {
        type: PropType<(params: anyObj) => ApiPromise<anyObj[]>>;
        require: boolean;
    };
    dataCallback: {
        type: PropType<(data: anyObj) => void>;
        require: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    defaultValue: {
        type: PropType<string | number | string[] | number[]>;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    hideAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    allValue: {
        type: PropType<string | number | boolean>;
        default: any;
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
        type: PropType<anyObj>;
        default: {};
    };
    requestApi: {
        type: PropType<(params: anyObj) => ApiPromise<anyObj[]>>;
        require: boolean;
    };
    dataCallback: {
        type: PropType<(data: anyObj) => void>;
        require: boolean;
    };
    title: {
        type: StringConstructor;
        default: string;
    };
    rowKey: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
        default: string;
    };
    defaultValue: {
        type: PropType<string | number | string[] | number[]>;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
    hideAll: {
        type: BooleanConstructor;
        default: boolean;
    };
    hideFilter: {
        type: BooleanConstructor;
        default: boolean;
    };
    allValue: {
        type: PropType<string | number | boolean>;
        default: any;
    };
}>>, {
    data: anyObj[];
    width: number;
    label: string;
    title: string;
    defaultValue: string | number | string[] | number[];
    rowKey: string;
    requestAuto: boolean;
    initParam: anyObj;
    hideAll: boolean;
    hideFilter: boolean;
    allValue: string | number | boolean;
}, {}>;
export default FTree;
