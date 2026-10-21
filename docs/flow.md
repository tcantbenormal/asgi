# Execution flow

How a request or a build moves through the files. Read this before changing anything structural.

## 1. Build time (`npm run build`)

```
package.json  →  astro build  →  pagefind --site dist
```

1. `astro.config.mjs` sets the site URL, file-based output (`/alumni.html` style), and the sitemap integration.
2. Astro reads `src/content.config.ts`. Each collection has a loader:
   - `glob(...)` loaders read Markdown in `src/content/posts`, `src/content/roadmaps`.
   - `file(...)` loaders read `src/content/*.json` for resources, links, projects, events, cabinet.
   - `alumni` uses `src/loaders/alumni.ts`, a custom loader.
3. `src/loaders/alumni.ts` fetches `GET {supabase.url}/rest/v1/profiles?approved=eq.true` with the publishable key from `src/config/site.ts`. Row-level security guarantees only approved rows come back. For each row it builds an entry whose `id` is `username` or the generated `slug`, maps snake_case columns to the schema, and renders the Markdown bio through `ctx.renderMarkdown`. If the request fails or returns nothing, it delegates to a `glob` loader over `src/content/alumni/*.md`.
4. Every entry is validated against the zod schema in `src/content.config.ts`. A field with the wrong shape fails the build with the file or row named.
5. Pages in `src/pages/` run their frontmatter, call `getCollection`, and render:
   - `[username].astro` calls `getStaticPaths` over the alumni collection and emits one HTML file per profile at the site root.
   - `download/[id].astro` and `resources/[id].astro` do the same over resources.
   - `stories/[slug].astro` and `roadmaps/[slug].astro` over their collections.
6. Every page wraps itself in `src/layouts/Base.astro`, which pulls `src/styles/global.css`, `Header.astro`, `Footer.astro`, and the ad rail from `AdSlot.astro` reading `src/config/ads.ts`.
7. The sitemap integration writes `sitemap-index.xml`. Pagefind then indexes every page whose `<main>` carries `data-pagefind-body` (the layout sets it unless the page passed `noindex`).

Output: `dist/`. Nothing in `dist/` talks to Supabase at runtime except the profile editor.

## 2. Runtime, ordinary pages

Static HTML from the CDN. Client scripts are small and page-local:

- `Header.astro`: mobile menu toggle.
- `alumni/index.astro`, `components/ResourceList.astro`, `stories/index.astro`, `projects.astro`: filter cards by `data-*` attributes already in the HTML. No fetches.
- `components/AlumniMap.astro`: reads the JSON blob embedded next to the map div, creates a Leaflet map with CARTO tiles from `site.basemapTiles`, optional `leaflet.heat` layer, and one circle marker with a popup per person. Leaflet is loaded from unpkg as a classic script.
- `index.astro`: loads `model-viewer` from Google's CDN for the satellite, and an inline script that fetches nine NASA GIBS tiles for yesterday's date, composites them on a canvas, and sets the image.
- `download/[id].astro`: counts down `site.downloadCountdown` seconds, pauses when the tab is hidden, then decodes the base64 link into the button.
- `search.astro`: Pagefind UI reads `/pagefind/` built at step 7.
- `components/Comments.astro`: Giscus script, only if `site.giscus.repo` is set.

## 3. Runtime, profile editor (`/alumni/join`)

The only page that writes data.

```
browser  →  supabase-js (CDN)  →  Supabase Auth / PostgREST / Storage
```

1. On load, `createClient(site.supabase.url, site.supabase.key)` and `getSession()`. No session: show the sign-in card. OAuth buttons call `signInWithOAuth` and return to the same URL; the email form calls `signInWithOtp`.
2. With a session: `from('profiles').select('*').eq('user_id', uid).maybeSingle()`. RLS lets owners see their own row even if unapproved. The form is filled, repeatable rows (experience, education, projects, publications) are cloned from `<template>` elements.
3. Buttons call outside services directly from the browser, all keyless:
   - "Use my location": `navigator.geolocation`, then Nominatim reverse geocode for city, country and province.
   - "Look up city": Nominatim search.
   - "Import from GitHub": `api.github.com/users/{user}/repos`.
   - "Import from ORCID": `api.openalex.org/works?filter=authorships.author.orcid:...`.
4. Save: optional uploads to the `avatars` and `cv` buckets at `{uid}/...`, then `from('profiles').upsert(row, { onConflict: 'user_id' })`. In Postgres the RLS policies check `auth.uid() = user_id`, and the `profiles_protect` trigger resets `approved`, `featured` and `user_id` for API callers. The username check constraint rejects reserved or malformed short links; the editor turns that error into a readable message.
5. The response row refills the form and tells the user whether the page is live and at which URL.

Nothing on the public site changes until the next build (step 1).

## 4. Approval and publishing

```
alumnus saves  →  row with approved=false  →  cabinet ticks approved in Supabase Table Editor  →  rebuild  →  page exists
```

Rebuild today: `npm run build` locally or a push to the repository. After deployment: a Cloudflare Pages deploy hook called by the cabinet or by a scheduled job.

## 5. Optional sheet sync (`npm run sync`)

`scripts/sync-sheets.mjs` fetches published Google Sheets as CSV, keeps rows where `approved` is true, and overwrites the matching `src/content/*.json`. Run before a build. Alumni are not synced this way; they come from Supabase.
