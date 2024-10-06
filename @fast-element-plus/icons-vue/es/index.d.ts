import { INSTALLED_KEY } from './icons-vue';
import * as FastElementPlusIconsVue from "@icons-vue/icons";
export * from './icons';
export { INSTALLED_KEY, FastElementPlusIconsVue };
declare const installer: {
    version: string;
    install: (app: import('vue').App) => void;
};
export declare const install: (app: import('vue').App) => void;
export declare const version: string;
export default installer;
