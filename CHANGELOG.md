# Changelog

All notable changes to this project are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and releases should follow [Semantic Versioning](https://semver.org/).

## [2.0.3] - 2026-09-22

### Fixed

- Preserve runtime component names exactly as public exports, including Address, Filter, Link and Menu; remove the unpublished FastIcon renaming.
- Use case-sensitive reserved-name validation only for generated icons, retaining errors for lowercase HTML/SVG reserved names and the standard policy for handwritten components.
- Preserve the SVG text/CDATA fixes and rejection of unsupported executable or external markup.

### Documentation and Tooling

- Add pinned CDN links and a minimal browser example in both READMEs and the installation guides.
- Verify generated definitions, runtime names and component registration against the public-name contract.

## [2.0.2] - 2026-09-12

### Changed

- Expanded the applicable base and Vue JSX/TSX rules from Fast.ESLint.Config 2.1.8 directly in the repository's single `eslint.config.mjs`, adding only the required Vue parser and plugin dependencies.
- Generated 68 named Vue icon exports from repository SVG sources.

## [2.0.1] - 2026-08-26

### Changed

- Synchronized the self-contained ESLint Flat Config with the applicable JavaScript, TypeScript, import, regular-expression, JSON, and Markdown rules from Fast.ESLint.Config, including the source rule comments and TSX-specific project scopes without introducing a cross-package configuration dependency.
- Updated compatible Vue and development dependencies, the pnpm lockfile, package metadata, and documented VS Code recommendations while retaining the Node.js 22.18/24.18 compatibility contract.

## [2.0.0] - 2026-08-09

### Added

- Added 68 typed Vue 3 SVG components through one named-export ESM package entry.
- Added a separately minified `dist/index.global.min.js` IIFE for unpkg and jsDelivr.
- Added deterministic SVG generation with source-drift and unsafe-markup checks.
- Added strict type checking, ESLint, formatting checks, runtime tests, consumer type tests, package-contract tests, Publint and Node.js 22/24 CI.
- Added synchronized English and Chinese README and API references, runtime contract, contribution guidance, security policy and development/release instructions.
- Standardized repository-root publishing with one `package.json` and one root `dist/` directory.

### Security

- Added generator checks for script elements, foreign objects, inline event handlers and external or data URL references.
- Kept Vue external to package and CDN builds so applications retain framework-version and supply-chain control.

[2.0.3]: https://gitee.com/FastDotnet/fast.element.plus.icons/compare/v2.0.2...v2.0.3
[2.0.2]: https://gitee.com/FastDotnet/fast.element.plus.icons/compare/v2.0.1...v2.0.2
[2.0.1]: https://gitee.com/FastDotnet/fast.element.plus.icons/compare/v2.0.0...v2.0.1
[2.0.0]: https://gitee.com/FastDotnet/fast.element.plus.icons/releases/tag/v2.0.0
