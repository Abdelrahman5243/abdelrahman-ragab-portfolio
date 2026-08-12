import { lazy, Suspense } from "react";

const Experience = lazy(() => import("../components/Experience"));
const Projects = lazy(() => import("../components/projects/Projects"));
const Contact = lazy(() => import("../components/contact/Contact"));

const sections = {
  experience: Experience,
  projects: Projects,
  contact: Contact,
};

const SectionPage = ({ section }) => {
  const Section = sections[section];

  if (!Section) return null;

  return (
    <Suspense fallback={null}>
      <Section />
    </Suspense>
  );
};

export default SectionPage;
