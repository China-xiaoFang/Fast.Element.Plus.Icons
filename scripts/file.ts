import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const npmPackagePath = path.resolve(__dirname, "../@fast-element-plus/icons-vue");

export const deleteFile = (src: string): void => {
	if (fs.existsSync(src)) {
		if (!fs.lstatSync(src).isDirectory()) {
			fs.unlinkSync(src);
		} else {
			fs.readdirSync(src).forEach((file, index) => {
				const cPath = path.join(src, file);
				if (fs.lstatSync(cPath).isDirectory()) {
					deleteFile(cPath);
				} else {
					fs.unlinkSync(cPath);
				}
			});
			fs.rmSync(src, { recursive: true });
		}
	}
};

export const copyFile = (sDir: string, dDir: string, fileSuffix?: string, oSDir?: string): void => {
	if (!fs.existsSync(sDir)) return;

	const stat = fs.lstatSync(sDir);
	if (stat.isDirectory()) {
		const entries = fs.readdirSync(sDir, { withFileTypes: true });

		entries.forEach((entry) => {
			const sPath = path.join(sDir, entry.name);
			const dPath = path.join(dDir, entry.name);

			if (entry.isDirectory()) {
				if (!fs.existsSync(dPath)) {
					fs.mkdirSync(dPath);
				}
				copyFile(sPath, dDir, fileSuffix, oSDir ?? sDir);
			} else {
				const relativePath = path.relative(oSDir ?? sDir, sPath);
				const rDPath = path.join(dDir, relativePath);
				if (fileSuffix) {
					if (entry.name.endsWith(fileSuffix)) {
						if (fs.existsSync(rDPath)) {
							fs.unlinkSync(rDPath);
						}
						fs.copyFileSync(sPath, rDPath);
					}
				} else {
					const relativePath = path.relative(oSDir ?? sDir, sPath);
					const rDPath = path.join(dDir, relativePath);
					if (fs.existsSync(rDPath)) {
						fs.unlinkSync(rDPath);
					}
					fs.copyFileSync(sPath, rDPath);
				}
			}
		});
	} else {
		const fileName = path.basename(sDir);
		const dFileName = path.join(dDir, fileName);
		if (fs.existsSync(dFileName)) {
			fs.unlinkSync(dFileName);
		}
		if (fileSuffix) {
			if (path.extname(sDir) === fileSuffix) {
				fs.copyFileSync(sDir, dFileName);
			}
		} else {
			fs.copyFileSync(sDir, dFileName);
		}
	}
};
