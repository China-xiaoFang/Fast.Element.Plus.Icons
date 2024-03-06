import { FTableEnumColumn } from "@/components/FTable/interface";
import { YesOrNotEnum } from "../enums/yes-or-not-enum";

/**
 * Fast.Admin.Core.Enum.Common.YesOrNotEnum 是否枚举
 * @export
 * @enum {string}
 */
export const YesOrNotDict: FTableEnumColumn[] = [
    {
        label: "否",
        value: YesOrNotEnum.N,
    },
    {
        label: "是",
        value: YesOrNotEnum.Y,
    },
];
