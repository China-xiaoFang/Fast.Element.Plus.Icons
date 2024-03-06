import "./style/index.scss";
declare const FSvg: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    size: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    color: string;
    size: string;
}, {}>;
export default FSvg;
