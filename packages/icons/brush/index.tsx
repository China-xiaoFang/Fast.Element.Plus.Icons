import { defineComponent } from "vue";

/**
 * Brush 图标组件
 */
export const Brush = defineComponent({
	name: "Brush",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path
					d="M771.2 419.2H636.8V124.8C636.8 54.4 582.4 0 512 0S387.2 54.4 387.2 124.8v294.4H256c-64 0-121.6 54.4-121.6 121.6v361.6c0 64 54.4 121.6 121.6 121.6h512c64 0 121.6-54.4 121.6-121.6V540.8c3.2-67.2-51.2-121.6-118.4-121.6z m-512 60.8H416c19.2 0 35.2-16 35.2-35.2V128c0-32 25.6-60.8 57.6-64 35.2-3.2 64 22.4 67.2 57.6v323.2c0 19.2 16 35.2 35.2 35.2H768c32 0 57.6 25.6 57.6 57.6v57.6H198.4v-57.6c0-32 28.8-57.6 60.8-57.6z m512 483.2H656V822.4c0-16-12.8-28.8-28.8-28.8s-28.8 12.8-28.8 28.8v140.8H425.6V825.6c0-16-12.8-28.8-28.8-28.8S368 809.6 368 825.6v137.6H259.2c-32 0-57.6-25.6-57.6-57.6V659.2H832v246.4c0 28.8-28.8 57.6-60.8 57.6z"
				/>
			</svg>
			
		);
	},
});

export default Brush;
