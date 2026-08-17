import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Hero from "../components/hero/Hero";
import SEO from "../components/SEO";

// Keep below-the-fold code and network requests out of the initial mobile
// render. The import starts only when a section is close to the viewport.
const Skills = lazy(() => import("../components/skills/Skills"));
const Experience = lazy(() => import("../components/Experience"));
const Education = lazy(() => import("../components/Education"));
const Projects = lazy(() => import("../components/projects/Projects"));
const ArticleSection = lazy(() => import("../components/Article/ArticleSection"));
const Contact = lazy(() => import("../components/contact/Contact"));

const DeferredSection = ({ children, minHeight = "min-h-[12rem]" }) => {
  const ref = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!ref.current || active) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={ref} className={active ? "" : minHeight}>
      {active ? children : null}
    </div>
  );
};

function MainPage() {
  return (
    <>
      <SEO
        title="Abdelrahman Ragab's Portfolio"
        description="Front-End Developer portfolio — React, Next.js and Magento 2 projects, professional experience and technical articles by Abdelrahman Ragab."
        path="/"
      />
      <Hero />
      <div className="divider"></div>
      <DeferredSection>
        <Suspense fallback={null}>
          <Skills />
        </Suspense>
      </DeferredSection>
      <div className="divider"></div>
      <DeferredSection>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </DeferredSection>
      <div className="divider"></div>
      <Suspense fallback={null}>
        <Projects />
      </Suspense>
      <div className="divider"></div>
      <DeferredSection>
        <Suspense fallback={null}>
          <Education />
        </Suspense>
      </DeferredSection>
      <div className="divider"></div>
      <DeferredSection>
        <ArticleSection showAll={false} />
      </DeferredSection>
      <div className="divider"></div>
      <DeferredSection>
        <Contact />
      </DeferredSection>
    </>
  );
}

export default MainPage;
