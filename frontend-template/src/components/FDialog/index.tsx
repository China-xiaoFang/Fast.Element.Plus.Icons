import { SetupContext, defineComponent, ref, reactive, PropType, watch, toRefs } from "vue";
import type { Props, Emits, State } from "./interface";
import "./style/index.scss"
import { ElDialog, ElLoading, ElMessageBox } from "element-plus";
import FIcon from "@/components/FIcon";
import { useI18n } from "vue-i18n";

export default defineComponent({
    name: "FDialog",
    props: {
        width: {
            type: String,
            required: false,
        },
        height: {
            type: String,
            required: false,
        },
        showFullscreen: {
            type: Boolean,
            default: true,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        showCloseButton: {
            type: Boolean,
            default: true,
        },
        showConfirmButton: {
            type: Boolean,
            default: true,
        },
        disabledConfirmButton: {
            type: Boolean,
            default: false,
        },
        closeButtonText: {
            type: String,
            required: false,
        },
        confirmButtonText: {
            type: String,
            required: false,
        },
        showBeforeClose: {
            type: Boolean,
            default: false,
        },
        showFooterOperator: {
            type: Boolean,
            default: true,
        },
        fullscreen: {
            type: Boolean,
            default: false,
        },
        appendToBody: {
            type: Boolean,
            default: true,
        },
        scrollbar: {
            type: Boolean,
            default: true,
        },
        fillHeight: {
            type: Boolean,
            default: true,
        },
        closeCallBack: {
            type: Function as PropType<() => boolean>,
            required: false,
        }
    },
    setup(props: Props, { attrs, slots, emit, expose }: SetupContext<Emits>) {
        const { t } = useI18n();

        const state: State = reactive({
            loading: false,
            visible: false,
            fullscreen: props.fullscreen
        })

        const dialogRef = ref<InstanceType<typeof ElDialog>>();

        let loadingService: any = null;

        watch(() => state.loading, () => {
            if (state.loading) {
                loadingService = ElLoading.service({
                    target: dialogRef.value.dialogRef
                })
            } else {
                loadingService?.close();
            }
        })

        /**
         * 打开
         */
        const open = () => {
            emit("onOpen")
            state.visible = true;
        }

        /**
         * 关闭
         */
        const close = () => {
            emit("onClose");
            state.visible = false;
        }

        /**
         * 关闭回调
         * @param done 
         */
        const closeCallBack = (done: () => void) => {
            if (props.closeCallBack) {
                props.closeCallBack() && done()
            } else {
                done();
            }
        }

        /**
         * 关闭前回调
         * @param done 
         */
        const handleBeforeClose = (done: () => void) => {
            if (props.showBeforeClose) {
                ElMessageBox.confirm(t("components.FDialog.确定关闭？"), { type: "warning" })
                    .then(() => {
                        closeCallBack(done);
                    })
                    .catch(() => {

                    })
                    ;
            } else {
                closeCallBack(done);
            }
        }

        /**
         * 确认按钮点击
         */
        const handleConfirmClick = () => {
            emit("onConfirmClick", state)
        }

        expose({
            element: dialogRef,
            ...toRefs(state),
            open,
            close,
        })

        return () => (
            <el-dialog
                {...attrs}
                ref={dialogRef}
                class={["f-dialog", state.fullscreen ? "f-dialog-fill-height" : ""]}
                style={{ maxHeight: props.height ? props.height : "", maxWidth: props.width ? props.width : "" }}
                v-model={state.visible}
                append-to-body={props.appendToBody}
                fullscreen={state.fullscreen ? true : false}
                before-close={handleBeforeClose}
                draggable
                destroy-on-close
                show-close={false}
            >
                {{
                    header: () => (
                        <>
                            <div class="f-dialog-header">
                                {attrs.title}
                                {slots.header && slots.header()}
                            </div>
                            {
                                props.showFullscreen ? (
                                    <div
                                        title={state.fullscreen ? t("components.FDialog.关闭全屏显示") : t("components.FDialog.全屏显示")}
                                        class="f-dialog-header-icon"
                                        onClick={() => state.fullscreen = !state.fullscreen}
                                    >
                                        <FIcon name={state.fullscreen ? "local-fullscreen-exit" : "local-fullscreen"} />
                                    </div>
                                ) : (null)
                            }
                            {
                                props.showClose ? (
                                    <div
                                        title={t("components.FDialog.关闭")}
                                        class="f-dialog-header-icon"
                                        onClick={close}
                                    >
                                        <FIcon name="el-icon-Close" />
                                    </div>
                                ) : (null)
                            }
                        </>
                    ),
                    default: () => (
                        props.scrollbar ? (
                            <el-scrollbar class="f-dialog-scrollbar">
                                {slots.default && slots.default(state)}
                            </el-scrollbar>
                        ) : (
                            <>
                                {slots.default && slots.default(state)}
                            </>
                        )
                    ),
                    footer: () => (
                        props.showFooterOperator ? (
                            <>
                                {slots.footer && slots.footer(state)}
                                {
                                    props.showCloseButton ? (
                                        <el-button
                                            onClick={close}
                                        >
                                            {t("components.FDialog.取消")}
                                        </el-button>
                                    ) : (null)
                                }
                                {
                                    props.showConfirmButton ? (
                                        <el-button
                                            disabled={props.disabledConfirmButton}
                                            type="primary"
                                            onClick={handleConfirmClick}
                                        >
                                            {t("components.FDialog.确认")}
                                        </el-button>
                                    ) : (null)
                                }
                            </>
                        ) : (null)
                    )
                }}
            </el-dialog>
        );
    },
});
