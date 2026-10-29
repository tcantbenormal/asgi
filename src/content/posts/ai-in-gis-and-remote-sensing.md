---
title: What AI is actually changing in GIS and remote sensing, and what it is not
type: story
date: 2026-10-28
author: ASGI editorial team
summary: Foundation models, embeddings and chat assistants inside the desktop GIS have arrived at once. A sober look at what matters for a student or a working analyst in Pakistan.
tags: [ai, geoai, remote-sensing, careers]
---

Two years ago "GeoAI" in a Pakistani classroom meant a random forest in Earth Engine or a U-Net trained on a borrowed dataset. In 2026 it means three different things that happen to have arrived together, and it helps to keep them apart.

## 1. Foundation models and embeddings for imagery

The biggest technical change is that you no longer have to train a model from pixels to get a useful representation of a place.

Google DeepMind's AlphaEarth Foundations turns Sentinel-2, Landsat, Sentinel-1 radar, elevation and climate data into a 64-number "embedding" for every 10 metre cell on Earth, every year, and publishes the result as an Earth Engine dataset. You classify those 64 numbers with a random forest and a few hundred labelled points, and the quality matches or beats what used to need a bespoke deep network and thousands of labels. The [paper](https://arxiv.org/abs/2507.22291) and an independent [urban benchmark](https://arxiv.org/abs/2604.03456) from April 2026 give the details.

NASA and IBM's [Prithvi-EO-2.0](https://science.nasa.gov/science-research/ai-foundation-model-in-orbit/), trained on 30 metre Harmonized Landsat-Sentinel data, is fully open, fine-tunable, and in May 2026 became the first such model to run on a satellite in orbit. The [Clay](https://developmentseed.org/blog/2026-10-02-earth-embeddings/) model is the open community's equivalent that accepts different sensors and resolutions. Benchmarks keep finding that no single model wins everywhere: the right one depends on the sensor, the resolution and the task.

What this means in practice: a crop map of a tehsil, a built-up area change map between the 2017 and 2023 censuses, or a flood extent map in the week it is needed, now take days of work rather than months, and the limiting factor is labelled ground truth, not modelling skill.

## 2. Segmentation models for extraction

Meta's Segment Anything family, now at version 3, has made outlining buildings, fields, trees and water from imagery a click-and-refine task. It is wired into QGIS through the [GeoAI plugin](https://qgis.gishub.org/) and into GeoLibre, with text prompts in the newer versions. For a cadastral digitisation job or a solar-panel inventory it replaces weeks of manual tracing with a day of correction. The output is still only as good as the imagery and still needs a human to accept each polygon.

## 3. Language models inside the GIS

This is the part that is overhyped and underused at the same time. A chat panel that runs the GIS for you now exists in several forms: [OpenGeoAgent](https://gishub.org/blog/opengeoagent-qgis-plugin/) and [GeoAgent](https://plugins.qgis.org/plugins/geo_agent/) for QGIS, [QGIS Agent](https://plugins.qgis.org/plugins/qgis_agent/) with a local MCP server so external agents can drive QGIS, and built-in assistants in the new RustGIS and GeoLibre desktops. ArcGIS Pro has Esri's own assistant features. All of them turn "buffer the roads by 500 metres, clip to the district and count the schools inside" into a sentence.

What they are good at: PyQGIS and arcpy syntax, which nobody remembers; the first draft of a processing chain; explaining a tool's parameters; converting a workflow into a script. What they are bad at: knowing that your boundary file is in the wrong CRS, that the census column has three spellings of one district, or that the NDVI threshold you asked for makes no sense in a rice district in July. They execute confidently either way.

## What this changes for someone in Pakistan

**The valuable skills moved, they did not disappear.** Five years ago the scarce skill was getting a classifier to run. Now the scarce skills are: collecting and curating local labels, understanding the sensor well enough to know when the model is wrong, evaluating results honestly, and turning an output into a decision a district officer can act on. A person who can only prompt is interchangeable; a person who knows what the Indus floodplain looks like in SAR in August is not.

**Local data is the moat.** Global models are trained where labels exist, and that is not here. Wheat, rice, cotton and sugarcane calendars in Punjab and Sindh, kharif flooding, brick kilns, urban sprawl at the edge of Lahore: every one of these needs ground truth from people who can get there. Field data collection has become more valuable, not less.

**Access got cheaper.** AlphaEarth embeddings are free in Earth Engine; Prithvi and Clay are free downloads; SAM runs on a mid-range laptop; the QGIS agents work with free local models through Ollama if you cannot pay for an API key. The tools are not the barrier.

**Costs and trust are the new problems.** Pay-per-token assistants quietly become expensive; cloud processing moves data off your machine, which matters for anything from a government department; and an assistant that fabricates a plausible-looking analysis is worse than no assistant. Keep every agent run inspectable and keep the script it wrote.

## What to actually learn this year

1. Python with GeoPandas and rasterio, well enough to read someone else's script and fix it. Every agent above produces Python, and you have to be able to check it.
2. One embedding workflow end to end: AlphaEarth in Earth Engine with your own labelled points over a district you know. Compare the result against the field, not against another model.
3. SAM-based extraction in QGIS on a real task, with a count of how many polygons you had to fix.
4. Enough statistics to report accuracy properly: confusion matrix, per-class figures, and what the sampling design was.
5. Use an assistant daily, and keep a note of every time it was wrong. That note is the most useful thing you will write.

The field is not being automated away. It is being handed better instruments, and the people who understand both the instrument and the ground are the ones employers are short of.
