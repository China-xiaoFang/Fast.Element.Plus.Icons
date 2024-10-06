import FastElementPlusIcons from "./icons.mjs";
import { version } from "./version.mjs";
const INSTALLED_KEY = Symbol("INSTALLED_KEY");
const makeInstaller = () => {
  const install = (app) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;
    FastElementPlusIcons.forEach((i) => app.use(i));
  };
  return {
    version,
    install
  };
};
export {
  INSTALLED_KEY,
  makeInstaller
};
//# sourceMappingURL=make-installer.mjs.map
