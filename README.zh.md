**简体中文** | [English](./README.md)

<p align="center">
	<img src="./Fast.png" width="128" alt="Fast.Element.Plus.Icons Logo" />
</p>

<h1 align="center">Fast.Element.Plus.Icons</h1>

<p align="center">
	<a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue"><img src="https://img.shields.io/npm/v/@fast-element-plus/icons-vue?logo=npm" alt="npm version" /></a>
	<a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue"><img src="https://img.shields.io/npm/dm/@fast-element-plus/icons-vue" alt="npm downloads" /></a>
	<a href="./LICENSE"><img src="https://img.shields.io/npm/l/@fast-element-plus/icons-vue" alt="License" /></a>
</p>

支持按需导入的 Vue 3 SVG 图标组件，保持独立组件、类型和属性透传。

**[使用文档](http://docs.fastdotnet.cn/zh-CN/frontend/element-plus-icons/) · [官方网站](http://fastdotnet.com)**

## 特性

- 从仓库自有 SVG 稳定生成 68 个带完整类型的 Vue 3 组件。
- 只提供一个 ESM 具名导出入口，同时保留图标模块边界，便于 Tree Shaking。
- Vue 透传属性会落到根 `<svg>`，应用可控制尺寸、类名、样式、ARIA 属性和事件监听器。
- 为 jsDelivr 单独生成压缩 IIFE，Vue 由页面提供。
- 使用 TypeScript 6 严格检查、生成源码漂移检查、ESLint、运行时测试、消费者类型测试、包契约和 Publint 共同验证。

## 安装

```bash
pnpm add @fast-element-plus/icons-vue
```

消费项目需提供 Vue `^3.5.11` Peer Dependency。

## CDN 最小示例

jsDelivr 入口为 `dist/index.global.min.js`。页面先加载 Vue，再通过 `globalThis.FastElementPlusIconsVue` 访问图标组件。无需加载 Element Plus 或单独的样式文件。

| 资源                                                    | jsDelivr                                                                                       | unpkg                                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `vue@3.5.11/dist/vue.global.prod.js`                    | [jsDelivr](https://cdn.jsdelivr.net/npm/vue@3.5.11/dist/vue.global.prod.js)                    | [unpkg](https://unpkg.com/vue@3.5.11/dist/vue.global.prod.js)                    |
| `@fast-element-plus/icons-vue/dist/index.global.min.js` | [jsDelivr](https://cdn.jsdelivr.net/npm/@fast-element-plus/icons-vue/dist/index.global.min.js) | [unpkg](https://unpkg.com/@fast-element-plus/icons-vue/dist/index.global.min.js) |

```html
<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<title>Fast Icons</title>
	</head>
	<body>
		<div id="app"></div>
		<script src="https://cdn.jsdelivr.net/npm/vue@3.5.11/dist/vue.global.prod.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/@fast-element-plus/icons-vue/dist/index.global.min.js"></script>
		<script>
			Vue.createApp({
				render: () => Vue.h(FastElementPlusIconsVue.Address, { width: 32, height: 32, role: "img", "aria-label": "Address" }),
			}).mount("#app");
		</script>
	</body>
</html>
```

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

## 公共 API

包根入口为每个 SVG 暴露一个具名 Vue 组件。组件名大小写属于公共 API，包括 `Api`、`Gps`、`IdCard`、`FullScreen`、`Page403` 和 `Page404`。包不提供默认导出，也不提供受支持的图标子路径入口。

完整组件清单和行为契约见 [API 参考](http://docs.fastdotnet.cn/zh-CN/frontend/element-plus-icons/api/)。

## 导出名与运行时名称

组件运行时 `name` 与公开导出名一致，例如 `Address.name === "Address"`，`Menu.name === "Menu"`。批量注册可使用导出键或 `component.name`；在浏览器 DOM 模板中建议使用带前缀的注册名，避免与原生 HTML/SVG 标签混淆。

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

详细说明见 [运行时契约](http://docs.fastdotnet.cn/zh-CN/frontend/element-plus-icons/runtime-contract)。

## 文档

- [API 参考](http://docs.fastdotnet.cn/zh-CN/frontend/element-plus-icons/api/)
- [API reference](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/api/)
- [运行时契约](http://docs.fastdotnet.cn/zh-CN/frontend/element-plus-icons/runtime-contract)
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

## 版权、许可证与使用声明

版权所有 © 2018-Now 小方。本项目依据 [Apache License 2.0](./LICENSE) 开源；在遵守许可证的前提下，可以使用、修改和分发本软件，包括商业使用。

再分发时，应按许可证要求提供许可证副本、对修改的文件作出显著说明，并保留适用的版权和归属声明；包含需要保留的 NOTICE 信息时一并处理。本说明不替代正式许可证，也不额外要求在产品界面展示作者或项目标识。

使用者应就自身使用、二次开发、部署、数据处理及运营活动遵守适用法律和第三方合法权益，自行取得依法需要的授权。上述内容为合规提醒，不构成附加许可条件。

除适用法律另有规定或另有书面约定外，本软件按“原样”提供；保证排除与责任限制以许可证第 7、8 条为准。提供本项目不代表原作者为使用者的二次开发和运营活动背书，也不当然承担其对第三方作出的合同承诺。本说明不排除依法不得排除的责任。
