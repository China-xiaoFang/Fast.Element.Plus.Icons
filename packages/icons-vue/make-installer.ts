import type { App } from "vue";
import FastElementPlusIcons from "./icons";

export const INSTALLED_KEY = Symbol("INSTALLED_KEY");

export const makeInstaller = (): {
	version: string;
	install: (app: App) => void;
} => {
	const install = (app: App): void => {
		if (app[INSTALLED_KEY]) return;

		app[INSTALLED_KEY] = true;

		FastElementPlusIcons.forEach((i) => app.use(i));
	};

	return {
		version: "1.0.0",
		install,
	};
};
