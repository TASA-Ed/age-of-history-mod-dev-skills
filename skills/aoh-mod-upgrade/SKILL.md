---
name: aoh-mod-upgrade
description: Use this skill when migrating an Age of History mod between game generations or versions, especially between AoH2-DE and AoH3.
---

# Mod Migration

## Compatibility

Some data formats are shared between AoH2-DE and AoH3, but migration still requires substantial rework. AoH2-DE is turn-based and AoH3 is real-time, so gameplay logic, directory contracts, and runtime behavior may differ.

## Migration Workflow

1. Identify the source and target game versions and platforms.
2. Inventory the source mod files and classify them as content, presentation, or code logic.
3. Compare each file with a known-good target-game example.
4. Recreate incompatible files in the target format instead of copying them blindly.
5. Test the migrated mod in the target game and document any unsupported features.

## Required Evidence

When either side lacks a version, directory listing, or representative file, request that evidence before promising a working migration. Shared Java/LWJGL implementation does not prove file-level compatibility.
