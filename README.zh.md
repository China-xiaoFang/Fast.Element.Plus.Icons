<p align="left">
	<strong>简体中文</strong> | <a href="./README.md">English</a>
</p>

<p align="center">
	<img src="./Fast.png" alt="logo" width="160" />
</p>

# @fast-element-plus/icons-vue

面向 Vue 3 应用、支持 Tree Shaking 的 SVG 图标组件库。

[![npm 版本](https://img.shields.io/npm/v/@fast-element-plus/icons-vue?color=orange)](https://www.npmjs.com/package/@fast-element-plus/icons-vue) [![Node.js](https://img.shields.io/badge/node-%5E22.18%20%7C%7C%20%5E24.18-brightgreen)](https://nodejs.org/) [![Vue](https://img.shields.io/badge/vue-%5E3.3-42b883)](https://vuejs.org/) [![开源协议](https://img.shields.io/npm/l/@fast-element-plus/icons-vue)](./LICENSE)

## 特性

- 从仓库自有 SVG 稳定生成 68 个带完整类型的 Vue 3 组件。
- 只提供一个 ESM 具名导出入口，同时保留图标模块边界，便于 Tree Shaking。
- Vue 透传属性会落到根 `<svg>`，应用可控制尺寸、类名、样式、ARIA 属性和事件监听器。
- 为 unpkg 与 jsDelivr 单独生成压缩 IIFE，Vue 由页面提供。
- 使用 TypeScript 6 严格检查、生成源码漂移检查、ESLint、运行时测试、消费者类型测试、包契约和 Publint 共同验证。

## 安装

```bash
pnpm add @fast-element-plus/icons-vue
```

消费项目需提供 Vue `^3.3.0` Peer Dependency。

## 按需使用

```vue
<script setup lang="ts">
import { About, Dashboard, Page404 } from "@fast-element-plus/icons-vue";
</script>

<template>
	<About class="app-icon" aria-label="关于" role="img" />
	<Dashboard class="app-icon" aria-hidden="true" />
	<Page404 class="empty-state" aria-label="页面不存在" role="img" />
</template>

<style scoped>
.app-icon {
	width: 1em;
	height: 1em;
	fill: currentColor;
}

.empty-state {
	width: 20rem;
	height: auto;
}
</style>
```

大多数单色图标可通过 `fill: currentColor` 跟随文字颜色。`Page403`、`Page404` 等多色插图的子元素保留原始填充色，并优先于根元素样式。

纯装饰图标应设置 `aria-hidden="true"`；具有独立含义的图标应通过 `aria-label` 与 `role="img"` 提供可访问名称。

## 全量全局注册

如果应用明确接受更大的初始模块图，可以注册全部导出：

```ts
import * as FastElementPlusIconsVue from "@fast-element-plus/icons-vue";
import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

for (const [name, component] of Object.entries(FastElementPlusIconsVue)) {
	app.component(name, component);
}

app.mount("#app");
```

普通业务代码应优先使用具名按需导入，让打包器移除未使用图标。

## CDN

`unpkg` 和 `jsdelivr` 字段都指向 `dist/index.global.min.js`。先加载 Vue，再加载图标包；全局变量为 `FastElementPlusIconsVue`。

生产部署应固定精确版本；存在供应链控制要求时，还需配置 CSP 与 SRI。

## 公共 API

包根入口为每个 SVG 暴露一个具名 Vue 组件。组件名大小写属于公共 API，包括 `Api`、`Gps`、`IdCard`、`FullScreen`、`Page403` 和 `Page404`。包不提供默认导出，也不提供受支持的图标子路径入口。

完整组件清单和行为契约见 [API 参考](./docs/API.zh-CN.md)。

## 生成源码

`src/icons/` 和 `src/index.ts` 由 `icons/*.svg` 生成并提交到仓库，确保公共 API 变化可以被代码审查。

```bash
pnpm generate
pnpm generate:check
```

修改 SVG 后运行 `pnpm generate`，并同时审查 SVG 与生成 TSX 的差异。不要手工修改生成的图标模块。

## 运行时与包契约

- 包管理器入口为面向 ES2022 的纯 ESM。
- Vue 保持外部依赖，由消费项目解析。
- 每个组件渲染一个根 `<svg>`，保留 SVG 原始 `viewBox`。
- 仓库根目录是唯一 npm 包；`pnpm build` 只写入被 Git 忽略的根 `dist/`。
- 包不发布 CommonJS 和公开图标子路径导出。

详细说明见 [运行时契约](./docs/RUNTIME_CONTRACT.md)。

## 文档

- [API 参考](./docs/API.zh-CN.md)
- [API reference](./docs/API.md)
- [运行时契约](./docs/RUNTIME_CONTRACT.md)
- [开发与发布指南](./docs/DEVELOPMENT_RELEASE.zh-CN.md)
- [贡献指南](./CONTRIBUTING.md)
- [安全策略](./SECURITY.md)
- [更新日志](./CHANGELOG.md)

## 本地开发

开发环境要求 Node.js `^22.18.0 || ^24.18.0` 和 pnpm `^11.0.0`。

```bash
pnpm install --frozen-lockfile
pnpm check
```

修改源码时可使用 `pnpm dev` 启动长期运行的 tsdown 监听构建。SVG 发生变化后，应先执行 `pnpm generate`。

## 开源协议

[Apache-2.0](./LICENSE)
