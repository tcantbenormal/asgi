// Paste ad-network snippets here. Each value is raw HTML injected as-is.
// Works with Adsterra, Monetag, PropellerAds, A-ADS, or any network that
// permits countdown / interstitial placements. Leave a slot empty to hide it.
//
// Slot sizes used by the layout:
//   sidebar  -> 300x250 (right rail on wide screens, once per page)
//   banner   -> 728x90 / responsive (top of download gate, below header)
//   gate     -> 300x250 (inside the countdown box on the download page)
//   footer   -> 728x90 (bottom of every page)
//
// Extra keys:
//   directLink   -> a network "direct link" URL. Opened in a second tab when the
//                   visitor clicks the unlocked Download button on the gate.
//   verification -> raw HTML placed in <head> on every page, for a network's
//                   site-ownership <meta> tag. (An HTML verification file goes in public/ instead.)
export const ads = {
  // Adsterra banner 300x250.
  sidebar: `<script>atOptions = { 'key' : '21c86b4e07e62fa09225ec457b8b46c7', 'format' : 'iframe', 'height' : 250, 'width' : 300, 'params' : {} };</script><script src="https://bauval.org/22/21c86b4e07e62fa09225ec457b8b46c7"></script>`,
  banner: '',
  // Monetag vignette, zone 12102160. Loads only on /download/* pages.
  gate: `<script>(function(s){s.dataset.zone='12102160',s.src='https://n6wxm.com/vignette.min.js'})([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')))</script>`,
  // Adsterra banner 728x90.
  footer: `<script>atOptions = { 'key' : '43e7c4b10471070560c28391d9ecd930', 'format' : 'iframe', 'height' : 90, 'width' : 728, 'params' : {} };</script><script src="https://bauval.org/22/43e7c4b10471070560c28391d9ecd930"></script>`,
  // Monetag direct link, zone 12102163.
  directLink: 'https://uplcm.com/4/12102163',
  verification: '',
};
export type AdSlotName = 'sidebar' | 'banner' | 'gate' | 'footer';
