import { FTableEnumColumn } from "@/components/FTable/interface";
import { MenuTypeEnum } from "../enums/menu-type-enum";

/**
 * Fast.Admin.Core.Enum.Menus.MenuTypeEnum 菜单类型枚举
 * @export
 * @enum {string}
 */
export const MenuTypeDict: FTableEnumColumn[] = [
    {
        label: "目录",
        value: MenuTypeEnum.Catalog,
    },
    {
        label: "菜单",
        value: MenuTypeEnum.Menu,
    },
    {
        label: "内链",
        value: MenuTypeEnum.Internal,
    },
    {
        label: "外链",
        value: MenuTypeEnum.Outside,
    },
];
