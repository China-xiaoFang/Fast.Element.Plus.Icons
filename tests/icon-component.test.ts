import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { createComponentModule } from "../scripts/icon-component";
import { prepareSvgSource } from "../scripts/svg-source";

// Keep consumer expectations independent from the production mapping.
const expectedRuntimeNames = ["Address", "Filter", "Link", "Menu"];

const executableSource = (source: string): string =>
	ts.transpileModule(source, {
		fileName: "icon.tsx",
		compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, removeComments: true },
	}).outputText;

test("generated definitions contain literal runtime names and retain their public export", () => {
	for (const name of expectedRuntimeNames) {
		const code = createComponentModule({ componentName: name, svg: '<svg viewBox="0 0 1 1" />' });
		const file = ts.createSourceFile("icon.tsx", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
		const declaration = file.statements.find(ts.isVariableStatement)?.declarationList.declarations[0];
		assert.ok(declaration && ts.isIdentifier(declaration.name));
		assert.equal(declaration.name.text, name);
		assert.ok(declaration.initializer && ts.isCallExpression(declaration.initializer));
		const options = declaration.initializer.arguments[0];
		assert.ok(options && ts.isObjectLiteralExpression(options));
		const property = options.properties.find((member) => ts.isPropertyAssignment(member) && member.name.getText(file) === "name");
		assert.ok(property && ts.isPropertyAssignment(property) && ts.isStringLiteral(property.initializer));
		assert.equal(property.initializer.text, name);
		assert.ok(file.statements.some((statement) => ts.isExportAssignment(statement) && statement.expression.getText(file) === name));
	}
});

test("committed components match the generator's executable code with unique names", async () => {
	const svgDirectory = new URL("../icons/", import.meta.url);
	const names = new Set<string>();
	const runtimeNames = new Set<string>();
	const files = (await readdir(svgDirectory)).filter((file) => file.endsWith(".svg"));
	assert.ok(files.length > 0);
	for (const file of files) {
		const iconName = file.slice(0, -4);
		const name = `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
		const runtimeName = name;
		assert.equal(names.has(name), false, name);
		assert.equal(runtimeNames.has(runtimeName), false, runtimeName);
		names.add(name);
		runtimeNames.add(runtimeName);
		const svg = prepareSvgSource(await readFile(new URL(file, svgDirectory), "utf8"));
		const generated = createComponentModule({ componentName: name, svg });
		const committed = await readFile(new URL(`../src/icons/${iconName}/index.tsx`, import.meta.url), "utf8");
		// Transpilation normalizes formatting only for comparison; it is not a Vue runtime test.
		assert.equal(executableSource(committed), executableSource(generated), file);
	}
});
