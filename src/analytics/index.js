/**
 * Public analytics API — always import from "@/analytics" (i.e. this file),
 * never from the individual modules. One entry point keeps event names
 * discoverable and makes provider swaps a one-file change.
 *
 * Usage:
 *   import { button_click, external_link_click } from "../../analytics";
 */

export { default as AnalyticsProvider } from "./AnalyticsProvider";
export { usePageViewTracking } from "./usePageViewTracking";

export {
  // generic
  custom_event,
  trackPageView,
  // engagement
  button_click,
  form_submit,
  external_link_click,
  // Clarity-specific
  setClarityTag,
} from "./events";

export {
  initAnalytics,
  initGtm,
  initClarity,
  initGaDirect,
  pushToDataLayer,
  getAnalyticsStatus,
  isBrowser,
} from "./gtm";

export {
  GTM_ID,
  GA_MEASUREMENT_ID,
  CLARITY_PROJECT_ID,
  IS_DEVELOPMENT,
} from "./config";
