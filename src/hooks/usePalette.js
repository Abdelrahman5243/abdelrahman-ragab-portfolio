import { useState, useEffect } from "react";

export const PALETTES = [
  { id: "slate", name: "Classic Blue", light: "#2563EB", dark: "#3B82F6" },
  { id: "obsidian", name: "Rose Gold", light: "#BE185D", dark: "#F472B6" },
  { id: "carbon", name: "Warm Amber", light: "#B45309", dark: "#FBBF24" },
];

const STORAGE_KEY = "currentPalette";
const DEFAULT_PALETTE = "slate";
const VALID_PALETTES = new Set(PALETTES.map((palette) => palette.id));

export const usePalette = () => {
  const [palette, setPalette] = useState(
    () => {
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
