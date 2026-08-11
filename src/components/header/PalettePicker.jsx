import { useState, useEffect, useRef } from "react";
import { Palette, Check } from "lucide-react";
import { usePalette } from "../../hooks/usePalette";

const PalettePicker = () => {
  const { palette, changePalette, palettes } = usePalette();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="centered header_btn"
        aria-label="Change color palette"
        aria-expanded={open}
      >
        <Palette />
      </button>

      {open && (
        <div
          className="
            absolute end-0 top-12 z-50
            min-w-[240px]
            rounded-3xl border border-light-border/80 dark:border-dark-border
            bg-light-secondary/95 dark:bg-dark-secondary/95 backdrop-blur-xl
            shadow-[0_24px_70px_rgb(15_23_42_/_0.12)]
            p-2.5
            animate-in fade-in slide-in-from-top-2
          "
          role="menu"
        >
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-light-subtitle dark:text-dark-subtitle">
            Theme tone
          </p>
          <ul className="space-y-0.5">
            {palettes.map((p) => {
              const isActive = palette === p.id;
              return (
                <li key={p.id}>
                  <button
                    onClick={() => {
                      changePalette(p.id);
                      setOpen(false);
                    }}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl
                      text-sm font-medium
                      transition-colors duration-150
                      ${isActive
                        ? "bg-light-bgHeader/80 dark:bg-dark-bgHeader text-light-title dark:text-dark-title ring-1 ring-inset ring-black/5 dark:ring-white/5"
                        : "text-light-subtitle dark:text-dark-subtitle hover:bg-light-bgHeader/70 dark:hover:bg-dark-bgHeader hover:text-light-title dark:hover:text-dark-title"
                      }
                    `}
                    role="menuitemradio"
                    aria-checked={isActive}
                  >
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
                        style={{ backgroundColor: p.light }}
                        aria-hidden="true"
                      />
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10 shadow-sm"
                        style={{ backgroundColor: p.dark }}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="flex-1 text-start">{p.name}</span>
                    {isActive && (
                      <Check size={14} className="text-light-blue dark:text-dark-blue" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PalettePicker;
