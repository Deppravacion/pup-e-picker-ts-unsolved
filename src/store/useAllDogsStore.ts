import { create } from "zustand";
import { Dog } from "../types";

interface AllDogs {
  allDogs: Dog[];
  setAllDogs: (by: Dog[]) => void;
}

export const useAllDogsStore = create<AllDogs>()((set) => ({
  allDogs: [],
  setAllDogs: (by) => set(() => ({ allDogs: by })),
}));
