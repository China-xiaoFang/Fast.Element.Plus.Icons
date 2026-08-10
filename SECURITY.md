# Security Policy

## Supported releases

Security fixes are provided for the latest stable release. Pre-release builds and unsupported runtime combinations receive best-effort investigation only.

## Reporting a vulnerability

Do not open a public issue for a suspected vulnerability. Email `2875616188@qq.com` with the subject `@fast-element-plus/icons-vue security report` and include:

- affected package version and public API;
- runtime, browser and Vue version;
- a minimal reproduction without real credentials or user data;
- expected and observed impact;
- whether untrusted SVG markup, attributes or external resources are involved.

Maintainers should acknowledge a complete report within five business days. Timelines depend on severity, reproducibility, affected platforms and release coordination. Do not disclose the issue publicly until a fix and coordinated disclosure plan are available.

## Security boundaries

Fast.Element.Plus.Icons is a component library, not a general-purpose SVG sanitizer.

- Only trusted, reviewed repository SVG files may be processed. Generator checks reject common active-content patterns but do not make arbitrary SVG input safe.
- Applications control accessible labels, event listeners and arbitrary Vue fallthrough attributes. Do not bind untrusted attribute objects without validation.
- The CDN build requires a separately loaded Vue global. Pin exact versions and apply the deployment's CSP, SRI and asset-hosting policy.
- Source maps contain repository source content for diagnostics. Never add credentials, private data or private SVG assets to source, comments or build configuration.

## Supply chain and release controls

- The runtime package has no production dependencies; Vue is a required peer dependency and remains external.
- Development dependencies are locked by `pnpm-lock.yaml`.
- CI uses frozen installation and runs lint, strict type checks, tests, build, generated-source checks, package consumers and package inspection.
- The release gate validates public entries, declarations, executable CDN output, Source Maps, the npm archive and Publint before publication.

## Handling secrets

No secret is required to build or test the repository. Never commit npm tokens, Gitee tokens, signing keys, private registry credentials, `.env` files, production logs or private assets.
