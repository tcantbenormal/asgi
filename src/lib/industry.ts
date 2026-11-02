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

/** Match typed organisations to curated employers by name or alias: equal, or one contains the other as whole words. */
export function matchEmployers(employers: Employer[], byOrg: ReturnType<typeof groupAlumniByOrg>) {
  const people = new Map<string, Alumnus[]>();
  const employerForOrg = new Map<string, Employer>();
  const matchedOrgs = new Set<string>();
  const wordIn = (needle: string, hay: string) => needle === hay || ` ${hay} `.includes(` ${needle} `);
  for (const e of employers) {
    const names = [e.data.name, ...e.data.aliases].map(norm).filter((n) => n.length > 2);
    for (const o of byOrg.values()) {
      if (employerForOrg.has(o.key)) continue;
      if (names.some((n) => wordIn(n, o.key) || wordIn(o.key, n))) {
        people.set(e.id, [...(people.get(e.id) ?? []), ...o.people]);
        employerForOrg.set(o.key, e); matchedOrgs.add(o.key);
      }
    }
  }
  return { people, matchedOrgs, employerForOrg };
}

/** Job listings for an employer: an explicit `employer` id on the listing, else a provider name that matches. */
export function openingsFor(e: Employer, jobs: Link[]) {
  const names = [e.data.name, ...e.data.aliases].map(norm);
  return jobs.filter((j) => j.data.employer === e.id || (!j.data.employer && names.includes(norm(j.data.provider))));
}
