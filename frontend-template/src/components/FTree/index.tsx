import { defineComponent, ref, reactive, PropType, SetupContext, onMounted, watch, toRefs } from "vue";
import type { Props, State, Emits } from "./interface";
import { ElTree } from "element-plus";
import "./style/index.scss"
import { useI18n } from "vue-i18n";
import { FIcon } from "@/components";
import { ElTreeOutput } from "@/api/models/el-tree-output";

export const FTree = defineComponent({
    name: "FTree",
    props: {
        data: {
            type: Array as PropType<ElTreeOutput<any>[]>,
            default: []
        },
        requestAuto: {
            type: Boolean,
            default: true
        },
        initParam: {
            type: Object as PropType<anyObj>,
            default: {},
        },
        requestApi: {
            type: Function as PropType<(params?: anyObj) => ApiPromise<Array<ElTreeOutput<any>>>>,
            require: false
        },
        dataCallback: {
            type: Function as PropType<(data: ElTreeOutput<any>[]) => void>,
            require: false
        },
        title: {
            type: String,
            default: "",
        },
        rowKey: {
            type: String,
            default: "id",
        },
        label: {
            type: String,
            default: "label",
        },
        defaultValue: {
            type: Object as PropType<string | number | string[] | number[]>,
            default: {},
        },
        width: {
            type: Number,
            default: 220,
        },
        hideAll: {
            type: Boolean,
            default: false,
        },
        hideFilter: {
            type: Boolean,
            default: false,
        },
        allValue: {
            type: Object as PropType<number | string | boolean | undefined>,
            default: undefined,
        }
    },
    setup(props: Props, { attrs, slots, emit, expose }: SetupContext<Emits>) {
        const { t } = useI18n();

        const state: State = reactive({
            loading: false,
            orgTreeData: [],
            treeData: [],
            filterValue: "",
            hamburger: false,
            selected: undefined,
        })

        // el-tree Dom 元素
        const treeRef = ref<InstanceType<typeof ElTree>>();

        /**
         * 设置树形数据
         * @param treeData 
         */
        const setTreeData = (treeData: anyObj[]) => {
            // 判断是否显示全部
            if (props.hideAll) {
                state.treeData = treeData;
            } else {
                state.treeData = [{ [props.rowKey]: props.allValue, [props.label]: "全部", isAll: true }, ...treeData];
            }
        }

        /**
         * 刷新树形
         */
        const refreshTree = (requestParam?: anyObj) => {
            if (props.requestApi === undefined) {
                throw new Error("如果需要加载FTree数据，那么参数 requestApi 是必须的！");
            }
            // 记录原先选中的值
            const curSelectedData = treeRef.value.getCurrentKey();

            state.loading = true;
            requestParam = { ...requestParam, ...props.initParam };
            props.requestApi(requestParam).then(res => {
                if (res.success) {
                    props.dataCallback && props.dataCallback(res.data);
                    state.orgTreeData = res.data;
                    setTreeData(res.data);
                }
            }).catch(() => {
                setTreeData([]);
            }).finally(() => {
                // 设置原先选中的值
                treeRef.value.setCurrentKey(curSelectedData);
                state.loading = false;
            })
        };

        /**
         * 树形折叠点击
         */
        const handleHamburgerClick = () => {
            if (state.hamburger) {
                setTreeData(state.orgTreeData);
            } else {
                // 折叠只显示一级数据
                let treeData = [];
                state.orgTreeData.forEach(item => {
                    treeData.push({
                        [props.rowKey]: item[props.rowKey],
                        [props.label]: item[props.label]
                    });
                })
                setTreeData(treeData);
            }
            state.hamburger = !state.hamburger;
        }

        /**
         * 树形节点过滤
         * @param value 
         * @param data 
         * @param node 
         * @returns 
         */
        const handleFilterNode = (value, data, node) => {
            if (!value) return true;
            let parentNode = node.parent,
                labels = [node.label],
                level = 1;
            while (level < node.level) {
                labels = [...labels, parentNode.label];
                parentNode = parentNode.parent;
                level++;
            }
            return labels.some(label => label.indexOf(value) !== -1);
        }

        /**
         * 页面渲染
         * 初始化请求
         */
        onMounted(() => {
            if (props.requestAuto) {
                refreshTree();
            }
            // 设置默认选中的值
            state.selected = props.defaultValue;
        });

        /**
         * 监听事件
         * 监听非 API 请求的 Tree Data
         */
        watch(
            () => props.data,
            () => {
                state.orgTreeData = props.data;
                setTreeData(props.data);
            },
            { deep: true, immediate: true }
        );

        /**
         * 监听过滤
         */
        watch(
            () => state.filterValue,
            () => {
                treeRef.value.filter(state.filterValue);
            }
        )

        // 暴漏出去的方法
        expose({
            element: treeRef,
            ...toRefs(state),
            refreshTree
        });

        return () => (
            <div
                class={["f-tree el-card", state.hamburger ? "fold" : ""]}
                style={{ width: `${state.hamburger ? 130 : props.width}px` }}
                v-loading={state.loading}
            >
                <div class="f-tree-title" onChange={handleHamburgerClick}>
                    <h4>{props.title}</h4>
                    <FIcon
                        size="20"
                        name={state.hamburger ? 'fa fa-indent' : 'fa fa-dedent'}
                    />
                </div>
                {
                    props.hideFilter ? (null) : (
                        <el-input
                            v-model={state.filterValue}
                            placeholder={state.hamburger ? t("components.FTree.关键字过滤") : t("components.FTree.输入关键字进行过滤")}
                            clearable={true}
                        />
                    )
                }
                <el-scrollbar style={{ height: props.title ? `calc(100% - 95px)` : `calc(100% - 56px)` }}>
                    <el-tree
                        {...attrs}
                        ref={treeRef}
                        default-expand-all={true}
                        node-key={props.rowKey}
                        data={state.treeData}
                        current-node-key={state.selected}
                        highlight-current={true}
                        expand-on-click-node={false}
                        check-on-click-node={true}
                        filter-node-method={handleFilterNode}
                    >
                        {{
                            default: ({ node, data }) => (
                                <span class="el-tree-node__label" title={node.label}>
                                    <span>
                                        {slots.label ? (
                                            slots.label({ node, data })
                                        ) : (
                                            <>
                                                {node.label}
                                            </>
                                        )}
                                    </span>
                                    <span>
                                        {slots.default ? (
                                            slots.default({ node, data })
                                        ) : (null)}
                                    </span>
                                </span>
                            )
                        }}
                    </el-tree>
                </el-scrollbar>
            </div>
        )
    },
});

