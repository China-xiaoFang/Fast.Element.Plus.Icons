import { PropType } from "vue";
import "./style/index.scss";
export declare const FDialog: import("vue").DefineComponent<{
    width: {
        type: StringConstructor;
        required: false;
    };
    height: {
        type: StringConstructor;
        required: false;
    };
    showFullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCloseButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeButtonText: {
        type: StringConstructor;
        required: false;
    };
    confirmButtonText: {
        type: StringConstructor;
        required: false;
    };
    showBeforeClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFooterOperator: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    fillHeight: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeCallBack: {
        type: PropType<() => boolean>;
        required: false;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    width: {
        type: StringConstructor;
        required: false;
    };
    height: {
        type: StringConstructor;
        required: false;
    };
    showFullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    showClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    showCloseButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    disabledConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeButtonText: {
        type: StringConstructor;
        required: false;
    };
    confirmButtonText: {
        type: StringConstructor;
        required: false;
    };
    showBeforeClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    showFooterOperator: {
        type: BooleanConstructor;
        default: boolean;
    };
    fullscreen: {
        type: BooleanConstructor;
        default: boolean;
    };
    appendToBody: {
        type: BooleanConstructor;
        default: boolean;
    };
    scrollbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    fillHeight: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeCallBack: {
        type: PropType<() => boolean>;
        required: false;
    };
}>>, {
    scrollbar: boolean;
    showClose: boolean;
    appendToBody: boolean;
    fullscreen: boolean;
    showFullscreen: boolean;
    showCloseButton: boolean;
    showConfirmButton: boolean;
    disabledConfirmButton: boolean;
    showBeforeClose: boolean;
    showFooterOperator: boolean;
    fillHeight: boolean;
}, {}>;
