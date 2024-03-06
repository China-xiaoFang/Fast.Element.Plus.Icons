import { PropType } from "vue";
import type { FTableColumn, FTableBreakPoint } from "../../interface";
declare const SearchForm: import("vue").DefineComponent<{
    loading: BooleanConstructor;
    columns: {
        type: PropType<FTableColumn<anyObj>[]>;
        default: any[];
    };
    searchParam: {
        type: PropType<anyObj>;
        default: {};
    };
    searchFormColumns: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: {};
    };
    search: PropType<() => void>;
    reset: PropType<() => void>;
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    loading: BooleanConstructor;
    columns: {
        type: PropType<FTableColumn<anyObj>[]>;
        default: any[];
    };
    searchParam: {
        type: PropType<anyObj>;
        default: {};
    };
    searchFormColumns: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: {};
    };
    search: PropType<() => void>;
    reset: PropType<() => void>;
}>>, {
    columns: FTableColumn<anyObj>[];
    loading: boolean;
    searchParam: anyObj;
    searchFormColumns: number | Record<FTableBreakPoint, number>;
}, {}>;
export default SearchForm;
