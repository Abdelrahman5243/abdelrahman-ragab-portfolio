/**
 * GTM / GA4 / Clarity script loaders.
 *
 * Every loader in this file is idempotent: calling it twice is a no-op. Guards
 * are threefold so that React 18 StrictMode double-effects, Fast Refresh module
 * re-evaluation, and any accidental second mount can never double-load a tag:
 *
 *   1. A module-level boolean (survives re-render, resets on full reload).
 *   2. A `window.__analyticsLoaded` flag (survives module re-evaluation
 *      during Vite HMR, where a fresh module instance would reset #1).
 *   3. A DOM check for the injected <script> element (the ultimate truth).
 *
 * Every function is SSR-safe: it returns early when `window`/`document` are
 * undefined, so importing this module on a server never throws.
 */

import {
  GTM_ID,
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  DATA_LAYER_NAME,
  shouldLoadGtm,
  shouldLoadClarity,
  shouldLoadGaDirectly,
  logDebug,
} from "./config";

/** True only in a real browser. Guards every DOM/window touch for SSR safety. */
export const isBrowser = typeof window !== "undefined" && typeof document !== "undefined";

/** Cross-module-instance load flags (HMR-safe). */
const flags = () => {
  if (!isBrowser) return {};
  window.__analyticsLoaded = window.__analyticsLoaded || {};
  return window.__analyticsLoaded;
};

let gtmStarted = false;
let clarityStarted = false;
let gaStarted = false;

/**
 * Ensure `window.dataLayer` exists before anything pushes to it.
 * Safe to call any number of times; never replaces an existing array (doing so
 * would drop events GTM has not yet consumed).
 */
export const ensureDataLayer = () => {
  if (!isBrowser) return [];
  if (!Array.isArray(window[DATA_LAYER_NAME])) {
    window[DATA_LAYER_NAME] = [];
  }
  return window[DATA_LAYER_NAME];
};

/**
 * Push an event onto the dataLayer. This is the ONLY way the app should talk to
 * GTM — keeping it in one place means GTM's container config is the single
 * place tags are defined.
 *
 * Events pushed before the GTM script finishes loading are not lost: GTM
 * replays the whole existing dataLayer array on init.
 */
export const pushToDataLayer = (payload) => {
  if (!isBrowser || !payload) return;
  const layer = ensureDataLayer();
  layer.push(payload);
  logDebug("dataLayer.push", payload);
};

/**
 * Load the GTM container exactly once.
 *
 * Equivalent to Next.js `<Script strategy="afterInteractive">`: it is called
 * from a `useEffect` (i.e. after hydration/first paint) and the injected script
 * is `async`, so it never blocks parsing, rendering, LCP, or INP.
 */
export const initGtm = () => {
  if (!isBrowser || !shouldLoadGtm) return;

  const loaded = flags();
  if (gtmStarted || loaded.gtm) return;
  if (document.getElementById("gtm-script")) {
    gtmStarted = loaded.gtm = true;
    return;
  }

  gtmStarted = loaded.gtm = true;

  // GTM's own `gtm.start` bootstrap event — must be the first push.
  ensureDataLayer();
  pushToDataLayer({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-script";
  script.async = true;
  const dl = DATA_LAYER_NAME !== "dataLayer" ? `&l=${encodeURIComponent(DATA_LAYER_NAME)}` : "";
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(GTM_ID)}${dl}`;
  document.head.appendChild(script);

  logDebug("GTM initialised", GTM_ID);
};

/**
 * Microsoft Clarity — loaded once, async, after interactive.
 * Mirrors Clarity's official snippet but with an idempotency guard added.
 */
export const initClarity = () => {
  if (!isBrowser || !shouldLoadClarity) return;

  const loaded = flags();
  if (clarityStarted || loaded.clarity || window.clarity) return;
  if (document.getElementById("clarity-script")) {
    clarityStarted = loaded.clarity = true;
    return;
  }

  clarityStarted = loaded.clarity = true;

  // Command queue shim so `clarity(...)` calls made before the script arrives
  // are buffered and replayed by Clarity on load.
  window.clarity =
    window.clarity ||
    function (...args) {
      (window.clarity.q = window.clarity.q || []).push(args);
    };

  const script = document.createElement("script");
  script.id = "clarity-script";
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${encodeURIComponent(CLARITY_PROJECT_ID)}`;
  document.head.appendChild(script);

  logDebug("Clarity initialised", CLARITY_PROJECT_ID);
};

/**
 * Direct GA4 (gtag.js) loader — the escape hatch for "GA4 but no GTM".
 *
 * Disabled whenever GTM_ID is set (see `shouldLoadGaDirectly`), because GTM's
 * GA4 Configuration tag already loads gtag.js and sends the initial page_view.
 * Loading both would double every hit.
 *
 * `send_page_view: false` — SPA page views are sent explicitly on route change
 * by `trackPageView()`, so we suppress gtag's automatic initial one and send
 * exactly one page_view per route (including the first).
 */
export const initGaDirect = () => {
  if (!isBrowser || !shouldLoadGaDirectly) return;

  const loaded = flags();
  if (gaStarted || loaded.ga) return;
  if (document.getElementById("ga-script")) {
    gaStarted = loaded.ga = true;
    return;
  }

  gaStarted = loaded.ga = true;

  ensureDataLayer();
  window.gtag =
    window.gtag ||
    function (...args) {
      window[DATA_LAYER_NAME].push(args);
    };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

  const script = document.createElement("script");
  script.id = "ga-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(script);

  logDebug("GA4 initialised directly (no GTM container)", GA_MEASUREMENT_ID);
};

/** Load every configured provider. Called once from <AnalyticsProvider />. */
export const initAnalytics = () => {
  initGtm();
  initGaDirect();
  initClarity();
};

/**
 * Diagnostics helper — verify in the browser console that each provider
 * initialised exactly once:
 *
 *   import { getAnalyticsStatus } from "./analytics";
 *   getAnalyticsStatus();
 *
 * Counts are DOM counts, so they reflect reality rather than our own flags.
 */
export const getAnalyticsStatus = () => {
  if (!isBrowser) return { ssr: true };

  const count = (src) => document.querySelectorAll(`script[src*="${src}"]`).length;

  return {
    gtm: {
      configured: shouldLoadGtm,
      id: GTM_ID || null,
      scriptCount: count("googletagmanager.com/gtm.js"),
    },
    ga4: {
      configured: Boolean(GA_MEASUREMENT_ID),
      id: GA_MEASUREMENT_ID || null,
      via: shouldLoadGaDirectly ? "direct gtag.js" : "GTM container",
      gtagScriptCount: count("googletagmanager.com/gtag/js"),
    },
    clarity: {
      configured: shouldLoadClarity,
      id: CLARITY_PROJECT_ID || null,
      scriptCount: count("clarity.ms/tag"),
      ready: Boolean(window.clarity),
    },
    dataLayerLength: Array.isArray(window[DATA_LAYER_NAME]) ? window[DATA_LAYER_NAME].length : 0,
  };
};
