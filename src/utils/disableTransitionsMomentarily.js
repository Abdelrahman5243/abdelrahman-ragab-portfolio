// Suspends every CSS transition for one frame so a global theme/palette swap
// applies instantly, instead of each element's own hover/interaction
// transition (border-color, background-color, ...) cross-fading the change.
export const disableTransitionsMomentarily = () => {
  const style = document.createElement("style");
  style.textContent = "*, *::before, *::after { transition: none !important; }";
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.head.removeChild(style);
    });
  });
};
