/**
 * SPA page-view tracking for React Router.
 *
 * Fires exactly one `page_view` per unique route — including the very first
 * load — and never twice for the same route.
 *
 * WHY THE DE-DUPE REF IS NEEDED
 * React 18 StrictMode runs effects twice in development. Without the
 * `lastTrackedRef` comparison, every route change would send two page_views in
 * dev but one in prod, which is exactly the kind of discrepancy that makes
 * analytics untrustworthy. Comparing against the last-tracked key makes the
 * second invocation a no-op.
 *
 * Hash-only changes (`#about`, `#contact`) are deliberately NOT counted as page
 * views — this is a single-page portfolio whose nav is anchor-based, so counting
 * them would multiply the page_view count several times per visit. Set
 * `countHashAsPageView: true` if you'd rather treat anchors as pages.
 */

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./events";
import { logDebug } from "./config";

export const usePageViewTracking = ({ countHashAsPageView = false } = {}) => {
  const location = useLocation();
  const lastTrackedRef = useRef(null);
  const previousUrlRef = useRef(null);

  const key = countHashAsPageView
    ? `${location.pathname}${location.search}${location.hash}`
    : `${location.pathname}${location.search}`;

  useEffect(() => {
    // Same route as last time (StrictMode re-run, hash-only change, or a
    // re-render that produced an identical key) → do not send a second hit.
    if (lastTrackedRef.current === key) {
      logDebug("page_view skipped (duplicate route)", key);
      return;
    }

    lastTrackedRef.current = key;

    trackPageView({
      path: key,
      // The previous in-app URL — GA4 gets no referrer on client-side
      // navigation unless we supply it, which would otherwise break path
      // exploration reports.
      referrer: previousUrlRef.current ?? undefined,
    });

    if (typeof window !== "undefined") {
      previousUrlRef.current = window.location.href;
    }
  }, [key]);
};
