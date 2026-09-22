import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";
import { createSSRApp } from "vue";
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

test("registration by public export key and runtime component name preserves compatibility", () => {
	const app = createSSRApp({ render: () => null });
	for (const [name, component] of Object.entries(icons)) {
		app.component(name, component);
		assert.equal(app.component(name), component, name);
	}
	assert.equal(app.component("Menu"), icons.Menu);
	for (const component of Object.values(icons)) assert.equal(app.component(component.name), component);
	assert.equal(icons.Menu.name, "Menu");
});
