# Contributing to Fast.Element.Plus.Icons

Thank you for improving Fast.Element.Plus.Icons. Contributions should preserve a predictable component API, reviewable SVG sources and reproducible package output.

## Requirements

- Node.js `^22.18.0 || ^24.18.0`
- pnpm `^11.0.0` through Corepack
- Git with LF line endings

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm check
```

Use `pnpm dev` when a long-running tsdown watch build is useful during implementation.

## Design rules

- Treat `icons/*.svg` as the source of truth and use lower-camel-case file names that produce stable PascalCase component names.
- Keep a valid `viewBox`; do not add scripts, external resources, inline event handlers or `foreignObject`.
- Run `pnpm generate` after every SVG change and review both the SVG and generated TSX diff.
- Do not hand-edit `src/icons/` or `src/index.ts`; shared generated documentation belongs in `scripts/generate-icons.ts`.
- Keep Vue external and preserve one ESM package entry plus the documented CDN IIFE.
- Avoid new runtime dependencies and import-time browser access.
- Preserve component names, SVG output and fallthrough-attribute behavior unless the corresponding public API decision has been reviewed and documented.

## Public API checklist

Every public component, function, type, interface, class, method or option must include TSDoc/JSDoc covering the applicable items:

- purpose and non-obvious design rationale;
- parameters, defaults and accepted ranges;
- return values and failure semantics;
- Vue, browser and package-entry constraints;
- accessibility or security boundaries;
- a focused example when the signature alone is insufficient.

Comments should explain intent and constraints. Do not repeat obvious syntax or add comments only to increase volume.

## Tests

- Add a regression test for every defect.
- Add compile-only cases to `tests/public-api.test.ts` for public type behavior.
- Keep runtime tests deterministic and verify every repository SVG has a matching component export.
- Update both README files, API references and tests when public behavior changes.

Run the narrowest relevant command during development, then run the full set before opening a pull request:

```bash
pnpm generate:check
pnpm typecheck
pnpm lint
pnpm test
pnpm format:check
pnpm --config.ignore-scripts=true pack --dry-run
```

## Dependencies

Development tools use reviewed caret ranges and are resolved exactly by `pnpm-lock.yaml`. Before changing a tool version:

1. verify Node.js and peer requirements;
2. review release notes and security advisories;
3. update only the pnpm lock file and relevant manifests;
4. run type, lint, test, build, package and dry-run checks;
5. avoid unrelated upgrades in the same pull request.

This repository defines its own ESLint Flat Config and must not depend on `@fast-china/eslint-config`.

## Pull requests

- Keep the diff focused and avoid repository-wide formatting unrelated to the change.
- Update English and Chinese docs for user-visible behavior.
- Add a dated `CHANGELOG.md` entry only when preparing a release.
- Describe component API, runtime, package-entry, type, accessibility, security and size impact.
- Never include credentials, private SVG assets, private endpoints or production data.
- Do not publish, tag, push or deploy from a contribution workflow.

## Security reports

Do not open a public issue for a suspected vulnerability. Follow [SECURITY.md](./SECURITY.md).
