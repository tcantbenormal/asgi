---
title: RustGIS and GeoLibre, the new free desktops, and whether to switch from QGIS
type: story
date: 2026-10-29
author: ASGI editorial team
summary: Two open-source GIS applications from the same author arrived within a year of each other. What each does well, where they fall short, and where they fit next to QGIS and ArcGIS Pro for a student in Pakistan.
tags: [software, open-source, qgis, rustgis, geolibre]
---

For twenty years the free desktop GIS question had one answer. In 2026 there are suddenly two new ones, both from Qiusheng Wu, the University of Tennessee researcher behind geemap, leafmap and the opengeos projects. [GeoLibre](https://github.com/opengeos/GeoLibre) reached 1.0 in the first half of the year; [RustGIS](https://github.com/opengeos/RustGIS) shipped its first release in the autumn and was at version 0.3 by mid-October. Both are free, both open source, both run on Windows, macOS and Linux and in a browser. They are not the same thing, and the author says so himself.

## GeoLibre: the one that runs anywhere

GeoLibre is a web application first. It is built on MapLibre, DuckDB running inside the browser, and deck.gl, wrapped with Tauri so it installs as a 30 MB desktop app, ships in the iOS and Android stores, runs as a Chrome extension, and loads inside a Jupyter notebook or RStudio with one line. Nothing is uploaded; all processing happens on your own machine, including over a thousand geoprocessing tools compiled from the Whitebox suite to WebAssembly.

**Strong points.** It opens cloud-native formats directly over the web: GeoParquet, FlatGeobuf, PMTiles, cloud-optimised GeoTIFF, Zarr, 3D Tiles, and ArcGIS REST services. It has real feature editing, story maps, camera tours, SAM segmentation and ONNX object detection, export to a standalone HTML map, and a working mobile app, which QGIS does not have. For a lab PC where you cannot install software, or a phone in the field, there is no comparable free option.

**Weak points.** The desktop build is still a browser engine in a window. Heavy local processing of large rasters is slower than native QGIS. Cartographic depth is nowhere near QGIS's print layouts and labelling engine. It is young, and version-to-version changes are frequent.

## RustGIS: the one built as a native program

RustGIS is a single native executable written entirely in Rust, drawing with the GPU, with a ribbon interface like ArcGIS Pro and a command for every action. That last part is the design idea: every button maps to a command with an id, so the same operation can be clicked, run from the command line or a Python package, or called by an AI assistant. It ships an assistant pane that works with any model provider including local ones through Ollama, a DuckDB SQL pane, a model-builder canvas, notebooks that import and export Jupyter files, and an MCP server so tools like Claude Code can drive it. The [comparison page](https://rustgis.app/comparison/) it publishes is unusually frank.

**Strong points.** It starts in a second, reads the same cloud-native formats as GeoLibre, connects to PostGIS and writes back to GeoPackage, has print layouts with map series, routing, kriging, viewshed and the full Whitebox tool suite, and is the first desktop GIS designed around scripting and agents from the start rather than retrofitted.

**Weak points, in its own words.** There is no full PROJ: vector data is stored in longitude and latitude and reprojected for display, which is fine for mapping and not fine for anyone doing survey-grade work in a Pakistani UTM zone. File Geodatabase support is partial; DWG, JPEG 2000, NetCDF and HDF need an external GDAL. There is no versioned multi-user editing. There is no in-app Python console. And, again, it is months old; many features are first versions.

## Side by side

| | GeoLibre | RustGIS | QGIS | ArcGIS Pro |
|---|---|---|---|---|
| Licence | MIT | Apache-2.0 | GPL | Paid, Windows only |
| Install size | about 30 MB | one executable | gigabytes | gigabytes |
| Browser and mobile | yes, both | browser only | no | no |
| Coordinate systems | reprojects on import | no full PROJ | full PROJ | full |
| Cartography | basic | good layouts, map series | best in open source | Maplex, deepest |
| Formats | wide, via DuckDB | wide, GDAL optional | widest, via GDAL | widest plus Esri |
| Plugins | some | WebAssembly, sandboxed | thousands | ArcGIS ecosystem |
| AI assistant | built in | built in, plus MCP | via plugins | Esri Copilot features |
| Maturity | young | very young | two decades | three decades |

## Where they fit for a student here

**Keep QGIS as the base.** It is what interviews test, what employers run, what every tutorial assumes, and the only one of the three with a projection engine and cartography you can hand in without apology. Nothing in this article changes that.

**Use GeoLibre when installation is the problem.** A university lab with locked-down PCs, a borrowed laptop, a field visit with a phone. Also for sharing: exporting an interactive HTML map that a supervisor opens by double-clicking is worth a lot. Its Jupyter integration makes it the easiest way to look at a GeoParquet file in a notebook.

**Try RustGIS if you script.** If you are the person in the group who writes the Python, its command model and MCP server are a glimpse of how GIS work will be automated in the next few years, and learning it now costs an afternoon. Do not use it for anything where coordinates matter at the centimetre.

**ArcGIS Pro remains a licence question.** If the institute's licence is available to you, learn it, because many government and consultancy positions still ask for it. If not, do not pirate it; the three free tools above cover the student work, and a repository full of QGIS and Python output counts for more than a claimed ArcGIS skill.

## The thing to watch

Both projects move fast, which means both break things between versions. Pin the version you used in any project readme, keep the data in open formats, GeoPackage, GeoParquet, GeoTIFF, and your work survives whatever either project does next. That is also the real lesson of the last twenty years of free GIS: the tool changes, the open format does not.

Sources: [GeoLibre 1.0 announcement](https://gishub.org/blog/geolibre/), [RustGIS home](https://rustgis.app/), [RustGIS comparison](https://rustgis.app/comparison/), [RustGIS on GitHub](https://github.com/opengeos/RustGIS), [GeoLibre on GitHub](https://github.com/opengeos/GeoLibre).
