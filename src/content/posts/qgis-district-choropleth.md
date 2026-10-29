---
title: A district population density map of Pakistan in QGIS, from download to layout
type: tutorial
date: 2026-10-24
author: ASGI editorial team
summary: Join 2023 census figures to district boundaries, compute density in a projected CRS, classify sensibly and export a layout. The workflow behind most map assignments.
tags: [qgis, cartography, census, tutorial]
---

The task comes up in every semester and in every first job: a table of numbers per district, a boundary file, and a request for a map by tomorrow. This walks through it once, properly, so the next time takes twenty minutes. QGIS 3.40 or newer.

## 1. Get the two inputs

**Boundaries.** Use the Common Operational Datasets for Pakistan on the Humanitarian Data Exchange: search for "Pakistan subnational administrative boundaries". Download the admin level 2 (district) layer as a shapefile or GeoPackage. These are the boundaries UN agencies use in Pakistan, and they come with a consistent district code column, usually named `ADM2_PCODE`, and the name in `ADM2_EN`.

**Population.** The Pakistan Bureau of Statistics publishes district tables from the 2023 census as PDFs and spreadsheets. Build a CSV with three columns: `district`, `population`, and, if you have it, `pcode`. Keep names exactly as they appear in the boundary file, or better, use the code. Save as UTF-8.

If you only have names, expect mismatches. "Dera Ghazi Khan" versus "D.G. Khan" is the usual one. Fix them in the CSV, not in the boundary layer.

## 2. Load and join

1. Drag the boundary file into QGIS. Check the CRS in the layer properties; it will be EPSG:4326.
2. Add the CSV through Layer, Add Layer, Add Delimited Text Layer, with geometry set to "No geometry".
3. Open the boundary layer's properties, Joins tab, add a join: join layer is your CSV, join field `pcode` or `district`, target field `ADM2_PCODE` or `ADM2_EN`. Tick "Custom field name prefix" and set it to blank so the field is simply `population`.
4. Open the attribute table and sort by `population`. Rows with NULL are the mismatches. Fix the CSV and refresh.

## 3. Compute area and density in a projected CRS

Area computed in degrees is meaningless. Two correct options:

**Option A, project the layer.** Right-click the layer, Export, Save Features As, and set the CRS to EPSG:32642 (UTM zone 42N) for a Pakistan-wide map. The country spans zones 41 to 43, so areas at the edges are slightly distorted, but for district density the error is well under one percent.

**Option B, let QGIS measure on the ellipsoid.** Project Properties, General, set ellipsoid to WGS 84 and area units to square kilometres. Then `$area` in the field calculator returns ellipsoidal area even on an EPSG:4326 layer. This is the cleaner option and the one examiners rarely know about.

Either way, open the field calculator on the joined layer and create:

```
"population" / ($area / 1000000)
```

named `density`, type decimal. If you used option A the division converts square metres to square kilometres; with option B set the area unit in the project to square kilometres and drop the division.

## 4. Classify so the map is honest

Layer Properties, Symbology, Graduated, value `density`, five classes.

- **Natural Breaks (Jenks)** is the default choice for skewed data like population density, and Pakistan's is very skewed: Karachi's districts sit far above everything else.
- **Quantile** makes a pretty map where every colour appears equally, but it hides how extreme the top class is.
- **Equal interval** will put Karachi in one class and every other district in the bottom one. Avoid.

Round the class breaks by hand to numbers a reader can hold: 50, 200, 500, 1,000, 5,000 people per square kilometre. Use a single-hue sequential ramp, light to dark. Never a rainbow for a quantity.

Label sparingly. District names at national scale clutter; add them only for the top five, or leave labels for the provincial inset.

## 5. Layout

Project, New Print Layout. Add the map, then:

- A title that states the variable, the unit and the year: "Population density by district, persons per km², 2023 census".
- The legend with the rounded class labels.
- A scale bar in kilometres and a north arrow. Both are expected and both are frequently forgotten.
- A source line: Pakistan Bureau of Statistics 2023 census; boundaries OCHA COD-AB. Include the CRS.
- Export as PDF at 300 dpi for printing and PNG for the slide.

## 6. The three mistakes that cost marks

1. Density computed in EPSG:4326 without the ellipsoid setting. The numbers are nonsense, and a reader who knows will stop reading.
2. Quantile classes presented as if they were natural categories.
3. Boundaries from one source and population from another, with the mismatches silently dropped. State how many districts were matched.

Save the project as a `.qgz` next to the data, and keep the CSV with your fixes. The same project becomes a map of literacy, water access or crop area by swapping one column.
