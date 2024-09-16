import type { TSXWithInstall } from "./typescript";

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E): TSXWithInstall<T> & E => {
	(main as TSXWithInstall<T>).install = (app): void => {
		for (const comp of [main, ...Object.values(extra ?? {})]) {
			// 这里默认注册为 Fa-IconName 组件名称
			app.component(`Fa${comp.name}`, comp);

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
