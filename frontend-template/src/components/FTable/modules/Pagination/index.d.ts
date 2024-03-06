import { PropType } from "vue";
declare const Pagination: import("vue").DefineComponent<{
    handleSizeChange: {
        type: PropType<(size: number) => void>;
        require: boolean;
    };
    handleCurrentChange: {
        type: PropType<(currentPage: number) => void>;
        require: boolean;
    };
    pageIndex: {
        type: NumberConstructor;
        require: boolean;
    };
    pageSize: {
        type: NumberConstructor;
        require: boolean;
    };
    totalRows: {
        type: NumberConstructor;
        require: boolean;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    handleSizeChange: {
        type: PropType<(size: number) => void>;
        require: boolean;
    };
    handleCurrentChange: {
        type: PropType<(currentPage: number) => void>;
        require: boolean;
    };
    pageIndex: {
        type: NumberConstructor;
        require: boolean;
    };
    pageSize: {
        type: NumberConstructor;
        require: boolean;
    };
    totalRows: {
        type: NumberConstructor;
        require: boolean;
    };
}>>, {}, {}>;
export default Pagination;
