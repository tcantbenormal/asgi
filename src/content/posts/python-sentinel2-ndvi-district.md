---
title: Sentinel-2 NDVI for one district in Python, without downloading a whole scene
type: tutorial
date: 2026-10-27
author: ASGI editorial team
summary: Search a public STAC catalogue, read only the pixels you need from cloud-optimised GeoTIFFs, compute NDVI and write a clipped raster. Forty lines, no login.
tags: [python, remote-sensing, sentinel-2, tutorial]
---

Earth Engine is the fast way to look at an index. This is the way you learn what is actually happening, and the way that works when the task is to deliver a GeoTIFF rather than a chart. It uses the Sentinel-2 archive on AWS through the Earth Search catalogue, which needs no account.

## Setup

Create a fresh environment so library versions do not fight:

```
conda create -n eo python=3.12 geopandas rasterio pystac-client matplotlib -c conda-forge
conda activate eo
```

You also need a district boundary. Export one district from the OCHA admin level 2 layer in QGIS as `district.geojson`, or use any polygon in EPSG:4326.

## The script

```python
import geopandas as gpd
import numpy as np
import rasterio
from rasterio.mask import mask
from rasterio.warp import transform_geom
from pystac_client import Client

district = gpd.read_file("district.geojson").to_crs(4326)
bbox = list(district.total_bounds)

# 1. Search Earth Search for Sentinel-2 L2A scenes over the district, low cloud, one month.
catalog = Client.open("https://earth-search.aws.element84.com/v1")
items = catalog.search(
    collections=["sentinel-2-l2a"],
    bbox=bbox,
    datetime="2026-02-01/2026-02-28",
    query={"eo:cloud_cover": {"lt": 10}},
).item_collection()
print(len(items), "scenes")
item = sorted(items, key=lambda i: i.properties["eo:cloud_cover"])[0]
print(item.id, item.properties["datetime"], item.properties["eo:cloud_cover"])

# 2. Read only the district window from the red and NIR cloud-optimised GeoTIFFs.
def read_band(href):
    with rasterio.open(href) as src:
        geom = [transform_geom(str(district.crs), str(src.crs), district.geometry.iloc[0].__geo_interface__)]
        data, transform = mask(src, geom, crop=True, nodata=0)
        return data[0], transform, src.crs

red, transform, crs = read_band(item.assets["red"].href)
nir, _, _ = read_band(item.assets["nir"].href)

# 3. NDVI. Zero is nodata outside the district; L2A reflectance = DN * 0.0001 - 0.1 since early 2022.
valid = (red > 0) & (nir > 0)
red = red.astype("float32") * 0.0001 - 0.1
nir = nir.astype("float32") * 0.0001 - 0.1
with np.errstate(divide="ignore", invalid="ignore"):
    ndvi = np.where(valid, (nir - red) / (nir + red), np.nan).astype("float32")

# 4. Write a GeoTIFF you can open in QGIS.
with rasterio.open(
    "ndvi.tif", "w", driver="GTiff", height=ndvi.shape[0], width=ndvi.shape[1],
    count=1, dtype="float32", crs=crs, transform=transform, nodata=np.nan, compress="deflate",
) as dst:
    dst.write(ndvi, 1)

print("mean NDVI", np.nanmean(ndvi).round(3))
```

## What is happening

- **Step 1** asks a STAC API for scene metadata. Nothing is downloaded yet. A district in Punjab usually falls inside one or two 100 km tiles; if your district straddles two, pick the tile with more coverage or mosaic both.
- **Step 2** opens the band files over HTTP and reads only the blocks that intersect the district. A full band is about 100 MB; the district window is a few megabytes. This is the whole point of cloud-optimised GeoTIFFs.
- **Step 3** is the index. The offset matters: since early 2022, Sentinel-2 Level 2A products store reflectance with a negative offset, so skipping it shifts every value.
- **Step 4** writes a float raster with proper georeferencing. Open it in QGIS with a green ramp from 0 to 0.8.

## Checks before you trust the number

1. Look at the scene in the browser first. Earth Search returns a `thumbnail` asset; cloud cover is a tile-level percentage and the cloud may be sitting on your district.
2. Compare two dates. A single NDVI image says little; February against April over wheat land says a lot.
3. Mask the scene classification layer, asset `scl`, to drop cloud, shadow and water classes before averaging. That is the next thing to add once this runs.

## Where this leads

Swap the dates for a list and you have a time series. Swap the district for every district in a province and you have a table that a thesis chapter is built on. Push the script to a repository with the GeoJSON and the output PNG, and it is the first project on your profile page.
