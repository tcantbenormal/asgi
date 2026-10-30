// Single place for everything a cabinet member may need to change.
export const site = {
  name: 'Arid Society of GIS',
  short: 'ASGI',
  tagline: 'Alumni, careers and resources for GIS students of PMAS-Arid Agriculture University.',
  university: 'PMAS-Arid Agriculture University, Rawalpindi',
  department: 'Institute of Geo-Information & Earth Observation',
  email: 'aridsocietyofgis@gmail.com',
  // Google Forms. Replace with the society's own forms.
  forms: {
    mentorship: 'https://forms.gle/REPLACE_MENTORSHIP_FORM',
    membership: 'https://forms.gle/REPLACE_MEMBERSHIP_FORM',
    submitResource: '/submit', // in-site form writing to the Supabase submissions table (migration 005)
  },
  social: {
    linkedin: 'https://www.linkedin.com/in/institute-of-geoinformation-and-earth-observation-pmas-arid-university-rawalpindi-18ba20426/',
    facebook: '', // the Facebook link sent on 30 Oct 2026 was the LinkedIn URL again; paste the real page here to show it
    instagram: 'https://www.instagram.com/igeoarid/',
    whatsapp: '',
  },
  // Supabase project. The publishable key is designed to be public; row level security does the protecting.
  supabase: {
    url: 'https://tuelxiyqeryqeualsepj.supabase.co',
    key: 'sb_publishable_iU9dwNtMSXOcRljCO6azWQ_V7J7SDgE',
  },
  // CARTO basemap tiles. Swap "voyager" for "light_all" (Positron) for a lighter grey look.
  // Restrict the key to the site's domain in the CARTO dashboard once a domain is connected.
  basemapTiles: 'https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=cb1_4l8y_1_ec349aafebc313c616d23a11',
  // Seconds a visitor waits on the download gate before the link unlocks.
  downloadCountdown: 15,
  // Google OAuth web client ID, the same one entered in Supabase. When set, the join page renders
  // Google's own sign-in button so the consent screen names asgi.app instead of the Supabase URL.
  // Leave empty to fall back to the Supabase redirect flow.
  googleClientId: '616278307392-tiv3mri5o2j4qkudnh9faqks2v9q8kuq.apps.googleusercontent.com',
  // Giscus comments (https://giscus.app). Leave repo empty to hide comments.
  giscus: { repo: '', repoId: '', category: 'General', categoryId: '' },
};
