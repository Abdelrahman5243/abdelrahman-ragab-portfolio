import { List, Circle } from "lucide-react";
import { useActiveHeading } from "../../hooks/useActiveHeading";
import "./sidebar.css";

export default function Sidebar({ headings = [] }) {
  const { activeId, smoothScrollTo } = useActiveHeading();

  const getLevelClasses = (level) => {
    const classes = {
      1: {
        container: "level-1-container",
        text: "level-1-text",
        icon: "level-1-icon",
        border: "level-1-border",
        bg: "level-1-bg",
        indicator: "level-1-indicator",
      },
      2: {
        container: "level-2-container",
        text: "level-2-text",
        icon: "level-2-icon",
        border: "level-2-border",
        bg: "level-2-bg",
        indicator: "level-2-indicator",
      },
      3: {
        container: "level-3-container",
        text: "level-3-text",
        icon: "level-3-icon",
        border: "level-3-border",
        bg: "level-3-bg",
        indicator: "level-3-indicator",
      },
      4: {
        container: "level-4-container",
        text: "level-4-text",
        icon: "level-4-icon",
        border: "level-4-border",
        bg: "level-4-bg",
        indicator: "level-4-indicator",
      },
      5: {
        container: "level-5-container",
        text: "level-5-text",
        icon: "level-5-icon",
        border: "level-5-border",
        bg: "level-5-bg",
        indicator: "level-5-indicator",
      },
      6: {
        container: "level-6-container",
        text: "level-6-text",
        icon: "level-6-icon",
        border: "level-6-border",
        bg: "level-6-bg",
        indicator: "level-6-indicator",
      },
    };
    return classes[level] || classes[6];
  };

  if (headings.length <= 1) return null;

  return (
    <aside className="sidebar-container">
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 className="sidebar-title">
            <List className="sidebar-icon" />
            Table of Contents
          </h3>
        </div>

        <nav
          className="sidebar-nav"
          role="navigation"
          aria-label="Article navigation"
          ref={(nav) => {
            if (nav && activeId) {
              const activeElement = nav.querySelector(`[href="#${activeId}"]`);
              if (activeElement) {
                const navRect = nav.getBoundingClientRect();
                const elementRect = activeElement.getBoundingClientRect();
                const scrollTop = nav.scrollTop;
                const elementTop = elementRect.top - navRect.top + scrollTop;
                const elementHeight = elementRect.height;
                const navHeight = navRect.height;

                const targetScrollTop =
                  elementTop - navHeight / 2 + elementHeight / 2;

                nav.scrollTo({
                  top: targetScrollTop,
                  behavior: "smooth",
                });
              }
            }
          }}
        >
          <ul className="sidebar-list">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              const levelClasses = getLevelClasses(heading.level);

              return (
                <li key={heading.id} className="relative">
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScrollTo(heading.id);
                    }}
                    className={`
                      sidebar-item group
                      ${levelClasses.container}
                      ${levelClasses.border}
                      ${levelClasses.bg}
                      ${
                        isActive
                          ? "sidebar-item-active"
                          : "sidebar-item-inactive"
                      }
                    `}
                    aria-current={isActive ? "location" : undefined}
                  >
                    <div className="sidebar-link">
                      <span className={`${levelClasses.text} sidebar-text`}>
                        {heading.text}
                      </span>

                      {isActive && (
                        <Circle
                          className={`${levelClasses.indicator} sidebar-indicator`}
                        />
                      )}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <span className="sidebar-footer-text">
              {headings.length} sections
            </span>
            <div className="sidebar-footer-indicator">
              <div className="sidebar-footer-dot" />
              <span>Reading</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
