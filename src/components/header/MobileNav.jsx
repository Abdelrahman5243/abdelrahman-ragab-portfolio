import { Drawer } from "vaul";
import { HashLink } from "react-router-hash-link";
import { ChevronRight } from "lucide-react";

// Mobile navigation as a native-feeling bottom sheet (Vaul): drag the sheet
// down or flick it to close, with iOS-style velocity and rubber-banding.
const MobileNav = ({ open, onOpenChange, items, isActive, title }) => (
  <Drawer.Root open={open} onOpenChange={onOpenChange}>
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-[60] bg-black/40" />
      <Drawer.Content
        className="fixed inset-x-0 bottom-0 z-[61] flex flex-col max-h-[85vh] rounded-t-3xl outline-none
                   border-t border-light-border dark:border-dark-border
                   bg-light-secondary dark:bg-dark-secondary
                   pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <Drawer.Handle className="mt-3 mb-2 !w-10 !h-1.5 !bg-light-border dark:!bg-dark-border" />
        <Drawer.Title className="px-6 pt-2 pb-3 text-sm font-medium text-light-subtitle dark:text-dark-subtitle">
          {title}
        </Drawer.Title>
        <Drawer.Description className="sr-only">{title}</Drawer.Description>

        <nav aria-label={title} className="overflow-y-auto px-3">
          <ul className="flex flex-col gap-1">
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <HashLink
                    to={item.href}
                    onClick={() => onOpenChange(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition-colors ${
                      active
                        ? "bg-light-primary dark:bg-dark-primary text-light-blue dark:text-dark-blue"
                        : "text-light-title dark:text-dark-title active:bg-light-primary dark:active:bg-dark-primary"
                    }`}
                  >
                    {item.label}
                    <ChevronRight
                      size={18}
                      className="text-light-subtitle dark:text-dark-subtitle rtl:-scale-x-100"
                      aria-hidden="true"
                    />
                  </HashLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </Drawer.Content>
    </Drawer.Portal>
  </Drawer.Root>
);

export default MobileNav;
