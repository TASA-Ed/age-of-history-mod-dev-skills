---
name: aoh2-de-modding
description: Use this skill for Age of History 2 Definitive Edition modding, including its turn-based game context and map content workflow.
---

# Age of History 2 Definitive Edition

AoH2-DE is a turn-based strategy game. Use AoH2-DE-specific files and examples; do not substitute the original AoH2 format without evidence from the target build.

## Map Content

The map is stored under `map/[MapId]`. A mod can override map data, provinces, scenarios, cities, formable civilizations, wonders, and related assets. New map creation generally requires a dedicated map editor.

Use the nested `map` skill for the complete directory layout and the nested `map-city` skill for city and mountain JSON files.

## Version Discipline

Confirm whether the request targets desktop or Android and identify the exact build. If the user asks for an event or other format without a version, directory, or sample, request those details rather than claiming that original AoH2 syntax will work.
