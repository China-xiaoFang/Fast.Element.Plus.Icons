// GlobalComponents for Volar
declare module "@vue/runtime-core" {
    export interface GlobalComponents {
        FContextMenu: (typeof import("@/components"))["FContextMenu"];
        FDialog: (typeof import("@/components"))["FDialog"];
        FIcon: (typeof import("@/components"))["FIcon"];
        FImage: (typeof import("@/components"))["FImage"];
        FTable: (typeof import("@/components"))["FTable"];
        FTree: (typeof import("@/components"))["FTree"];
    }
}

export {};
