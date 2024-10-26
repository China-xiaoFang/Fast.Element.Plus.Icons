**中** | [En](https://github.com/China-xiaoFang/fast.element.plus.icons)

<h1 align="center">Fast.Element.Plus.Icons</h1>

<p align="center">
  <code>Fast</code> 平台下基于 <code>Vue3</code>，<code>Vite</code>，<code>TypeScript</code>，<code>Svg</code> 构建的图标组件库。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@fast-element-plus/icons-vue">
    <img src="https://img.shields.io/npm/v/@fast-element-plus/icons-vue?color=orange&label=" alt="version" />
  </a>
  <a href="https://gitee.com/China-xiaoFang/fast.element.plus.icons/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/@fast-element-plus/icons-vue" alt="license" />
  </a>
</p>

## 安装

#### 使用包管理器

```sh
# 选择一个你喜欢的包管理器

# NPM
npm install @fast-element-plus/icons-vue

# Yarn
yarn add @fast-element-plus/icons-vue

# pnpm（推荐）
pnpm install @fast-element-plus/icons-vue
```

#### 浏览器直接引入

##### unpkg

```html
<head>
  <!-- 导入 Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- 导入组件库 -->
  <script src="//unpkg.com/@fast-element-plus/icons-vue"></script>
</head>
```

##### jsDelivr

```html
<head>
  <!-- 导入 Vue 3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- 导入组件库 -->
  <script src="//cdn.jsdelivr.net/npm/@fast-element-plus/icons-vue"></script>
</head>
```

## 使用

在 `main.ts`

```typescript
import { createApp } from "vue";
import FastElementPlusIconsVue from "@fast-element-plus/icons-vue";
import App from "./App.vue";

const app = createApp(App);

// 全局注册
app.use(FastElementPlusIconsVue);

app.mount('#app');
```

## 更新日志

更新日志 [点击查看](https://gitee.com/China-xiaoFang/fast.element.plus.icons/commits/master)

## 协议

[Fast.Element.Plus.Icons](https://gitee.com/China-xiaoFang/fast.element.plus.icons) 遵循 [Apache-2.0](https://gitee.com/China-xiaoFang/fast.element.plus.icons/blob/master/LICENSE) 开源协议，欢迎大家提交 `PR` 或 `Issue`。

```
Apache开源许可证

版权所有 © 2018-Now 小方

特此免费授予获得本软件及其相关文档文件（以下简称“软件”）副本的任何人以处理本软件的权利，
包括但不限于使用、复制、修改、合并、发布、分发、再许可、销售软件的副本，
以及允许拥有软件副本的个人进行上述行为，但须遵守以下条件：

在所有副本或重要部分的软件中必须包括上述版权声明和本许可声明。

软件按“原样”提供，不提供任何形式的明示或暗示的保证，包括但不限于对适销性、适用性和非侵权的保证。
在任何情况下，作者或版权持有人均不对任何索赔、损害或其他责任负责，
无论是因合同、侵权或其他方式引起的，与软件或其使用或其他交易有关。
```

## 免责申明

```
请勿用于违反我国法律的项目上
```

## 贡献者

感谢他们的所做的一切贡献！

<a href="https://github.com/China-xiaoFang/Fast.Element.Plus.Icons/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=China-xiaoFang/Fast.Element.Plus.Icons" />
</a>

## 补充说明

```
如果对您有帮助，您可以点右上角 ⭐Star 收藏一下 ，获取第一时间更新，谢谢！
```
