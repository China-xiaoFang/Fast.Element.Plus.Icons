import { makeInstaller } from "@icons-vue/build";

export * from "@icons-vue/icons";

const installer = makeInstaller();

export const install = installer.install;
export const version = installer.version;
export default installer;
