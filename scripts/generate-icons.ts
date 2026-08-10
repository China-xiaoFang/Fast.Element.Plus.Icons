import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { format, resolveConfig } from "prettier";

/** 描述单个 SVG 源及其生成组件所需的稳定元数据。 */
interface IconSource {
	/** 对外导出的 PascalCase Vue 组件名。 */
	componentName: string;
	/** 不含扩展名的 lowerCamelCase SVG 文件名。 */
	iconName: string;
	/** 已校验并完成文本归一化的 SVG 标记。 */
	svg: string;
}

// 输入固定来自仓库根目录的 icons，生成源码统一提交到 src，避免维护多份路径配置。
const repositoryRoot = fileURLToPath(new URL("..", import.meta.url));
const svgDirectory = path.join(repositoryRoot, "icons");
const sourceDirectory = path.join(repositoryRoot, "src");
const generatedIconsDirectory = path.join(sourceDirectory, "icons");

// 校验模式只报告生成结果漂移，不改写工作区文件，供 CI 和构建前检查使用。
const checkOnly = process.argv.includes("--check");

/**
 * 将稳定的 lowerCamelCase SVG 文件名转换为现有的 PascalCase 公共组件名。
 *
 * @param iconName - 不含 `.svg` 扩展名的 SVG 基础名称。
 * @returns Vue 组件名和具名导出标识符。
 * @throws {TypeError} 文件名无法生成合法的 JavaScript 标识符时抛出。
 */
const toComponentName = (iconName: string): string => {
	const componentName = `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;

	// 限制为合法标识符，防止文件名生成无法编译或可注入代码的导出语句。
	if (!/^[A-Z_$][\w$]*$/u.test(componentName)) {
		throw new TypeError(`Invalid icon file name: ${iconName}.svg`);
	}
	return componentName;
};

/**
 * 在 SVG 嵌入 Vue TSX 前完成安全校验和格式归一化。
 *
 * @remarks
 * 此处不优化或重着色 SVG；原始 `viewBox`、填充、描边和分组均属于图标视觉契约。
 *
 * @param filePath - 仓库内 SVG 文件的绝对路径。
 * @returns 使用 LF 换行且已移除 XML/DOCTYPE 声明的 SVG 标记。
 * @throws {TypeError} 输入不是安全、完整的单一 SVG 根节点时抛出。
 */
const readSvg = async (filePath: string): Promise<string> => {
	const raw = await readFile(filePath, "utf8");

	// 统一文本格式并移除 TSX 不需要的文档级声明，保留 SVG 元素本身的原始结构。
	const svg = raw
		.replace(/^\uFEFF/u, "")
		.replace(/\r\n?/gu, "\n")
		.replace(/<\?xml[\s\S]*?\?>/giu, "")
		.replace(/<!DOCTYPE[\s\S]*?>/giu, "")
		.trim();

	const openingTag = /^<svg\b[^>]*>/u.exec(svg)?.[0];

	// 每个图标必须是可独立渲染的单一 SVG，并通过 viewBox 保持缩放行为一致。
	if (!/^<svg\b[\s\S]*<\/svg>$/u.test(svg) || !openingTag || !/\sviewBox\s*=/u.test(openingTag)) {
		throw new TypeError(`Icon must contain one SVG root with a viewBox: ${filePath}`);
	}

	// 拒绝脚本、事件处理器和外部资源，避免生成组件携带可执行或非自包含内容。
	if (/<(?:script|foreignObject)\b|\son[a-z]+\s*=|\s(?:href|xlink:href)\s*=\s*["'](?:data:|https?:)/iu.test(svg)) {
		throw new TypeError(`Icon contains executable or external content: ${filePath}`);
	}
	return svg;
};

/**
 * 为一个 SVG 源文件创建需要提交到仓库的 Vue 组件模块源码。
 *
 * @param source - 已验证的图标名称、组件名称和 SVG 标记。
 * @returns 尚未经过 Prettier 格式化的 TSX 模块源码。
 */
const createComponentModule = ({ componentName, svg }: IconSource): string => {
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

/**
 * 同步单个生成文件；在校验模式下仅记录与预期内容不一致的文件。
 *
 * @param filePath - 生成文件的绝对路径。
 * @param expected - 文件应包含的完整内容。
 * @param driftedFiles - 校验模式下收集相对路径的数组。
 */
const syncFile = async (filePath: string, expected: string, driftedFiles: string[]): Promise<void> => {
	let current: string | undefined;
	try {
		current = await readFile(filePath, "utf8");
	} catch (error: unknown) {
		// 文件尚未生成等同于内容漂移；其他读取错误必须继续抛出，不能被静默忽略。
		if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
	}

	if (current === expected) return;

	if (checkOnly) {
		driftedFiles.push(path.relative(repositoryRoot, filePath));
		return;
	}

	// 仅创建当前图标需要的明确目录，不负责清理任何已有目录。
	await mkdir(path.dirname(filePath), { recursive: true });
	await writeFile(filePath, expected, "utf8");
};

/** 扫描全部 SVG，生成组件和入口文件，并在校验模式下汇总源码漂移。 */
const main = async (): Promise<void> => {
	const prettierConfig = (await resolveConfig(path.join(repositoryRoot, ".prettierrc.cjs"))) ?? {};

	// 显式排序保证不同文件系统和运行环境产生完全一致的导出顺序。
	const svgEntries = (await readdir(svgDirectory, { withFileTypes: true }))
		.filter((entry) => entry.isFile() && entry.name.endsWith(".svg"))
		.sort((left, right) => (left.name < right.name ? -1 : left.name > right.name ? 1 : 0));

	const icons: IconSource[] = await Promise.all(
		svgEntries.map(async (entry) => {
			const iconName = path.basename(entry.name, ".svg");
			return {
				componentName: toComponentName(iconName),
				iconName,
				svg: await readSvg(path.join(svgDirectory, entry.name)),
			};
		})
	);

	if (icons.length === 0) throw new Error("No SVG icons were found.");

	// 不自动删除失效目录，避免文件重命名或输入错误导致已提交源码被静默移除。
	const expectedDirectories = new Set(icons.map((icon) => icon.iconName));
	const existingDirectories = (await readdir(generatedIconsDirectory, { withFileTypes: true }))
		.filter((entry) => entry.isDirectory())
		.map((entry) => entry.name);
	const staleDirectories = existingDirectories.filter((directory) => !expectedDirectories.has(directory));
	if (staleDirectories.length > 0) {
		throw new Error(`Stale generated icon directories must be reviewed and removed explicitly: ${staleDirectories.join(", ")}`);
	}

	const driftedFiles: string[] = [];

	// 每个组件独立生成并格式化，可并发执行且不会产生共享写入冲突。
	await Promise.all(
		icons.map(async (icon) => {
			const outputPath = path.join(generatedIconsDirectory, icon.iconName, "index.tsx");
			const source = await format(createComponentModule(icon), { ...prettierConfig, filepath: outputPath });
			await syncFile(outputPath, source, driftedFiles);
		})
	);

	// 根入口只导出公共图标模块，不暴露生成脚本或内部源文件路径。
	const indexPath = path.join(sourceDirectory, "index.ts");
	const indexSource = await format(
		`/**
 * Fast.Element.Plus.Icons public API.
 *
 * @packageDocumentation
 */
${icons.map((icon) => `export * from "./icons/${icon.iconName}";`).join("\n")}\n`,
		{
			...prettierConfig,
			filepath: indexPath,
		}
	);
	await syncFile(indexPath, indexSource, driftedFiles);

	if (driftedFiles.length > 0) {
		throw new Error(`Generated icon sources are out of date. Run pnpm generate:\n${driftedFiles.map((file) => `- ${file}`).join("\n")}`);
	}

	console.log(`${checkOnly ? "Verified" : "Generated"} ${icons.length} Vue icon components.`);
};

// 顶层统一设置退出码，让命令行和 CI 正确感知失败，同时保留简洁错误信息。
void main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exitCode = 1;
});
