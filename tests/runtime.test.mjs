import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";
import * as icons from "../dist/index.mjs";

const toComponentName = (fileName) => {
	const iconName = fileName.replace(/\.svg$/u, "");
	return `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}`;
};

test("the runtime exports one Vue component for every SVG source", async () => {
	const svgFiles = (await readdir(new URL("../icons", import.meta.url))).filter((file) => file.endsWith(".svg"));
	const expectedNames = svgFiles.map(toComponentName).sort();
	assert.deepEqual(Object.keys(icons).sort(), expectedNames);

	for (const name of expectedNames) {
		const component = icons[name];
		assert.equal(component.name, name);
		assert.equal(typeof component.render, "function");

		const vnode = component.render();
		assert.equal(vnode.type, "svg");
		assert.equal(typeof vnode.props?.viewBox, "string");
	}
});
