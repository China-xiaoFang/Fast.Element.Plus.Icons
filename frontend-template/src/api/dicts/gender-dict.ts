import { FTableEnumColumn } from "@/components/FTable/interface";
import { GenderEnum } from "../enums/gender-enum";

/**
 * Fast.Admin.Core.Enum.Common.GenderEnum 性别枚举
 * @export
 * @enum {string}
 */
export const GenderDict: FTableEnumColumn[] = [
    {
        label: "未知",
        value: GenderEnum.Unknown,
    },
    {
        label: "男",
        value: GenderEnum.Man,
    },
    {
        label: "女",
        value: GenderEnum.Woman,
    },
];
