---
title: GIS Developer and Web GIS
summary: Building the software that other people use to see and edit spatial data. Web maps, spatial databases, APIs, dashboards, and the plumbing that moves data between them.
order: 3
demand: High
tools: [JavaScript, MapLibre or Leaflet, PostGIS, Python, FastAPI or Django, GeoServer, Docker, Git]
roles: [GIS Developer, Web GIS Developer, Geospatial Software Engineer, Full-stack Developer (geospatial), Spatial Data Engineer]
employers: [software houses in Lahore, Karachi and Islamabad with GIS products, engineering consultancies building client portals, government digitisation projects, start-ups in logistics, agriculture and real estate, and remote employers abroad, where this track pays best]
stages:
  - name: Foundations
    duration: Semester 1 to 3
    outcome: "build and deploy a web page with an interactive map that loads your own data from a file, and keep the code in version control."
    skills:
      - "GIS literacy first: CRS, vector and raster, GeoJSON by hand, what a tile is and why Web Mercator exists"
      - "HTML and CSS to a working level, then JavaScript properly: functions, arrays, objects, fetch, promises, modules"
      - "A first web map in Leaflet or MapLibre GL JS: basemap, markers, popups, a GeoJSON layer styled by attribute"
      - "Git from day one: every exercise in a repository, commits with messages that say why"
      - "The command line, on Windows through Git Bash or WSL, enough to not be stopped by it"
      - "Deploying static sites free on GitHub Pages or Cloudflare Pages, so every project has a URL"
    project: "a public web map of one dataset you care about (your city's schools, a hiking route, the campus) with filtering and popups, deployed at a real URL, repository linked from your profile."
    resources:
      - label: The Odin Project, foundations
        url: https://www.theodinproject.com/
        kind: course
        cost: free
        hours: 100 h
        gives: "web development taught properly from zero, with projects, not videos"
      - label: MDN Learn web development
        url: https://developer.mozilla.org/en-US/docs/Learn_web_development
        kind: docs
        cost: free
        hours: 40 h
        gives: "the reference documentation the whole industry uses"
      - label: freeCodeCamp, JavaScript algorithms and data structures
        url: https://www.freecodecamp.org/learn
        kind: course
        cost: free
        hours: 60 h
        gives: "JavaScript fluency with a certificate at the end"
      - label: Leaflet tutorials
        url: https://leafletjs.com/examples.html
        kind: docs
        cost: free
        hours: 6 h
        gives: "your first web map in an afternoon"
      - label: MapLibre GL JS documentation and examples
        url: https://maplibre.org/maplibre-gl-js/docs/
        kind: docs
        cost: free
        hours: 10 h
        gives: "vector tiles and GPU-rendered maps, the modern default"
      - label: Pro Git book
        url: https://git-scm.com/book/en/v2
        kind: book
        cost: free
        hours: 8 h
        gives: "version control as a habit rather than a hurdle"
  - name: Back end and data
    duration: Semester 4 to 6
    outcome: "stand up a spatial database, serve its contents through an API and as tiles, and build a front end that reads and writes through that API."
    skills:
      - "PostgreSQL and PostGIS seriously: schema design, spatial indexes, ST_ functions, views, roles and permissions"
      - "Python back ends: FastAPI for APIs, or Django with GeoDjango when you need auth, admin and forms built in"
      - "Serving data: GeoJSON endpoints, vector tiles with pg_tileserv or Martin, PMTiles for static hosting, GeoServer for WMS and WFS when a client demands OGC"
      - "Authentication, sessions and roles, because every real GIS portal has users who may only edit their own district"
      - "Docker for running PostGIS, GeoServer and your app the same way on every machine"
      - "Front-end frameworks: enough React, Vue or Svelte to build a dashboard with a map, charts and filters that talk to each other"
      - "Reading the OGC API and STAC specifications so your services are standard rather than invented"
    project: "a complete small application, for example a field survey tool for a single department, with a PostGIS database, an API with authentication, an editable map, and a Docker Compose file that starts it in one command."
    resources:
      - label: Introduction to PostGIS workshop
        url: https://postgis.net/workshops/postgis-intro/
        kind: course
        cost: free
        hours: 20 h
        gives: "spatial SQL, the foundation of every GIS back end"
      - label: FastAPI documentation and tutorial
        url: https://fastapi.tiangolo.com/tutorial/
        kind: docs
        cost: free
        hours: 15 h
        gives: "a modern Python API in a day, with automatic documentation"
      - label: GeoDjango tutorial
        url: https://docs.djangoproject.com/en/stable/ref/contrib/gis/tutorial/
        kind: docs
        cost: free
        hours: 10 h
        gives: "a full web application with a spatial database and an admin panel"
      - label: Django Girls tutorial
        url: https://tutorial.djangogirls.org/
        kind: course
        cost: free
        hours: 12 h
        gives: "the gentlest complete Django walk-through, deploy included"
      - label: GeoServer user manual
        url: https://docs.geoserver.org/
        kind: docs
        cost: free
        hours: 10 h
        gives: "OGC services, still required by most government tenders"
      - label: Docker get started guide
        url: https://docs.docker.com/get-started/
        kind: docs
        cost: free
        hours: 8 h
        gives: "reproducible environments and the ability to deploy anywhere"
      - label: OpenLayers workshop
        url: https://openlayers.org/workshop/
        kind: course
        cost: free
        hours: 8 h
        gives: "the most complete open mapping library, used in many enterprise portals"
      - label: React documentation, learn section
        url: https://react.dev/learn
        kind: docs
        cost: free
        hours: 25 h
        gives: "the front-end framework most job adverts list"
  - name: Production and scale
    duration: Semester 6 to 8
    outcome: "ship something that other people use, keep it running, and talk about trade-offs in an interview like someone who has been paged at night."
    skills:
      - "Deployment on a real server or cloud: a VPS with Docker, or Cloudflare Workers, or a free tier of a cloud provider, with HTTPS and backups"
      - "Performance: tiles instead of giant GeoJSON, indexes, caching, measuring before optimising"
      - "Testing and CI: a test suite that runs on every push with GitHub Actions"
      - "Data pipelines: scheduled jobs that pull from an API or a satellite archive, transform with GeoPandas or GDAL, load into PostGIS"
      - "Cloud-native formats: GeoParquet, FlatGeobuf, COG, PMTiles, Zarr, and why they let a static site do what used to need a server"
      - "Mobile data collection: QField and ODK Collect connected to your own back end"
      - "Security basics: injection, authentication mistakes, secrets out of the repository, the OWASP top ten"
      - "Working in a team: code review, issues, a changelog, writing documentation other developers read"
    project: "an open-source contribution merged into a geospatial project, however small, plus one deployed application with real users, even if the users are ten classmates."
    resources:
      - label: GitHub Actions documentation
        url: https://docs.github.com/en/actions
        kind: docs
        cost: free
        hours: 6 h
        gives: "automated tests and deployments"
      - label: Cloud-optimised GeoTIFF and cloud-native geospatial guide
        url: https://guide.cloudnativegeo.org/
        kind: docs
        cost: free
        hours: 6 h
        gives: "the formats that are replacing map servers"
      - label: PMTiles and Protomaps documentation
        url: https://docs.protomaps.com/
        kind: docs
        cost: free
        hours: 4 h
        gives: "serving a whole basemap from a single static file"
      - label: QField documentation
        url: https://docs.qfield.org/
        kind: docs
        cost: free
        hours: 6 h
        gives: "offline mobile data collection that syncs to your database"
      - label: OWASP top ten
        url: https://owasp.org/www-project-top-ten/
        kind: docs
        cost: free
        hours: 4 h
        gives: "the vulnerabilities every web developer is expected to know"
      - label: Good first issues in geospatial open source
        url: https://github.com/topics/geospatial
        kind: tool
        cost: free
        gives: "real projects to contribute to; a merged pull request is the strongest line on a junior CV"
---

This is the track where a geoinformatics degree competes directly with computer science graduates, and wins when the problem involves a map. A developer who understands projections, topology and why a spatial index matters is rare, and the companies that build mapping products know it. It is also the track with the clearest path to remote work for foreign employers, which changes what a salary means.

## Who this is for

You enjoyed the programming courses more than the cartography ones. You like building things that other people use. You are prepared to spend evenings on it, because web development is a craft learned by doing, and the course list here adds up to several hundred hours.

## How to use the stages

Learn the web first, not GIS libraries first. A developer who can build an ordinary web application and then adds maps is far more employable than one who only knows map libraries. The first stage is deliberately mostly general web development.

Every stage ends with something deployed at a public URL. In this field the portfolio is not a PDF, it is a list of links that work. Put them on your profile page here.

Choose one stack and go deep rather than sampling all of them. A reasonable default for Pakistan in 2026 is PostGIS, FastAPI or Django, MapLibre, and React, with Docker for deployment. The alternatives listed are so you recognise them in job adverts.

## Mistakes alumni say they made

- Learning a map library before learning JavaScript, and never being able to fix the bugs.
- Building portfolio projects that only run on their own laptop.
- Avoiding the database. The back end is where the GIS knowledge pays off.
- Treating ArcGIS JavaScript API or Esri's platform as the only option. It is one option, licensed, and most start-ups do not use it.

## Where it leads

Junior developer roles at Pakistani software houses pay more than analyst roles from the start. Within two to three years the track opens to remote positions with European and Gulf companies, to freelancing at rates that are unrealistic for analysts, and to founding something: several of the country's GIS start-ups were started by developers who first built a tool for a single client.
