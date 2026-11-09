import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { List } from "lucide-react";
import { useSheet } from "../../hooks/useSheet";

// Half height first, full height when dragged (or scrolled) up.
const SNAP_POINTS = [0.5, 1];
// The page is scroll-locked while the sheet is open, so scrolling to a heading
// waits for Vaul's close animation (0.5s) to finish and release the lock.
// (Vaul's onAnimationEnd only fires when Vaul itself closes the sheet.)
const CLOSE_ANIMATION_MS = 550;
const INDENT = { 1: "ps-4", 2: "ps-4", 3: "ps-8" };

// Tracks how much of the list is visible so a custom scroll indicator can show
// there is more below. A native scrollbar can't do this: mobile browsers hide it,
// and at half height the rest of the list is below the screen edge rather than
// overflowing, so only the on-screen part counts as "visible".
function useScrollIndicator(ref, active) {
  const [state, setState] = useState(null);
  const last = useRef("");

  useEffect(() => {
    if (!active) {
      last.current = "";
      setState(null);
      return undefined;
    }
    let frame;
    // Runs every frame while open, so it follows drags, snaps and scrolling.
    const tick = () => {
      const el = ref.current;
      if (el) {
        const total = el.scrollHeight;
        const visible = Math.min(
          el.clientHeight,
          window.innerHeight - el.getBoundingClientRect().top
        );
        const next =
          visible > 0 && total > visible + 1
            ? {
                visible: Math.round(visible),
                thumbTop: Math.round((el.scrollTop / total) * visible),
                thumbHeight: Math.max(24, Math.round((visible / total) * visible)),
                more: el.scrollTop + visible < total - 4,
              }
            : null;
        const key = JSON.stringify(next);
        if (key !== last.current) {
          last.current = key;
          setState(next);
        }
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [ref, active]);

  return state;
}

// Mobile table of contents as a bottom sheet with snap points.
export default function TocSheet({ headings, activeId, smoothScrollTo }) {
  const [open, setOpen] = useSheet("article-toc");
  const [snap, setSnap] = useState(SNAP_POINTS[0]);
  const navRef = useRef(null);
  const indicator = useScrollIndicator(navRef, open);

  if (headings.length <= 1) return null;

  return (
    <Drawer.Root
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (next) setSnap(SNAP_POINTS[0]);
      }}
      snapPoints={SNAP_POINTS}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
      fadeFromIndex={0}
    >
      <Drawer.Trigger className="lg:hidden fixed bottom-6 start-6 z-40 flex items-center gap-2 rounded-full py-2.5 px-4 text-sm font-medium shadow-lg bg-light-title dark:bg-dark-title text-light-primary dark:text-dark-primary">
        <List size={18} aria-hidden="true" />
        Contents
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40" />
        <Drawer.Content
          className="fixed inset-x-0 bottom-0 z-[61] flex flex-col h-full max-h-[96%] rounded-t-3xl outline-none
                     border-t border-light-border dark:border-dark-border
                     bg-light-secondary dark:bg-dark-secondary"
        >
          <Drawer.Handle className="mt-3 mb-2 !w-10 !h-1.5 !bg-light-border dark:!bg-dark-border" />
          <div className="flex items-baseline justify-between px-6 pt-2 pb-3">
            <Drawer.Title className="text-base font-semibold text-light-title dark:text-dark-title">
              Contents
            </Drawer.Title>
            <span className="text-sm text-light-subtitle dark:text-dark-subtitle">
              {headings.length} sections
            </span>
          </div>
          <Drawer.Description className="sr-only">
            Jump to a section of the article
          </Drawer.Description>

          {/* Scrolling is locked at half height, so the first drag up grows the sheet.
              Vaul only reacts to touch/pointer drags, so the mouse wheel and trackpad
              get the same behaviour here: scroll down at half height to expand,
              scroll up from the top of the list to shrink back. */}
          <div className="relative flex-1 min-h-0">
            <nav
              ref={navRef}
              aria-label="Article sections"
              onWheel={(e) => {
                if (snap !== 1 && e.deltaY > 0) setSnap(1);
                else if (snap === 1 && e.deltaY < 0 && e.currentTarget.scrollTop <= 0) {
                  setSnap(SNAP_POINTS[0]);
                }
              }}
              className={`h-full ps-3 pe-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                snap === 1 ? "overflow-y-auto" : "overflow-hidden"
              }`}
            >
              <ul className="flex flex-col gap-0.5">
                {headings.map((heading) => {
                  const active = heading.id === activeId;
                  return (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(false);
                          setTimeout(() => smoothScrollTo(heading.id), CLOSE_ANIMATION_MS);
                        }}
                        aria-current={active ? "location" : undefined}
                        className={`block rounded-xl py-3 pe-4 ${INDENT[heading.level] || "ps-10"} ${
                          heading.level === 1 ? "font-semibold" : ""
                        } ${
                          active
                            ? "bg-light-primary dark:bg-dark-primary text-light-blue dark:text-dark-blue"
                            : "text-light-title dark:text-dark-title active:bg-light-primary dark:active:bg-dark-primary"
                        }`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {indicator && (
              <>
                {/* Fade at the bottom of the visible part: the list continues below */}
                {indicator.more && (
                  <div
                    className="pointer-events-none absolute inset-x-0 h-14 bg-gradient-to-b from-transparent to-light-secondary dark:to-dark-secondary"
                    style={{ top: indicator.visible - 56 }}
                    aria-hidden="true"
                  />
                )}
                {/* Scroll indicator: track = visible area, thumb = position in the list */}
                <div
                  className="pointer-events-none absolute end-1.5 top-0 w-1 rounded-full bg-light-border dark:bg-dark-border"
                  style={{ height: indicator.visible - 8 }}
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-x-0 rounded-full bg-light-subtitle dark:bg-dark-subtitle transition-[top] duration-75"
                    style={{ top: indicator.thumbTop, height: indicator.thumbHeight - 8 }}
                  />
                </div>
              </>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
