export const REMOVED_ITEMS_IDS = [
  "cover.svg",
  "logo.svg",
  "titlepage.svg",
  "titlepage.xhtml",
  "imprint.xhtml",
  "colophon.xhtml",
  "uncopyright.xhtml",
] as const;

export const REMOVED_ITEM_ID_REFS = [
  "titlepage.xhtml",
  "imprint.xhtml",
  "colophon.xhtml",
  "uncopyright.xhtml",
] as const;

// TODO: Add later
// <item href="css/pdl/titlepage.css" id="pdl-titlepage.css" media-type="text/css"/>
// <item href="css/pdl/public-domain.css" id="pdl-public-domain.css" media-type="text/css"/>
// <item href="text/titlepage.xhtml" id="titlepage.xhtml" media-type="application/xhtml+xml"/>
// <item href="text/public-domain.xhtml" id="public-domain.xhtml" media-type="application/xhtml+xml"/>
// <item href="images/pdl-title.svg" id="pdl-title.svg" media-type="image/svg+xml"/>

export const ADDED_ITEMS = `
  <item href="css/pdl/cover.css" id="pdl-cover.css" media-type="text/css"/>
  <item href="css/pdl/donate.css" id="pdl-donate.css" media-type="text/css"/>
  <item href="css/pdl/acknowledgments.css" id="pdl-acknowledgments.css" media-type="text/css"/>
  <item href="css/pdl/svg.css" id="pdl-svg.css" media-type="text/css"/>
  <item href="images/cover.jpg" id="cover" media-type="image/jpeg" properties="cover-image"/>
  <item href="images/pdl-black-logo.svg" id="pdl-black-logo.svg" media-type="image/svg+xml"/>
  <item href="images/pdl-full-black-logo.svg" id="pdl-full-black-logo.svg" media-type="image/svg+xml"/>
  <item href="images/pdl-orange-logo.svg" id="pdl-orange-logo.svg" media-type="image/svg+xml"/>
  <item href="images/pdl-globe-logo.svg" id="pdl-globe-logo.svg" media-type="image/svg+xml"/>
  <item href="images/pdl-link-logo.svg" id="pdl-link-logo.svg" media-type="image/svg+xml"/>
  <item href="images/pdl-orange-logo-v2.svg" id="pdl-orange-logo-v2.svg" media-type="image/svg+xml"/>
  <item href="text/cover.xhtml" id="cover.xhtml" media-type="application/xhtml+xml"/>
  <item href="text/donate.xhtml" id="donate.xhtml" media-type="application/xhtml+xml"/>
  <item href="text/acknowledgments.xhtml" id="acknowledgments.xhtml" media-type="application/xhtml+xml"/>
  <item href="fonts/LeagueGothic-Regular.ttf" id="LeagueGothic-Regular.ttf" media-type="font/ttf"/>
  <item href="fonts/TASAOrbiterVF.woff2" id="TASAOrbiterVF.woff2" media-type="font/woff2"/>
  <item href="fonts/TASAOrbiterText-Regular.otf" id="TASAOrbiterText-Regular.otf" media-type="font/otf"/>
` as const;

// TODO: Add later
// <itemref idref="titlepage.xhtml"/>
// <itemref idref="public-domain.xhtml"/>

export const ADDED_ITEM_REFS_FRONT = `
  <itemref idref="cover.xhtml"/>
` as const;

export const ADDED_ITEM_REFS_BACK = `
  <itemref idref="donate.xhtml"/>
  <itemref idref="acknowledgments.xhtml"/>
` as const;
