// Paste ad-network snippets here. Each value is raw HTML injected as-is.
// Works with Adsterra, Monetag, PropellerAds, A-ADS, or any network that
// permits countdown / interstitial placements. Leave a slot empty to hide it.
//
// Slot sizes used by the layout:
//   sidebar  -> 300x250 or 300x600 (right rail on wide screens)
//   banner   -> 728x90 / responsive (top of download gate, below header)
//   gate     -> 300x250 (inside the countdown box on the download page)
//   footer   -> 728x90 (bottom of every page)
export const ads: Record<'sidebar' | 'banner' | 'gate' | 'footer', string> = {
  sidebar: '',
  banner: '',
  gate: '',
  footer: '',
};
