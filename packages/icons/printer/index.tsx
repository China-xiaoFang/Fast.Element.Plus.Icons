import { defineComponent } from "vue";

/**
 * Printer 图标组件
 */
export const Printer = defineComponent({
	name: "Printer",
	render() {
		return (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
				<path
					d="M928 288H96v384h160v224h512V672h160zM704 832H320V544h384z m160-224h-96v-128H256v128h-96V352h704zM320 192h384v64h64V128H256v128h64v-64z"
				/>
				<path d="M384 608h256v64H384zM384 704h256v64H384z" />
				<path d="M800 416m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z" />
			</svg>
			
		);
	},
});

export default Printer;
