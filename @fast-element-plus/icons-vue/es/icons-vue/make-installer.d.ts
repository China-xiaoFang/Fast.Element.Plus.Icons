import { App } from 'vue';
export declare const INSTALLED_KEY: unique symbol;
export declare const makeInstaller: () => {
    version: string;
    install: (app: App) => void;
};
