import { useState, useEffect } from "react";

// Matches the sticky header's rendered height plus a small margin
// (kept in sync with the `scroll-margin-top: 6rem` rule in index.css).
const HEADER_OFFSET = 96;

export function useActiveHeading() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + HEADER_OFFSET;
      const headingElements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );

      let currentActive = null;
      headingElements.forEach((el) => {
        if (scrollPosition >= el.offsetTop) {
          currentActive = el.id;
        }
      });

      if (currentActive && currentActive !== activeId) {
        setActiveId(currentActive);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [activeId]);

  const smoothScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  };

  return { activeId, smoothScrollTo };
}
