// For this project development
import "@vue/runtime-core";

// GlobalComponents for Volar
declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		FaDark: (typeof import("@fast-element-plus/icons-vue"))["Dark"];
		FaFullScreen: (typeof import("@fast-element-plus/icons-vue"))["FullScreen"];
		FaFullScreenExit: (typeof import("@fast-element-plus/icons-vue"))["FullScreenExit"];
		FaLight: (typeof import("@fast-element-plus/icons-vue"))["Light"];
		FaMenu: (typeof import("@fast-element-plus/icons-vue"))["Menu"];
		FaNotData: (typeof import("@fast-element-plus/icons-vue"))["NotData"];
		FaPage403: (typeof import("@fast-element-plus/icons-vue"))["Page403"];
		FaPage404: (typeof import("@fast-element-plus/icons-vue"))["Page404"];
	}

	// interface ComponentCustomProperties {}
}

export {};
