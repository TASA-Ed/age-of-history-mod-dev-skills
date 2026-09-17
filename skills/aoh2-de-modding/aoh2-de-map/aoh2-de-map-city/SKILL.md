---
name: aoh2-de-map-city
description: Use this skill when editing AoH2-DE city or mountain placement JSON files under a map's cities directory.
---

# AoH2-DE Cities and Mountains

## Files

City and mountain data is stored under `map/[MapId]/cities` in six JSON files:

```text
cities.json
cities_1.json
cities_2.json
cities_3.json
cities_4.json
mountains.json
```

## Shape

City files use a `cities` array and a map name. Mountain files use a `mountains` array and a map name.

```json
{
  "cities": [
    { "Name": "City", "x": 1, "y": 1 }
  ],
  "name": "MapId"
}
```

```json
{
  "mountains": [
    { "Name": "Mountain", "Elevation": 100, "x": 1, "y": 1 }
  ],
  "name": "MapId"
}
```

Use valid JSON syntax, including quoted property names and no trailing commas. Preserve the coordinate system and `MapId` used by the target map.

## Verification

Load the map and inspect each edited city or mountain in-game. Confirm that coordinates are within the map bounds and that the expected label is displayed.
