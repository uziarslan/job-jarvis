import { SavedSearch } from "./types";

export const API_URL = "http://localhost:3000/api/";

export const COLOR_LIGHT_GREY = "#F1F1F1";
export const COLOR_DARK_GREY = "#637381";
export const COLOR_DEEP_GREY = "#979797";
export const COLOR_LIGHT_GREEN = "#22C55E1A";
export const COLOR_DEEP_BLACK = "#1B2632";

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

// Saved searches are stored in the browser's google storage
// We adopted this behaviour to be consistent with the rest of the app :
// It could be stored in the database, but the default searches behaviour,
// is mostly carried by the browser extension (scrapping).
// ------------------------------------------------------------------------
// Then, it would be too heavy to have saved searches in the database, with
// a "is_system" field and specifics behaviours to re-implement in the frontend.
// This way, we can store until 2600 objects so it is fine, and shared by Google account.
// ------------------------------------------------------------------------
// NOTE : Updating the structure would decrease the storage performances so be careful
// with that.
// ------------------------------------------------------------------------
// NOTE (bis) : We should reserve this space for the saved searches only.
// For the settings for example, this is not mandatory to share them using Google
// account and you can use database for that.
// ------------------------------------------------------------------------
export const SAVED_SEARCHES_KEY = "savedSearches";
export const DEFAULT_SAVED_SEARCHES: SavedSearch[] = [
  { name: "My Feed", enabled: false },
  { name: "Best Matches", enabled: false },
  { name: "Most Recent", enabled: false },
  { name: "U.S Only", enabled: false },
];
