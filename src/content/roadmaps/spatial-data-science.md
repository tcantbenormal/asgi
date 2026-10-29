---
title: Spatial Data Science and GeoAI
summary: Statistics, machine learning and deep learning on spatial data. Models that predict, classify and explain across space, from a census table to a satellite image stack, with the rigour to know when they are wrong.
order: 6
demand: Growing
tools: [Python, pandas and GeoPandas, scikit-learn, PyTorch, Earth Engine, PostGIS, DuckDB, Jupyter, Git]
roles: [Spatial Data Scientist, GeoAI Engineer, Machine Learning Engineer (geospatial), Data Analyst, Research Scientist]
employers: [analytics teams at banks, telecoms and logistics companies, agri-tech and EO start-ups, international organisations with data science units, research labs in Pakistan and abroad, and remote employers worldwide, for whom a strong public portfolio matters more than location]
stages:
  - name: Foundations
    duration: Semester 2 to 4
    outcome: "analyse a spatial dataset in Python end to end, with the statistics to say whether a pattern is real, and the plots to show it."
    skills:
      - "Python properly: functions, data structures, environments, Jupyter, and the discipline of a clean notebook"
      - "pandas and GeoPandas: cleaning, joining, grouping, spatial joins, reading and writing GeoPackage and GeoParquet"
      - "Statistics that matter: distributions, sampling, confidence intervals, hypothesis tests, regression, and the ways they go wrong"
      - "Spatial statistics: spatial autocorrelation, Moran's I, hot spot analysis, and why ordinary regression misleads on spatial data"
      - "Visualisation: matplotlib, seaborn, and maps in GeoPandas or plotly that follow cartographic rules"
      - "SQL and DuckDB for data larger than memory, PostGIS for spatial queries"
      - "Git and GitHub for every notebook from the first week"
    project: "an exploratory spatial analysis of one public dataset about Pakistan (census, health facilities, schools, crime, prices), with a tested hypothesis, a spatial autocorrelation result, and a readable notebook published on GitHub."
    resources:
      - label: Geo-Python, University of Helsinki
        url: https://geo-python-site.readthedocs.io/
        kind: course
        cost: free
        hours: 40 h
        gives: "Python and pandas taught for spatial people"
      - label: Automating GIS processes, University of Helsinki
        url: https://autogis-site.readthedocs.io/
        kind: course
        cost: free
        hours: 50 h
        gives: "GeoPandas and the spatial Python ecosystem"
      - label: Geographic Data Science with Python
        url: https://geographicdata.science/book/
        kind: book
        cost: free
        hours: 50 h
        gives: "spatial statistics, clustering and regression with code, the core text of this track"
      - label: GeoDa documentation and tutorials
        url: https://geodacenter.github.io/
        kind: docs
        cost: free
        hours: 10 h
        gives: "exploratory spatial data analysis with a point-and-click tool that teaches the concepts fast"
      - label: Kaggle Learn
        url: https://www.kaggle.com/learn
        kind: course
        cost: free
        hours: 20 h
        gives: "short practical modules on pandas, visualisation, intro machine learning and geospatial analysis"
      - label: DuckDB spatial extension documentation
        url: https://duckdb.org/docs/stable/core_extensions/spatial/overview
        kind: docs
        cost: free
        hours: 4 h
        gives: "fast analysis of large files on a laptop without a database server"
  - name: Machine learning
    duration: Semester 4 to 6
    outcome: "train, validate and explain a machine learning model on spatial data, with a cross-validation scheme that respects space, and know when a simpler model is better."
    skills:
      - "Supervised learning with scikit-learn: trees, random forests, gradient boosting, regularised regression, and the bias-variance intuition behind them"
      - "Validation on spatial data: spatial cross-validation, leakage from neighbouring samples, and why a 95 percent accuracy is often a lie"
      - "Unsupervised methods: clustering regions, dimensionality reduction, anomaly detection"
      - "Feature engineering from geography: distances, densities, neighbourhood statistics, terrain, satellite-derived variables"
      - "Model explanation: feature importance, partial dependence, SHAP, and communicating uncertainty on a map"
      - "Earth Engine machine learning: classifiers on image collections, AlphaEarth embeddings as features, exporting predictions"
      - "Experiment hygiene: random seeds, saved configurations, a results table, a readme that states what was tried"
    project: "a predictive model for something spatial in Pakistan (building density, nighttime light as a poverty proxy, crop type, flood susceptibility, school access), with spatially blocked cross-validation, an explanation of the top features, and an honest error map."
    resources:
      - label: Machine learning specialisation, Andrew Ng
        url: https://www.coursera.org/specializations/machine-learning-introduction
        kind: course
        cost: free to audit
        hours: 60 h
        gives: "the foundations of machine learning, still the best structured introduction"
      - label: Google machine learning crash course
        url: https://developers.google.com/machine-learning/crash-course
        kind: course
        cost: free
        hours: 15 h
        gives: "a fast practical pass through the core ideas with exercises"
      - label: scikit-learn user guide
        url: https://scikit-learn.org/stable/user_guide.html
        kind: docs
        cost: free
        hours: 20 h
        gives: "the library and the methods, documented better than most textbooks"
      - label: Interpretable machine learning, Christoph Molnar
        url: https://christophm.github.io/interpretable-ml-book/
        kind: book
        cost: free
        hours: 15 h
        gives: "how to explain a model, which is what a decision-maker will ask for"
      - label: Earth Engine satellite embedding dataset, AlphaEarth
        url: https://developers.google.com/earth-engine/datasets/catalog/GOOGLE_SATELLITE_EMBEDDING_V1_ANNUAL
        kind: data
        cost: free
        gives: "ready-made features for every 10 m cell on Earth, which collapse weeks of feature engineering"
      - label: "Penn State GEOG 586: Geographic information analysis"
        url: https://www.e-education.psu.edu/geog586/
        kind: course
        cost: free
        hours: 30 h
        gives: "spatial analysis methods with the theory a graduate school expects"
  - name: Deep learning and GeoAI
    duration: Semester 6 to 8 and beyond
    outcome: "fine-tune a deep model on imagery for a real task, run segmentation and foundation models as tools, use language-model agents with judgement, and publish work others can reproduce."
    skills:
      - "Deep learning foundations: neural networks, convolution, training loops, overfitting, transfer learning, with PyTorch"
      - "Image segmentation and detection on satellite and drone imagery: U-Net style models, TorchGeo datasets and samplers, label creation and its cost"
      - "Foundation models: fine-tuning Prithvi or Clay on a free GPU, using Segment Anything for extraction, and evaluating against a classical baseline every time"
      - "Working with limited labels: weak supervision, active learning, transfer from global models to Pakistani conditions"
      - "Language models as tools: QGIS and notebook agents, code generation you can verify, retrieval over documents, and keeping a record of where they were wrong"
      - "Reproducibility and sharing: environments, data versioning, model cards, a paper or a technical report with code"
      - "Ethics and limits: biased training data, surveillance uses, the difference between a demonstration and a deployed system"
    project: "a reproducible GeoAI study on a Pakistan problem (building footprints, flood extent, crop type, brick kilns, informal settlements) with a baseline, a fine-tuned model, a proper test set, and a repository someone else can run."
    resources:
      - label: Practical deep learning for coders, fast.ai
        url: https://course.fast.ai/
        kind: course
        cost: free
        hours: 60 h
        gives: "deep learning from the first lesson in code, the fastest route to a working model"
      - label: PyTorch tutorials
        url: https://pytorch.org/tutorials/
        kind: docs
        cost: free
        hours: 20 h
        gives: "the framework used by nearly all geospatial deep learning"
      - label: TorchGeo documentation
        url: https://torchgeo.readthedocs.io/
        kind: docs
        cost: free
        hours: 20 h
        gives: "datasets, samplers and pretrained models built for satellite imagery"
      - label: segment-geospatial, SAM for GIS
        url: https://samgeo.gishub.org/
        kind: tool
        cost: free
        hours: 6 h
        gives: "segmentation of buildings, fields and water in a few lines"
      - label: Prithvi EO models, IBM and NASA
        url: https://huggingface.co/ibm-nasa-geospatial
        kind: tool
        cost: free
        gives: "open foundation models with fine-tuning examples"
      - label: Clay foundation model
        url: https://clay-foundation.github.io/model/
        kind: tool
        cost: free
        gives: "an open embedding model that accepts different sensors and resolutions"
      - label: Hugging Face course
        url: https://huggingface.co/learn
        kind: course
        cost: free
        hours: 25 h
        gives: "transformers and the model hub, including how to use language models responsibly"
      - label: Google Colab
        url: https://colab.research.google.com/
        kind: tool
        cost: free
        gives: "a free GPU for every project in this stage"
---

This is the newest track and the one most shaped by what happened in the last two years: foundation models and embeddings that make imagery usable with a few hundred labels, segmentation models that extract features in minutes, and language-model assistants inside the tools. It is also the track where a student from Pakistan competes most directly in a global market, because the work is published, the data is public, and nobody checks where the repository was written.

## Who this is for

You liked statistics and programming and want to go further than analysis into modelling. You are willing to learn mathematics you were not taught well, probability, linear algebra, optimisation, from free sources, because without it machine learning is superstition. You want a research or data science career, in Pakistan or abroad.

## How to use the stages

The order is deliberate: statistics before machine learning, machine learning before deep learning. Students who start with deep learning tutorials produce impressive demos and cannot explain a confidence interval, and interviewers notice.

Everything is in Python and everything is in a repository. By the final year you should have a GitHub profile that a data science hiring manager can read for ten minutes, which is more than most applicants anywhere have.

Use the assistants, and keep a log of their mistakes. The log becomes the most honest thing in your portfolio.

## Mistakes alumni say they made

- Random cross-validation on spatial data, then a model that failed the moment it was used on a new district.
- Chasing the newest model instead of getting better labels.
- Not learning SQL, and being unable to get data out of the organisation's database.
- Publishing a notebook that only ran once, on one laptop, with data that was not shared.

## Where it leads

Data science roles in Pakistani banks, telecoms and logistics companies hire geoinformatics graduates who can model, and pay more than any GIS analyst position. The research route is strong: a reproducible GeoAI project on a Pakistan problem is exactly what admissions committees abroad want to see. And the remote market for people who can fine-tune a model on imagery and explain the result is large and growing.
