const elements = new Set([
	"svg",
	"g",
	"path",
	"rect",
	"circle",
	"ellipse",
	"line",
	"polyline",
	"polygon",
	"text",
	"tspan",
	"title",
	"desc",
	"defs",
	"use",
	"symbol",
	"clipPath",
	"mask",
	"linearGradient",
	"radialGradient",
	"stop",
	"pattern",
]);

const staticAttributes = new Set([
	"xmlns",
	"xmlns:xlink",
	"xml:space",
	"id",
	"class",
	"role",
	"tabindex",
	"focusable",
	"viewBox",
	"preserveAspectRatio",
	"x",
	"y",
	"x1",
	"y1",
	"x2",
	"y2",
	"cx",
	"cy",
	"r",
	"rx",
	"ry",
	"width",
	"height",
	"d",
	"points",
	"pathLength",
	"transform",
	"fill",
	"fill-rule",
	"fill-opacity",
	"stroke",
	"stroke-width",
	"stroke-opacity",
	"stroke-dasharray",
	"stroke-dashoffset",
	"stroke-linecap",
	"stroke-linejoin",
	"stroke-miterlimit",
	"opacity",
	"clip-path",
	"clip-rule",
	"clipPathUnits",
	"mask",
	"maskUnits",
	"maskContentUnits",
	"gradientUnits",
	"gradientTransform",
	"spreadMethod",
	"offset",
	"stop-color",
	"stop-opacity",
	"fx",
	"fy",
	"fr",
	"patternUnits",
	"patternContentUnits",
	"patternTransform",
	"href",
	"xlink:href",
	"text-anchor",
	"dominant-baseline",
	"font-family",
	"font-size",
	"font-weight",
	"letter-spacing",
	"dx",
	"dy",
	"textLength",
	"lengthAdjust",
	"color",
	"vector-effect",
]);

const decodeEntities = (text: string): string =>
	text.replace(/&(?:#(x[\da-f]+|\d+)|([a-z]+));/giu, (_, numeric: string | undefined, name: string | undefined) => {
		if (numeric) {
			const code = numeric[0]?.toLowerCase() === "x" ? Number.parseInt(numeric.slice(1), 16) : Number.parseInt(numeric, 10);
			if (!Number.isInteger(code) || code < 0 || code > 0x10ffff) throw new TypeError("Invalid SVG character reference.");
			return String.fromCodePoint(code);
		}
		const value = ({ amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" } as Record<string, string>)[name ?? ""];
		if (value === undefined) throw new TypeError("Unsupported SVG entity.");
		return value;
	});

const textForJsx = (text: string): string => text.replaceAll("{", "&#123;").replaceAll("}", "&#125;");

/**
 * 将仓库维护的自包含 SVG 子集转换为静态 JSX 标记。
 *
 * @remarks
 * 不是通用 SVG 消毒器。拒绝脚本、动画、样式表、未知元素、外部引用、DTD 和动态属性；
 * 支持的文本花括号保持字面含义，不生成 JSX 表达式。原始几何、颜色和分组保持不变。
 * @param raw - SVG 源文本
 * @returns 可嵌入 Vue TSX 的静态 SVG 标记
 * @throws `TypeError` 当输入不属于明确支持的自包含 SVG 子集。
 */
export function prepareSvgSource(raw: string): string {
	const source = raw
		.replace(/^\uFEFF/u, "")
		.replace(/\r\n?/gu, "\n")
		.replace(/^\s*<\?xml\s[^?]*\?>/u, "")
		.trim();
	const stack: string[] = [];
	const output: string[] = [];
	let position = 0;
	let roots = 0;
	const token = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<\/?[A-Za-z][^<>"']*(?:(?:"[^"]*"|'[^']*')[^<>"']*)*>|[^<]+/guy;
	while (position < source.length) {
		token.lastIndex = position;
		const match = token.exec(source);
		if (!match) throw new TypeError("Unsupported or malformed SVG markup.");
		position = token.lastIndex;
		const value = match[0];
		if (value.startsWith("<!--")) continue;
		if (!value.startsWith("<") || value.startsWith("<![CDATA[")) {
			const text = value.startsWith("<![CDATA[")
				? value.slice(9, -3).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")
				: value;
			if (stack.length === 0 && text.trim()) throw new TypeError("SVG text must be inside the root element.");
			decodeEntities(text);
			output.push(textForJsx(text));
			continue;
		}
		const closing = /^<\/([A-Za-z][\w:-]*)\s*>$/u.exec(value);
		if (closing) {
			if (stack.pop() !== closing[1]) throw new TypeError("Mismatched SVG closing tag.");
			output.push(value);
			continue;
		}
		const opening = /^<([A-Za-z][\w:-]*)(?=[\s/>])/u.exec(value);
		const tag = opening?.[1];
		if (!tag || !elements.has(tag)) throw new TypeError("Unsupported SVG element.");
		if (stack.length === 0 && (tag !== "svg" || roots++ !== 0)) throw new TypeError("Expected one SVG root.");
		const content = value.slice(opening?.[0].length ?? 0, -1).trimEnd();
		const attributes = content.endsWith("/") ? content.slice(0, -1) : content;
		const attribute = /\s+([A-Za-z_][\w:.-]*)\s*=\s*(?:"([^"]*)"|'([^']*)')/guy;
		const names = new Set<string>();
		let offset = 0;
		while (attributes.slice(offset).trim()) {
			attribute.lastIndex = offset;
			const item = attribute.exec(attributes);
			if (!item) throw new TypeError("SVG attributes must be static quoted values.");
			offset = attribute.lastIndex;
			const name = item[1] ?? "";
			const decoded = decodeEntities(item[2] ?? item[3] ?? "").trim();
			const lower = name.toLowerCase();
			if (
				(!staticAttributes.has(name) && !/^(?:aria|data)-[a-z][a-z\d-]*$/u.test(name)) ||
				names.has(name) ||
				/^on/iu.test(name) ||
				lower === "style" ||
				lower === "src" ||
				lower === "xml:base"
			) {
				throw new TypeError("Executable or duplicate SVG attribute.");
			}
			names.add(name);
			if (lower === "xmlns" && decoded !== "http://www.w3.org/2000/svg") throw new TypeError("Unexpected SVG namespace.");
			if (lower === "xmlns:xlink" && decoded !== "http://www.w3.org/1999/xlink") throw new TypeError("Unexpected XLink namespace.");
			if (name.includes(":") && !["xmlns:xlink", "xlink:href", "xml:space"].includes(name)) {
				throw new TypeError("Unsupported SVG namespace attribute.");
			}
			if (["href", "xlink:href"].includes(lower) && !/^#[^\s]+$/u.test(decoded)) {
				throw new TypeError("SVG references must target a local fragment.");
			}
			for (const character of decoded) {
				if (character === "\\" || character.charCodeAt(0) < 32) {
					throw new TypeError("Escaped or control-character SVG attribute is not supported.");
				}
			}
			if (/url\s*\(/iu.test(decoded) && !/^url\(\s*["']?#[\w:.-]+["']?\s*\)$/iu.test(decoded)) {
				throw new TypeError("SVG paint references must be local fragments.");
			}
		}
		if (tag === "svg" && stack.length === 0 && !names.has("viewBox")) throw new TypeError("SVG root requires viewBox.");
		if (!/\/\s*>$/u.test(value)) stack.push(tag);
		output.push(value);
	}
	if (roots !== 1 || stack.length !== 0) throw new TypeError("Incomplete SVG root.");
	return output.join("").trim();
}
