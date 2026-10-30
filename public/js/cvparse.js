// Reads a CV (PDF or Word) in the browser and guesses profile fields from the text.
// Nothing is uploaded. Heuristics only: the member reviews every field before saving.

const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.min.mjs';
const PDFJS_WORKER = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.min.mjs';
const MAMMOTH = 'https://cdn.jsdelivr.net/npm/mammoth@1.9.0/mammoth.browser.min.js';

export async function cvText(file) {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf') || file.type === 'application/pdf') {
    const pdfjs = await import(PDFJS);
    pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
    const doc = await pdfjs.getDocument({ data: await file.arrayBuffer() }).promise;
    const lines = [];
    for (let p = 1; p <= doc.numPages; p++) {
      const items = (await (await doc.getPage(p)).getTextContent()).items;
      // Group glyph runs by their baseline so each visual line becomes one string.
      let y = null, cur = [];
      for (const it of items) {
        const ty = Math.round(it.transform[5]);
        if (y !== null && Math.abs(ty - y) > 2) { lines.push(cur.join(' ')); cur = []; }
        y = ty; if (it.str.trim()) cur.push(it.str.trim());
      }
      if (cur.length) lines.push(cur.join(' '));
    }
    return lines.join('\n');
  }
  if (name.endsWith('.docx')) {
    if (!window.mammoth) await new Promise((ok, no) => { const s = document.createElement('script'); s.src = MAMMOTH; s.onload = ok; s.onerror = () => no(new Error('Could not load the Word reader')); document.head.appendChild(s); });
    return (await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() })).value;
  }
  throw new Error('Choose a PDF or a Word .docx file');
}

const SKILLS = ['QGIS', 'ArcGIS Pro', 'ArcGIS Online', 'ArcGIS Enterprise', 'ArcMap', 'ArcGIS', 'Google Earth Engine', 'Earth Engine', 'Python', 'R', 'PostGIS', 'PostgreSQL', 'SQL', 'ENVI', 'ERDAS IMAGINE', 'ERDAS', 'SNAP', 'GRASS GIS', 'SAGA GIS', 'Remote Sensing', 'GIS', 'Photogrammetry', 'LiDAR', 'Pix4D', 'Agisoft Metashape', 'Metashape', 'DroneDeploy', 'UAV', 'Drone mapping', 'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'scikit-learn', 'GDAL', 'GeoPandas', 'Rasterio', 'Leaflet', 'Mapbox', 'OpenLayers', 'Web GIS', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Cartography', 'Spatial Analysis', 'Geostatistics', 'SAR', 'InSAR', 'Sentinel-1', 'Sentinel-2', 'Landsat', 'MODIS', 'Hydrology', 'SWAT', 'HEC-RAS', 'HEC-HMS', 'AutoCAD', 'Civil 3D', 'Surveying', 'GNSS', 'GPS', 'Total Station', 'Excel', 'Power BI', 'Tableau', 'MATLAB', 'C++', 'Java', 'Docker', 'Git', 'FME', 'Global Mapper', 'SPSS', 'AHP', 'Land use', 'Urban planning', 'Climate', 'Flood mapping', 'Crop mapping', 'Image classification', 'Change detection', 'Object-based image analysis', 'OBIA', 'eCognition', 'Survey123', 'Field Maps', 'QField', 'KoboToolbox', 'OpenStreetMap', 'WebODM'];

const HEAD = /^(education|academic (background|qualifications?)|qualifications?|(work |professional |relevant )?experience|employment( history)?|career( history)?|(technical |core |key |software )?skills|competencies|tools|projects?|publications?|research|(professional |personal |career |executive )?(summary|profile)|objective|about me|certifications?|courses?|training|awards?|honou?rs|languages?|references?|interests|hobbies|contact|personal (details|information))\b/i;
const MY = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?,?\s+((?:19|20)\d{2})\b/gi;
const sectionOf = (h) => {
  const s = h.toLowerCase();
  if (/education|academic|qualification/.test(s)) return 'education';
  if (/experience|employment|career/.test(s)) return 'experience';
  if (/skill|competenc|tools|software/.test(s)) return 'skills';
  if (/summary|profile|objective|about/.test(s)) return 'summary';
  if (/project/.test(s)) return 'projects';
  if (/publication|research/.test(s)) return 'publications';
  return 'other';
};
const YEAR = /\b(19|20)\d{2}\b/g;
const RANGE = /\b((?:19|20)\d{2})(?:[-–—/ ]+(?:\d{1,2}[-–—/ ]+)?)?\s*(?:-|–|—|to|till|until)\s*((?:19|20)\d{2}|present|current|now|ongoing|date)\b/i;
const MONTHS = { jan: '01', feb: '02', mar: '03', apr: '04', may: '05', jun: '06', jul: '07', aug: '08', sep: '09', oct: '10', nov: '11', dec: '12' };
const monthYear = (s) => { const m = s.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+((?:19|20)\d{2})\b/i); return m ? `${m[2]}-${MONTHS[m[1].slice(0, 3).toLowerCase()]}` : null; };
const DEGREE = /\b(ph\.?d|doctor(ate)?|m\.?phil|m\.?s\.?c?|m\.?sc|master'?s?|b\.?s\.?c?|b\.?sc|bachelor'?s?|b\.?e\.?|m\.?e\.?|m\.?a\.?|b\.?a\.?|mba|intermediate|f\.?sc|a[- ]levels?|matric|o[- ]levels?)\b/i;
const INSTITUTION = /\b(universit|college|institute|school|academy|polytechnic|campus)/i;
const ORG_SPLIT = /\s+(?:at|@|\||–|—|-|,)\s+/;

export function parseCv(text) {
  const lines = text.split(/\r?\n/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
  const out = { education: [], experience: [], skills: [], links: {} };
  const whole = lines.join('\n');

  const email = whole.match(/[\w.+-]+@[\w-]+\.[\w.-]+/); if (email) out.email = email[0];
  const li = whole.match(/linkedin\.com\/in\/[\w%-]+/i); if (li) out.links.linkedin = `https://www.${li[0].replace(/^www\./i, '')}`;
  const gh = whole.match(/github\.com\/[\w-]+/i); if (gh) out.links.github = `https://${gh[0]}`;
  const orcid = whole.match(/\b\d{4}-\d{4}-\d{4}-\d{3}[\dX]\b/); if (orcid) out.orcid = orcid[0];
  const site = whole.match(/https?:\/\/(?!(?:www\.)?(?:linkedin|github|orcid)\.)[\w.-]+\.[a-z]{2,}[^\s)]*/i); if (site) out.links.portfolio = site[0];

  // Name: the first short line without digits, @ or a heading word.
  const first = lines.slice(0, 6).find((l) => /^[A-Z][A-Za-z.'’-]+(?: [A-Z][A-Za-z.'’-]+){1,4}$/.test(l) && !HEAD.test(l));
  if (first) out.name = first;

  // Sections
  let sec = 'top'; const secs = { top: [] };
  for (const l of lines) {
    if (l.length < 40 && HEAD.test(l) && !/[.:,]\s*\S+\s+\S+/.test(l.replace(HEAD, ''))) { sec = sectionOf(l); secs[sec] ??= []; continue; }
    (secs[sec] ??= []).push(l);
  }

  if (secs.summary?.length) out.bio = secs.summary.join(' ').slice(0, 600);

  // Education: an entry per line that names a degree or an institution; years from the same or next line.
  for (const src of [secs.education ?? []]) {
    let cur = null;
    for (const l of src) {
      const isDeg = DEGREE.test(l), isInst = INSTITUTION.test(l);
      // A new entry starts at a degree line, or at an institution line when the current entry already has one.
      if ((isDeg && (!cur || cur.degree)) || (isInst && (!cur || cur.institution))) { if (cur) out.education.push(cur); cur = { institution: '', degree: '', program: '', start: '', end: '' }; }
      if (!cur) continue;
      if (isInst && !cur.institution) cur.institution = l.replace(RANGE, '').replace(YEAR, '').replace(/[|,–—-]\s*$/, '').trim();
      // A short plain line right after the degree is the institution even without "university" in it (PMAS AAUR).
      else if (!isDeg && !isInst && !cur.institution && cur.degree && !RANGE.test(l) && !YEAR.test(l) && l.length < 70) { cur.institution = l.trim(); YEAR.lastIndex = 0; continue; }
      YEAR.lastIndex = 0;
      if (isDeg && !cur.degree) {
        const m = l.match(DEGREE); const up = m[0].replace(/\./g, '').toUpperCase().replace("'S", '');
        cur.degree = { BACHELOR: 'BS', MASTER: 'MS', PHD: 'PhD', DOCTOR: 'PhD', DOCTORATE: 'PhD', MPHIL: 'MPhil', BSC: 'BSc', MSC: 'MSc', INTERMEDIATE: 'Intermediate', MATRIC: 'Matric', FSC: 'FSc' }[up] || up;
        const prog = l.slice(m.index + m[0].length).replace(/^[\s:,(in)]+/i, '').replace(RANGE, '').replace(YEAR, '').replace(INSTITUTION.source, '').split(/[|,(]| at | from /)[0].trim();
        if (prog && !/universit|college|institute/i.test(prog)) cur.program = prog;
      }
      const r = l.match(RANGE); const ys = l.match(YEAR) || [];
      if (r) { cur.start ||= r[1]; cur.end ||= /^\d/.test(r[2]) ? r[2] : 'present'; }
      else if (ys.length && !cur.end) { cur.end = ys.at(-1); if (ys.length > 1) cur.start ||= ys[0]; }
    }
    if (cur) out.education.push(cur);
  }

  // Experience: each date range starts an entry; title and organisation come from that line and the one before or after.
  const exp = secs.experience ?? [];
  for (let i = 0; i < exp.length; i++) {
    const l = exp[i]; const mys = [...l.matchAll(MY)].map((m) => `${m[2]}-${MONTHS[m[1].slice(0, 3).toLowerCase()]}`); const r = l.match(RANGE);
    if (!mys.length && !r) continue;
    const current = /\b(present|current|now|ongoing|to date|till date)\b/i.test(l);
    const start = mys[0] || r?.[1] || '';
    const end = mys[1] || (r && /^\d/.test(r[2]) ? r[2] : '');
    // Strip the dates, then split "Title | Organisation · City" into its parts.
    const rest = l.replace(MY, '').replace(RANGE, '').replace(/\b(present|current|now|ongoing|to|till|until|date)\b/gi, '').replace(/[\s|()–—-]+$/, '').replace(/^[\s|()–—-]+/, '').trim();
    let title = '', organization = '';
    const near = [rest, exp[i - 1], exp[i + 1]].filter((x) => x && !RANGE.test(x) && !MY.test(x) && x.length < 120);
    MY.lastIndex = 0;
    const combined = near[0] || '';
    const parts = combined.split(ORG_SPLIT).map((x) => x.trim()).filter(Boolean);
    if (parts.length >= 2) { title = parts[0]; organization = parts.slice(1).join(', '); }
    else { title = combined; organization = near[1] || ''; if (organization && INSTITUTION.test(title) && !INSTITUTION.test(organization)) [title, organization] = [organization, title]; }
    organization = organization.split(/\s+[·•]\s+/)[0].trim(); // drop "· City, Country"
    if (!title) continue;
    const description = exp.slice(i + 1, i + 4).find((x) => x.length > 40 && !RANGE.test(x) && !MY.test(x) && x !== organization) || '';
    MY.lastIndex = 0;
    out.experience.push({ title: title.slice(0, 120), organization: organization.slice(0, 120), start, end: current ? '' : end, current, description: description.slice(0, 200) });
  }

  // Skills: dictionary matches anywhere, plus the items of the skills section.
  const found = new Set();
  for (const s of SKILLS) if (new RegExp(`(^|[^A-Za-z])${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^A-Za-z]|$)`, 'i').test(whole)) found.add(s);
  for (const l of secs.skills ?? []) for (const x of l.split(/[,•|;·]|\s{2,}/)) { const t = x.replace(/^[-–•*\s]+|[:.\s]+$/g, '').trim(); if (t.length > 1 && t.length < 32 && !/^(skills?|tools?|software|languages?)$/i.test(t)) found.add(t); }
  // Case-insensitive dedupe; drop a skill that appears as whole words inside a longer one (ArcGIS inside ArcGIS Pro).
  const uniq = []; for (const s of found) if (!uniq.some((u) => u.toLowerCase() === s.toLowerCase())) uniq.push(s);
  const inside = (s, o) => s.length >= 3 && o.length > s.length && new RegExp(`(^|\\s)${s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`, 'i').test(o);
  out.skills = uniq.filter((s) => !uniq.some((o) => SKILLS.includes(o) && inside(s, o))).slice(0, 40);

  const tidy = (s) => { s = s.replace(/[()[\]]+/g, '').replace(/\s+/g, ' ').trim(); return s.length > 3 && s === s.toUpperCase() ? s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bGis\b/g, 'GIS').replace(/\bAnd\b/g, 'and').replace(/\bOf\b/g, 'of') : s; };
  for (const e of out.education) { e.program = tidy(e.program); e.institution = tidy(e.institution); }
  for (const e of out.experience) { e.title = tidy(e.title); e.organization = tidy(e.organization); }
  out.education = out.education.filter((e) => e.institution || e.degree).slice(0, 8);
  out.experience = out.experience.slice(0, 10);
  const cur = out.experience.find((e) => e.current) || out.experience[0];
  if (cur) { out.role = cur.title; out.organization = cur.organization; }
  return out;
}
