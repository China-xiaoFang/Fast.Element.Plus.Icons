// For this project development
import "@vue/runtime-core";

// GlobalComponents for Volar
declare module "@vue/runtime-core" {
	export interface GlobalComponents {
		FaDark: (typeof import("@fast-element-plus/icons-vue"))["Dark"];
		FaDashboard: (typeof import("@fast-element-plus/icons-vue"))["Dashboard"];
		FaFullScreen: (typeof import("@fast-element-plus/icons-vue"))["FullScreen"];
		FaFullScreenExit: (typeof import("@fast-element-plus/icons-vue"))["FullScreenExit"];
		FaLight: (typeof import("@fast-element-plus/icons-vue"))["Light"];
		FaMenu: (typeof import("@fast-element-plus/icons-vue"))["Menu"];
		FaNotData: (typeof import("@fast-element-plus/icons-vue"))["NotData"];
		FaOrganization: (typeof import("@fast-element-plus/icons-vue"))["Organization"];
		FaPage403: (typeof import("@fast-element-plus/icons-vue"))["Page403"];
		FaPage404: (typeof import("@fast-element-plus/icons-vue"))["Page404"];
		FaTerminal: (typeof import("@fast-element-plus/icons-vue"))["Terminal"];
	}

	// interface ComponentCustomProperties {}
}

export {};
