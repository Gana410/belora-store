import { useEffect, useState } from "react";

export function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** useState that persists to localStorage (safe against corrupt/blocked storage). */
export function useLocalStorage(key, initialValue, normalize = (v) => v) {
  const [value, setValue] = useState(() => normalize(readStorage(key, initialValue)));

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage full or unavailable - keep working in memory */
    }
  }, [key, value]);

  return [value, setValue];
}
