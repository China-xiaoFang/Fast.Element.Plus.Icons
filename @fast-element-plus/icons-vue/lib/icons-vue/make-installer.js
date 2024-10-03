"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const e=require("./icons.js"),t=Symbol("INSTALLED_KEY");exports.INSTALLED_KEY=t,exports.makeInstaller=()=>({version:"1.0.6",install:o=>{o[t]||(o[t]=!0,e.default.forEach((e=>o.use(e))))}});
//# sourceMappingURL=make-installer.js.map
