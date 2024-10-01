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
import FastElementPlusIconsVue from "@fast-element-plus/icons-vue";
import App from "./App.vue";

const app = createApp(App);

// Global Registration
app.use(FastElementPlusIconsVue);

app.mount('#app');
```

#### Volar Support

If you use Volar, specify the global component type via `compilerOptions.type` in your `tsconfig.json`.

```json
{
  "compilerOptions": {
    // ...
    "types": ["@fast-element-plus/icons-vue/global"]
  }
}
```

## Update log

Update log [Click to view](https://gitee.com/China-xiaoFang/fast.element.plus.icons/commits/master)

## Protocol

[Fast.Element.Plus.Icons](https://gitee.com/China-xiaoFang/fast.element.plus.icons) complies with the [Apache-2.0](https://gitee.com/China-xiaoFang/fast.element.plus.icons/blob/master/LICENSE) open source agreement. Welcome to submit `PR` or `Issue`.

```
Apache Open Source License

Copyright © 2018-Now xiaoFang

The right to deal in the Software is hereby granted free of charge to any person obtaining a copy of this software and its related documentation (the "Software"),
Including but not limited to using, copying, modifying, merging, publishing, distributing, sublicensing, selling copies of the Software,
and permit individuals in possession of a copy of the software to do so, subject to the following conditions:

The above copyright notice and this license notice must be included on all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS AND NON-INFRINGEMENT.
In no event shall the author or copyright holder be liable for any claim, damages or other liability,
WHETHER ARISING IN CONTRACT, TORT OR OTHERWISE, IN CONNECTION WITH THE SOFTWARE OR ITS USE OR OTHER DEALINGS.
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
