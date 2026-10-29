---
title: GIS Analyst
summary: The core track. Turning boundaries, surveys, imagery and spreadsheets into analysis and maps that a planner, engineer or programme manager can act on.
order: 1
demand: High
tools: [QGIS, ArcGIS Pro, PostGIS, Python, Excel, Git]
roles: [GIS Analyst, GIS Officer, Spatial Data Analyst, Mapping Specialist, M&E GIS Associate]
employers: [NESPAK, Urban Units and development authorities, WASA and utilities, NDMA and PDMAs, Survey of Pakistan contractors, UN agencies and NGOs, engineering and survey consultancies, remote clients on freelancing platforms]
stages:
  - name: Foundations
    duration: Semester 1 to 2, about 120 hours of practice outside class
    outcome: "open any dataset handed to you, understand what it is, fix its coordinate system, join a table to it and produce a clean map with a legend, scale bar and source line."
    skills:
      - "Coordinate reference systems in practice: geographic versus projected, WGS 84, UTM zones 41 to 43 for Pakistan, why distances in EPSG:4326 are wrong, on-the-fly reprojection versus actually reprojecting a file"
      - "Vector and raster data models, GeoPackage as the default working format, when a shapefile will bite you (field name limits, no null, 2 GB)"
      - "Attribute tables: field types, calculator expressions, table joins and the matching problems that follow (spelling, codes, encoding)"
      - "QGIS end to end: load, symbolise, label, query, lay out, export to PDF and PNG at print resolution"
      - "Cartographic basics: visual hierarchy, one variable per map, sequential versus diverging colour ramps, class breaks, when not to label"
      - "Finding data: OCHA administrative boundaries, Pakistan Bureau of Statistics tables, OpenStreetMap exports, SRTM and Copernicus DEMs"
    project: "a population density map of all districts of one province from the 2023 census, with the data folder, the QGIS project and a one-page method note in a public repository."
    resources:
      - label: QGIS training manual
        url: https://docs.qgis.org/latest/en/docs/training_manual/
        kind: docs
        cost: free
        hours: 40 h
        gives: "every core QGIS operation, with exercises, in the order you need them"
      - label: QGIS user guide
        url: https://docs.qgis.org/latest/en/docs/user_manual/
        kind: docs
        cost: free
        gives: "the reference you keep open for the rest of your career"
      - label: "Penn State GEOG 486: Cartography and visualisation"
        url: https://www.e-education.psu.edu/geog486/
        kind: course
        cost: free
        hours: 30 h
        gives: "map design judgement, which separates an analyst from an operator"
      - label: Esri Academy MOOCs
        url: https://www.esri.com/training/catalog/search/
        kind: course
        cost: free
        hours: 15 h each
        gives: "ArcGIS Pro familiarity and a certificate that Pakistani employers recognise by name"
      - label: Pakistan administrative boundaries, OCHA COD
        url: https://data.humdata.org/dataset/cod-ab-pak
        kind: data
        cost: free
        gives: "the boundary file every project in the country starts from"
  - name: Analysis
    duration: Semester 3 to 5
    outcome: "take a vague question from a non-GIS person, turn it into a sequence of spatial operations, run it, and explain the result and its limits."
    skills:
      - "Vector analysis: buffer, clip, intersect, dissolve, spatial join, summarise within, nearest, and knowing which one the question actually needs"
      - "Raster analysis: terrain from a DEM (slope, aspect, hillshade, watersheds), zonal statistics, reclassification, map algebra, resampling and why cell size matters"
      - "Suitability and site selection with weighted overlay, including a defensible way to choose the weights (AHP)"
      - "Network analysis: service areas and shortest paths on OpenStreetMap roads for schools, hospitals and ambulances"
      - "Spatial databases: PostGIS installed locally, loading data, writing SQL with ST_ functions, spatial indexes, views that feed QGIS"
      - "Data quality: topology rules, duplicate geometry, slivers, metadata that a colleague can read"
      - "Processing models in QGIS so a ten-step workflow becomes one tool you can rerun"
    project: "a site suitability analysis for one real facility type in one district (a school, a solid-waste site, a flood shelter), with criteria justified, the model saved, and a two-page report with the maps."
    resources:
      - label: Introduction to PostGIS workshop
        url: https://postgis.net/workshops/postgis-intro/
        kind: course
        cost: free
        hours: 20 h
        gives: "SQL for spatial questions, the skill that gets analysts promoted to data managers"
      - label: PostgreSQL tutorial
        url: https://www.postgresqltutorial.com/
        kind: docs
        cost: free
        hours: 15 h
        gives: "enough plain SQL to not be scared of the database"
      - label: QGIS processing and model designer, user guide chapter
        url: https://docs.qgis.org/latest/en/docs/user_manual/processing/modeler.html
        kind: docs
        cost: free
        hours: 6 h
        gives: "reproducible workflows without writing code"
      - label: "Penn State GEOG 483: Problem solving with GIS"
        url: https://www.e-education.psu.edu/geog483/
        kind: course
        cost: free
        hours: 30 h
        gives: "the habit of starting from the question rather than the tool"
      - label: "NASA ARSET: fundamentals of remote sensing"
        url: https://appliedsciences.nasa.gov/get-involved/training/english/arset-fundamentals-remote-sensing
        kind: course
        cost: free
        hours: 8 h
        gives: "enough imagery literacy to use satellite data as an input without becoming a remote sensing specialist"
  - name: Automation and data management
    duration: Semester 5 to 7
    outcome: "do in one script what used to take a day of clicking, keep every project under version control, and hand over work that someone else can rerun."
    skills:
      - "Python from zero: variables, loops, functions, files, then pandas for tables"
      - "GeoPandas for vector work and rasterio for rasters, the two libraries that cover most analyst scripting"
      - "PyQGIS and the QGIS Python console for batch exports, map series and plugin-free automation"
      - "Git and GitHub: commit, branch, pull request, a readme that states inputs, CRS and steps"
      - "Excel to the level employers actually use: pivot tables, lookups, cleaning census tables before they reach GIS"
      - "Charts and dashboards that go with maps: matplotlib or plotly, and the discipline to show one message per figure"
    project: "a Python script that takes a folder of district boundary files and a census CSV and produces the density map for every district as a PDF map series, published on GitHub with a readme."
    resources:
      - label: Geo-Python, University of Helsinki
        url: https://geo-python-site.readthedocs.io/
        kind: course
        cost: free
        hours: 40 h
        gives: "Python basics taught for geographers, not for software engineers"
      - label: Automating GIS processes, University of Helsinki
        url: https://autogis-site.readthedocs.io/
        kind: course
        cost: free
        hours: 50 h
        gives: "GeoPandas, rasterio, OSMnx and routing, the full analyst toolkit in Python"
      - label: Geographic Data Science with Python
        url: https://geographicdata.science/book/
        kind: book
        cost: free
        hours: 40 h
        gives: "spatial statistics and the reasoning behind them, with code"
      - label: PyQGIS developer cookbook
        url: https://docs.qgis.org/latest/en/docs/pyqgis_developer_cookbook/
        kind: docs
        cost: free
        hours: 10 h
        gives: "scripting inside QGIS"
      - label: Pro Git book
        url: https://git-scm.com/book/en/v2
        kind: book
        cost: free
        hours: 8 h for the first three chapters
        gives: "version control, expected in every technical interview now"
      - label: GitHub Skills
        url: https://skills.github.com/
        kind: course
        cost: free
        hours: 4 h
        gives: "pull requests and collaboration the way teams actually use them"
  - name: Job ready
    duration: Final year and the first six months after
    outcome: "pass a thirty-minute practical test cold, present a project to a non-technical panel, and have three pieces of public work that a hiring manager can open on a phone."
    skills:
      - "Timed practicals: georeference a scanned sheet, digitise parcels with snapping, fix a CRS mismatch, join and classify, lay out and export, each in under thirty minutes"
      - "A portfolio of three complete analyses with a one-page write-up each, on your profile page here"
      - "The final year project as a public repository with data, scripts, maps and an honest limitations paragraph"
      - "Explaining a spatial result to someone who has never opened a GIS, in two minutes, without jargon"
      - "Reading a tender or terms of reference and listing the GIS deliverables it implies"
      - "Knowing the organisations: who does what in NESPAK, the Urban Units, the PDMAs, Survey of Pakistan, and the UN cluster system, and what each actually asks of a junior"
    project: "apply for ten internships or junior roles with the portfolio link in the first line of the email, and keep a sheet of who replied and what they tested."
    resources:
      - label: Esri technical certification, ArcGIS Pro Associate
        url: https://www.esri.com/training/certification
        kind: certificate
        cost: paid
        hours: 40 h preparation
        gives: "the one certificate Pakistani consultancies ask for by name; only worth it once the institute licence has given you real hours in Pro"
      - label: OpenStreetMap, learn to contribute
        url: https://learnosm.org/en/
        kind: course
        cost: free
        hours: 6 h
        gives: "a public edit history in your own city, which is a portfolio item in itself"
      - label: Humanitarian OpenStreetMap tasking manager
        url: https://tasks.hotosm.org/
        kind: tool
        cost: free
        gives: "real mapping tasks for Pakistan flood and health projects, with your contributions counted"
---

Most graduates of the institute start here, and most of the other tracks branch off from it. The job is less about any one piece of software than about being the person in the office who can take a messy dataset and a vague request and return a correct map and a clear answer by the afternoon.

## Who this is for

You like maps, you are comfortable with tables, and you want to work in planning, utilities, disaster management, public health, agriculture or the NGO sector. You do not need to love programming, but by the third year you will need to tolerate it, because the analysts who can script are the ones who are kept when a project ends.

## How to use the stages

The durations assume a four-year BS with GIS courses in parallel. Each stage ends with one project. Do the project, not just the course. Put every project on your profile page on this site and in a public repository, because that is what the interview will be about.

The resources are ordered within each stage. Free ones first. Nothing paid is needed before the final year, and the one paid certificate listed is optional.

## Mistakes alumni say they made

- Learning ArcGIS only, because the lab had it, then discovering the first employer ran QGIS and PostGIS.
- Treating Python as a separate subject to pass rather than a tool to use in every GIS course from the fifth semester.
- Finishing a good final year project and leaving it on a laptop. Nobody could see it.
- Memorising tool names instead of understanding what the question needed. The practical tests are about the question.

## Where it leads

Two years in, an analyst with SQL and Python usually moves into one of three things: GIS data management for a large organisation, a GIS developer role, or project leadership on the GIS side of an engineering or humanitarian programme. Several alumni went from this track into remote work for foreign consultancies, where the same skills pay in dollars.
