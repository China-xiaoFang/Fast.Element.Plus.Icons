import { Plugin } from 'vue';
export type TSXWithInstall<T> = T & Plugin;
export declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E) => TSXWithInstall<T> & E;
