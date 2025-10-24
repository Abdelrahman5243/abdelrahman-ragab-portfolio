import { useState, useEffect } from "react";

export default function Sidebar({ headings = [] }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      const headingElements = document.querySelectorAll("h1, h2, h3");

      headingElements.forEach((el) => {
        if (scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.clientHeight) {
          setActiveId(el.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    headings.length > 1 && (
      <aside className="space-y-6">
        <div className="bg-light-secondary dark:bg-dark-secondary 
                        border border-light-border dark:border-dark-border 
                        rounded-2xl p-5 shadow-sm">
          <ul className="space-y-2 text-sm text-light-subtitle dark:text-dark-subtitle">
            {headings.map((h) => (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  className={`block py-1 pl-${(h.level - 1) * 4} text-sm 
                            ${h.level === 1 ? 'text-lg font-semibold' : 'text-base'} 
                            hover:text-light-blue dark:hover:text-dark-blue 
                            hover:bg-light-hover dark:hover:bg-dark-hover
                            ${h.level === 1 ? 'border-b-2 border-light-border dark:border-dark-border' : ''}
                            ${activeId === h.id ? 'text-light-blue dark:text-dark-blue' : ''}`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    )
  );
}
