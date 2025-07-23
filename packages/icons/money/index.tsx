import { defineComponent } from "vue";

/**
 * Money 图标组件
 */
export const Money = defineComponent({
	name: "Money",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path
					d="M512 960A448 448 0 1 0 512 64a448 448 0 0 0 0 896zM512 128a384 384 0 1 1 0 768A384 384 0 0 1 512 128z m0 281.6L425.28 319.232a32 32 0 1 0-46.208 44.224L473.6 462.08H384a32 32 0 0 0 0 64h96v50.56H384a32 32 0 0 0 0 64h96V704a32 32 0 0 0 64 0v-63.424H640a32 32 0 0 0 0-64H544v-50.56H640a32 32 0 0 0 0-64H550.4l94.4-98.56a32 32 0 1 0-46.208-44.288L511.936 409.6z"
				/>
			</svg>
			
		);
	},
});

export default Money;
