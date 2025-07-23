import fs from "fs";
import path from "path";
import { __dirname, copyFile, npmPackagePath } from "./file";

const packagePath = path.resolve(__dirname, "../package.json");
const packageProPath = path.join(npmPackagePath, "package.json");

const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf-8"));

const versionPath = path.resolve(__dirname, "../packages/version.ts");

const oldVersion = packageJson.version as string;

// 根据.分割
const vArr = oldVersion.split(".");

// 获取版本号
let vNum1 = Number(vArr[0]);
let vNum2 = Number(vArr[1]);
let vNum3 = Number(vArr[2]);
vNum3 += 1;

if (vNum3 >= 99) {
	// 第二位增加1
	vNum2 += 1;
	vNum3 = 0;
}

if (vNum2 > 99) {
	// 第一位增加1
	vNum1 += 1;
	vNum2 = 0;
}

// 新版本号
const newVersion = `${vNum1}.${vNum2}.${vNum3}`;

packageJson.version = newVersion;

const newPackageJson = {
	name: packageJson.name,
	version: packageJson.version,
	description: packageJson.description,
	type: packageJson.type,
	keywords: packageJson.keywords,
	license: packageJson.license,
	homepage: packageJson.homepage,
	bugs: packageJson.bugs,
	repository: packageJson.repository,
	author: packageJson.author,
	files: ["./Fast.png", "./LICENSE", "./README.md", "./README.zh.md", "./dist"],
	main: "dist/index.cjs",
	module: "dist/index.js",
	types: "dist/types/index.d.ts",
	exports: {
		".": {
			types: "./dist/types/index.d.ts",
			require: "./dist/index.js",
			import: "./dist/index.cjs",
		},
		"./global": {
			types: "./dist/types/global.d.ts",
		},
		"./*": "./*",
	},
	typesVersions: {
		"*": {
			"*": ["./*", "./dist/types/*"],
		},
	},
	sideEffects: false,
	unpkg: "dist/index.iife.min.js",
	jsdelivr: "dist/index.iife.min.js",
	publishConfig: packageJson.publishConfig,
	peerDependencies: {
		vue: "^3",
	},
	devDependencies: {},
	browserslist: packageJson.browserslist,
};

newPackageJson.devDependencies = Object.keys(packageJson.devDependencies ?? {}).reduce((acc, key) => {
	if (!key.startsWith("@icons-vue/")) {
		acc[key] = packageJson.devDependencies[key];
	}
	return acc;
}, {});

if (Object.keys(newPackageJson.peerDependencies).length === 0) {
	delete (newPackageJson as any).peerDependencies;
}

if (Object.keys(newPackageJson.devDependencies).length === 0) {
	delete (newPackageJson as any).devDependencies;
}

// 写入 package.json 文件
fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, "\t")}\n`, "utf-8");
fs.writeFileSync(packageProPath, `${JSON.stringify(newPackageJson, null, "\t")}\n`, "utf-8");

// 写入 version.ts 文件
fs.writeFileSync(
	versionPath,
	`export const version = "${newVersion}";
`
);

console.log(`
Update version to ${newVersion} ...
`);

console.log(`
更新开源信息中...
`);

const moveFiles = [
	path.resolve(__dirname, "../Fast.png"),
	path.resolve(__dirname, "../LICENSE"),
	path.resolve(__dirname, "../README.md"),
	path.resolve(__dirname, "../README.zh.md"),
];

moveFiles.forEach((item) => {
	copyFile(item, npmPackagePath);
});

console.log(`
更新开源信息成功...
`);
