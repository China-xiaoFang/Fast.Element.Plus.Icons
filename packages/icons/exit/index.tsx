import { defineComponent } from "vue";

/**
 * Exit 图标组件
 */
export const Exit = defineComponent({
	name: "Exit",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path
					d="M885.5 939.5H381.95c-25.2 0-45-20.25-45-45s20.25-45 45-45h458.1V174.95H381.95c-25.2 0-45-20.25-45-45s20.25-45 45-45H885.5c25.2 0 45 20.25 45 45V894.5c0 24.75-20.25 45-45 45z"
				/>
				<path
					d="M308.6 725.75c-11.7 0-22.95-4.5-31.95-13.05L107 543.5c-8.55-8.55-13.5-20.25-13.5-31.95a45 45 0 0 1 13.5-31.95L277.1 311.75a44.95517578 44.95517578 0 0 1 63.9 0.45c17.55 17.55 17.55 46.35-0.45 63.9L202.85 511.55l137.7 136.8c17.55 17.55 18 46.35 0 63.9-8.55 9-20.25 13.5-31.95 13.5z"
				/>
				<path d="M595.25 557H166.4c-25.2 0-45-20.25-45-45s20.25-45 45-45H595.25c25.2 0 45 20.25 45 45s-19.8 45-45 45z" />
			</svg>
			
		);
	},
});

export default Exit;
