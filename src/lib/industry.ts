import type { CollectionEntry } from 'astro:content';

type Alumnus = CollectionEntry<'alumni'>;
type Employer = CollectionEntry<'employers'>;
type Link = CollectionEntry<'links'>;

export const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const initials = (n: string) => n.split(/\s+/).filter((w) => /^[A-Z]/.test(w)).slice(0, 2).map((w) => w[0]).join('') || n.slice(0, 2).toUpperCase();

/** Approved profiles grouped by the organisation they typed. Students and freelancers have no employer to list. */
export function groupAlumniByOrg(alumni: Alumnus[]) {
  const byOrg = new Map<string, { key: string; name: string; people: Alumnus[] }>();
  for (const a of alumni) {
    const org = a.data.organization?.trim();
    if (!org || a.data.sector === 'Student' || a.data.sector === 'Freelance') continue;
    const key = norm(org);
    if (!byOrg.has(key)) byOrg.set(key, { key, name: org, people: [] });
    byOrg.get(key)!.people.push(a);
  }
  return byOrg;
}

const wordIn = (needle: string, hay: string) => needle === hay || ` ${hay} `.includes(` ${needle} `);
const namesOf = (e: Employer) => [e.data.name, ...e.data.aliases].map(norm).filter((n) => n.length > 2);
export const orgMatches = (e: Employer, org: string) => { const k = norm(org); return k.length > 1 && namesOf(e).some((n) => wordIn(n, k) || wordIn(k, n)); };

/** Match typed organisations to curated employers by name or alias: equal, or one contains the other as whole words. */
export function matchEmployers(employers: Employer[], byOrg: ReturnType<typeof groupAlumniByOrg>) {
  const people = new Map<string, Alumnus[]>();
  const employerForOrg = new Map<string, Employer>();
  const matchedOrgs = new Set<string>();
  for (const e of employers) {
    for (const o of byOrg.values()) {
      if (employerForOrg.has(o.key)) continue;
      if (orgMatches(e, o.name)) {
        people.set(e.id, [...(people.get(e.id) ?? []), ...o.people]);
        employerForOrg.set(o.key, e); matchedOrgs.add(o.key);
      }
    }
  }
  return { people, matchedOrgs, employerForOrg };
}

/** People whose experience history names the employer but who work elsewhere now, with the years. */
export function pastEmployeesFor(e: Employer, alumni: Alumnus[], current: Alumnus[]) {
  const now = new Set(current.map((a) => a.id));
  const out: { a: Alumnus; title: string; start?: string; end?: string }[] = [];
  for (const a of alumni) {
    if (now.has(a.id)) continue;
    const x = a.data.experience.find((x) => x.organization && orgMatches(e, x.organization));
    if (x) out.push({ a, title: x.title, start: x.start, end: x.end });
  }
  return out.sort((p, q) => (q.end || '9999').localeCompare(p.end || '9999'));
}

/** Job listings for an employer: an explicit `employer` id on the listing, else a provider name that matches. Closed listings are dropped. */
export function openingsFor(e: Employer, jobs: Link[], today = new Date().toISOString().slice(0, 10)) {
  const names = [e.data.name, ...e.data.aliases].map(norm);
  return jobs.filter((j) => (!j.data.closes || j.data.closes >= today) && (j.data.employer === e.id || (!j.data.employer && names.includes(norm(j.data.provider)))));
}

/** Employers sharing the most tags, for the "related" strip on a page. */
export function relatedEmployers(e: Employer, all: Employer[], n = 4) {
  const tags = new Set(e.data.tags);
  return all.filter((o) => o.id !== e.id).map((o) => ({ o, s: o.data.tags.filter((t) => tags.has(t)).length + (o.data.sector === e.data.sector ? 0.5 : 0) }))
    .filter((x) => x.s > 0).sort((a, b) => b.s - a.s).slice(0, n).map((x) => x.o);
}

/** Province for a Pakistani city, so the list can be filtered by province. Anything else is "Abroad". */
const CITY_PROVINCE: Record<string, string> = {
  islamabad: 'Islamabad', rawalpindi: 'Punjab', lahore: 'Punjab', faisalabad: 'Punjab', multan: 'Punjab', gujranwala: 'Punjab', sialkot: 'Punjab', bahawalpur: 'Punjab', sargodha: 'Punjab', tarbela: 'KP', mangla: 'AJK', dasu: 'KP', mohmand: 'KP',
  karachi: 'Sindh', hyderabad: 'Sindh', sukkur: 'Sindh', peshawar: 'KP', abbottabad: 'KP', mardan: 'KP', quetta: 'Balochistan', gwadar: 'Balochistan', gilgit: 'Gilgit-Baltistan', skardu: 'Gilgit-Baltistan', muzaffarabad: 'AJK', 'diamer bhasha': 'Gilgit-Baltistan',
};
export function provincesOf(e: Employer) {
  const out = new Set<string>();
  for (const loc of [e.data.hq, ...e.data.locations]) {
    const k = loc.toLowerCase().replace(/\(.*?\)/g, '').trim();
    const hit = Object.keys(CITY_PROVINCE).find((c) => k.startsWith(c) || k.includes(` ${c}`) || k === c);
    if (hit) out.add(CITY_PROVINCE[hit]);
    else if (/across punjab|punjab/.test(k)) out.add('Punjab');
    else if (/sindh/.test(k)) out.add('Sindh');
    else if (/khyber|kp\b/.test(k)) out.add('KP');
    else if (/balochistan/.test(k)) out.add('Balochistan');
    else if (/nationwide|provincial|district|regional|every tehsil|field/.test(k)) out.add('Nationwide');
  }
  if (out.size === 0 || /gulf|riyadh|dubai|doha|abu dhabi|beirut|houston|redlands|amsterdam|san francisco|kathmandu|colombo|geneva|washington|paris|london/i.test(`${e.data.hq} ${e.data.locations.join(' ')}`) && ![...out].some((p) => p !== 'Nationwide')) out.add('Abroad');
  return [...out];
}
