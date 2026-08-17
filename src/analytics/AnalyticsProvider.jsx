/**
 * <AnalyticsProvider /> — mount ONCE at the application root.
 *
 * Responsibilities:
 *   1. Load GTM (and Clarity, and GA4-direct only if there is no GTM) exactly
 *      once, after the app is interactive.
 *   2. Track a page_view on every React Router route change.
 *
 * It renders `children` untouched and adds no DOM wrapper, so dropping it in
 * cannot affect layout or CLS.
 *
 * PLACEMENT: inside <BrowserRouter> (it uses `useLocation`) and above the
 * routes. See src/main.jsx.
 *
 * Loading strategy — the Vite equivalent of Next.js `strategy="afterInteractive"`:
 * the effect runs after the first commit/paint and every injected <script> is
 * `async`, so no analytics request is on the critical rendering path and LCP /
 * INP / CLS are unaffected.
 */

import { useEffect } from "react";
import { initAnalytics } from "./gtm";
import { usePageViewTracking } from "./usePageViewTracking";
import { setClarityTag } from "./events";
import { logDebug } from "./config";

const AnalyticsProvider = ({ children, countHashAsPageView = false }) => {
  useEffect(() => {
    // Analytics is useful after the page is usable, not during the LCP
    // window. Idle scheduling keeps Clarity/GTM off the mobile critical path.
    const start = () => {
      initAnalytics();

      if (typeof document !== "undefined") {
        setClarityTag("lang", document.documentElement.lang || "en");
        setClarityTag("dir", document.documentElement.dir || "ltr");
      }

      logDebug("AnalyticsProvider mounted");
    };
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(start, { timeout: 2500 })
      : window.setTimeout(start, 1500);

    return () => {
      if (window.cancelIdleCallback && window.requestIdleCallback) {
        window.cancelIdleCallback(idle);
      } else {
        window.clearTimeout(idle);
      }
    };
  }, []);

  // One page_view per route change — the single source of page_view events.
  usePageViewTracking({ countHashAsPageView });

  return children ?? null;
};

export default AnalyticsProvider;
