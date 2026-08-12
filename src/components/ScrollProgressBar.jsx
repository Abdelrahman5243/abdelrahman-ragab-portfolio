import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    if (!desktop.matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      // Transform updates stay on the compositor and don't trigger layout.
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
    };
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return createPortal(
    <div
      ref={barRef}
      className="hidden md:block fixed top-0 left-0 h-1 z-[9999] w-full origin-left scale-x-0 bg-light-blue dark:bg-dark-blue"
      aria-hidden="true"
    />,
    document.body
  );
};

export default ScrollProgressBar;
