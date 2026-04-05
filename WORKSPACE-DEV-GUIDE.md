# Workspace Development Guide

This is a Bun workspace monorepo containing multiple NEAR smart contract method constants packages.

## Structure

```
smart-contract-methods-const/
├── package.json              # Root workspace configuration
├── tsconfig.json             # Shared TypeScript configuration
├── WORKSPACE-DEV-GUIDE.md    # This file
└── [package-name]/           # Individual packages
    ├── package.json
    ├── index.ts (or src/index.ts)
    ├── tsconfig.json
    └── README.md
```

## Packages

| Package | Description |
|---------|-------------|
| `berryclub-contract-methods-const` | Method constants for berryclub.ek.near smart contract |
| `ft-methods-const` | NEAR FT (Fungible Token) standard method constants |
| `greeting-contract-methods-const` | Method constants for greeting smart contract |
| `hos-contracts-methods-const` | Method constants for HOS DAO contracts (venear, voting, lockup) |
| `meme-cooking-contract-methods-const` | Method constants for meme cooking contract |
| `rhea-ref-exchange-methods-const` | Method constants for Ref Exchange contract |
| `social-near-contract-methods-const` | Method constants for Social NEAR contract |
| `staking-pool-contract-methods-const` | Method constants for staking pool contracts |
| `wrap-near-contract-methods-const` | Method constants for wrapNEAR contract |

## Getting Started

### Installation

Install all workspace dependencies from the root:

```bash
bun install
```

This will install dependencies for all packages in the workspace.

### Building Packages

Each package has its own build script. To build all packages:

```bash
bun run build:all
```

To build a specific package:

```bash
cd berryclub-contract-methods-const
bun run build
```

Or from the root:

```bash
bun run --filter './berryclub-contract-methods-const' build
```

### Publishing Packages

**Prerequisites:**
- You must be logged in to npm: `bunx npm login`
- Packages must have proper version numbers in their `package.json`

To publish all packages:

```bash
bunx npm login
bun run publish:all
```

To publish a specific package:

```bash
cd berryclub-contract-methods-const
bun publish --access public
```

**Dry run before publishing:**

```bash
bun publish --dry-run
```

### Package Development Workflow

For each package, follow these steps:

1. **Navigate to the package directory**
   ```bash
   cd berryclub-contract-methods-const
   ```

2. **Install dependencies** (if working on a single package)
   ```bash
   bun install
   ```

3. **Develop and test your code**
   ```bash
   bun run index.ts
   ```

4. **Build the package**
   ```bash
   bun build index.ts --outdir dist --target bun
   ```

5. **Test the build** (dry run)
   ```bash
   bun publish --dry-run
   ```

6. **Publish** (when ready)
   ```bash
   bunx npm login  # if not already logged in
   bun publish --access public
   ```

## Build Configuration

Each package should be built using Bun's built-in bundler. The standard build command is:

```bash
bun build index.ts --outdir dist --target bun
```

For packages with `src/` directory structure:

```bash
bun build src/index.ts --outdir dist --target bun
```

The `package.json` should include:

```json
{
  "main": "dist/index.js",
  "module": "index.ts",
  "files": ["dist"],
  "scripts": {
    "build": "bun build index.ts --outdir dist --target bun",
    "publish": "bun run build && bun publish --access public"
  }
}
```

## Adding New Packages

1. Create a new directory in the workspace root
2. Initialize with `bun init` or copy an existing package structure
3. Add the package to the `workspaces` array in the root `package.json`
4. Run `bun install` from the root to link the new package

## Version Management

All packages are kept in sync using the version sync script. This ensures every package shares the same version number.

### Syncing Versions

**Always preview first with `--dry-run`:**

```bash
# Preview what would happen (no files modified)
bun run version:dry-run

# Sync all packages to next patch version (e.g., 0.0.5 → 0.0.6)
bun run version:sync

# Sync to next minor version (e.g., 0.0.5 → 0.1.0)
bun run version:sync minor

# Sync to next major version (e.g., 0.0.5 → 1.0.0)
bun run version:sync major

# Set all packages to a specific version
bun run version:sync 2.0.0
```

### Version Sync Workflow

1. **Preview the changes:**
   ```bash
   bun run version:dry-run
   ```

2. **Apply the version bump:**
   ```bash
   bun run version:sync
   ```

3. **Commit the changes:**
   ```bash
   git add .
   git commit -m "chore: sync all packages to v0.0.6"
   ```

4. **Rebuild all packages:**
   ```bash
   bun run build
   ```

5. **Publish each package individually** from its directory:
   ```bash
   cd berryclub-contract-methods-const
   bun publish --access public
   ```

### Manual Version Updates (alternative)

If you need to version a single package independently:

```bash
cd berryclub-contract-methods-const
npm version patch  # 0.0.1 -> 0.0.2
npm version minor  # 0.0.1 -> 0.1.0
npm version major  # 0.0.1 -> 1.0.0
```

---

## Notes

- All packages are published under the `@sleet-js/` scope
- Package entry points are TypeScript files (`index.ts`) for development
- Built JavaScript files go to `dist/` directory for publishing
- The `files` field in `package.json` ensures only `dist/` is published
- Root `package.json` is private and should never be published

---

Copyright 2026 by sleet.near
