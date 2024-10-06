/**
 * 构建预依赖的包
 */
const peerDependencies = ["vue"];

/**
 * 构建删除包
 */
const removedDevDependencies = [
	"@typescript-eslint/eslint-plugin",
	"@typescript-eslint/parser",
	"@vitejs/plugin-vue",
	"@vitejs/plugin-vue-jsx",
	"eslint",
	"eslint-config-prettier",
	"eslint-define-config",
	"eslint-plugin-import",
	"eslint-plugin-prettier",
	"eslint-plugin-vue",
	"prettier",
	"terser",
	"tsx",
	"typescript",
	"vite",
	"vite-plugin-dts",
	"vue-eslint-parser",
	"vue-tsc",
];

/**
 * 构建全局包
 */
const globalDependenciesMapping = {
	vue: "Vue",
};

export { peerDependencies, removedDevDependencies, globalDependenciesMapping };
