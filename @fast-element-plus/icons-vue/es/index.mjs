import { makeInstaller } from "./make-installer.mjs";
import { INSTALLED_KEY } from "./make-installer.mjs";
import * as index from "./icons/index.mjs";
import { Dark } from "./icons/dark/index.mjs";
import { Dashboard } from "./icons/dashboard/index.mjs";
import { FullScreen } from "./icons/fullScreen/index.mjs";
import { FullScreenExit } from "./icons/fullScreenExit/index.mjs";
import { Light } from "./icons/light/index.mjs";
import { Menu } from "./icons/menu/index.mjs";
import { NotData } from "./icons/notData/index.mjs";
import { Organization } from "./icons/organization/index.mjs";
import { Page403 } from "./icons/page403/index.mjs";
import { Page404 } from "./icons/page404/index.mjs";
import { Terminal } from "./icons/terminal/index.mjs";
const installer = makeInstaller();
const install = installer.install;
const version = installer.version;
export {
  Dark,
  Dashboard,
  index as FastElementPlusIconsVue,
  FullScreen,
  FullScreenExit,
  INSTALLED_KEY,
  Light,
  Menu,
  NotData,
  Organization,
  Page403,
  Page404,
  Terminal,
  installer as default,
  install,
  version
};
//# sourceMappingURL=index.mjs.map
