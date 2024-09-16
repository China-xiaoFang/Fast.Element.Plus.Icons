import { makeInstaller } from "./icons-vue/make-installer.mjs";
import "./icons/index.mjs";
import { Dark } from "./icons/dark/index.mjs";
import { FullScreen } from "./icons/fullScreen/index.mjs";
import { FullScreenExit } from "./icons/fullScreenExit/index.mjs";
import { Light } from "./icons/light/index.mjs";
import { Menu } from "./icons/menu/index.mjs";
import { NotData } from "./icons/notData/index.mjs";
import { Page403 } from "./icons/page403/index.mjs";
import { Page404 } from "./icons/page404/index.mjs";
const installer = makeInstaller();
const install = installer.install;
const version = installer.version;
export {
  Dark,
  FullScreen,
  FullScreenExit,
  Light,
  Menu,
  NotData,
  Page403,
  Page404,
  installer as default,
  install,
  version
};
//# sourceMappingURL=index.mjs.map
