// Project URLs are language-independent so switching between Arabic and English
// never changes the identity of a project.
export const projectSlugs = {
  1: "zag-web-builder",
  2: "product-analytics-dashboard",
  3: "personal-portfolio",
  4: "quran-recitation-player",
  5: "restaurant-market-store",
  6: "designshub-courses-platform",
  7: "game-hub-website",
  8: "restaurant-landing-page",
  9: "web-developer-showcase",
  10: "almasry-pharmacy",
  11: "spc-online-academy",
  12: "etlala-fashion-marketplace",
};

export const getProjectSlug = (id) => projectSlugs[String(id)] || String(id);
