export * from './icons';
declare const installer: {
    version: string;
    install: (app: import('vue').App) => void;
};
export declare const install: (app: import('vue').App) => void;
export declare const version: string;
export default installer;