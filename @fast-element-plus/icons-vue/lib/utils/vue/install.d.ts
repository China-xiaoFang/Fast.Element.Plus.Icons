import { TSXWithInstall } from './typescript';
export declare const withInstall: <T, E extends Record<string, any>>(main: T, extra?: E) => TSXWithInstall<T> & E;
