import type { Plugin } from "vue";

export type TSXWithInstall<T> = T & Plugin;

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E): TSXWithInstall<T> & E => {
	(main as TSXWithInstall<T>).install = (app): void => {
		for (const comp of [main, ...Object.values(extra ?? {})]) {
			// 注册 Icon 给 fast-element-plus 组件库的 FaIcon 组件使用
			app.component(`fa-icon-${comp.name}`, comp);
		}
	};

	if (extra) {
		for (const [key, comp] of Object.entries(extra)) {
			(main as any)[key] = comp;
		}
	}
	return main as TSXWithInstall<T> & E;
};
