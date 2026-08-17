import { lazy, Suspense } from "react";
import SEO from "../components/SEO";

const Experience = lazy(() => import("../components/Experience"));
const Projects = lazy(() => import("../components/projects/Projects"));
const Contact = lazy(() => import("../components/contact/Contact"));

const sections = {
  experience: Experience,
  projects: Projects,
  contact: Contact,
};

const seoBySection = {
  experience: {
    title: "Experience — Abdelrahman Ragab's Portfolio",
    description:
      "Professional experience of Abdelrahman Ragab, a Frontend Developer building React, Next.js, and Magento 2 applications.",
    path: "/experience",
  },
  projects: {
    title: "Projects — Abdelrahman Ragab's Portfolio",
    description:
      "A selection of React, Next.js, and Magento 2 projects built by Abdelrahman Ragab, Frontend Developer.",
    path: "/projects",
  },
  contact: {
    title: "Contact — Abdelrahman Ragab's Portfolio",
    description:
      "Get in touch with Abdelrahman Ragab, Frontend Developer, for work or collaboration.",
    path: "/contact",
  },
};

const SectionLoader = () => (
  <div className="w-full min-h-[60vh] flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

const SectionPage = ({ section }) => {
  const Section = sections[section];

  if (!Section) return null;

  return (
    <>
      <SEO {...seoBySection[section]} />
      <Suspense fallback={<SectionLoader />}>
        <Section />
      </Suspense>
    </>
  );
};

export default SectionPage;
