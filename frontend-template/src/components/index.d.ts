// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        FContextMenu: (typeof import("./FContextMenu"))["default"];
        FDialog: (typeof import("./FDialog"))["default"];
        FIcon: (typeof import("./FIcon"))["default"];
        FImage: (typeof import("./FImage"))["default"];
        FTable: (typeof import("./FTable"))["default"];
        FTree: (typeof import("./FTree"))["default"];
    }
}

export {};
