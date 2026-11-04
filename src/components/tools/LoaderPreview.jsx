import { useEffect, useRef } from "react";

// A loader copied from Quirky Loaders (https://quirky-loaders.vercel.app).
// Inlined so it inherits the theme colour through currentColor; an <img> would render it black.
// SMIL runs on the main thread and keeps ticking off screen, so the preview
// only animates while it is visible. One loader keeps the cost low.
const LOADERS = [
  {
    slug: "score-gauge",
    name: "Score gauge",
    body: '<path d="M16,72 A34,34 0 0 1 84,72" fill="none" stroke="currentColor" stroke-opacity=".2" stroke-width="6" stroke-linecap="round"/><g stroke="currentColor" stroke-opacity=".4" stroke-width="2" stroke-linecap="round"><line x1="50" y1="26" x2="50" y2="30" transform="rotate(-90 50 72)"/><line x1="50" y1="26" x2="50" y2="30" transform="rotate(-45 50 72)"/><line x1="50" y1="26" x2="50" y2="30" transform="rotate(0 50 72)"/><line x1="50" y1="26" x2="50" y2="30" transform="rotate(45 50 72)"/><line x1="50" y1="26" x2="50" y2="30" transform="rotate(90 50 72)"/></g><line x1="50" y1="72" x2="50" y2="42" stroke="currentColor" stroke-width="3" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" values="-90 50 72;80 50 72;36 50 72;68 50 72;46 50 72;62 50 72;51 50 72;57 50 72;55 50 72;55 50 72;-90 50 72" keyTimes="0;.28;.38;.47;.55;.62;.68;.73;.78;.9;1" dur="3.6s" repeatCount="indefinite" calcMode="spline" keySplines=".25 0 .35 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1;.37 0 .63 1;0 0 1 1;.45 0 .55 1"/></line><circle cx="50" cy="72" r="5"/>',
  },
];

// A mid-animation frame, so the still version (reduced motion) is not blank.
const STILL_AT_SECONDS = 1.2;

const useAnimateWhileVisible = () => {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return undefined;
    const svgs = [...root.querySelectorAll("svg")];
    const setRunning = (running) =>
      svgs.forEach((svg) => (running ? svg.unpauseAnimations() : svg.pauseAnimations()));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      svgs.forEach((svg) => svg.setCurrentTime(STILL_AT_SECONDS));
      setRunning(false);
      return undefined;
    }

    let inView = false;
    const update = () => setRunning(inView && !document.hidden);
    setRunning(false);

    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return ref;
};

const LoaderPreview = () => {
  const ref = useAnimateWhileVisible();

  return (
    <div ref={ref} dir="ltr" className="flex gap-4 text-light-blue dark:text-dark-blue">
      {LOADERS.map(({ slug, name, body }) => (
        <svg
          key={slug}
          viewBox="0 0 100 100"
          className="w-24 h-24"
          fill="currentColor"
          role="img"
          aria-label={name}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      ))}
    </div>
  );
};

export default LoaderPreview;
