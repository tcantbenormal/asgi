# Decisions

Every meaningful technical or product decision, newest last. Each entry: what was decided, why, what it rules out, and when to revisit.

## 2026-10-15

### D1. Static site generator (Astro) with no server
Pages are built to plain HTML and served from a CDN. Why: zero cost, nothing to patch or get hacked, fast on slow Pakistani connections, and search engines index it well. Rules out: features that need a request-time server (live forum, per-user pages without rebuild). Revisit when: the national community needs a forum or more than a few profile edits per hour. The path then is Astro's Cloudflare adapter, which keeps the same code and renders dynamic routes on demand.

### D2. Plain CSS, no component framework, no Tailwind
One stylesheet with custom properties. Why: fewer dependencies, easier handover to non-expert cabinet members, nothing to upgrade. Revisit when: a second developer joins and asks for it.

### D3. Content lives as files in the repo, except alumni
Stories, roadmaps, resources, links, projects, events, cabinet are Markdown and JSON in `src/content/`. Why: version-controlled, reviewable, no admin panel to build. A sheet-sync script lets non-coders edit tabular collections from Google Sheets.

### D4. No Google AdSense; countdown download gate instead
AdSense forbids requiring an ad view to reach content and pays little for Pakistani traffic. The gate shows ads from networks that allow interstitials for a configurable number of seconds, then reveals the link. Ad snippets are pasted into `src/config/ads.ts`. Rules out: AdSense on any page with a gate.

### D5. Software section is open-source and legally redistributable only
Cracked commercial software would get ad accounts banned and expose the society. Commercial tools appear only as links to vendor student-licence pages.

### D6. CARTO basemap with a referrer-restricted key
Voyager raster tiles, key stored in `src/config/site.ts`. Basemap keys are public by design; the referrer restriction in the CARTO dashboard is the protection.

### D7. Supabase for alumni profiles, nothing else
Postgres plus auth plus storage on the free tier. Alumni sign in and own their row. Row-level security lets the public read approved rows and owners write their own. The cabinet approves in the dashboard table editor, so no admin UI is built. The site fetches approved rows at build time; profile pages are still static.

### D8. Publishable key in the repo, secret key nowhere
The publishable key is designed to be shipped to browsers. The secret key is never stored in the project, and was rotated after being pasted into a chat.

### D9. Approval and featuring protected by a database trigger, not column grants
Column-level grants broke upserts. A `before insert or update` trigger forces `approved` and `featured` to safe values when the request comes through the API, while dashboard edits as `postgres` pass through.

### D10. Markdown samples remain as a fallback until real profiles exist
The alumni loader falls back to `src/content/alumni/*.md` when Supabase is unreachable or empty. Delete the samples and the fallback branch once a handful of real profiles are approved.

## 2026-10-16

### D11. Profiles are portfolios, addressed at the site root
A profile page lives at `/<username>` where the username is chosen by the owner and validated in the database against a reserved list of site routes. Profiles carry CV, education, experience, projects, publications and links. Why: a shareable address like `asgi.pk/fahadkarim` is what makes people fill the profile in and keep it current. Rules out: a page in `src/pages/` with a name that could collide with a username; add any new top-level route to the reserved list in `supabase/migrations/002_portfolio.sql`.

### D12. Automation comes from open APIs, not LinkedIn
LinkedIn's API does not expose a member's experience, education or posts to third-party apps without partner approval, and scraping violates their terms. Automation therefore uses what is open: GitHub's public API for projects, OpenAlex for publications by ORCID. LinkedIn stays a link on the profile. Revisit if LinkedIn opens the profile API to small developers.

### D13. Education is a list, not a single field
Each profile keeps every degree with institution, programme and years. This is what makes degree-wise institution statistics possible later. The `degree` and `batch` fields remain as the institute-specific summary.

### D14. The map shows only graduates in the market
Current students are in the directory but excluded from the map and its statistics. Heatmap and province, city, country and sector breakdowns are computed at build time.

### D15. The national community is a separate project
ASGI stays a single-institution portal and becomes the first tenant of the national platform later. The national project is planned in `D:\PakGeo` and will be built with a server-rendered stack because it needs a forum and self-service content that cannot wait for rebuilds.

### D16. Domain: asgi.app, free for year one via the GitHub Student Developer Pack
asgi.com, .org and .net are taken. asgi.app was registered at Name.com on 2026-10-21 using the pack's one-year offer, in the founder's name. DNS is on Cloudflare so the root domain can serve Cloudflare Pages. Renewal in October 2027 is paid; before then the domain is moved to the society email. The .app zone forces HTTPS, which Cloudflare provides.
