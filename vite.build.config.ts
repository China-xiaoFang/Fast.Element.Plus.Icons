/**
 * 构建忽略包
 */
const externalDependencies = ["element-plus", "vue"];

/**
 * 构建全局包
 */
const buildGlobalDependencies = {
	"element-plus": "ElementPlus",
	vue: "Vue",
};

export { externalDependencies, buildGlobalDependencies };
