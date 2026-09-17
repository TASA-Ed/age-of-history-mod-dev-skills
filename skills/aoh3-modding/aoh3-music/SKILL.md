---
name: aoh3-music
description: Use this skill when replacing or extending Age of History 3 music playlists and audio files.
---

# AoH3 Music

## Location and Lists

Music is stored under `audio/music`. The normal playlist is `list.txt`; the wartime playlist is `listWar.txt`.

Playlist entries omit the file extension and are separated with semicolons. For `music_1.ogg` and `music_2.ogg`, use:

```text
music_1;music_2;
```

Music is commonly OGG, stereo, and can use different sample rates. Match the existing relative paths when overriding files through a mod.

## Workflow

1. Add or replace the OGG files under the target `audio/music` path.
2. Add the base names to the correct playlist.
3. Keep the semicolon separators and omit `.ogg` from list entries.
4. Test both normal and wartime playback.

## Verification

Launch AoH3 with the mod enabled, trigger normal and wartime music, and check the log for missing files or unsupported audio errors.
