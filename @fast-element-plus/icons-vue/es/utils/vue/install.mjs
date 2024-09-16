const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(`Fa${comp.name}`, comp);
      app.component(`fa-icon-${comp.name}`, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
export {
  withInstall
};
//# sourceMappingURL=install.mjs.map