import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return createPortal(
    <div
      ref={barRef}
      className="hidden md:block fixed top-0 left-0 h-1 z-[9999] w-0 bg-light-blue dark:bg-dark-blue"
      aria-hidden="true"
    />,
    document.body
  );
};

export default ScrollProgressBar;
