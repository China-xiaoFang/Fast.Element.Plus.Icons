import { PropType } from "vue";
import type { FTableColumn } from '../../interface';
declare const SearchFormItem: import("vue").DefineComponent<{
    column: {
        type: PropType<FTableColumn<anyObj>>;
        require: boolean;
    };
    searchParam: {
        type: PropType<anyObj>;
        require: boolean;
    };
    search: {
        type: PropType<() => void>;
        require: boolean;
    };
}, () => any, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, import("vue").EmitsOptions, string, import("vue").PublicProps, Readonly<import("vue").ExtractPropTypes<{
    column: {
        type: PropType<FTableColumn<anyObj>>;
        require: boolean;
    };
    searchParam: {
        type: PropType<anyObj>;
        require: boolean;
    };
    search: {
        type: PropType<() => void>;
        require: boolean;
    };
}>>, {}, {}>;
export default SearchFormItem;
