/**
 * Version Sync Script
 * Finds the highest version across all workspace packages and bumps everything to the next version.
 * 
 * Usage:
 *   bun run scripts/version-sync.ts              # Patch bump (0.0.5 -> 0.0.6)
 *   bun run scripts/version-sync.ts patch        # Patch bump (0.0.5 -> 0.0.6)
 *   bun run scripts/version-sync.ts minor        # Minor bump (0.0.5 -> 0.1.0)
 *   bun run scripts/version-sync.ts major        # Major bump (0.0.5 -> 1.0.0)
 *   bun run scripts/version-sync.ts 1.2.3        # Set specific version
 *   bun run scripts/version-sync.ts --dry-run    # Preview without writing
 */

import { $ } from "bun";
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

interface PackageInfo {
  name: string;
  path: string;
  version: string;
}

function parseVersion(version: string): { major: number; minor: number; patch: number } {
  const parts = version.split(".").map(Number);
  return {
    major: parts[0] ?? 0,
    minor: parts[1] ?? 0,
    patch: parts[2] ?? 0,
  };
}

function versionToString(v: { major: number; minor: number; patch: number }): string {
  return `${v.major}.${v.minor}.${v.patch}`;
}

function compareVersions(a: string, b: string): number {
  const pa = parseVersion(a);
  const pb = parseVersion(b);
  if (pa.major !== pb.major) return pa.major - pb.major;
  if (pa.minor !== pb.minor) return pa.minor - pb.minor;
  return pa.patch - pb.patch;
}

function getWorkspacePackages(): PackageInfo[] {
  const rootPackagePath = join(import.meta.dir, "..");
  const rootPackage = JSON.parse(readFileSync(join(rootPackagePath, "package.json"), "utf-8"));
  
  const workspaces = rootPackage.workspaces || [];
  const packages: PackageInfo[] = [];

  for (const workspace of workspaces) {
    const packageJsonPath = join(rootPackagePath, workspace, "package.json");
    try {
      const pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
      packages.push({
        name: pkg.name,
        path: join(rootPackagePath, workspace),
        version: pkg.version || "0.0.0",
      });
    } catch (error) {
      console.warn(`⚠️  Skipping ${workspace}: package.json not found or invalid`);
    }
  }

  return packages;
}

function findHighestVersion(packages: PackageInfo[]): string {
  return packages.reduce((highest, pkg) => {
    return compareVersions(pkg.version, highest) > 0 ? pkg.version : highest;
  }, "0.0.0");
}

function bumpVersion(version: string, type: "patch" | "minor" | "major"): string {
  const v = parseVersion(version);
  switch (type) {
    case "major":
      return versionToString({ major: v.major + 1, minor: 0, patch: 0 });
    case "minor":
      return versionToString({ major: v.major, minor: v.minor + 1, patch: 0 });
    case "patch":
      return versionToString({ major: v.major, minor: v.minor, patch: v.patch + 1 });
  }
}

async function main() {
  const args = Bun.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const versionArg = args.find(arg => !arg.startsWith("--") && !["patch", "minor", "major"].includes(arg));
  const bumpTypeArg = args.find(arg => ["patch", "minor", "major"].includes(arg)) as "patch" | "minor" | "major" | undefined;

  console.log("🔍 Scanning workspace packages...\n");

  const packages = getWorkspacePackages();
  
  if (packages.length === 0) {
    console.error("❌ No workspace packages found");
    process.exit(1);
  }

  console.log(`📦 Found ${packages.length} packages:\n`);
  packages.forEach(pkg => {
    console.log(`  ${pkg.name.padEnd(50)} ${pkg.version}`);
  });

  let targetVersion: string;

  if (versionArg) {
    // Specific version provided
    targetVersion = versionArg;
    console.log(`\n🎯 Setting all packages to version: ${targetVersion}`);
  } else {
    // Find highest and bump
    const highestVersion = findHighestVersion(packages);
    console.log(`\n📊 Highest version: ${highestVersion}`);

    const bumpType = bumpTypeArg || "patch";
    targetVersion = bumpVersion(highestVersion, bumpType);
    console.log(`🚀 Bumping all packages to ${targetVersion} (${bumpType} bump)`);
  }

  if (dryRun) {
    console.log("\n🔎 DRY RUN - No files will be modified\n");
    const packagesToUpdate = packages.filter(pkg => pkg.version !== targetVersion);
    console.log(`\n📝 Would update ${packagesToUpdate.length} packages:`);
    packagesToUpdate.forEach(pkg => {
      console.log(`  ${pkg.name}: ${pkg.version} → ${targetVersion}`);
    });
    
    const unchangedCount = packages.length - packagesToUpdate.length;
    if (unchangedCount > 0) {
      console.log(`\n✅ ${unchangedCount} packages already at ${targetVersion}`);
    }
    return;
  }

  // Update all packages
  console.log("\n✏️  Updating packages...\n");
  
  let updatedCount = 0;
  for (const pkg of packages) {
    if (pkg.version === targetVersion) {
      console.log(`  ⏭️  ${pkg.name} (already at ${targetVersion})`);
      continue;
    }

    const packageJsonPath = join(pkg.path, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    
    const oldVersion = packageJson.version;
    packageJson.version = targetVersion;
    
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");
    console.log(`  ✅ ${pkg.name}: ${oldVersion} → ${targetVersion}`);
    updatedCount++;
  }

  console.log(`\n✅ Successfully updated ${updatedCount}/${packages.length} packages to version ${targetVersion}`);
  
  if (updatedCount > 0) {
    console.log("\n💡 Next steps:");
    console.log("   1. Review changes: git diff");
    console.log("   2. Commit: git commit -m 'chore: bump all packages to v${targetVersion}'");
    console.log("   3. Build: bun run build");
    console.log("   4. Publish each package individually from its directory");
  }
}

main().catch((error) => {
  console.error("❌ Error:", error.message);
  process.exit(1);
});
