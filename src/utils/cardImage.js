/**
 * Seeded-cards helpers.
 *
 * Article covers point at the seeded-cards Worker, which renders the headline
 * as type at whatever `w`/`h` it is asked for — padding, type size and the
 * pattern plane all scale with the frame. That means a slot with a different
 * shape should *request its own card* rather than crop the 1200x630 one, which
 * would slice the headline in half.
 *
 * Anything that is not a Worker URL (a hand-authored cover, say) is returned
 * untouched, so a plain image still works everywhere.
 */

const CARD_HOST = "seeded-cards.abdelrahman-ragab-abdelbaky.workers.dev";

/**
 * The Worker rejects any `w`/`h` outside this range with a 400, which reaches
 * the page as a broken image rather than a fallback. Clamping here keeps a
 * short banner ratio from generating an illegal height at the smallest
 * `srcset` width.
 */
const MIN_DIM = 200;
const MAX_DIM = 2400;

const clampDim = (n) => Math.min(MAX_DIM, Math.max(MIN_DIM, Math.round(n)));

/** The og:image contract — what scrapers expect, and what /og defaults to. */
export const OG_SIZE = { w: 1200, h: 630 };

function parseCardUrl(src) {
  if (!src || typeof src !== "string") return null;
  let url;
  try {
    url = new URL(src, window.location.origin);
  } catch {
    return null;
  }
  if (url.hostname !== CARD_HOST) return null;
  return url;
}

/**
 * Re-render a seeded card at a given size. Non-card URLs pass through, so
 * callers never have to branch on the cover's origin.
 */
export function cardAt(src, { w, h } = {}) {
  const url = parseCardUrl(src);
  if (!url) return src;
  if (w) url.searchParams.set("w", String(clampDim(w)));
  if (h) url.searchParams.set("h", String(clampDim(h)));
  return url.toString();
}

/** True when this cover is a seeded card we can re-render at will. */
export function isCard(src) {
  return parseCardUrl(src) !== null;
}

/**
 * A `srcset` of the same card at several widths, holding one aspect ratio.
 * Each entry is a real render at that size, not a downscale of a larger one.
 */
export function cardSrcSet(src, widths, ratio) {
  if (!isCard(src)) return undefined;
  // A wide ratio pushes the smallest widths under the Worker's height floor.
  // Those are dropped rather than clamped, since clamping would hand back a
  // card of a different shape than the slot reserved for it.
  const usable = widths.filter((w) => w / ratio >= MIN_DIM && w <= MAX_DIM);
  if (usable.length === 0) return undefined;
  return usable.map((w) => `${cardAt(src, { w, h: w / ratio })} ${w}w`).join(", ");
}

/**
 * The card as an og:image: always 1200x630, whatever the page shows.
 * Scrapers crop anything else, and the headline is the first casualty.
 */
export function ogCard(src) {
  return isCard(src) ? cardAt(src, OG_SIZE) : src;
}
