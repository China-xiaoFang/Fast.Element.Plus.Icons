import FastElementPlusIcons from "./icons.mjs";
const INSTALLED_KEY = Symbol("INSTALLED_KEY");
const makeInstaller = () => {
  const install = (app) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;
    FastElementPlusIcons.forEach((i) => app.use(i));
  };
  return {
    version: "1.0.6",
    install
  };
};
export {
  INSTALLED_KEY,
  makeInstaller
};
//# sourceMappingURL=make-installer.mjs.map
