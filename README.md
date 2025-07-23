[中](https://gitee.com/China-xiaoFang/fast.element.plus.icons) | **En**

<h1 align="center">Fast.Element.Plus.Icons</h1>

<p align="center">
  <code>Fast</code> platform An icon component library built based on <code>Vue3</code>, <code>Vite</code>, <code>TypeScript</code>, and <code>Svg</code>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue">
    <img src="https://img.shields.io/npm/v/@fast-element-plus/icons-vue?color=orange&label=" alt="version" />
  </a>
  <a href="https://gitee.com/China-xiaoFang/fast.element.plus.icons/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@fast-element-plus/icons-vue" alt="license" />
  </a>
</p>

## Install

#### Using a Package Manager

```sh
# Choose a package manager of your choice

# NPM
npm install @fast-element-plus/icons-vue

# Yarn
yarn add @fast-element-plus/icons-vue

# pnpm (recommend)
pnpm install @fast-element-plus/icons-vue
```

#### Direct browser import

##### unpkg

```html
<head>
	<!-- Import Vue 3 -->
	<script src="//unpkg.com/vue@3"></script>
	<!-- Import component library -->
	<script src="//unpkg.com/@fast-element-plus/icons-vue"></script>
</head>
```

##### jsDelivr

```html
<head>
	<!-- Import Vue 3 -->
	<script src="//cdn.jsdelivr.net/npm/vue@3"></script>
	<!-- Import component library -->
	<script src="//cdn.jsdelivr.net/npm/@fast-element-plus/icons-vue"></script>
</head>
```

## Use

在 `main.ts`

```typescript
import { createApp } from "vue";
import * as FastElementPlusIconsVue from "@fast-element-plus/icons-vue";
import App from "./App.vue";

const app = createApp(App);

for (const [key, component] of Object.entries(FastElementPlusIconsVue)) {
	app.component(key, component);
}

app.mount("#app");
```

## Update log

Update log [Click to view](https://gitee.com/China-xiaoFang/fast.element.plus.icons/commits/master)

## Protocol

[Fast.Element.Plus.Icons](https://gitee.com/China-xiaoFang/fast.element.plus.icons) complies with the [Apache-2.0](https://gitee.com/China-xiaoFang/fast.element.plus.icons/blob/master/LICENSE) open source agreement. Welcome to submit `PR` or `Issue`.

```
Apache Open Source License

Copyright © 2018-Now xiaoFang

License:
This Agreement grants any individual or organization that obtains a copy of this software and its related documentation (hereinafter referred to as the "Software").
Subject to the terms of this Agreement, you have the right to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the Software:
1.All copies or major parts of the Software must retain this Copyright Notice and this License Agreement.
2.The use, copying, modification, or distribution of the Software shall not violate applicable laws or infringe upon the legitimate rights and interests of others.
3.Modified or derivative works must clearly indicate the original author and the source of the original Software.

Special Statement:
- This Software is provided "as is" without any express or implied warranty of any kind, including but not limited to the warranty of merchantability, fitness for purpose, and non-infringement.
- In no event shall the author or copyright holder be liable for any direct or indirect loss caused by the use or inability to use this Software.
- Including but not limited to data loss, business interruption, etc.

Disclaimer:
It is prohibited to use this software to engage in illegal activities such as endangering national security, disrupting social order, or infringing on the legitimate rights and interests of others.
The author does not assume any responsibility for any legal disputes and liabilities caused by the secondary development of this software.
```

## Disclaimer

```
Please do not use it for projects that violate our country's laws
```

## Contributors

Thank you for all their contributions!

<a href="https://github.com/China-xiaoFang/Fast.Element.Plus.Icons/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=China-xiaoFang/Fast.Element.Plus.Icons" />
</a>

## Supplementary instructions

```
If it is helpful to you, you can click ⭐Star in the upper right corner to collect it and get the latest updates. Thank you!
```
