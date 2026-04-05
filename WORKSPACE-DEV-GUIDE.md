# Workspace Development Guide

Bun workspace monorepo for NEAR smart contract method constants packages.

## Commands

```bash
bun install
bun run build
bun run clean
```

### Build a specific package

```bash
bun run --filter './berryclub-contract-methods-const' build
```

### Version management

```bash
# Preview changes without modifying files
bun run version:dry-run

# Sync all packages to next patch version
bun run version:sync

# Sync to next minor version
bun run version:sync minor

# Sync to next major version
bun run version:sync major

# Set all packages to a specific version
bun run version:sync 2.0.0
```

### Publishing

```bash
bunx npm login
bun run publish:all

# Or publish a single package
cd berryclub-contract-methods-const
bun publish --dry-run
bun publish --access public
```

## Adding New Packages

1. Create a new directory with `package.json` and `index.ts` (or `src/index.ts`)
2. Add it to the `workspaces` array in root `package.json`
3. Run `bun install` from root

For packages with `src/` structure, add `"rootDir": "src"` to tsconfig.

## Workflow

```bash
cd berryclub-contract-methods-const
bun run index.ts
bun run build
bun publish --dry-run
bun publish --access public
```

## Notes

- All packages published under `@sleet-js/` scope
- Root `package.json` is private — never published
- Only `dist/` contents are published to npm
- Use `bun run clean` before rebuilding to clear stale output

---

Copyright 2026 by sleet.near
