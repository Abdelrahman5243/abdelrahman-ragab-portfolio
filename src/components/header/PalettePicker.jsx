import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

      <AnimatePresence>
        {open && (
          <motion.div
            className="
              absolute end-0 top-12 z-50
              min-w-[240px]
              rounded-3xl border border-light-border dark:border-dark-border
              palette-popover
              p-2.5
            "
            role="menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-light-subtitle dark:text-dark-subtitle">
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
                      transition-colors duration-200
                      ${isActive
                          ? "bg-light-bgHeader dark:bg-dark-bgHeader text-light-title dark:text-dark-title"
                          : "text-light-subtitle dark:text-dark-subtitle hover:bg-light-bgHeader/70 dark:hover:bg-dark-bgHeader hover:text-light-title dark:hover:text-dark-title"
                        }
                    `}
                      role="menuitemradio"
                      aria-checked={isActive}
                    >
                      <span className="flex items-center gap-1">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
                          style={{ backgroundColor: p.light }}
                          aria-hidden="true"
                        />
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/10 dark:border-white/10"
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PalettePicker;
