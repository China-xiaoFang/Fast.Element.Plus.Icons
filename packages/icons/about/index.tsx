import { defineComponent } from "vue";
import { withInstall } from "@icons-vue/utils";

export const About = withInstall(
	defineComponent({
		name: "About",
		render() {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
					<path
						d="M512.7 87.9c-235.3 0-426 190.7-426 426s190.7 426 426 426 426-190.7 426-426-190.8-426-426-426zm0 786.4c-198.8 0-360.5-161.7-360.5-360.5s161.7-360.5 360.5-360.5S873.2 315 873.2 513.8 711.4 874.3 512.7 874.3z"
					/>
					<path
						d="M512.7 481.1c-18.1 0-32.8 14.7-32.8 32.8V776c0 18.1 14.7 32.8 32.8 32.8s32.8-14.7 32.8-32.8V513.9c-.1-18.1-14.7-32.8-32.8-32.8zm-32.8-196.6h65.5V350h-65.5z"
					/>
				</svg>
			);
		},
	})
);

export default About;