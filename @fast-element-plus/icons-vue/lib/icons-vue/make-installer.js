"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./icons.js"),r=require("./version.js"),s=Symbol("INSTALLED_KEY");exports.INSTALLED_KEY=s,exports.makeInstaller=()=>({version:r.version,install:r=>{r[s]||(r[s]=!0,e.default.forEach((e=>r.use(e))))}});
//# sourceMappingURL=make-installer.js.map
