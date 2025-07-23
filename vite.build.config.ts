/**
 * 构建预依赖的包
 */
const peerDependencies = {
	vue: "Vue",
};

/**
 * 构建删除包
 */
const removedDevDependencies = [
	"@vitejs/plugin-vue",
	"@vitejs/plugin-vue-jsx",
	"rollup-plugin-terser",
	"terser",
	"tsx",
	"typescript",
	"vite",
	"vite-plugin-dts",
	"vue-tsc",
];

/**
 * 构建全局包
 */
const globalDependenciesMapping = {};

export { peerDependencies, removedDevDependencies, globalDependenciesMapping };
