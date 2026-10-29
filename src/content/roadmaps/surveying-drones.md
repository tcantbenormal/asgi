---
title: Surveying, GNSS and Drones
summary: Measuring the ground. Total stations and GNSS for control, drones for mapping, photogrammetry for orthomosaics and surface models, and the field discipline that makes the numbers trustworthy.
order: 4
demand: Medium
tools: [GNSS receivers (RTK), Total station, WebODM or OpenDroneMap, QGIS, CloudCompare, Emlid Flow or similar]
roles: [Survey Engineer, Geomatics Engineer, Drone Mapping Specialist, Land Surveyor, Photogrammetry Technician, Cadastral Officer]
employers: [NESPAK and engineering consultancies, Survey of Pakistan contractors, Boards of Revenue cadastral digitisation projects, housing and infrastructure developers, mining and energy companies, drone service companies, and Gulf construction firms hiring from Pakistan]
stages:
  - name: Foundations
    duration: Semester 1 to 3
    outcome: "set up and run a levelling loop and a total station traverse, reduce the observations, and know what the closure tells you."
    skills:
      - "Geodesy you cannot skip: ellipsoid versus geoid, orthometric versus ellipsoidal height, datums used in Pakistan, UTM zones 41 to 43 and the scale factor at the zone edge"
      - "Levelling, tape and total station work: instrument setup, booking, reduction, closure, adjustment of a simple traverse"
      - "Error theory in practice: precision versus accuracy, random versus systematic error, propagation, and why a survey without closure is a sketch"
      - "Field notes and sketches that a stranger can use ten years later"
      - "Reading engineering drawings and understanding what the civil engineer needs from the surveyor"
      - "QGIS for survey data: importing points, CRS transformations, producing a plan"
    project: "a complete control survey of a small area of the campus, with a closed traverse, adjusted coordinates, a plan at a stated scale, and the field book scanned into the repository."
    resources:
      - label: "NPTEL: Surveying, IIT Roorkee"
        url: https://nptel.ac.in/courses/105107122
        kind: course
        cost: free
        hours: 40 h
        gives: "a full university surveying course with lectures and problems, free to watch"
      - label: "Penn State: The Nature of Geographic Information, chapters on GPS, surveying and datums"
        url: https://www.e-education.psu.edu/natureofgeoinfo/
        kind: course
        cost: free
        hours: 15 h for the relevant chapters
        gives: "how positioning and datums actually work, which separates a surveyor from a button-presser"
      - label: Navipedia, ESA's GNSS encyclopaedia
        url: https://gssc.esa.int/navipedia/index.php/Main_Page
        kind: docs
        cost: free
        gives: "the reference for every GNSS concept you will meet"
      - label: QGIS training manual
        url: https://docs.qgis.org/latest/en/docs/training_manual/
        kind: docs
        cost: free
        hours: 20 h of the relevant chapters
        gives: "enough GIS to deliver what clients now expect alongside the drawings"
  - name: GNSS and photogrammetry
    duration: Semester 4 to 6
    outcome: "establish RTK or post-processed control, fly a mapping mission legally, and produce an orthomosaic and surface model whose accuracy you have measured against check points."
    skills:
      - "GNSS surveying: static, RTK and PPK workflows, base and rover, NTRIP, occupation times, and the error budget of each"
      - "Post-processing with RTKLIB or the receiver's software, and reporting the result with its uncertainty"
      - "Photogrammetry: overlap, ground sampling distance, ground control points, check points, and the difference between them"
      - "Mission planning: flight height for the required GSD, terrain following, wind and light, battery margins"
      - "Processing in WebODM: orthomosaic, digital surface model, point cloud, and understanding each processing option you change"
      - "Accuracy assessment of drone products: RMSE on check points, reported honestly in the deliverable"
      - "Regulations: Pakistan Civil Aviation Authority rules for remotely piloted aircraft, no-fly zones, permissions for institutional flights, and what a client's security clearance letter needs to say"
    project: "a drone survey of a few hectares with five or more ground control points and independent check points, an orthomosaic and DSM at a stated GSD, an accuracy report with RMSE, and the processing settings documented."
    resources:
      - label: OpenDroneMap documentation
        url: https://docs.opendronemap.org/
        kind: docs
        cost: free
        hours: 15 h
        gives: "free photogrammetry processing, with every option explained"
      - label: WebODM
        url: https://www.opendronemap.org/webodm/
        kind: tool
        cost: free
        gives: "the web interface to OpenDroneMap, installable on a lab PC"
      - label: Emlid documentation, RTK and PPK workflows
        url: https://docs.emlid.com/
        kind: docs
        cost: free
        hours: 10 h
        gives: "practical RTK surveying, written for the low-cost receivers Pakistani firms actually buy"
      - label: RTKLIB
        url: https://github.com/tomojitakasu/RTKLIB
        kind: tool
        cost: free
        gives: "open-source GNSS post-processing, used to understand what commercial software hides"
      - label: Pakistan Civil Aviation Authority
        url: https://www.caapakistan.com.pk/
        kind: docs
        cost: free
        gives: "the current rules for drone operations, which change and must be checked before every institutional flight"
      - label: CloudCompare
        url: https://www.cloudcompare.org/
        kind: tool
        cost: free
        hours: 8 h
        gives: "point cloud inspection, comparison and volume calculation"
      - label: "Penn State GEOG 892: Geospatial applications of unmanned aerial systems"
        url: https://www.e-education.psu.edu/geog892/
        kind: course
        cost: free
        hours: 30 h
        gives: "the full drone mapping workflow with the theory behind each step"
  - name: Professional practice
    duration: Semester 7 to 8 and the first year of work
    outcome: "run a survey job from the client's brief to the signed deliverable, including the parts that are not measurement: scoping, permissions, safety, documentation and the invoice."
    skills:
      - "Cadastral and land records: how the Board of Revenue records work, mauza maps, the digitisation projects in Punjab and KP, and what a surveyor is asked to produce for them"
      - "Engineering surveys: setting out, as-built, volumes and cut-fill from drone or GNSS data, road and canal cross-sections"
      - "LiDAR awareness: airborne and terrestrial scanning, what the point cloud can and cannot give, processing in CloudCompare and PDAL"
      - "Deliverables: CAD-ready outputs, survey reports with method, equipment, control, accuracy and a signed statement"
      - "Safety and logistics in the field in Pakistan: heat, access, local permissions, working with security escorts on infrastructure sites"
      - "Pricing a job and writing a quotation, because many surveyors end up running their own small firm"
    project: "an as-built survey or a volume calculation for a real site, delivered to a real client, department or faculty member, with the full report and a lessons-learned page."
    resources:
      - label: PDAL documentation
        url: https://pdal.io/
        kind: docs
        cost: free
        hours: 10 h
        gives: "command-line point cloud processing, the LiDAR equivalent of GDAL"
      - label: QGIS point cloud support, user guide
        url: https://docs.qgis.org/latest/en/docs/user_manual/working_with_point_clouds/point_clouds.html
        kind: docs
        cost: free
        hours: 4 h
        gives: "viewing and styling LiDAR and drone point clouds in the tool you already use"
      - label: Survey of Pakistan
        url: https://www.surveyofpakistan.gov.pk/
        kind: docs
        cost: free
        gives: "the national mapping agency's role, map series and the approvals it controls"
      - label: Pix4D or DJI Terra certification courses
        url: https://www.pix4d.com/training/
        kind: certificate
        cost: paid
        hours: 20 h
        gives: "a vendor certificate that drone service companies and Gulf employers recognise; only after you can already do the work in WebODM"
---

Surveying is the part of geoinformatics that still requires leaving the office, and the one where a mistake has a physical cost: a boundary in the wrong place, a canal with the wrong slope, a building footprint that does not match the drawing. It is also the track with the most direct route to running your own business, because every housing scheme, road and transmission line in the country needs survey work and the equipment to do it has become affordable.

## Who this is for

You like fieldwork and instruments. You are careful by temperament and prepared to redo a measurement rather than guess. You can handle the physical side: long days, heat, travel to sites. You may want to combine this with civil engineering work or with drone services.

## How to use the stages

Theory and practice must go together here. Every stage project is a real measurement of a real place with the accuracy reported honestly. Keep every field book and every processing log; a surveyor's reputation is the paper trail.

Drones have made high-resolution mapping cheap, but they have not replaced control. Learn GNSS and traditional methods first, then photogrammetry. A drone orthomosaic without ground control is a picture, not a survey.

Regulations for drones in Pakistan change and are enforced unevenly. Always check the current rules and get written permission for institutional flights. A flight without permission can end a career before it starts.

## Mistakes alumni say they made

- Flying missions with no check points and reporting the software's self-assessed accuracy as the real one.
- Mixing ellipsoidal and orthometric heights in one deliverable.
- Learning one brand of receiver and being lost when the firm had another. The concepts transfer, the menus do not.
- Underpricing early jobs so badly that the equipment never paid for itself.

## Where it leads

Survey engineers are hired steadily by consultancies, developers and the cadastral digitisation projects, and there is sustained demand from Gulf construction firms recruiting from Pakistan. Within a few years many alumni on this track either specialise in drone services, which combines well with the remote sensing track, or set up a small firm with one GNSS set, one drone and a laptop running the free software in this roadmap.
