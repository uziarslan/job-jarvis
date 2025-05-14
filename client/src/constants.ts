export const API_URL = "http://localhost:3000/api/";

export const COLOR_DARK_GREY = "#637381";
export const COLOR_DEEP_GREY = "#979797";
export const COLOR_LIGHT_GREEN = "#22C55E1A";
export const COLOR_DEEP_BLACK = "#1B2632";

export function getScrollbarWidth(): number {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.width = "100px";
  outer.style.height = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";

  document.body.appendChild(outer);

  const inner = document.createElement("div");
  inner.style.width = "100%";
  inner.style.height = "100%";
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.remove();

  return scrollbarWidth;
}
