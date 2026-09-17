---
name: aoh-common-patch
description: Use this skill when changing Age of History game logic through a plugin or Android DEX patch, including choosing between mixins, injections, and unsupported direct modification.
---

# Common Logic Patches

## Preferred Method

Use [Finality-Framework](https://github.com/Finality-Framework/loader) to load mixins or injections into the Java game. First identify the exact game build, class, method, and platform. Keep the patch isolated to the smallest hook that expresses the requested behavior.

## Android

Finality-Framework supports patching DEX files. Account for multiple Android builds and community ports because their interaction logic may differ. Do not edit smali directly as the normal workflow.

## Verification

- Confirm the plugin or patch is loaded by the intended build.
- Exercise the changed behavior in-game.
- Check the log for class, method, native-library, and dependency errors.
