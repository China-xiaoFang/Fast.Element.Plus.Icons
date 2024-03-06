import { FTableEnumColumn } from "@/components/FTable/interface";
import { AdminTypeEnum } from "../enums/admin-type-enum";

/**
 * Fast.Admin.Core.Enum.System.AdminTypeEnum 账号类型枚举
 * @export
 * @enum {string}
 */
export const AdminTypeDict: FTableEnumColumn[] = [
    {
        label: "超级管理员",
        value: AdminTypeEnum.SuperAdmin,
    },
    {
        label: "系统管理员",
        value: AdminTypeEnum.SystemAdmin,
    },
    {
        label: "普通账号",
        value: AdminTypeEnum.None,
    },
];
