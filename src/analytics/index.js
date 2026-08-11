/**
 * Public analytics API — always import from "@/analytics" (i.e. this file),
 * never from the individual modules. One entry point keeps event names
 * discoverable and makes provider swaps a one-file change.
 *
 * Usage:
 *   import { button_click, file_download } from "../../analytics";
 */

export { default as AnalyticsProvider } from "./AnalyticsProvider";
export { usePageViewTracking } from "./usePageViewTracking";

export {
  // generic
  custom_event,
  trackEvent,
  trackPageView,
  // engagement
  button_click,
  form_submit,
  search,
  external_link_click,
  file_download,
  // ecommerce
  add_to_cart,
  begin_checkout,
  purchase,
  // Clarity-specific
  setClarityTag,
  upgradeClaritySession,
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
  IS_PRODUCTION,
  IS_DEVELOPMENT,
} from "./config";
