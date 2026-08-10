# Fast.Element.Plus.Icons 开发与发布

## 基线

- Node.js：`^22.18.0 || ^24.18.0`。
- pnpm：`^11.0.0`，不固定补丁版本。
- Vue 3.3+、TypeScript 6、tsdown、ESLint 10 Flat Config、Prettier 3。
- 发布格式：包管理器使用 ESM、`.mjs` 与 `.d.mts`，CDN 使用压缩 IIFE；两类 JavaScript 产物均提供 Source Map。
- 根目录是唯一 npm 发布单元，根 `dist/` 是唯一产物目录。

应用环境包括现代浏览器、WebView 和 Vue 3。

## 安装与命令

```bash
corepack enable
pnpm install --frozen-lockfile
```

| 命令                  | 用途                                                 |
| --------------------- | ---------------------------------------------------- |
| `pnpm dev`            | 使用 tsdown 监听源码并增量构建                       |
| `pnpm build`          | 校验生成源码并构建 ESM 模块与压缩 IIFE               |
| `pnpm generate`       | 从 `icons/*.svg` 更新组件源码和根入口                |
| `pnpm generate:check` | 检查已提交生成源码是否与 SVG 一致                    |
| `pnpm typecheck`      | 检查源码、生成脚本与构建配置类型                     |
| `pnpm lint`           | 运行零警告 ESLint                                    |
| `pnpm format:check`   | 检查 Prettier                                        |
| `pnpm test:types`     | 验证公开消费者类型                                   |
| `pnpm test:runtime`   | 验证全部 SVG 对应的组件导出和运行时结构              |
| `pnpm test:package`   | 验证清单、入口、声明、Source Map、归档内容与 Publint |
| `pnpm check`          | 运行统一质量门禁                                     |

## 修改图标

新增或修改图标时必须同步：

1. 在 `icons/` 中新增或修改 lowerCamelCase 命名的 SVG。
2. 保留有效 `viewBox`，不得加入脚本、外部资源、内联事件处理器或 `foreignObject`。
3. 执行 `pnpm generate`，不要手工修改 `src/icons/` 或 `src/index.ts`。
4. 审查 SVG、生成 TSX 和根入口的完整差异。
5. 增加或调整运行时与消费者类型测试。
6. 更新双语 README、API 清单和 Changelog 中适用的内容。

删除或重命名图标时，必须同步处理对应的单个生成目录、公共 API 文档和测试。生成器不会自动批量清理失去 SVG 来源的目录。

## 注释与文档

- 每个公共组件、函数、类型、接口、类、方法或选项都应使用 TSDoc/JSDoc 说明适用的用途和约束。
- 参数、默认值、返回值、失败语义、运行环境、可访问性和安全边界应按实际契约记录。
- 只有存在非显然行为时才使用 `@remarks`、`@param`、`@returns`、`@throws` 或 `@defaultValue`。
- 实现注释解释安全边界、兼容约束或算法原因，不逐行翻译代码。
- 生成图标的公共注释和根入口包注释统一由 `scripts/generate-icons.ts` 维护。

## 依赖与锁文件

- Runtime Dependency 必须证明无法由平台能力或小型实现替代；当前运行时包不包含生产依赖。
- Vue 3.3+ 是必须安装的 Peer Dependency，ESM 与 IIFE 均保持外部引用。
- 依赖升级后使用 pnpm 11 更新 Lockfile，并通过 Frozen Lockfile 安装验证。
- 不混用 npm、Yarn 或不同 pnpm 主版本改写 Lockfile。

## CI

CI 在 Node.js 22 与 24 上运行，使用 Frozen Lockfile，并执行 `pnpm check` 与 Pack Dry Run。不得通过关闭类型、Lint、生成校验、测试或包验证来修复门禁。

## 发布

仓库采用人工发布流程：

1. 更新 SemVer 与 `CHANGELOG.md` 日期。
2. 执行 `pnpm install --frozen-lockfile`。
3. 执行 `pnpm check`。
4. 人工检查 `pnpm --config.ignore-scripts=true pack --dry-run` 清单。
5. 由维护者在可信环境执行 npm Publish，并创建对应 `v<version>` Tag。

未经明确授权，不执行 Publish、Push、Tag 或 Release。npm 已发布版本不可覆盖；发布后缺陷通过新的 Patch 或 Pre-release 修复。
