---
name: aoh2-de-map
description: Use this skill when editing or adding AoH2-DE map folders, map metadata, provinces, scenarios, terrain overlays, cities, formable civilizations, or wonders.
---

# AoH2-DE Maps

## Location

Map content lives under `map/[MapId]`. A typical map contains:

```text
army_boxes/
cities/
civs_template/
data/
formable_civs/
overlays/
province_names/
provinces/
scenarios/
suggested_owners/
update/
updatePB/
wonders/
config.json
config_Mobile.json
ico.png
```

The game includes `Earth`, `Earth14K`, and `template` maps. A mod can override matching files, but creating a new map should use a dedicated map drawing tool.

## Workflow

Match the target `MapId`, preserve existing file names, and compare each edited file with the same file from the target map. Keep desktop and mobile configuration files aligned when both are present.

## Verification

Enable the mod, select the map, open the relevant editor or scenario, and verify that provinces, names, overlays, and metadata load without missing-asset errors.
