import { defineComponent } from "vue";

/**
 * 渲染 `Component` SVG 图标。
 *
 * @remarks
 * Vue 透传属性（如 `class`、`style`、`role`、`aria-label`、`width`、`height` 和 `fill`）会应用到根 `<svg>` 元素。
 */
export const Component = defineComponent({
	name: "Component",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path d="M64 64h384v384H64V64z m0 512h384v384H64V576z m512 0h384v384H576V576z m192-128c106.039 0 192-85.961 192-192S874.039 64 768 64s-192 85.961-192 192 85.961 192 192 192z" />
			</svg>
		);
	},
});

export default Component;
