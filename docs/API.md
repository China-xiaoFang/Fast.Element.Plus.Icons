# API reference

## Package entry

`@fast-element-plus/icons-vue` exposes one named Vue component per repository SVG. The package has no default export and does not expose supported icon subpaths.

```ts
import { About, FullScreen, Page404 } from "@fast-element-plus/icons-vue";
```

Every export is created with Vue `defineComponent()` and is assignable to Vue's `Component` type.

## Component contract

All icon components share the same contract:

- render exactly one root `<svg>`;
- preserve the authored `viewBox`, groups, paths, fills and strokes;
- accept standard Vue fallthrough attributes on the root SVG, including `class`, `style`, `width`, `height`, `fill`, `stroke`, `role`, `aria-*`, `data-*` and event listeners;
- define no package-specific props, emitted events, slots or exposed instance methods;
- have no import-time browser access and no global registration side effect.

Most single-color icons can be styled through `fill: currentColor`. Explicit fills inside multicolor illustrations remain unchanged.

## Accessibility

Decorative icons should be hidden from assistive technology:

```vue
<Dashboard aria-hidden="true" />
```

Meaningful standalone icons should have a name and image role:

```vue
<About aria-label="About" role="img" />
```

The library does not infer accessible labels because the correct text depends on application context and language.

## Global registration

The root module contains icon components only, so applications may register all exports when bundle size is an accepted tradeoff:

```ts
import * as icons from "@fast-element-plus/icons-vue";
import type { App } from "vue";

export const registerIcons = (app: App): void => {
	for (const [name, component] of Object.entries(icons)) {
		app.component(name, component);
	}
};
```

Named imports are preferred for normal application code.

## Component catalog

The root entry exports the following 68 component names:

| Component       | Component     | Component      | Component        |
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

The casing is part of the public API. Acronym-like source names map to `Am`, `Api`, `Gps`, `IdCard`, `Pm` and `Wifi`.

## CDN global

`dist/index.global.min.js` exposes the same component set through `globalThis.FastElementPlusIconsVue`. Vue must already exist as `globalThis.Vue`.
