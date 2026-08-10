# Fast.Element.Plus.Icons runtime contract / 运行时契约

## Runtime and package contract

- Runtime platforms: ES2022 modern browsers, WebViews and Vue 3 applications.
- Package format: one public named-export ESM entry for package managers and one separately minified IIFE entry for CDN use; CommonJS and UMD are not shipped.
- Framework boundary: Vue remains external to both builds and is a required peer in `^3.3.0`.
- Component behavior: every export renders one SVG root with its authored `viewBox` and accepts standard Vue fallthrough attributes on that root.
- Source integrity: `icons/*.svg` is the source of truth; `pnpm generate` updates committed component sources and `pnpm generate:check` detects drift.
- Publishing: the repository root is the only package, `dist/` is the only build output and `package.json#exports` is the complete public path whitelist.

Importing the package does not access the DOM, mutate application-global state or register components. The package does not polyfill DOM, SVG, Promise or other platform capabilities.

## Public API policy

- The package root exposes one named Vue component for every repository SVG.
- Component names and casing are public API. Internal `dist/icons/` modules are not supported package subpaths.
- Components define no package-specific Props, Emits, Slots or Expose methods.
- Applications own accessible labels, roles, dimensions, colors, classes, styles and event listeners.
- Explicit child fills in multicolor illustrations take precedence over inherited root fill and text color.

## CDN contract

`dist/index.global.min.js` requires `globalThis.Vue` and exposes the component set as `globalThis.FastElementPlusIconsVue`. Applications are responsible for exact version selection, CSP, SRI and asset hosting.

## Security boundary

The generator rejects script elements, foreign objects, inline event handlers and external or data URL references. This validation protects repository generation and is not a general-purpose SVG sanitizer. Only trusted, reviewed SVG files may be added.

## 运行时与包契约

- 运行平台：ES2022 现代浏览器、WebView 和 Vue 3 应用。
- 包格式：包管理器使用单一公开具名导出 ESM 入口，CDN 使用单独压缩的 IIFE；不发布 CommonJS 或 UMD。
- Vue 边界：两类构建均保持 Vue 外部引用，消费项目必须提供 `^3.3.0` Peer Dependency。
- 组件行为：每个导出都渲染一个保留原始 `viewBox` 的 SVG 根节点，并接收标准 Vue 透传属性。
- 源码完整性：`icons/*.svg` 是唯一图标源；`pnpm generate` 更新已提交组件源码，`pnpm generate:check` 检测漂移。
- 发布：仓库根目录是唯一 npm 包，`dist/` 是唯一构建输出，`package.json#exports` 是完整公共路径白名单。

导入包不会访问 DOM、修改应用全局状态或注册组件。包不注入 DOM、SVG、Promise 或其他平台 Polyfill。

## 公共 API 约定

- 包根入口为仓库中的每个 SVG 暴露一个具名 Vue 组件。
- 组件名及其大小写属于公共 API；`dist/icons/` 内部模块不是受支持的包子路径。
- 组件不定义包专用 Props、Emits、Slots 或 Expose 方法。
- 可访问名称、角色、尺寸、颜色、类名、样式和事件监听器由应用负责。
- 多色插图子元素明确声明的填充色优先于根节点继承的填充色和文字颜色。

## CDN 约定

`dist/index.global.min.js` 要求页面提供 `globalThis.Vue`，并通过 `globalThis.FastElementPlusIconsVue` 暴露全部组件。精确版本、CSP、SRI 和资源托管策略由应用负责。

## 安全边界

生成器拒绝脚本元素、`foreignObject`、内联事件处理器以及外部或 Data URL 引用。该校验用于保护仓库生成流程，不是通用 SVG 清洗器；仓库只允许加入可信且经过审查的 SVG。
