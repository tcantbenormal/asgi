---
title: Remote Sensing and Earth Observation
summary: Reading the surface of Pakistan from satellites. Optical and radar imagery, time series, classification, change detection, and the physics behind the pixels.
order: 2
demand: High
tools: [Google Earth Engine, QGIS, SNAP, Python, rasterio, xarray]
roles: [Remote Sensing Analyst, Earth Observation Specialist, Image Analyst, Crop Monitoring Analyst, Research Associate]
employers: [SUPARCO, PMD and PCRWR, provincial agriculture and irrigation departments, NDMA and PDMAs, WWF and IUCN, FAO and WFP country offices, EO start-ups abroad hiring remotely, university research groups]
stages:
  - name: Foundations
    duration: Semester 1 to 3
    outcome: "explain what a satellite image is actually measuring, choose the right sensor for a question, and display imagery in QGIS and Earth Engine correctly."
    skills:
      - "Electromagnetic spectrum, reflectance, atmospheric effects, and why a Level 2A product differs from Level 1C"
      - "The sensors you will use for years: Sentinel-2 (10 m, 5 days), Landsat 8 and 9 (30 m, 16 days, back to 1972 with earlier missions), MODIS (daily, 250 m to 1 km), Sentinel-1 radar, and when each is the wrong choice"
      - "Spatial, spectral, temporal and radiometric resolution as trade-offs, not specifications"
      - "Band combinations and what each reveals: true colour, false colour infrared, SWIR for burn and moisture"
      - "Spectral indices and their limits: NDVI, NDWI, NDBI, NBR, EVI, and why NDVI saturates in dense canopy"
      - "Raster handling in QGIS: stretches, virtual rasters, clipping, reprojection, resampling methods"
      - "Earth Engine Code Editor: filtering collections, median composites, charting a time series over a polygon"
    project: "a Sentinel-2 false colour composite and NDVI time series for your home district across one cropping season, with the Earth Engine script shared and two paragraphs on what the curve shows."
    resources:
      - label: "NASA ARSET: fundamentals of remote sensing"
        url: https://appliedsciences.nasa.gov/get-involved/training/english/arset-fundamentals-remote-sensing
        kind: course
        cost: free
        hours: 8 h
        gives: "the physics and vocabulary, taught by the agency that builds the sensors"
      - label: Earth Engine guides and tutorials
        url: https://developers.google.com/earth-engine/guides
        kind: docs
        cost: free
        hours: 20 h
        gives: "the platform most Pakistani EO work now runs on"
      - label: "Cloud-Based Remote Sensing with Google Earth Engine, the EEFA book"
        url: https://www.eefabook.org/
        kind: book
        cost: free
        hours: 60 h
        gives: "a full remote sensing course inside Earth Engine, with runnable chapters"
      - label: "Penn State GEOG 883: Remote sensing image analysis"
        url: https://www.e-education.psu.edu/geog883/
        kind: course
        cost: free
        hours: 30 h
        gives: "image analysis theory with the maths kept honest"
      - label: Sentinel-2 user guide, ESA
        url: https://sentiwiki.copernicus.eu/web/s2-mission
        kind: docs
        cost: free
        gives: "what each band and product level means, from the source"
  - name: Analysis
    duration: Semester 4 to 6
    outcome: "produce a classified map with a proper accuracy assessment, a change map between two dates, and know why the result is wrong where it is wrong."
    skills:
      - "Preprocessing done right: cloud and shadow masking with the scene classification layer, compositing, harmonising Landsat and Sentinel-2"
      - "Supervised classification with random forest in Earth Engine and in Python, training sample design, class definitions that match the ground"
      - "Accuracy assessment that would survive a reviewer: stratified random sampling, confusion matrix, per-class user and producer accuracy, area estimation with confidence intervals"
      - "Change detection: post-classification comparison versus image differencing versus time series breakpoints, and the false change that comes from phenology"
      - "Time series analysis: harmonic fitting, smoothing, phenology metrics, trend tests over MODIS or Landsat stacks"
      - "Radar basics with Sentinel-1: backscatter, polarisation, speckle, flood mapping during monsoon when optical is useless"
      - "Thermal and land surface temperature from Landsat for urban heat"
      - "Python stack: rasterio, xarray, numpy, scikit-learn, reading cloud-optimised GeoTIFFs over STAC without downloading whole scenes"
    project: "a land cover map of one tehsil for two years ten years apart, with a stratified accuracy assessment, area estimates with confidence intervals, and a change map, as a short report and a repository."
    resources:
      - label: "NASA ARSET: all trainings catalogue"
        url: https://appliedsciences.nasa.gov/get-involved/training
        kind: course
        cost: free
        hours: 4 to 12 h each
        gives: "applied modules on floods, agriculture, air quality, SAR and land cover, each with a certificate of completion"
      - label: "EO College: Echoes in Space, radar remote sensing"
        url: https://eo-college.org/courses/echoes-in-space/
        kind: course
        cost: free
        hours: 25 h
        gives: "SAR understood properly, rare among Pakistani graduates and valued for flood work"
      - label: ESA SNAP tutorials
        url: https://step.esa.int/main/doc/tutorials/
        kind: docs
        cost: free
        hours: 15 h
        gives: "Sentinel-1 and Sentinel-2 processing in the desktop tool ESA maintains"
      - label: Good practices for estimating area and assessing accuracy, Olofsson et al. 2014
        url: https://doi.org/10.1016/j.rse.2014.02.015
        kind: book
        cost: free
        hours: 6 h
        gives: "the accuracy assessment method every serious land cover paper now cites"
      - label: Pangeo tutorial gallery, xarray for geoscience
        url: https://tutorial.xarray.dev/
        kind: course
        cost: free
        hours: 15 h
        gives: "handling image stacks and time series in Python without running out of memory"
      - label: STAC and cloud-optimised data, Planetary Computer documentation
        url: https://planetarycomputer.microsoft.com/docs/overview/about
        kind: docs
        cost: free
        hours: 6 h
        gives: "searching and reading global archives directly from code"
  - name: Specialise
    duration: Semester 6 to 8
    outcome: "own one application area well enough to be the person a department calls, and use foundation models and embeddings as inputs rather than mysteries."
    skills:
      - "Pick one: agriculture (crop type, yield proxies, irrigation), water (floods, glacial lakes, reservoir levels), urban (built-up change, heat, informal settlements), forest and rangeland, or air quality and dust"
      - "Foundation model workflows: AlphaEarth embeddings in Earth Engine with your own labels, fine-tuning Prithvi or Clay for a local task, and knowing when a plain random forest is still better"
      - "Validation with field data: planning a ground survey, GPS points with photos, matching the sampling date to the image date"
      - "Drone imagery as the high-resolution layer: orthomosaics from WebODM alongside satellite data"
      - "Writing: a methods section a reviewer accepts, a two-page brief a secretary reads, and the figure that carries both"
      - "Reading papers critically, reproducing one published Pakistan study end to end"
    project: "one complete application study in your chosen area with field validation, written as a paper-style report and as a two-page policy brief, submitted to a national conference or a student journal."
    resources:
      - label: Earth Engine satellite embedding dataset, AlphaEarth
        url: https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL
        kind: data
        cost: free
        gives: "64-dimensional embeddings for every 10 m cell on Earth per year, ready for a random forest"
      - label: Prithvi EO models, IBM and NASA
        url: https://huggingface.co/ibm-nasa-geospatial
        kind: tool
        cost: free
        gives: "open foundation models you can fine-tune on a free Colab GPU"
      - label: TorchGeo documentation
        url: https://torchgeo.readthedocs.io/
        kind: docs
        cost: free
        hours: 20 h
        gives: "deep learning on geospatial rasters with the data loaders already written"
      - label: "NASA ARSET: agricultural crop classification with SAR and optical data"
        url: https://appliedsciences.nasa.gov/get-involved/training
        kind: course
        cost: free
        hours: 10 h
        gives: "the standard crop mapping workflow, directly reusable for Punjab and Sindh"
      - label: Copernicus Data Space Ecosystem
        url: https://dataspace.copernicus.eu/
        kind: data
        cost: free
        gives: "direct access to all Sentinel data and a browser for checking scenes before you code"
---

Pakistan is one of the most rewarding places on Earth to do remote sensing and one of the hardest places to do it well. The country has the full span from Karakoram glaciers to the Indus delta, an agricultural economy that depends on two cropping seasons, a monsoon that produces floods you can see from orbit, and cities growing faster than any map of them. It also has very little field data in the public domain, which means the analyst who can validate is worth more than the one who can only classify.

## Who this is for

You are drawn to the imagery more than to the attribute table. You are comfortable with some maths and willing to learn Python early, because beyond the first stage this field is done in code. You want to work on agriculture, water, disasters, environment or climate, or you want a research career.

## How to use the stages

The first stage is about seeing correctly. The second is about measuring correctly, and accuracy assessment is where most student work falls apart, so it gets its own project. The third is about choosing one application and going deep, because employers and supervisors hire for a problem, not for a sensor.

Earth Engine is the backbone of the track because it is free, fast, and holds the archives. Learn the Python stack in parallel from the second stage, because Earth Engine cannot run a custom model and cannot export a reproducible pipeline the way a repository can.

## Mistakes alumni say they made

- Producing a classified map with a claimed accuracy and no sampling design behind it. Reviewers and clients now ask.
- Mapping during monsoon with optical data and reporting cloud as water.
- Treating a published index threshold as universal. The NDVI of a wheat field in Bahawalpur is not that of one in Mardan.
- Never going to the field. One day of ground truth beats a week of tuning.

## Where it leads

Into SUPARCO and the provincial departments that are building crop and water monitoring, into international organisations that need someone who knows both the imagery and the country, into research degrees abroad, where a repository of Pakistan-focused work is a strong application, and into remote roles with the growing number of EO companies that sell analytics rather than imagery.
