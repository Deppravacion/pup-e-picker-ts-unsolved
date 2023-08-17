import { create } from "zustand";

interface ShowDogs {
  showDogs: string;
  setShowDogs: (by: string) => void;
}

export const useShowDogsStore = create<ShowDogs>()((set) => ({
  showDogs: "allDogs",
  setShowDogs: (by) => set(() => ({ showDogs: by })),
}));
