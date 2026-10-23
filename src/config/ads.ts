// Paste ad-network snippets here. Each value is raw HTML injected as-is.
// Works with Adsterra, Monetag, PropellerAds, A-ADS, or any network that
// permits countdown / interstitial placements. Leave a slot empty to hide it.
//
// Slot sizes used by the layout:
//   sidebar  -> 300x250 or 300x600 (right rail on wide screens)
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
  sidebar: '',
  banner: '',
  gate: '',
  footer: '',
  directLink: '',
  verification: '',
};
export type AdSlotName = 'sidebar' | 'banner' | 'gate' | 'footer';
