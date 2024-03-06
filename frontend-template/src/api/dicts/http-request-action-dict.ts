import { FTableEnumColumn } from "@/components/FTable/interface";
import { HttpRequestActionEnum } from "../enums/http-request-action-enum";

/**
 * Fast.IaaS.HttpRequestActionEnum Http请求行为枚举
 * @export
 * @enum {string}
 */
export const HttpRequestActionDict: FTableEnumColumn[] = [
    {
        label: "未知",
        value: HttpRequestActionEnum.None,
    },
    {
        label: "鉴权",
        value: HttpRequestActionEnum.Auth,
    },
    {
        label: "分页查询",
        value: HttpRequestActionEnum.Paged,
    },
    {
        label: "查询",
        value: HttpRequestActionEnum.Query,
    },
    {
        label: "添加",
        value: HttpRequestActionEnum.Add,
    },
    {
        label: "批量添加",
        value: HttpRequestActionEnum.BatchAdd,
    },
    {
        label: "更新",
        value: HttpRequestActionEnum.Update,
    },
    {
        label: "批量更新",
        value: HttpRequestActionEnum.BatchUpdate,
    },
    {
        label: "删除",
        value: HttpRequestActionEnum.Delete,
    },
    {
        label: "批量删除",
        value: HttpRequestActionEnum.BatchDelete,
    },
    {
        label: "下载",
        value: HttpRequestActionEnum.Download,
    },
    {
        label: "上传",
        value: HttpRequestActionEnum.Upload,
    },
    {
        label: "导出",
        value: HttpRequestActionEnum.Export,
    },
    {
        label: "导入",
        value: HttpRequestActionEnum.Import,
    },
];
