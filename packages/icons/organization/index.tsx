import { defineComponent } from "vue";
import { withInstall } from "@icons-vue/utils";

export const Organization = withInstall(
	defineComponent({
		name: "Organization",
		render() {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
					<path
						d="M160 576a96 96 0 0 1 86.784-95.552L256 480h224V384H448a64 64 0 0 1-64-64V192a64 64 0 0 1 64-64h128a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-32v96H768a96 96 0 0 1 95.552 86.784L864 576v64h32a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64h-128a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h32V576a32 32 0 0 0-26.24-31.488L768 544H256a32 32 0 0 0-31.488 26.24L224 576v64H256a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64H128a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h32V576zM576 640a64 64 0 0 1 64 64v128a64 64 0 0 1-64 64H448a64 64 0 0 1-64-64v-128a64 64 0 0 1 64-64h128z m-320 64H128v128h128v-128z m320 0H448v128h128v-128z m320 0h-128v128h128v-128zM576 192H448v128h128V192z"
						p-id="3397"
					></path>
				</svg>
			);
		},
	})
);

export default Organization;
