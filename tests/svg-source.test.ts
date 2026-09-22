import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";
import { prepareSvgSource } from "../scripts/svg-source";

const wrap = (body: string) => `<svg viewBox="0 0 10 10">${body}</svg>`;

test("SVG text braces remain text rather than executable JSX", () => {
	const svg = prepareSvgSource(wrap("<text>{2 + 2}</text>"));
	assert.ok(svg.includes("&#123;2 + 2&#125;"));
	const source = ts.createSourceFile("icon.tsx", `const icon = (${svg});`, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
	const visit = (node: ts.Node): void => {
		assert.equal(ts.isJsxExpression(node), false);
		ts.forEachChild(node, visit);
	};
	visit(source);
});

test("external references, executable markup and malformed trees are rejected", () => {
	for (const body of [
		'<use href="//example.test/icon.svg#x" />',
		'<use href="relative.svg#x" />',
		'<use href="&#x2f;&#x2f;example.test/x" />',
		"<script>run()</script>",
		'<svg innerHTML="&lt;script&gt;run()&lt;/script&gt;" />',
		'<path onload="run()" />',
		"<path {...value} />",
		"<g><path /></svg>",
		'<path fill="url(https://example.test/x)" />',
		"<foreignObject />",
		"<style>path{fill:red}</style>",
	]) {
		assert.throws(() => prepareSvgSource(wrap(body)), TypeError);
	}
	assert.throws(() => prepareSvgSource(`<!DOCTYPE svg [<!ENTITY a "x">]>${wrap("&a;")}`), TypeError);
});

test("local paint and use references and literal CDATA are supported", () => {
	assert.ok(prepareSvgSource(wrap('<use href="#shape" /><path fill="url(#paint)" />')).includes('href="#shape"'));
	assert.ok(prepareSvgSource(wrap("<text><![CDATA[{a < b}]]></text>")).includes("&#123;a &lt; b&#125;"));
});

test("all existing repository SVG geometry passes without text or attribute rewriting", async () => {
	const directory = new URL("../icons/", import.meta.url);
	for (const name of await readdir(directory)) {
		if (!name.endsWith(".svg")) continue;
		const raw = await readFile(new URL(name, directory), "utf8");
		assert.equal(
			prepareSvgSource(raw),
			raw
				.replace(/^\uFEFF/u, "")
				.replace(/\r\n?/gu, "\n")
				.trim(),
			name
		);
	}
});
