"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./icon.js"),r=require("./version.js"),o=Symbol("INSTALLED_KEY");exports.INSTALLED_KEY=o,exports.makeInstaller=()=>({version:r.version,install:r=>{r[o]||(r[o]=!0,e.default.forEach((e=>r.use(e))))}});
//# sourceMappingURL=make-installer.js.map
