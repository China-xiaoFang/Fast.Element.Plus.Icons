/**
 * 为一个 SVG 源文件创建需要提交到仓库的 Vue 组件模块源码。
 *
 * @param source - 已验证的公开组件名称和 SVG 标记。
 * @returns 尚未经过 Prettier 格式化的 TSX 模块源码。
 */
export const createComponentModule = (source: { componentName: string; svg: string }): string => {
	const { componentName, svg } = source;
	// 模板额外缩进三级，使嵌入的 SVG 在 render 返回值中保持稳定、可读的层级。
	const indentedSvg = svg
		.split("\n")
		.map((line) => `\t\t\t${line}`)
		.join("\n");

	return `import { defineComponent } from "vue";

/**
 * 渲染 \`${componentName}\` SVG 图标。
 *
 * @remarks
 * Vue 透传属性（如 \`class\`、\`style\`、\`role\`、\`aria-label\`、\`width\`、\`height\` 和 \`fill\`）会应用到根 \`<svg>\` 元素。
 */
export const ${componentName} = defineComponent({
\tname: "${componentName}",
\trender() {
\t\treturn (
${indentedSvg}
\t\t);
\t},
});

export default ${componentName};
`;
};
