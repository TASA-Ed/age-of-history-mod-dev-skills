---
name: aoh-common-workshop-mod
description: Use this skill when creating, updating, or publishing an Age of History Steam Workshop content mod in the game mods directory.
---

# Steam Workshop Mods

## Directory

Create one folder per mod under `[game root]/mods`.

```text
[game root]/mods/[ModId]/
  mod.txt
  logo.png       # optional; the game uses a default icon if absent
  id.txt         # generated after a successful Workshop upload
  game/          # optional replacement content
```

Any path under the mod root can override the matching path under the game root. For example, `game/flags/civid.png` can add or replace the `civid` civilization flag.

## Workflow

1. Create a unique mod directory under `mods`.
2. Add the required `mod.txt` metadata and optional `logo.png`.
3. Place replacement or additional content at the same relative path used by the game.
4. Test the mod locally before uploading it.
5. Preserve the generated `id.txt` when updating an existing Workshop item.

## Verification

Launch the target game, enable the mod, and verify that the overridden asset or content is loaded. Confirm that a Workshop upload creates `id.txt` before attempting an update.
