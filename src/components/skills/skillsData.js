// Simple Icons CDN slugs (https://simpleicons.org) — stable, official brand
// marks, referenced by URL so no icon-pack dependency is added to the bundle.
const ICON = (slug) => `https://cdn.simpleicons.org/${slug}`;

// `weight: "primary"` tiles render larger — these are the skills that actually
// carry the résumé (core languages + framework stack); everything else is
// real but secondary, so it shouldn't compete for the same visual weight.
export const techSkills = [
  { name: "JavaScript", icon: ICON("javascript/F7DF1E"), weight: "primary" },
  { name: "React", icon: ICON("react/61DAFB"), weight: "primary" },
  { name: "Next.js", icon: ICON("nextdotjs"), weight: "primary" },
  { name: "Magento", icon: ICON("magento/EE672F"), weight: "primary" },
  { name: "Redux", icon: ICON("redux/764ABC") },
  { name: "Zustand", icon: ICON("react/61DAFB") },
  { name: "HTML5", icon: ICON("html5/E34F26") },
  { name: "CSS3", icon: ICON("css3/1572B6") },
  { name: "Tailwind CSS", icon: ICON("tailwindcss/06B6D4") },
  { name: "Bootstrap", icon: ICON("bootstrap/7952B3") },
  { name: "Framer Motion", icon: ICON("framer/0055FF") },
  { name: "GraphQL", icon: ICON("graphql/E10098") },
  { name: "Apollo GraphQL", icon: ICON("apollographql/311C87") },
  { name: "Axios", icon: ICON("axios/5A29E4") },
  { name: "React Router", icon: ICON("reactrouter/CA4245") },
  { name: "i18next", icon: ICON("i18next/26A69A") },
  { name: "Recharts", icon: ICON("react/61DAFB") },
  { name: "Google Tag Manager", icon: ICON("googletagmanager/246FDB") },
  { name: "Vite", icon: ICON("vite/646CFF") },
  { name: "Git", icon: ICON("git/F05032") },
  { name: "GitHub", icon: ICON("github") },
  { name: "Figma", icon: ICON("figma/F24E1E") },
];

export const softSkills = [
  { name: "Responsive Design", nameAr: "تصميم متجاوب" },
  { name: "Problem-Solving", nameAr: "حل المشكلات" },
  { name: "Agile Methodologies", nameAr: "منهجيات Agile" },
  { name: "Collaboration", nameAr: "العمل الجماعي" },
];
