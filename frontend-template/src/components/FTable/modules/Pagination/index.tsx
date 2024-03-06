import { defineComponent, PropType } from "vue";
import type { FTablePaginationProps } from "../../interface";

export const Pagination = defineComponent({
    name: "Pagination",
    props: {
        handleSizeChange: {
            type: Function as PropType<(size: number) => void>,
            require: true,
        },
        handleCurrentChange: {
            type: Function as PropType<(currentPage: number) => void>,
            require: true,
        },
        pageIndex: {
            type: Number,
            require: true,
        },
        pageSize: {
            type: Number,
            require: true,
        },
        totalRows: {
            type: Number,
            require: true,
        },
    },
    setup(props: FTablePaginationProps) {
        return () => (
            <el-pagination
                v-model:currentPage={props.pageIndex}
                v-model:pageSize={props.pageSize}
                page-sizes={[10, 20, 30, 50, 100]}
                background={true}
                layout="jumper, prev, pager, next, sizes, total"
                total={props.totalRows}
                size-change={props.handleSizeChange}
                current-change={props.handleCurrentChange}
            />
        );
    },
});
