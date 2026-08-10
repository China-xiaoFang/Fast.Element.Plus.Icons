import { defineConfig } from "tsdown";
import VueJsx from "unplugin-vue-jsx/rolldown";

export default defineConfig([
	{
		// 只构建 package.json exports 承诺的唯一根入口。
		entry: { index: "src/index.ts" },
		// 将全部发布文件写入仓库根目录的唯一 dist 目录。
		outDir: "dist",
		// 以 src 为构建根，保持 dist/icons/<icon>/index.mjs 与源码目录结构一致。
		root: "src",
		// 仅输出未压缩 ESM，与 package.json 的 module 类型和 exports.import 保持一致。
		format: "esm",
		// 图标库面向浏览器和 WebView，不注入 Node.js 或浏览器垫片。
		platform: "neutral",
		// 以声明的最低应用运行时语法 ES2022 为转换目标。
		target: "es2022",
		// 固定生成 .mjs 和 .d.mts，与 package.json exports 的公开路径保持一致。
		fixedExtension: true,
		// 保留源码模块结构，使每个图标维持独立模块并支持 Tree Shaking。
		unbundle: true,
		// 使用 TypeScript 生成公开声明，不生成会指向未发布 src 的声明 Source Map。
		dts: {
			generator: "tsc",
			sourcemap: false,
		},
		// 生成内嵌源码的 JavaScript Source Map，无需把 src 目录发布到 npm。
		sourcemap: true,
		// 每次构建前由 ESM 配置清空完整 dist，避免图标删除或重命名后残留陈旧产物。
		clean: true,
		// 移除未被公共入口引用的内部代码，减小发布产物体积。
		treeshake: true,
		// 将 Vue TSX 转换为 Vue 3 渲染函数。
		plugins: [VueJsx()],
		// 控制 Vue 在 JavaScript 和声明构建中的外部化行为。
		deps: {
			// 包管理器产物保留 Vue 引用，由消费项目提供必需的 Vue Peer。
			neverBundle: ["vue"],
			// 声明生成不内联 Vue 类型，避免复制第三方声明并固定其具体版本。
			dts: { neverBundle: ["vue"] },
		},
		// 将构建警告视为失败，防止带有潜在问题的产物进入发布流程。
		failOnWarn: true,
	},
	{
		// CDN 与包管理器构建共用完整根入口，生成单独的压缩 IIFE 文件。
		entry: { "index.global.min": "src/index.ts" },
		// 与 ESM 产物写入同一个发布目录。
		outDir: "dist",
		// 输出可通过普通 script 标签加载的 IIFE。
		format: "iife",
		// 按浏览器运行时处理全局变量和依赖。
		platform: "browser",
		// 与 ESM 产物保持相同的 ES2022 语法基线。
		target: "es2022",
		// CDN 文件名由 outputOptions 明确控制，不使用 .mjs 固定扩展名。
		fixedExtension: false,
		// 类型声明已由 ESM 配置生成，IIFE 不重复输出。
		dts: false,
		// IIFE 是 CDN 直接分发文件，单独执行压缩。
		minify: true,
		// script 标签加载后通过 globalThis.FastElementPlusIconsVue 访问公共 API。
		globalName: "FastElementPlusIconsVue",
		// 固定 CDN 文件名，并把必需的 Vue Peer 映射到全局 Vue。
		outputOptions: {
			entryFileNames: "index.global.min.js",
			globals: { vue: "Vue" },
		},
		// 生成内嵌源码的 JavaScript Source Map，便于定位 CDN 运行时错误。
		sourcemap: true,
		// dist 已由 ESM 配置清理，避免第二个配置删除刚生成的产物。
		clean: false,
		// 移除根入口未引用的内部代码，减小 CDN 文件体积。
		treeshake: true,
		// 将 Vue TSX 转换为 Vue 3 渲染函数。
		plugins: [VueJsx()],
		// CDN 页面通过全局 Vue 提供运行时，图标包不重复打包 Vue。
		deps: {
			neverBundle: ["vue"],
		},
		// 将构建警告视为失败，防止带有潜在问题的产物进入发布流程。
		failOnWarn: true,
	},
]);
