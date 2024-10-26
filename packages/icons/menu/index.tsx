import { defineComponent } from "vue";
import { withInstall } from "@icons-vue/utils";

export const Menu = withInstall(
	defineComponent({
		name: "Menu",
		render() {
			return (
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
					<path
						d="M380.744 480.94H100.196A100.196 100.196 0 0 1 0 380.743V100.196A100.196 100.196 0 0 1 100.196 0h280.548a100.196 100.196 0 0 1 100.195 100.196v280.548a100.196 100.196 0 0 1-100.195 100.195zM100.196 80.156a20.04 20.04 0 0 0-20.04 20.039v280.548a20.04 20.04 0 0 0 20.04 20.039h280.548a20.04 20.04 0 0 0 20.039-20.04V100.197a20.04 20.04 0 0 0-20.04-20.04zm823.608 400.782H643.256a100.196 100.196 0 0 1-100.195-100.195V100.196A100.196 100.196 0 0 1 643.256 0h280.548A100.196 100.196 0 0 1 1024 100.196v280.548a100.196 100.196 0 0 1-100.196 100.195zM643.256 80.157a20.04 20.04 0 0 0-20.039 20.039v280.548a20.04 20.04 0 0 0 20.04 20.039h280.547a20.04 20.04 0 0 0 20.04-20.04V100.197a20.04 20.04 0 0 0-20.04-20.04zM380.744 1024H100.196A100.196 100.196 0 0 1 0 923.804V643.256a100.196 100.196 0 0 1 100.196-100.195h280.548a100.196 100.196 0 0 1 100.195 100.195v280.548A100.196 100.196 0 0 1 380.744 1024zM100.196 623.217a20.04 20.04 0 0 0-20.04 20.04v280.547a20.04 20.04 0 0 0 20.04 20.04h280.548a20.04 20.04 0 0 0 20.039-20.04V643.256a20.04 20.04 0 0 0-20.04-20.039zM827.616 1024h-184.36a100.196 100.196 0 0 1-100.195-100.196V643.256a100.196 100.196 0 0 1 100.195-100.195h280.548A100.196 100.196 0 0 1 1024 643.256V818.6a40.078 40.078 0 0 1-80.157 0V643.256a20.04 20.04 0 0 0-20.039-20.039H643.256a20.04 20.04 0 0 0-20.039 20.04v280.547a20.04 20.04 0 0 0 20.04 20.04h184.36a40.078 40.078 0 0 1 0 80.156z"
					/>
				</svg>
			);
		},
	})
);

export default Menu;