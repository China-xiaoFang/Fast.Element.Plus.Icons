import { FTableEnumColumn } from "@/components/FTable/interface";
import { HttpRequestMethodEnum } from "../enums/http-request-method-enum";

/**
 * Fast.IaaS.HttpRequestMethodEnum Http请求方式枚举
 * @export
 * @enum {string}
 */
export const HttpRequestMethodDict: FTableEnumColumn[] = [
    {
        label: "Get请求",
        value: HttpRequestMethodEnum.Get,
    },
    {
        label: "Post请求",
        value: HttpRequestMethodEnum.Post,
    },
    {
        label: "Put请求",
        value: HttpRequestMethodEnum.Put,
    },
    {
        label: "Delete请求",
        value: HttpRequestMethodEnum.Delete,
    },
    {
        label: "Patch请求",
        value: HttpRequestMethodEnum.Patch,
    },
    {
        label: "Head请求",
        value: HttpRequestMethodEnum.Head,
    },
    {
        label: "Options请求",
        value: HttpRequestMethodEnum.Options,
    },
    {
        label: "Connect请求",
        value: HttpRequestMethodEnum.Connect,
    },
    {
        label: "Trace请求",
        value: HttpRequestMethodEnum.Trace,
    },
];
