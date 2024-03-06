import { FTableEnumColumn } from "@/components/FTable/interface";
import { AppEnvironmentEnum } from "../enums/app-environment-enum";

/**
 *
 * @export
 * @enum {string}
 */
export const AppEnvironmentDict: FTableEnumColumn[] = [
    {
        label: "网页",
        value: AppEnvironmentEnum.Web,
    },
    {
        label: "Pc",
        value: AppEnvironmentEnum.PC,
    },
    {
        label: "微信小程序",
        value: AppEnvironmentEnum.WeChatMiniProgram,
    },
    {
        label: "安卓App",
        value: AppEnvironmentEnum.AndroidApp,
    },
    {
        label: "IOSApp",
        value: AppEnvironmentEnum.IOSApp,
    },
    {
        label: "其他",
        value: AppEnvironmentEnum.Other,
    },
];
