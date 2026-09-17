---
name: aoh-common
description: Use this skill for Age of History 2 Definitive Edition and Age of History 3 modding questions that involve shared Java/LWJGL concepts, version boundaries, or choosing a safe extension method.
---

# Age of History Common Modding

## Scope

Age of History 2 Definitive Edition (AoH2-DE) and Age of History 3 (AoH3) are Java and LWJGL strategy games. Some data and tooling concepts can be shared, but the games have important differences: AoH2-DE is turn-based, while AoH3 is real-time.

Use the game-specific skill when the request concerns a concrete file format. Treat compatibility as a hypothesis that must be checked against the target game and version.

## General Rules

- Identify the target game, release, platform, and installation path before proposing a file change.
- Do not assume that an AoH2-DE file can be copied directly to AoH3 or vice versa.
- Prefer documented mod files and the official Steam Workshop workflow for content changes.
- Separate content changes (maps, scenarios, UI, music) from code-logic changes.
- Ask for the relevant file or directory when the format is not established by the available documentation.

## Modding Code Logic

Both games are Java-based, so they can be extended with a plugin framework. The recommended approach for game-logic changes is [Finality-Framework](https://github.com/Finality-Framework/loader), using mixins or injections where supported.

Avoid decompilation, Java agents, and direct binary modification unless the target environment imposes a documented restriction. On Android, Finality-Framework can patch DEX files; editing smali directly is not the preferred workflow.

## Android Considerations

Android may have multiple game builds, including community ports. Their interaction logic can differ from the official release. Confirm the exact build before applying a patch or relying on desktop behavior.

## Verification

After a change, launch the target build and verify the affected workflow. For code patches, also confirm that the plugin loads and that the changed hook executes without a native-library or class-loading error.
