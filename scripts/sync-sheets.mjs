// Pull approved rows from published Google Sheets into src/content/*.json.
// Usage: set the CSV URLs below (File > Share > Publish to web > CSV), then `npm run sync`.
// Each sheet needs the same column headers as the JSON keys, plus an "approved" column (TRUE/FALSE).
// Array fields (os, tags, tools, students) are comma-separated in the sheet.
// ponytail: alumni stay as Markdown files because stories need formatting; sync only the tabular collections.
import { writeFileSync } from 'node:fs';

const SHEETS = {
  // resources: 'https://docs.google.com/spreadsheets/d/e/XXXX/pub?gid=0&single=true&output=csv',
  // links: '',
  // projects: '',
  // events: '',
  // cabinet: '',
};
const ARRAY_FIELDS = new Set(['os', 'tags', 'tools', 'students']);
const NUMBER_FIELDS = new Set(['year', 'lat', 'lng']);

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some((x) => x.trim()));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

function coerce(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    if (k === 'approved') continue;
    if (ARRAY_FIELDS.has(k)) out[k] = v ? v.split(',').map((s) => s.trim()).filter(Boolean) : [];
    else if (NUMBER_FIELDS.has(k)) out[k] = Number(v);
    else if (v !== '') out[k] = v;
  }
  return out;
}

for (const [name, url] of Object.entries(SHEETS)) {
  if (!url) continue;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const rows = parseCsv(await res.text()).filter((r) => /^(true|yes|1)$/i.test(r.approved ?? 'true')).map(coerce);
  writeFileSync(`src/content/${name}.json`, JSON.stringify(rows, null, 2) + '\n');
  console.log(`${name}: ${rows.length} rows`);
}

// Self-check: node scripts/sync-sheets.mjs --test
if (process.argv.includes('--test')) {
  const r = parseCsv('id,name,os,approved\n"a","Q, GIS","Windows, Linux",TRUE\nb,X,,FALSE\n');
  const ok = r.length === 2 && r[0].name === 'Q, GIS' && coerce(r[0]).os.length === 2 && r[1].approved === 'FALSE';
  console.log(ok ? 'csv parser ok' : 'csv parser BROKEN');
  process.exit(ok ? 0 : 1);
}
