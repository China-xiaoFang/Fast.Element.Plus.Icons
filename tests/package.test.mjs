import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const packageJson = JSON.parse(await readFile(new URL("package.json", root), "utf8"));

test("package metadata exposes one ESM entry and one CDN entry", () => {
	assert.equal(packageJson.type, "module");
	assert.match(packageJson.version, /^2\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u);
	assert.equal(packageJson.main, "./dist/index.mjs");
	assert.equal(packageJson.module, "./dist/index.mjs");
	assert.equal(packageJson.types, "./dist/index.d.mts");
	assert.deepEqual(packageJson.exports, {
		".": {
			types: "./dist/index.d.mts",
			import: "./dist/index.mjs",
			default: "./dist/index.mjs",
		},
	});
	assert.equal(packageJson.unpkg, "./dist/index.global.min.js");
	assert.equal(packageJson.jsdelivr, "./dist/index.global.min.js");
	assert.equal(packageJson.sideEffects, false);
});

test("build output is complete and does not expose unpublished source paths", async () => {
	const requiredFiles = [
		"dist/index.mjs",
		"dist/index.d.mts",
		"dist/icons/about/index.mjs.map",
		"dist/index.global.min.js",
		"dist/index.global.min.js.map",
	];
	await Promise.all(requiredFiles.map((file) => access(new URL(file, root))));

	const declaration = await readFile(new URL("dist/index.d.mts", root), "utf8");
	assert.doesNotMatch(declaration, /(?:\.\.\/)*src\//u);
	assert.doesNotMatch(declaration, /(?:\.\.\/)*packages\//u);

	const sourceMap = JSON.parse(await readFile(new URL("dist/icons/about/index.mjs.map", root), "utf8"));
	assert.ok(Array.isArray(sourceMap.sourcesContent));
	assert.ok(sourceMap.sourcesContent.every((source) => typeof source === "string"));

	const cdnBundle = await readFile(new URL("dist/index.global.min.js", root), "utf8");
	assert.match(cdnBundle, /FastElementPlusIconsVue/u);
});

test("publish allowlist contains only package artifacts and project documentation", () => {
	assert.deepEqual(packageJson.files, [
		"CHANGELOG.md",
		"CONTRIBUTING.md",
		"Fast.png",
		"LICENSE",
		"README.md",
		"README.zh.md",
		"SECURITY.md",
		"dist",
		"docs",
	]);
});
