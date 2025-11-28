import { useLayoutEffect, lazy, Suspense } from "react";
import Hero from "../components/hero/Hero";
import Skills from "../components/skills/Skills";
import Education from "../components/Education";

// Lazy load below-the-fold components
const Projects = lazy(() => import("../components/projects/Projects"));
const ArticleSection = lazy(() => import("../components/Article/ArticleSection"));
const Contact = lazy(() => import("../components/contact/Contact"));

const ComponentLoader = () => (
  <div className="w-full h-32 flex justify-center items-center">
    <div className="loader"></div>
  </div>
);

function MainPage() {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Hero />
      <div className="divider"></div>
      <Skills />
      <div className="divider"></div>
      <Education />
      <div className="divider"></div>
      <Suspense fallback={<ComponentLoader />}>
        <Projects />
      </Suspense>
      <div className="divider"></div>
      <Suspense fallback={<ComponentLoader />}>
        <ArticleSection showAll={false} />
      </Suspense>
      <div className="divider"></div>
      <Suspense fallback={<ComponentLoader />}>
        <Contact />
      </Suspense>
    </>
  );
}

export default MainPage;
