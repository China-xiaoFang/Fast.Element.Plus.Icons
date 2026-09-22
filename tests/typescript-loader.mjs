import { readFile } from "node:fs/promises";
import ts from "typescript";

export async function resolve(specifier, context, nextResolve) {
	try {
		return await nextResolve(specifier, context);
	} catch (error) {
		if (!specifier.startsWith(".") || error.code !== "ERR_MODULE_NOT_FOUND") throw error;
		return nextResolve(`${specifier}.ts`, context);
	}
}

export async function load(url, context, nextLoad) {
	if (!url.endsWith(".ts")) return nextLoad(url, context);
	const source = await readFile(new URL(url), "utf8");
	const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext }, fileName: url });
	return { format: "module", source: result.outputText, shortCircuit: true };
}
