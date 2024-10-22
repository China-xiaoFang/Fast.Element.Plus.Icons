import fs from "fs";
import path from "path";
import { __dirname, __filename, copyFile, npmPackagePath } from "./file";
import { peerDependencies, removedDevDependencies } from "../vite.build.config";

const updatePackage = (): void => {
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
		author: packageJson.author,
		version: packageJson.version,
		description: packageJson.description,
		keywords: packageJson.keywords,
		license: packageJson.license,
		publishConfig: packageJson.publishConfig,
		homepage: packageJson.homepage,
		repository: packageJson.repository,
		bugs: packageJson.bugs,
		main: "dist/index.js",
		module: "es/index.mjs",
		types: "es/index.d.ts",
		exports: {
			".": {
				types: "./es/index.d.ts",
				import: "./es/index.mjs",
				require: "./lib/index.js",
			},
			"./es": {
				types: "./es/index.d.ts",
				import: "./es/index.mjs",
			},
			"./lib": {
				types: "./lib/index.d.ts",
				require: "./lib/index.js",
			},
			"./es/*.mjs": {
				types: "./es/*.d.ts",
				import: "./es/*.mjs",
			},
			"./es/*": {
				types: ["./es/*.d.ts", "./es/*/index.d.ts"],
				import: "./es/*.mjs",
			},
			"./lib/*.js": {
				types: "./lib/*.d.ts",
				require: "./lib/*.js",
			},
			"./lib/*": {
				types: ["./lib/*.d.ts", "./lib/*/index.d.ts"],
				require: "./lib/*.js",
			},
			"./*": "./*",
		},
		unpkg: "dist/index.iife.js",
		jsdelivr: "dist/index.iife.js",
		files: ["./Fast.png", "./LICENSE", "./README.md", "./README.zh.md", "./dist", "./es", "./lib"],
		peerDependencies: {},
		dependencies: packageJson.dependencies,
		devDependencies: {},
		browserslist: packageJson.browserslist,
	};

	Object.keys(packageJson.devDependencies ?? {}).forEach((needKey) => {
		if (peerDependencies.includes(needKey)) {
			newPackageJson.peerDependencies[needKey] = packageJson.devDependencies[needKey];
		}
	});

	newPackageJson.devDependencies = Object.keys(packageJson.devDependencies ?? {}).reduce((acc, key) => {
		if (!key.startsWith("@icons-vue/")) {
			if (!removedDevDependencies.includes(key)) {
				acc[key] = packageJson.devDependencies[key];
			}
		}
		return acc;
	}, {});

	if (Object.keys(newPackageJson.peerDependencies).length === 0) {
		delete (newPackageJson as any).peerDependencies;
	}

	if (Object.keys(newPackageJson.dependencies).length === 0) {
		delete (newPackageJson as any).dependencies;
	}

	if (Object.keys(newPackageJson.devDependencies).length === 0) {
		delete (newPackageJson as any).devDependencies;
	}

	// 写入 package.json 文件
	fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`, "utf-8");
	fs.writeFileSync(packageProPath, `${JSON.stringify(newPackageJson, null, 2)}\n`, "utf-8");

	// 写入 version.ts 文件
	fs.writeFileSync(
		versionPath,
		`export const version = "${newVersion}";
`
	);

	console.log(`
  Update version to ${newVersion} ...
  `);
};

updatePackage();

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
