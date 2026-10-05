const CARD_HOST = "seeded-cards.abdelrahman-ragab-abdelbaky.workers.dev";

const MIN_DIM = 200;
const MAX_DIM = 2400;

const clampDim = (n) => Math.min(MAX_DIM, Math.max(MIN_DIM, Math.round(n)));

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

export function cardAt(src, { w, h } = {}) {
  const url = parseCardUrl(src);
  if (!url) return src;
  if (w) url.searchParams.set("w", String(clampDim(w)));
  if (h) url.searchParams.set("h", String(clampDim(h)));
  return url.toString();
}

export function isCard(src) {
  return parseCardUrl(src) !== null;
}

export function cardSrcSet(src, widths, ratio) {
  if (!isCard(src)) return undefined;
  const usable = widths.filter((w) => w / ratio >= MIN_DIM && w <= MAX_DIM);
  if (usable.length === 0) return undefined;
  return usable.map((w) => `${cardAt(src, { w, h: w / ratio })} ${w}w`).join(", ");
}

export function ogCard(src) {
  return isCard(src) ? cardAt(src, OG_SIZE) : src;
}
