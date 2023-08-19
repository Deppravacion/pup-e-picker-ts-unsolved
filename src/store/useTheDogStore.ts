import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";

interface DogStore {
  isLoading: boolean;
  allDogs: Dog[];
  showDogs: string;
  setAllDogs: (by: Dog[]) => void;
  setShowDogs: (by: string) => void;
  createDog: (dog: Omit<Dog, "id">) => void;
  deleteDog: (dogId: number) => void;
  updateDog: (dogId: number, key: boolean) => void;
  getDogs: () => void
}

export const useAllDogsStore = create<DogStore>()((set) => ({
  allDogs: [],
  isLoading: false,
  showDogs: "allDogs",
  setAllDogs: (by) => set(() => ({ allDogs: by })),
  setShowDogs: (by) => set(() => ({ showDogs: by })),
  createDog: (dog) => {
    set({ isLoading: true });
    Requests.postDog(dog).finally(() => {
      set({ isLoading: false });
    });
  },
  deleteDog: (dog) => {
    set({ isLoading: true });
    Requests.deleteDog(dog).finally(() => {
      set({ isLoading: false });
    });
  }, 
  updateDog: (dogId, key) => {
    set({ isLoading: true });
    Requests.updateDog(dogId, key).finally(() => {
      set({ isLoading: false });
    });    
  },
  getDogs: () => {
    set({ isLoading: true });
    Requests.getAllDogs().finally(() => {
      set({ isLoading: false });
    });
  }
}));
