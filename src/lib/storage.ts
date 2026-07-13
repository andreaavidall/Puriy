import { Preferences } from "../types/preferences";

const STORAGE_KEY = "puriy-search-preferences";

export function savePreferences(pref: Preferences): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(pref));
  } catch (e) {
    console.error("Error saving preferences to sessionStorage", e);
  }
}

export function getPreferences(): Preferences | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Preferences) : null;
  } catch (e) {
    console.error("Error reading preferences from sessionStorage", e);
    return null;
  }
}
