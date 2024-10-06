import { makeInstaller } from "./make-installer";
export { INSTALLED_KEY } from "./make-installer";
export * as FastElementPlusIconsVue from "@icons-vue/icons";

export * from "@icons-vue/icons";

const installer = makeInstaller();

export const install = installer.install;
export const version = installer.version;
export default installer;
