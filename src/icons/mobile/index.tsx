import { defineComponent } from "vue";

/**
 * 渲染 `Mobile` SVG 图标。
 *
 * @remarks
 * Vue 透传属性（如 `class`、`style`、`role`、`aria-label`、`width`、`height` 和 `fill`）会应用到根 `<svg>` 元素。
 */
export const Mobile = defineComponent({
	name: "Mobile",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path d="M736 0h-448C235.2 0 192 43.2 192 96v832c0 52.8 43.2 96 96 96h448c52.8 0 96-43.2 96-96v-832c0-52.8-43.2-96-96-96zM384 48h256v32H384v-32zM512 960a64 64 0 1 1 0-128 64 64 0 0 1 0 128z m256-192H256V128h512v640z" />
			</svg>
		);
	},
});

export default Mobile;
