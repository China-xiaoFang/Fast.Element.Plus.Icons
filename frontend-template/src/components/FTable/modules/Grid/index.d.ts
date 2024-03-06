import { PropType } from "vue";
import type { FTableBreakPoint } from "../../interface";
export declare const Grid: import("vue").DefineComponent<{
    cols: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: () => {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
    };
    collapsed: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapsedRows: {
        type: NumberConstructor;
        default: number;
    };
    gap: {
        type: PropType<number | [number, number]>;
        default: number;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    cols: {
        type: PropType<number | Record<FTableBreakPoint, number>>;
        default: () => {
            xs: number;
            sm: number;
            md: number;
            lg: number;
            xl: number;
        };
    };
    collapsed: {
        type: BooleanConstructor;
        default: boolean;
    };
    collapsedRows: {
        type: NumberConstructor;
        default: number;
    };
    gap: {
        type: PropType<number | [number, number]>;
        default: number;
    };
}>>, {
    gap: number | [number, number];
    cols: number | Record<FTableBreakPoint, number>;
    collapsed: boolean;
    collapsedRows: number;
}, {}>;
