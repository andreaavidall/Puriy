"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "puriy-favorites";
const EVENT_NAME = "puriy-favorites-updated";

// Helper to show visual Toast notifications
function showToast(message: string) {
  if (typeof window === "undefined") return;

  const existing = document.getElementById("puriy-toast");
  if (existing) {
    existing.remove();
  }

  const toast = document.createElement("div");
  toast.id = "puriy-toast";
  // Premium toast styling matching the Puriy color palette (Crema/Emerald green/Orange)
  toast.className =
    "fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#193D32] text-[#F7F3EC] px-6 py-3 rounded-full shadow-lg text-xs font-bold uppercase tracking-wider z-50 transition-all duration-300 pointer-events-none text-center border border-[#E8E2D8]/20";
  toast.innerText = message;
  
  // Custom slide/fade in animation
  toast.style.animation = "puriy-toast-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards";
  
  // Add styling sheet dynamically if not present for the animation
  if (!document.getElementById("puriy-toast-style")) {
    const styleSheet = document.createElement("style");
    styleSheet.id = "puriy-toast-style";
    styleSheet.innerText = `
      @keyframes puriy-toast-in {
        from { opacity: 0; transform: translate(-50%, 20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
      }
    `;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    toast.style.opacity = "0";
    toast.style.transform = "translate(-50%, -10px)";
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  const loadFavorites = () => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored) as string[]);
      } else {
        setFavorites([]);
      }
    } catch (e) {
      console.error("Error reading favorites from localStorage", e);
    }
  };

  useEffect(() => {
    loadFavorites();
    setLoaded(true);

    const handleUpdate = () => {
      loadFavorites();
    };

    window.addEventListener("storage", handleUpdate);
    window.addEventListener(EVENT_NAME, handleUpdate);

    return () => {
      window.removeEventListener("storage", handleUpdate);
      window.removeEventListener(EVENT_NAME, handleUpdate);
    };
  }, []);

  const addFavorite = (slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let list = stored ? (JSON.parse(stored) as string[]) : [];

      if (!list.includes(slug)) {
        list.push(slug);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        setFavorites(list);
        window.dispatchEvent(new Event(EVENT_NAME));
        showToast("❤️ Agregado a tus favoritos");
      }
    } catch (e) {
      console.error("Error adding favorite", e);
    }
  };

  const removeFavorite = (slug: string) => {
    if (typeof window === "undefined") return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      let list = stored ? (JSON.parse(stored) as string[]) : [];

      if (list.includes(slug)) {
        list = list.filter((item) => item !== slug);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
        setFavorites(list);
        window.dispatchEvent(new Event(EVENT_NAME));
        showToast("💔 Eliminado de tus favoritos");
      }
    } catch (e) {
      console.error("Error removing favorite", e);
    }
  };

  const isFavorite = (slug: string) => {
    return favorites.includes(slug);
  };

  const clearFavorites = () => {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEY);
      setFavorites([]);
      window.dispatchEvent(new Event(EVENT_NAME));
      showToast("🧹 Lista de favoritos vaciada");
    } catch (e) {
      console.error("Error clearing favorites", e);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    loaded,
  };
}
