import { create } from "zustand";

type Fav = {
  id: string;
  title: string;
  url: string;
  kind: "github" | "devto";
};

type State = {
  items: Fav[];
  loading: boolean;
  load: () => Promise<void>;
  add: (fav: Omit<Fav, "id"> & { id?: string }) => Promise<void>;
  remove: (id: string) => Promise<void>;
  has: (id: string) => boolean;
};

export const useFavorites = create<State>((set, get) => ({
  items: [],
  loading: false,

  load: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/favorites");
      const data = await res.json();
      
      
      if (!res.ok) {
        set({ items: [], loading: false });
        return;
      }
      
      set({ items: data.items ?? [], loading: false });
    } catch (err) {
      set({ items: [], loading: false });
    }
  },

  add: async (fav) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fav),
      });
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status === 503) {
          alert("⚠️ Firebase not configured!\n\nFavorites feature requires Firebase setup.\nSee FIRESTORE_SETUP.md for instructions.");
        } else {
          alert(`Failed to add favorite: ${data.error}`);
        }
        return;
      }
      
      await get().load();
    } catch (err) {
      alert("Failed to add favorite. Please try again.");
    }
  },

  remove: async (id) => {
    try {
      const res = await fetch(`/api/favorites/${id}`, { method: "DELETE" });
      const data = await res.json();
      
      if (!res.ok) {
        if (res.status !== 503) {
          alert(`Failed to remove favorite: ${data.error}`);
        }
        return;
      }
      
      set({ items: get().items.filter((i) => i.id !== id) });
    } catch (err) {
      alert("Failed to remove favorite. Please try again.");
    }
  },

  has: (id) => !!get().items.find((i) => i.id === id),
}));
