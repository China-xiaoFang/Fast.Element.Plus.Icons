import { makeInstaller } from "@icons-vue/build";
export { INSTALLED_KEY } from "@icons-vue/build";
export * as FastElementPlusIconsVue from "@icons-vue/icons";

export * from "@icons-vue/icons";

const installer = makeInstaller();

export const install = installer.install;
export const version = installer.version;
export default installer;
