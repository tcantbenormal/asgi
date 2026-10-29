---
title: Google Earth Engine in one afternoon, a first NDVI time series for your district
type: tutorial
date: 2026-08-02
author: Society editorial team
summary: A short, copy-and-run introduction to Earth Engine using Sentinel-2 over any district in Pakistan.
tags: [gee, remote-sensing, tutorial]
---

You need a Google account registered for Earth Engine, which is free for research and education at [earthengine.google.com](https://earthengine.google.com/). Open the Code Editor and paste the script below.

```javascript
// Draw a polygon over your district, or import a boundary asset.
var region = geometry;

var s2 = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(region)
  .filterDate('2025-10-01', '2026-05-31')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
  .map(function (img) {
    return img.normalizedDifference(['B8', 'B4']).rename('NDVI')
      .copyProperties(img, ['system:time_start']);
  });

var chart = ui.Chart.image.series(s2, region, ee.Reducer.mean(), 100)
  .setOptions({ title: 'Mean NDVI, Rabi season', vAxis: { title: 'NDVI' } });
print(chart);

Map.centerObject(region, 10);
Map.addLayer(s2.median(), { min: 0, max: 0.8, palette: ['white', 'yellow', 'green'] }, 'NDVI median');
```

## What to look at

The chart shows the wheat cycle: low NDVI in November after sowing, a peak in February or March, and a drop at harvest in April. Compare two districts and you already have a seminar talk.

## Next steps

- Replace the drawn polygon with the GADM district boundary from the datasets page.
- Export the median image to Drive and open it in QGIS.
- Read the Earth Engine [Image Collection guide](https://developers.google.com/earth-engine/guides/ic_creating).
