import { INSTALLED_KEY, makeInstaller } from "@icons-vue/build";
import * as FastElementPlusIconsVue from "@icons-vue/icons";

export * from "@icons-vue/icons";

export { INSTALLED_KEY, FastElementPlusIconsVue };

const installer = makeInstaller();

export const install = installer.install;
export const version = installer.version;
export default installer;
