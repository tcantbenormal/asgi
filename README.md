# ASGI Portal

Alumni and resources portal for the Arid Society of GIS. Static site, no backend, free to host.

## Run it

```
npm install
npm run dev        # http://localhost:4321
npm run build      # outputs dist/ and builds the search index
```

## Where things live

| What | Where |
|---|---|
| Site name, email, form links, countdown seconds, Giscus | `src/config/site.ts` |
| Ad network snippets | `src/config/ads.ts` |
| Alumni profiles (one Markdown file each) | `src/content/alumni/` |
| Stories, tutorials, interviews | `src/content/posts/` |
| Skills roadmaps | `src/content/roadmaps/` |
| Software, datasets, templates | `src/content/resources.json` |
| Scholarships, courses, certifications, jobs | `src/content/links.json` |
| FYP archive, events, cabinet | `src/content/projects.json`, `events.json`, `cabinet.json` |
| Colours and typography | `src/styles/global.css` |

Field names and allowed values are defined in `src/content.config.ts`. The build fails with a clear message if a file has a typo in a field.

## Alumni profiles (Supabase)

Alumni create and edit their own profiles at `/alumni/join`. Data lives in a Supabase Postgres table; the site reads approved rows at build time and renders them as static pages.

Profile pages live at the site root: `/<username>`, where the username is chosen in the editor and validated by the database against a reserved list. Any new top-level page you add to `src/pages/` must also be added to that list; the latest copy is in `supabase/migrations/005_submissions.sql`.

See `docs/decisions.md` for why things are the way they are and `docs/flow.md` for how a build and a request move through the files.

One-time setup:

1. In the Supabase dashboard open SQL Editor, paste `supabase/schema.sql`, run it. Then paste and run each file in `supabase/migrations/` in order (002 portfolio fields, 003 forum, 004 accounts, 005 submissions).
2. Authentication > Providers: enable Google and GitHub (each needs an OAuth client id and secret from that provider; the dashboard shows the callback URL to register). Email sign-in links work without setup but are rate-limited on the free plan.
3. Authentication > URL Configuration: add the site URL and `http://localhost:4321/alumni/join` to redirect URLs.
4. Project URL and publishable key go in `src/config/site.ts`. Never put the secret key anywhere in this repository.

Approving a profile: Table Editor > profiles > tick `approved`. Tick `featured` to show it on the home page. Then trigger a rebuild (push a commit, or call the Cloudflare deploy hook).

If Supabase is unreachable at build time the build falls back to any Markdown files in `src/content/alumni/`; that folder is empty on purpose, so the alumni directory simply renders empty rather than showing stale or sample people.

Keeping the free project awake: Supabase pauses free projects after seven days without requests. A weekly scheduled build, or a cron ping to the REST endpoint, prevents that.

## Accounts

`/join` offers "student" or "alumni" and sends both to `/account`, the only sign-in page: Google, GitHub, LinkedIn if enabled, or an email link. Students, alumni and faculty all use it; the `sector` field on the profile is what separates a current student from a graduate. Signed-in members see their name in the header with a sign-out button on every page, read from the session supabase-js stores in the browser. The account page shows profile status, lets a member change their email, and deletes the account outright through the `delete_my_account` database function, which removes uploads, profile, posts and replies. Other pages send people to `/account?next=<path>` and get them back after sign-in.

## Forum

`/forum` lists questions, data requests and discussions stored in the `posts` and `replies` tables; members post and reply after signing in. Moderation is the Table Editor: tick `hidden` on a post or reply to remove it from view. There is no rebuild involved; forum pages render in the browser.

Google sign-in: paste the Google OAuth client ID into `googleClientId` in `src/config/site.ts` so the consent screen names asgi.app. The same client ID must have `https://asgi.app` as an authorised JavaScript origin in the Google Cloud console.

## Downloads and the countdown gate

Every item in `resources.json` gets a page at `/resources/<id>` and a gate at `/download/<id>`. The gate shows ads for `downloadCountdown` seconds, then reveals the link. `downloads` is a list of `{ label, url, size? }` mirrors (one button each after the countdown); leave it empty for official-download-only entries and no gate page is built. `about`, `requirements`, `licensing` and `image` (a logo under `public/img/software/`) fill the resource page.

Only list software that is legally free to redistribute. See `/legal`.

## Ads

Paste the network's HTML or script snippet into the matching slot in `src/config/ads.ts`. Empty slots render a placeholder in development and nothing visible in production once filled. Networks that permit countdown placements include Adsterra, Monetag and PropellerAds. Google AdSense does not, so do not use it on the gate.

## Updating content from a Google Sheet

Non-coders can maintain the JSON collections from a spreadsheet. Publish each sheet as CSV, paste the URL into `scripts/sync-sheets.mjs`, then run `npm run sync` before building. Rows with `approved` set to FALSE are skipped.

## Deploying (free)

Live at https://asgi.app. The domain is registered at Name.com (free first year through the GitHub Student Developer Pack, registered 2026-10-21) with DNS on Cloudflare. The site is served by Cloudflare Workers static assets, configured in `wrangler.jsonc`, and built by Workers Builds from the GitHub repository `tcantbenormal/asgi`.

1. Every push to `main` rebuilds and redeploys. Build command `npm run build`, deploy command `npx wrangler deploy`.
2. Custom domain: Worker > Settings > Domains & Routes > add `asgi.app` and `www.asgi.app`. If the domain ever changes, update `site` in `astro.config.mjs` and `public/robots.txt`.
3. Weekly rebuild: `.github/workflows/weekly-rebuild.yml` builds and deploys every Monday so new approved profiles appear and the Supabase project is kept awake. It needs two repository secrets: `CLOUDFARE_API_TOKEN` (template "Edit Cloudflare Workers") and `CLOUDFARE_ACCOUNT_ID` (shown on the Workers & Pages overview page); the names are spelled without the L, matching the repository settings.
4. Supabase > Authentication > URL Configuration: site URL `https://asgi.app`, redirect URLs `https://asgi.app/alumni/join` and `http://localhost:4321/alumni/join`.

## Handover

The GitHub organisation, Cloudflare account, Google account that owns the forms and Drive, domain registrar login, and ad network accounts must all be registered to the society email, with recovery codes stored by the outgoing and incoming president. Update `cabinet.json` at each election.

## Suggestions from visitors

`/submit` (linked as "Suggest a tool", "Submit it", "Post an opportunity", "Add your project") writes to the `submissions` table. Nobody can read it through the API; review rows in the Supabase dashboard under Table editor, then add the item to the right JSON or content file by hand and set `status` to `accepted` or `rejected` for your own bookkeeping.
