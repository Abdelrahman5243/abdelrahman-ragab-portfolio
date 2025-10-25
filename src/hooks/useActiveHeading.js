import { useState, useEffect } from "react";

export function useActiveHeading() {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const headingElements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );

      let currentActive = null;
      headingElements.forEach((el) => {
        if (scrollPosition >= el.offsetTop - 50) {
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
