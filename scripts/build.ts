import fs from "fs";
import path from "path";
import { __dirname, deleteFile, npmPackagePath } from "./file";

const findSvgFile = (dir: string): { iconName: string; componentName: string; iconContent: string }[] => {
	// svg 内容
	const svgContents: { iconName: string; componentName: string; iconContent: string }[] = [];
	// 获取当前目录下的文件
	const svgFiles = fs.readdirSync(dir, {
		withFileTypes: true,
	});
	console.log(svgFiles);

	svgFiles.forEach((file) => {
		if (file.isDirectory()) {
			svgContents.push(...findSvgFile(path.join(dir, file.name)));
		} else {
			const iconName = file.name.replace(".svg", "");

			const svgContent = fs
				.readFileSync(path.join(dir, file.name), "utf-8")
				.toString()
				.replace(/<\?xml.*?\?>/, "")
				.replace(/<!DOCTYPE svg.*?>/, "")
				// .replace(/(\r)|(\n)/g, "")
				// .replace(/(fill="[^>+].*?")/g, 'fill=""')
				.replace(/<svg([^>+].*?)>/, (match, attr) => {
					const viewBoxMatch = attr.match(/viewBox="[^"]+"/);
					const widthMatch = attr.match(/width="(\d+)"/);
					const heightMatch = attr.match(/height="(\d+)"/);
					let width = 1024;
					let height = 1024;
					if (widthMatch) {
						width = widthMatch[0];
					}
					if (heightMatch) {
						height = heightMatch[0];
					}
					let viewBoxContent = "";
					if (!viewBoxMatch) {
						viewBoxContent = `viewBox="0 0 ${width} ${height}"`;
					} else {
						viewBoxContent = viewBoxMatch[0];
					}
					return `<svg xmlns="http://www.w3.org/2000/svg" ${viewBoxContent}>`;
				});

			svgContents.push({
				// iconName: iconName.charAt(0).toUpperCase() + iconName.slice(1),
				iconName,
				componentName: iconName.charAt(0).toUpperCase() + iconName.slice(1),
				iconContent: svgContent,
			});
		}
	});

	return svgContents;

	// return svgContents.sort((a, b) => {
	// 	if (a.iconName < b.iconName) {
	// 		return -1;
	// 	}
	// 	if (a.iconName > b.iconName) {
	// 		return 1;
	// 	}
	// 	return 0;
	// });
};

const writeTSXIcon = (iconName: string, componentName: string, iconDir: string, svgContent: string): void => {
	fs.mkdirSync(iconDir, { recursive: true });

	const iconContent = `import { defineComponent } from "vue";

/**
 * ${componentName} 图标组件
 */
export const ${componentName} = defineComponent({
	name: "${componentName}",
	render() {
		return (
${svgContent
	.split("\n")
	.map((line) => `			${line}`)
	.join("\n")}
		);
	},
});

export default ${componentName};
`;

	fs.writeFileSync(path.join(iconDir, "index.tsx"), iconContent);
};

const deleteFiles = ["../packages/icons", path.join(npmPackagePath, "dist")];

console.log(`
清理文件中...
`);

deleteFiles.forEach((pItem) => {
	deleteFile(path.resolve(__dirname, pItem));
});

console.log(`
清理文件成功...
`);

console.log(`
重新构建 icons 图标库组件中...
`);

const iconsPath = path.resolve(__dirname, "../packages/icons");
fs.mkdirSync(iconsPath, { recursive: true });

fs.writeFileSync(
	path.join(iconsPath, "package.json"),
	`{
	"name": "@icons-vue/icons",
	"main": "index.ts"
}
`
);

const svgFiles = findSvgFile(path.resolve(__dirname, "../icons"));

console.log(`
共找到 ${svgFiles.length} 个svg图标文件...
`);

let exportContent = "";

svgFiles.forEach((svg, idx) => {
	writeTSXIcon(svg.iconName, svg.componentName, path.join(iconsPath, svg.iconName), svg.iconContent);
	console.log(`${svg.iconName} 图标组件构建成功...`);

	exportContent += `export * from "./${svg.iconName}";
`;
});

fs.writeFileSync(path.join(iconsPath, "index.ts"), exportContent);

console.log(`
构建 icons 图标库组件成功...
`);
