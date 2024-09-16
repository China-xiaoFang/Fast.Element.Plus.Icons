import path from "path";
import { __dirname, __filename, copyFile, npmPackagePath } from "./file";

copyFile(path.resolve(__dirname, "../packages"), path.join(npmPackagePath, "es"), ".d.ts");
copyFile(path.resolve(__dirname, "../packages"), path.join(npmPackagePath, "lib"), ".d.ts");
