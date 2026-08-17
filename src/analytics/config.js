/**
 * Analytics configuration — single source of truth for IDs and feature flags.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ENV VARS
 * ─────────────────────────────────────────────────────────────────────────────
 * This project is Vite (not Next.js). Vite only exposes variables prefixed with
 * `VITE_` to client code via `import.meta.env`, so the canonical names here are:
 *
 *   VITE_GTM_ID=GTM-XXXXXXX
 *   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
 *   VITE_CLARITY_PROJECT_ID=xxxxxxxxxx
 *
 * The `NEXT_PUBLIC_*` names are also read as a fallback so the same .env keeps
 * working if this app is ever ported to Next.js. Under Vite the NEXT_PUBLIC_*
 * values are NOT injected into the bundle — only the VITE_* ones are.
 */

const env = import.meta.env ?? {};

/** Read the VITE_ name first, then the NEXT_PUBLIC_ equivalent. */
const read = (viteKey, nextKey) => {
  const value = env[viteKey] ?? env[nextKey] ?? "";
  return typeof value === "string" ? value.trim() : "";
};

export const GTM_ID = read("VITE_GTM_ID", "NEXT_PUBLIC_GTM_ID");
export const GA_MEASUREMENT_ID = read(
  "VITE_GA_MEASUREMENT_ID",
  "NEXT_PUBLIC_GA_MEASUREMENT_ID"
);
export const CLARITY_PROJECT_ID = read(
  "VITE_CLARITY_PROJECT_ID",
  "NEXT_PUBLIC_CLARITY_PROJECT_ID"
);

/** GTM's dataLayer variable name. Keep in sync with your GTM container config. */
export const DATA_LAYER_NAME = "dataLayer";

/**
 * GA4 is configured THROUGH GTM (best practice): GTM owns the GA4
 * Configuration tag, so we never load gtag.js ourselves and there is exactly
 * one GA4 loader on the page.
 *
 * Set VITE_GA_DIRECT=true ONLY as an escape hatch for when there is no GTM
 * container (e.g. GA4 exists but GTM does not). When GTM_ID is present this
 * flag is ignored — see `shouldLoadGaDirectly` below — which is what prevents
 * GA4 from being initialised twice and duplicating page_view events.
 */
const GA_DIRECT_REQUESTED = read("VITE_GA_DIRECT", "NEXT_PUBLIC_GA_DIRECT") === "true";

export const shouldLoadGtm = Boolean(GTM_ID);
export const shouldLoadClarity = Boolean(CLARITY_PROJECT_ID);
export const shouldLoadGaDirectly =
  Boolean(GA_MEASUREMENT_ID) && GA_DIRECT_REQUESTED && !GTM_ID;

export const IS_DEVELOPMENT = !(env.PROD === true);

/**
 * Debug logging: on in development, so you can see every event in the console
 * without opening GTM Preview. Scripts still load in development (so you can
 * verify the integration end-to-end); point the IDs at a test container /
 * property, or simply leave the env vars empty locally to disable them.
 */
export const DEBUG = IS_DEVELOPMENT;

export const logDebug = (...args) => {
  if (DEBUG) console.info("[analytics]", ...args);
};
