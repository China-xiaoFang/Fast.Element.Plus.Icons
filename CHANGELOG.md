# Changelog

All notable changes to Fast.Element.Plus.Icons are documented in this file.

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

[2.0.0]: https://gitee.com/FastDotnet/Fast.Element.Plus.Icons/releases/tag/v2.0.0
