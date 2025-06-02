import { SavedSearch } from "./types";

export const API_URL = process.env.REACT_APP_FRONTEND_URL || "http://localhost:3000";

export const COLOR_LIGHT_GREY = "#F1F1F1";
export const COLOR_DARK_GREY = "#637381";
export const COLOR_DEEP_GREY = "#979797";
export const COLOR_LIGHT_GREEN = "#22C55E1A";
export const COLOR_DEEP_BLACK = "#1B2632";

// Add SIDEBAR_WIDTH_PX
export const SIDEBAR_WIDTH_PX = 62; // Adjust this value based on your sidebar design

let cachedScrollbarWidth: number | null = null;

export function getScrollbarWidth(): number {
  if (cachedScrollbarWidth !== null) return cachedScrollbarWidth;

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

  cachedScrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  outer.remove();

  return cachedScrollbarWidth;
}

export const SAVED_SEARCHES_KEY = "savedSearches";
export const DEFAULT_SAVED_SEARCHES: SavedSearch[] = [
  { name: "My Feed", enabled: false, url: "https://www.upwork.com/nx/find-work/" },
  { name: "Best Matches", enabled: false, url: "https://www.upwork.com/nx/find-work/best-matches" },
  { name: "Most Recent", enabled: false, url: "https://www.upwork.com/nx/find-work/most-recent" },
];