import fastChinaFlat from "@fast-china/eslint-config/flat";
import { defineConfig } from "eslint/config";

export default defineConfig(...fastChinaFlat, {
	name: "icons-vue/ignores",
	ignores: ["packages/icons"],
});
