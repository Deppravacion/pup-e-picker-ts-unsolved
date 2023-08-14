import { create } from "zustand";
import { Dog } from "../types";

interface ShowDogs {
  showDogs: Dog[]
  setShowDogs: (by: Dog[]) => void
}

export const useShowDogsStore = create<ShowDogs>()((set) => ({
  showDogs: [],
  setShowDogs: (by) => set(() => ({ showDogs: by}))
}))