import { defineComponent } from "vue";
import { ElIcon } from "element-plus";

/**
 * Light 图标组件
 */
export default defineComponent({
	name: "Light",
	components: {
		ElIcon,
	},
	setup(_, { attrs }) {
		return {
			attrs,
		};
	},
	render() {
		return (
			<ElIcon {...this.attrs} class="fa-icon fa-icon-Light icon">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
					<path
						d="M298.688 676.16l-52.288 52.352a24.704 24.704 0 0 0 34.88 34.88l52.352-52.416a24.704 24.704 0 0 0-34.944-34.816m-14.976-372.672c9.664 9.6 25.472 9.6 35.2 0a24.96 24.96 0 0 0 0-35.2l-52.8-52.8a24.832 24.832 0 1 0-35.2 35.136l52.8 52.864M213.76 472.32H139.136a24.832 24.832 0 1 0 0 49.728H213.76c13.76 0 24.896-11.008 24.896-24.832a24.96 24.96 0 0 0-24.96-24.96m298.88-248.96a24.832 24.832 0 0 0 24.832-24.832V123.648a24.832 24.832 0 1 0-49.792 0V198.4a24.96 24.96 0 0 0 24.96 24.832m239.552 69.248l52.288-52.352a24.704 24.704 0 0 0-34.88-34.88l-52.288 52.224a24.704 24.704 0 1 0 34.88 35.008m133.888 179.776h-74.688a24.832 24.832 0 1 0 0 49.728h74.688a24.96 24.96 0 0 0 0-49.728m-144.64 218.624a24.832 24.832 0 1 0-35.2 35.136l52.864 52.864c9.664 9.6 25.472 9.6 35.2 0a24.96 24.96 0 0 0 0-35.2l-52.8-52.8M512.64 272.96a224.256 224.256 0 1 0 0 448.512 224.256 224.256 0 1 0 0-448.448m0 497.92a24.896 24.896 0 0 0-24.96 25.088v74.56c0 13.888 11.136 24.96 24.96 24.96a24.768 24.768 0 0 0 24.832-24.96v-74.56a24.96 24.96 0 0 0-24.832-25.024z"
					></path>
				</svg>
			</ElIcon>
		);
	},
});
