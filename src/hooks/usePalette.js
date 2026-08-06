import { useState, useEffect } from "react";

export const PALETTES = [
  { id: "sand", name: "Sand", light: "#AB6400", dark: "#FFCA16" },
  { id: "mono", name: "Slate", light: "#0090FF", dark: "#0090FF" },
  { id: "slate", name: "Gray", light: "#0090FF", dark: "#0090FF" },
];

const STORAGE_KEY = "currentPalette";
// Bumped when the default/available palettes change materially, so a value
// saved under an older scheme doesn't silently stick around as a stale pick.
const STORAGE_VERSION_KEY = "currentPaletteVersion";
const STORAGE_VERSION = "2";
const DEFAULT_PALETTE = "sand";
const VALID_PALETTES = new Set(PALETTES.map((palette) => palette.id));

export const usePalette = () => {
  const [palette, setPalette] = useState(
    () => {
      if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
        localStorage.removeItem(STORAGE_KEY);
        return DEFAULT_PALETTE;
      }
      const storedPalette = localStorage.getItem(STORAGE_KEY);
      return VALID_PALETTES.has(storedPalette) ? storedPalette : DEFAULT_PALETTE;
    }
  );

  useEffect(() => {
    document.body.setAttribute("data-palette", palette);
  }, [palette]);

  const changePalette = (id) => {
    if (!VALID_PALETTES.has(id)) return;
    localStorage.setItem(STORAGE_KEY, id);
    setPalette(id);
  };

  return { palette, changePalette, palettes: PALETTES };
};
