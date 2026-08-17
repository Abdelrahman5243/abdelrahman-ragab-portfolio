/**
 * Typed event helpers.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW EVENTS FLOW
 * ─────────────────────────────────────────────────────────────────────────────
 * Component → helper below → `pushToDataLayer()` → GTM container → GA4 tag.
 *
 * The app never talks to GA4 directly. In GTM you create one "GA4 Event" tag
 * per event name below, triggered by a Custom Event trigger matching that name,
 * and map the parameters as Event Parameters. That keeps tag management in GTM
 * and means adding a destination (Ads, Meta, …) needs no code change.
 *
 * Clarity gets the same events as custom tags/events so session recordings can
 * be filtered by behaviour — see `sendToClarity` below.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ADDING A NEW EVENT — do it here, not inline in components
 * ─────────────────────────────────────────────────────────────────────────────
 *   1. Add an exported helper in the "custom events" section below, following
 *      GA4's recommended-event naming (snake_case verb_noun).
 *   2. Create the matching GA4 Event tag + Custom Event trigger in GTM.
 *   3. If it should be a conversion, mark it as a Key Event in GA4 Admin.
 * Keeping every event name in this one file is what stops the same event being
 * fired under two different names from two different components.
 */

import { pushToDataLayer, isBrowser } from "./gtm";
import { GA_MEASUREMENT_ID, logDebug } from "./config";

/** Strip undefined/null/"" so GTM variables don't resolve to empty strings. */
const clean = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );

/**
 * Mirror an event into Clarity as a custom event, so recordings can be
 * filtered/segmented by it. No-op when Clarity isn't loaded.
 */
const sendToClarity = (eventName) => {
  if (!isBrowser || typeof window.clarity !== "function") return;
  try {
    window.clarity("event", eventName);
  } catch (error) {
    logDebug("Clarity event failed", eventName, error);
  }
};

/**
 * Low-level escape hatch: send any event name with any parameters.
 * Prefer a named helper below when one fits — named helpers keep parameter
 * shapes consistent across the codebase.
 *
 * @param {string} name       snake_case GA4 event name
 * @param {object} parameters event parameters
 */
export const custom_event = (name, parameters = {}) => {
  if (!name || typeof name !== "string") {
    logDebug("custom_event called without a valid name", name);
    return;
  }
  pushToDataLayer({ event: name, ...clean(parameters) });
  sendToClarity(name);
};

/* ───────────────────────────── page views ───────────────────────────── */

/**
 * Send exactly one page_view for an SPA route change.
 *
 * Called ONLY by `usePageViewTracking()`. Do not call it from components — a
 * second caller is how duplicate page_views happen.
 *
 * In GTM: create a GA4 Event tag with event name `page_view`, triggered by a
 * Custom Event trigger on `page_view`, and set the GA4 Configuration tag's
 * trigger to "Initialization – All Pages" with its own page_view sending
 * DISABLED ("Send a page view event when this configuration loads" unchecked).
 * That single switch is what prevents GTM's automatic page_view from
 * duplicating the ones we send here.
 */
export const trackPageView = ({ path, title, location, referrer } = {}) => {
  if (!isBrowser) return;

  pushToDataLayer(
    clean({
      event: "page_view",
      page_path: path ?? window.location.pathname + window.location.search,
      page_location: location ?? window.location.href,
      page_title: title ?? document.title,
      page_referrer: referrer,
      // Handy when a GA4 tag needs the measurement ID as a variable.
      measurement_id: GA_MEASUREMENT_ID || undefined,
    })
  );
};

/* ─────────────────────── engagement / UI events ─────────────────────── */

/**
 * A button, CTA, or control was clicked.
 *
 * @param {object}  p
 * @param {string}  p.label     human-readable button text, e.g. "Download CV"
 * @param {string} [p.location] where on the page, e.g. "hero", "footer"
 * @param {string} [p.variant]  e.g. "primary" | "secondary"
 * @param {string} [p.destination] URL/target, when the button navigates
 */
export const button_click = ({ label, location, variant, destination, ...rest } = {}) =>
  custom_event("button_click", {
    button_label: label,
    button_location: location,
    button_variant: variant,
    destination,
    ...rest,
  });

/**
 * A form was submitted. Fire on SUCCESS, not on click, so the metric measures
 * completed submissions. Never pass raw PII (email bodies, phone numbers) — GA4
 * forbids it and Clarity masks it by default.
 */
export const form_submit = ({ formName, formId, status = "success", ...rest } = {}) =>
  custom_event("form_submit", {
    form_name: formName,
    form_id: formId,
    form_status: status,
    ...rest,
  });

/**
 * An outbound link to another domain was clicked.
 * Kept separate from `button_click` so outbound traffic can be reported on its
 * own without untangling button labels.
 */
export const external_link_click = ({ url, label, location, ...rest } = {}) => {
  let domain;
  try {
    domain = url ? new URL(url, isBrowser ? window.location.href : undefined).hostname : undefined;
  } catch {
    domain = undefined;
  }
  return custom_event("external_link_click", {
    link_url: url,
    link_domain: domain,
    link_text: label,
    link_location: location,
    outbound: true,
    ...rest,
  });
};

/* ───────────────────────────── Clarity extras ─────────────────────────── */

/**
 * Tag the current Clarity session with a key/value pair, e.g. the active
 * language or theme, so recordings can be filtered by it.
 */
export const setClarityTag = (key, value) => {
  if (!isBrowser || typeof window.clarity !== "function" || !key) return;
  try {
    window.clarity("set", key, String(value));
  } catch (error) {
    logDebug("Clarity set failed", key, error);
  }
};
