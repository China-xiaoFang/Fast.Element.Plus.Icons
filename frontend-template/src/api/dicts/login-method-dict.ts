import { FTableEnumColumn } from "@/components/FTable/interface";
import { LoginMethodEnum } from "../enums/login-method-enum";

/**
 * Fast.Admin.Core.Enum.Login.LoginMethodEnum 登录方式枚举
 * @export
 * @enum {string}
 */
export const LoginMethodDict: FTableEnumColumn[] = [
    {
        label: "账号",
        value: LoginMethodEnum.Account,
    },
    {
        label: "手机号",
        value: LoginMethodEnum.Mobile,
    },
    {
        label: "邮箱",
        value: LoginMethodEnum.Email,
    },
];
