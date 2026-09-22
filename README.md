[简体中文](./README.zh.md) | **English**

<p align="center">
	<img src="./Fast.png" width="128" alt="Fast.Element.Plus.Icons Logo" />
</p>

<h1 align="center">Fast.Element.Plus.Icons</h1>

<p align="center">
	<a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue"><img src="https://img.shields.io/npm/v/@fast-element-plus/icons-vue?logo=npm" alt="npm version" /></a>
	<a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue"><img src="https://img.shields.io/npm/dm/@fast-element-plus/icons-vue" alt="npm downloads" /></a>
	<a href="./LICENSE"><img src="https://img.shields.io/npm/l/@fast-element-plus/icons-vue" alt="License" /></a>
</p>

Tree-shakable Vue 3 SVG components with typed exports and SVG attribute fallthrough.

**[Documentation](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/) · [Official website](http://fastdotnet.com)**

## Highlights

- 68 typed Vue 3 components generated deterministically from repository-owned SVG files.
- One ESM named-export entry with preserved icon module boundaries for Tree Shaking.
- Vue fallthrough attributes reach each root `<svg>`, so size, class, style, ARIA attributes and event listeners remain under application control.
- A separately minified IIFE build for jsDelivr, with Vue supplied by the page.
- TypeScript 6 strict checks, generated-source drift checks, ESLint, runtime tests, consumer type tests, package validation and Publint.

## Install

```bash
pnpm add @fast-element-plus/icons-vue
```

Vue `^3.5.11` is required as a peer dependency.

## Minimal CDN example

The jsDelivr entry uses `dist/index.global.min.js`. Load Vue first, then access the icon components through `globalThis.FastElementPlusIconsVue`. Element Plus and a separate stylesheet are not required.

| Resource                                                | jsDelivr                                                                                       | unpkg                                                                            |
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

## Quick start

```vue
<script setup lang="ts">
import { About, Dashboard, Page404 } from "@fast-element-plus/icons-vue";
</script>

<template>
	<About class="app-icon" aria-label="About" role="img" />
	<Dashboard class="app-icon" aria-hidden="true" />
	<Page404 class="empty-state" aria-label="Page not found" role="img" />
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

Most single-color icons can follow text color through `fill: currentColor`. Authored fills in multicolor illustrations such as `Page403` and `Page404` take precedence on their child elements.

Decorative icons should use `aria-hidden="true"`. Meaningful standalone icons should receive an accessible name, normally through `aria-label` and `role="img"`.

## Public API

The package root exposes one named Vue component per SVG file. Component-name casing is part of the public API, including `Api`, `Gps`, `IdCard`, `FullScreen`, `Page403` and `Page404`. There is no default package export and no supported icon subpath API.

See the [API reference](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/api/) for the complete component catalog and behavioral contract.

## Export names and runtime names

Runtime `name` matches the public export, for example `Address.name === "Address"` and `Menu.name === "Menu"`. Bulk registration can use either the export key or `component.name`. Prefer prefixed registration names in browser DOM templates to avoid native HTML/SVG tag conflicts.

## Generated sources

Files under `src/icons/` and `src/index.ts` are generated from `icons/*.svg` and are committed so public API changes remain reviewable.

```bash
pnpm generate
pnpm generate:check
```

Edit the SVG source, run `pnpm generate`, and review both the SVG and generated TSX diff. Do not hand-edit generated icon modules.

## Runtime and package contract

- Package-manager consumers receive pure ESM targeting ES2022.
- Vue remains external and is resolved from the consuming application.
- Every component renders one root `<svg>` with its authored `viewBox`.
- The repository root is the only npm package; `pnpm build` writes only to the ignored root `dist/` directory.
- The package does not publish CommonJS or public icon subpath exports.

See the [runtime contract](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/runtime-contract) for details.

## Documentation

- [API reference](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/api/)
- [API reference (Chinese)](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/api/)
- [Runtime contract](http://docs.fastdotnet.cn/en-US/frontend/element-plus-icons/runtime-contract)
- [Development and release guide (Chinese)](./docs/DEVELOPMENT_RELEASE.zh-CN.md)
- [Contributing guide](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [Changelog](./CHANGELOG.md)

## Development

Development requires Node.js `^22.18.0 || ^24.18.0` and pnpm `^11.0.0`.

```bash
pnpm install --frozen-lockfile
pnpm check
```

Use `pnpm dev` for a long-running tsdown watch build. Run `pnpm generate` first whenever an SVG source changes.

## Copyright, license and use

Copyright © 2018-Now 小方. This project uses [Apache License 2.0](./LICENSE). Use, modification, distribution and commercial use are permitted subject to its terms.

When redistributing, provide the license, mark modified files and preserve applicable copyright, attribution and supplied NOTICE information as required. This summary does not replace the license or impose additional UI attribution.

Users are responsible for the legal compliance and authorization of their own modifications, deployment, data processing and operations. This reminder is not an additional license condition.

Except as required by applicable law or agreed in writing, the software is provided on an "AS IS" basis. Sections 7 and 8 govern warranty disclaimers and liability limits. Providing the project does not endorse downstream activities or assume users' contractual commitments. This statement does not exclude liability that cannot lawfully be excluded.
