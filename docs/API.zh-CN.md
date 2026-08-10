# API 参考

## 包入口

`@fast-element-plus/icons-vue` 为仓库中的每个 SVG 暴露一个具名 Vue 组件。包没有默认导出，也不提供受支持的图标子路径入口。

```ts
import { About, FullScreen, Page404 } from "@fast-element-plus/icons-vue";
```

全部导出都通过 Vue `defineComponent()` 创建，并可赋值给 Vue 的 `Component` 类型。

## 组件契约

所有图标组件遵循同一契约：

- 只渲染一个根 `<svg>`；
- 保留原始 `viewBox`、分组、路径、填充色和描边；
- 标准 Vue 透传属性会落到根 SVG，包括 `class`、`style`、`width`、`height`、`fill`、`stroke`、`role`、`aria-*`、`data-*` 和事件监听器；
- 不定义包专用 Props、Emits、Slots 或 Expose 方法；
- 导入阶段不访问浏览器对象，也不会产生全局注册副作用。

大多数单色图标可以使用 `fill: currentColor` 跟随文本颜色。多色插图内部明确声明的填充色保持不变。

## 可访问性

纯装饰图标应对辅助技术隐藏：

```vue
<Dashboard aria-hidden="true" />
```

具有独立含义的图标应提供名称与图片角色：

```vue
<About aria-label="关于" role="img" />
```

组件库不会推断可访问名称，因为正确文本取决于业务上下文和语言。

## 全局注册

根模块只包含图标组件；如果应用明确接受包体积取舍，可以注册全部导出：

```ts
import * as icons from "@fast-element-plus/icons-vue";
import type { App } from "vue";

export const registerIcons = (app: App): void => {
	for (const [name, component] of Object.entries(icons)) {
		app.component(name, component);
	}
};
```

普通业务代码仍应优先使用具名按需导入。

## 组件清单

根入口导出以下 68 个组件名：

| 组件            | 组件          | 组件           | 组件             |
| --------------- | ------------- | -------------- | ---------------- |
| `About`         | `AccountSafe` | `Address`      | `Adjust`         |
| `Am`            | `Api`         | `Appointment`  | `Backup`         |
| `Bluetooth`     | `Brush`       | `Calendar`     | `Call`           |
| `Chrome`        | `Collect`     | `Component`    | `Customers`      |
| `Dark`          | `Dashboard`   | `Database`     | `Desktop`        |
| `Dictionary`    | `Doctor`      | `EarlyMorning` | `Evening`        |
| `Exit`          | `Filter`      | `FullScreen`   | `FullScreenExit` |
| `Gateway`       | `Gps`         | `Home`         | `Hospital`       |
| `IdCard`        | `Light`       | `Link`         | `LoadingImage`   |
| `Lock`          | `Menu`        | `Message`      | `Mobile`         |
| `Money`         | `My`          | `Navigation`   | `NotData`        |
| `Notice`        | `NotImage`    | `Organization` | `Page403`        |
| `Page404`       | `Performance` | `Pm`           | `Printer`        |
| `Record`        | `Report`      | `ReportCenter` | `Scan`           |
| `Schedule`      | `Setting`     | `Shop`         | `Swagger`        |
| `SystemSetting` | `TableConfig` | `Task`         | `Tenant`         |
| `Terminal`      | `Test`        | `Wifi`         | `Workbench`      |

大小写属于公共 API。缩写类源文件名对应 `Am`、`Api`、`Gps`、`IdCard`、`Pm` 和 `Wifi`。

## CDN 全局变量

`dist/index.global.min.js` 通过 `globalThis.FastElementPlusIconsVue` 暴露同一组组件；页面必须先通过 `globalThis.Vue` 提供 Vue。
