import assert from "node:assert/strict";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { ESLint } from "eslint";
import { getFileInfo } from "prettier";

const root = fileURLToPath(new URL("../", import.meta.url));
const ignoredPaths = [
	".agents/skills/example/SKILL.md",
	".agents/skills/example/check.ts",
	"packages/example/.agents/check.js",
	"skills-lock.json",
	"packages/example/skills-lock.json",
];
const maintainedPaths = ["AGENTS.md", "README.md", "src/index.ts"];

test("repository ESLint ignores root and nested skill files without hiding maintained files", async () => {
	const eslint = new ESLint({ cwd: root });
	for (const file of ignoredPaths) {
		assert.equal(await eslint.isPathIgnored(path.join(root, file)), true, file);
	}
	for (const file of maintainedPaths) {
		assert.equal(await eslint.isPathIgnored(path.join(root, file)), false, file);
	}
});

test("Prettier independently ignores skill files and retains repository documentation", async () => {
	const options = { ignorePath: path.join(root, ".prettierignore"), resolveConfig: false };
	for (const file of ignoredPaths) {
		assert.equal((await getFileInfo(path.join(root, file), options)).ignored, true, file);
	}
	for (const file of maintainedPaths) {
		assert.equal((await getFileInfo(path.join(root, file), options)).ignored, false, file);
	}
});

test("generated and handwritten components retain the shared reserved-name error rule", async () => {
	const eslint = new ESLint({ cwd: root });
	const results = await eslint.lintFiles(["src/icons/**/index.tsx"]);
	assert.ok(results.length > 0, "Generated icon files must actually be checked.");
	for (const result of results) {
		const config = await eslint.calculateConfigForFile(result.filePath);
		assert.equal(config.rules["vue/no-reserved-component-names"][0], 2, result.filePath);
		assert.equal(config.rules["vue/no-reserved-component-names"][1].htmlElementCaseSensitive, true);
		const failures = result.messages.filter((message) => message.fatal || message.ruleId === "vue/no-reserved-component-names");
		assert.deepEqual(failures, [], result.filePath);
	}
	const handwritten = await eslint.calculateConfigForFile(path.join(root, "src/handwritten.tsx"));
	assert.equal(handwritten.rules["vue/no-reserved-component-names"][0], 2);
});

test("reserved names are rejected even when introduced into generated icon paths", async () => {
	const eslint = new ESLint({ cwd: root });
	for (const name of ["address", "menu", "filter", "link"]) {
		const [result] = await eslint.lintText(`import { defineComponent } from "vue"; export default defineComponent({ name: "${name}" });`, {
			filePath: path.join(root, "src/icons/about/index.tsx"),
		});
		assert.equal(result.fatalErrorCount, 0);
		assert.ok(
			result.messages.some((message) => message.ruleId === "vue/no-reserved-component-names" && message.severity === 2),
			name
		);
	}
});
