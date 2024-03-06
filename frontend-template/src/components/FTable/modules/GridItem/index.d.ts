import { PropType } from "vue";
import type { FTableResponsive } from "../../interface";
declare const GridItem: import("vue").DefineComponent<{
    offset: {
        type: NumberConstructor;
        default: number;
    };
    span: {
        type: NumberConstructor;
        default: number;
    };
    suffix: {
        type: BooleanConstructor;
        default: boolean;
    };
    xs: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    sm: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    md: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    lg: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    xl: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    offset: {
        type: NumberConstructor;
        default: number;
    };
    span: {
        type: NumberConstructor;
        default: number;
    };
    suffix: {
        type: BooleanConstructor;
        default: boolean;
    };
    xs: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    sm: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    md: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    lg: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
    xl: {
        type: PropType<FTableResponsive>;
        require: boolean;
    };
}>>, {
    offset: number;
    span: number;
    suffix: boolean;
}, {}>;
export default GridItem;
