---
name: aoh3-modding
description: Use this skill for Age of History 3 modding questions and for identifying AoH3-specific real-time gameplay and content constraints.
---

# Age of History 3

AoH3 is a real-time strategy game. Its runtime behavior and content contracts should be treated separately from AoH2-DE even where Java/LWJGL implementation or some data concepts overlap.

## Workflow

1. Confirm the AoH3 build and platform.
2. Locate a known-good AoH3 asset or data file before editing.
3. Keep the change in the documented AoH3 path.
4. Test the real-time behavior in a controlled save or scenario.

For audio replacement, use the nested `music` skill. For code logic, use `aoh-common/common-patch` and verify the exact target build.
