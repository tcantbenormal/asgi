import { glob, type Loader } from 'astro/loaders';
import { site } from '../config/site';

/**
 * Loads approved alumni from Supabase at build time. Falls back to the Markdown
 * samples in src/content/alumni when Supabase is unreachable or has no approved rows yet.
 * Entry id = chosen username, else the generated slug. It becomes the public URL: /<id>.
 * ponytail: once real profiles exist, delete the sample .md files and the fallback branch.
 */
// Member-written fields are untrusted. Bios go through the Markdown renderer, which passes raw HTML
// through, so every '<' is escaped first (Markdown itself still works). Links are kept only when they
// are http(s); anything else, such as a javascript: URL, is dropped rather than failing the build.
const noHtml = (s: string) => s.replace(/</g, '&lt;');
const httpOnly = (u: unknown) => (typeof u === 'string' && /^https?:\/\/\S+$/i.test(u.trim()) ? u.trim() : '');
const safeRows = (rows: unknown) => (Array.isArray(rows) ? rows : []).map((r) => {
  const o: Record<string, unknown> = { ...(r as object) };
  for (const k of ['url', 'repo']) if (k in o) { const v = httpOnly(o[k]); if (v) o[k] = v; else delete o[k]; }
  return o;
});

export function alumniLoader(): Loader {
  const fallback = glob({ pattern: '**/*.md', base: './src/content/alumni' });
  return {
    name: 'alumni-supabase',
    async load(ctx) {
      const { url, key } = site.supabase;
      let rows: any[] = [];
      try {
        const res = await fetch(`${url}/rest/v1/profiles?approved=eq.true&order=batch.desc,name.asc`, {
          headers: { apikey: key, Authorization: `Bearer ${key}` },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
        rows = await res.json();
      } catch (e) {
        ctx.logger.warn(`Supabase unavailable, using Markdown samples. ${e}`);
        return fallback.load(ctx);
      }
      if (rows.length === 0) {
        ctx.logger.warn('No approved profiles in Supabase yet, using Markdown samples.');
        return fallback.load(ctx);
      }
      ctx.store.clear();
      for (const r of rows) {
        const id = r.username || r.slug;
        const body = noHtml(r.bio ?? '');
        const data = await ctx.parseData({
          id,
          data: {
            name: r.name, batch: r.batch, degree: r.degree, role: r.role, organization: r.organization,
            sector: r.sector, city: r.city, country: r.country, province: r.province ?? undefined, lat: r.lat, lng: r.lng,
            linkedin: httpOnly(r.linkedin), github: httpOnly(r.github), portfolio: httpOnly(r.portfolio), orcid: r.orcid ?? undefined,
            cv: httpOnly(r.cv_url), email: r.email_public ?? undefined, photo: httpOnly(r.photo_url) || undefined,
            mentor: r.mentor, open_to: r.open_to ?? [], joined: r.created_at ?? undefined, updated: r.updated_at ?? undefined, featured: r.featured, skills: r.skills ?? [], advice: r.advice ?? undefined,
            publications: safeRows(r.publications), education: safeRows(r.education), experience: safeRows(r.experience), projects: safeRows(r.projects),
          },
        });
        ctx.store.set({ id, data, body, rendered: await ctx.renderMarkdown(body) });
      }
      ctx.logger.info(`Loaded ${rows.length} alumni from Supabase`);
    },
  };
}
