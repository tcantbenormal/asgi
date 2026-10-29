---
title: Precision Agriculture and Agri-Geoinformatics
summary: Applying GIS, remote sensing and sensors to the crops that run Pakistan's economy. Crop mapping, yield and water monitoring, farm-level advisory, and the data behind agricultural policy.
order: 5
demand: Growing
tools: [Google Earth Engine, QGIS, Python, drones with multispectral sensors, soil and weather sensors, mobile data collection]
roles: [Agri-GIS Analyst, Crop Monitoring Specialist, Precision Agriculture Specialist, Agronomic Data Analyst, Research Associate (agriculture)]
employers: [provincial agriculture departments and crop reporting services, PARC and NARC, FAO, WFP and IFAD programmes, agri-tech start-ups and input companies, corporate farms and sugar mills, irrigation departments and PCRWR, university research groups, the institute's own agricultural faculty]
stages:
  - name: Foundations
    duration: Semester 1 to 3
    outcome: "describe Pakistan's cropping systems in space and time, and show one season of one crop in satellite data for a district you know."
    skills:
      - "Agronomy for geoinformatics people: kharif and rabi calendars, the major crops by region (wheat, rice, cotton, sugarcane, maize, orchards), growth stages, and what each looks like from above through the season"
      - "The irrigation system as geography: the Indus basin canal commands, watercourses, groundwater, and why water is the first variable in every agricultural map of Punjab and Sindh"
      - "Remote sensing basics with an agricultural eye: NDVI and its relatives through a crop cycle, phenology curves, the difference between a sown field and a bare one in February"
      - "Earth Engine: a time series chart over a field, a seasonal composite over a tehsil, exporting a GeoTIFF"
      - "QGIS with agricultural data: field boundaries, canal networks, soil maps, join to crop reporting tables"
      - "Where the data is: Pakistan Bureau of Statistics agricultural census and crop reports, provincial crop reporting services, FAO statistics, CHIRPS rainfall, ERA5 weather, MODIS and Sentinel-2 archives"
    project: "an NDVI phenology profile for wheat in one tehsil across a full rabi season, compared with the official sowing and harvest dates, with the Earth Engine script and a short written interpretation."
    resources:
      - label: "NASA ARSET: fundamentals of remote sensing"
        url: https://appliedsciences.nasa.gov/get-involved/training/english/arset-fundamentals-remote-sensing
        kind: course
        cost: free
        hours: 8 h
        gives: "the imagery foundations, needed before anything agricultural"
      - label: Earth Engine guides
        url: https://developers.google.com/earth-engine/guides
        kind: docs
        cost: free
        hours: 20 h
        gives: "the platform for seasonal and multi-year crop analysis at no cost"
      - label: "Cloud-Based Remote Sensing with Google Earth Engine, the EEFA book, agriculture chapters"
        url: https://www.eefabook.org/
        kind: book
        cost: free
        hours: 20 h for the relevant chapters
        gives: "worked crop mapping and phenology examples you can run and adapt"
      - label: FAO e-learning academy
        url: https://elearning.fao.org/
        kind: course
        cost: free
        hours: 5 to 15 h each
        gives: "certificates on crop monitoring, food security analysis and agricultural statistics that development employers recognise"
      - label: CHIRPS rainfall data
        url: https://www.chc.ucsb.edu/data/chirps
        kind: data
        cost: free
        gives: "daily rainfall since 1981 for any field in Pakistan, the standard climate input"
  - name: Crop mapping and monitoring
    duration: Semester 4 to 6
    outcome: "produce a validated crop type map for a tehsil, estimate area with confidence intervals, and build a monitoring dashboard that updates through the season."
    skills:
      - "Crop type classification with random forest in Earth Engine using multi-date Sentinel-2 and Sentinel-1, feature engineering from phenology, and sample design for the ground truth"
      - "Field data collection: a campaign with ODK Collect or QField, GPS points with crop, stage and photo, timed to the image dates"
      - "Accuracy assessment and area estimation the way FAO and the crop reporting services require"
      - "Water and drought monitoring: evapotranspiration products, soil moisture from SAR, canal command performance, NDWI for standing water in rice"
      - "Yield proxies: integrated NDVI, peak timing, relationships to reported yields, and honesty about what satellite yield estimates can and cannot do"
      - "Disaster response: flood extent over cropland with Sentinel-1, damage assessment reports in the format NDMA and FAO use"
      - "Python for the analysis you cannot do in Earth Engine: pandas on field data, scikit-learn, plotting that a department will put in its report"
    project: "a crop type map of one tehsil for one season, validated with your own field campaign, with area estimates and confidence intervals, delivered as a report and a small web map."
    resources:
      - label: "NASA ARSET: agricultural crop classification with SAR and optical remote sensing"
        url: https://appliedsciences.nasa.gov/get-involved/training
        kind: course
        cost: free
        hours: 10 h
        gives: "the reference crop mapping workflow, with exercises"
      - label: "NASA ARSET: agriculture and food security trainings"
        url: https://appliedsciences.nasa.gov/what-we-do/food-security-agriculture
        kind: course
        cost: free
        hours: 4 to 10 h each
        gives: "drought, irrigation and food security monitoring modules"
      - label: Good practices for estimating area and assessing accuracy, Olofsson et al. 2014
        url: https://doi.org/10.1016/j.rse.2014.02.015
        kind: book
        cost: free
        hours: 6 h
        gives: "the method behind every credible crop area figure"
      - label: ODK Collect documentation
        url: https://docs.getodk.org/
        kind: docs
        cost: free
        hours: 6 h
        gives: "field data collection on phones, used by most agricultural surveys in the country"
      - label: GEOGLAM crop monitor
        url: https://cropmonitor.org/
        kind: data
        cost: free
        gives: "how the international community reports crop conditions monthly, including for Pakistan"
      - label: Automating GIS processes, University of Helsinki
        url: https://autogis-site.readthedocs.io/
        kind: course
        cost: free
        hours: 50 h
        gives: "the Python skills for the parts of the pipeline that live outside Earth Engine"
  - name: Farm level and advisory
    duration: Semester 6 to 8
    outcome: "work at field scale with drone and sensor data, turn analysis into a recommendation a farmer or an agronomist can act on, and understand the economics of agri-tech in Pakistan."
    skills:
      - "Drone multispectral mapping: flying, calibration panels, radiometric correction, index maps, zoning for variable rate application"
      - "Soil and weather sensors, low-cost IoT, and what to do with the data stream"
      - "Management zones and prescription maps, with the agronomy to know what a zone means for inputs"
      - "Advisory products: SMS and app-based alerts, the extension system, what farmers actually act on and what they ignore"
      - "Economics: cost per acre of a service, who pays, and why most precision agriculture in Pakistan starts with corporate farms, sugar mills and progressive growers"
      - "Policy-level work: crop reporting modernisation, subsidy targeting, insurance based on satellite indices"
      - "Communicating with agronomists and farmers in Urdu and the regional language, on paper and in person"
    project: "an end-to-end farm advisory pilot on one real farm or research plot: drone or satellite indices, a management zone map, a recommendation discussed with the grower, and a note on cost and whether it would pay."
    resources:
      - label: OpenDroneMap documentation, multispectral processing
        url: https://docs.opendronemap.org/
        kind: docs
        cost: free
        hours: 10 h
        gives: "index maps from multispectral drone imagery with free software"
      - label: "Penn State GEOG 892: Geospatial applications of unmanned aerial systems"
        url: https://www.e-education.psu.edu/geog892/
        kind: course
        cost: free
        hours: 30 h
        gives: "drone mapping theory and practice"
      - label: FAO e-learning, digital agriculture and climate-smart agriculture courses
        url: https://elearning.fao.org/
        kind: course
        cost: free
        hours: 10 h
        gives: "the international framing employers and funders use"
      - label: CGIAR research publications and data
        url: https://www.cgiar.org/
        kind: data
        cost: free
        gives: "open research and datasets on South Asian cropping systems, including Pakistan"
      - label: Pakistan Agricultural Research Council
        url: https://www.parc.gov.pk/
        kind: docs
        cost: free
        gives: "the national research system, its institutes and where the internships are"
---

The institute sits inside an agricultural university, and that is an advantage no other GIS programme in the country has. The agronomists, soil scientists and plant breeders are in the next building. Pakistan's agriculture employs a third of the workforce, its water system is the largest contiguous irrigation network in the world, and almost none of it is monitored with the data that exists for free. The demand is growing because departments, donors and companies are discovering that the imagery is there and the people who can use it are not.

## Who this is for

You want your GIS work to matter for food, water and rural livelihoods. You are willing to learn enough agronomy to be taken seriously by an agronomist, and to go to the field during sowing and harvest rather than when the weather is pleasant. You are comfortable with the remote sensing track's tools, because this track is remote sensing applied to crops with the field work that imagery alone cannot replace.

## How to use the stages

Agronomy and geoinformatics advance together. Take agriculture electives, sit in on the agronomy department's field days, and build the habit of asking the crop scientist before interpreting the pixel. Every stage project combines imagery with ground observation.

Earth Engine and the free archives are the core. The paid parts of precision agriculture, multispectral drones and sensors, come last and only where a research group or employer provides the equipment.

## Mistakes alumni say they made

- Classifying crops without a field campaign and discovering that rice and sugarcane were confused across half the tehsil.
- Reporting a satellite "yield" without reference data and losing the department's trust.
- Not learning the crop calendar, then choosing image dates when nothing could be distinguished.
- Building a farmer app nobody used, because nobody had asked the farmers.

## Where it leads

Into the provincial departments that are modernising crop reporting, into the international agricultural and food security organisations with Pakistan programmes, into agri-tech companies and corporate farms, and into research degrees, where Pakistan-focused agricultural remote sensing is a strong application topic. Alumni who combine this track with the drone work from the surveying track have built independent service businesses for sugar mills and orchard owners.
