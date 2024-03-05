import FContextMenu from "./FContextMenu";
import FDialog from "./FDialog";
import FIcon from "./FIcon";
import FImage from "./FImage";
import FTable from "./FTable";
import FTree from "./FTree";

// 解决使用组件时候无法高亮的问题
declare module "vue" {
    export interface GlobalComponents {
        FContextMenu: typeof FContextMenu;
        FDialog: typeof FDialog;
        FIcon: typeof FIcon;
        FImage: typeof FImage;
        FTable: typeof FTable;
        FTree: typeof FTree;
    }
}

// declare module "@vue/runtime-core" {
//     export interface GlobalComponents {
//         FContextMenu: typeof import("./FContextMenu/index");
//         FDialog: typeof FDialog;
//         FIcon: typeof FIcon;
//         FImage: typeof FImage;
//         FTable: typeof FTable;
//         FTree: typeof FTree;
//     }
// }

export {};
