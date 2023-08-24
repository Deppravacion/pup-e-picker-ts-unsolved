import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";

interface DogStore {
  isLoading: boolean;
  allDogs: Dog[];
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  isFormActive: boolean;
  setIsLoading: (by: boolean) => void;
  setIsFormActive: (by: boolean) => void;
  setAllDogs: (by: Dog[]) => void;
  setActiveTab: (by: "allDogs" | "favDogs" | "notFavDogs") => void;
  createDog: (dog: Omit<Dog, "id">) => void;
  getDogs: () => void;
  updateDog: (dogId: number, key: boolean) => void;
  deleteDog: (dogId: number) => void;
}

export const useTheDogStore = create<DogStore>()((set) => ({
  allDogs: [],
  isLoading: false,
  isFormActive: false,
  activeTab: "allDogs",
  setIsFormActive: (by) => set(() => ({ isFormActive: by })),
  setAllDogs: (by) => set(() => ({ allDogs: by })),
  setActiveTab: (by) => set(() => ({ activeTab: by })),
  createDog: (dog) => {
    set({ isLoading: true });
    Requests.postDog(dog).finally(() => {
      set({ isLoading: false });
    });
  },
  setIsLoading: (by) => ({ isLoading: by }),
  getDogs: () => {
    set({ isLoading: true });
    Requests.getAllDogs().finally(() => {
      set({ isLoading: false });
    });
  },
  updateDog: (dogId, key) => {
    set({ isLoading: true });
    Requests.updateDog(dogId, key).finally(() => {
      set({ isLoading: false });
    });
  },
  deleteDog: (dog) => {
    set({ isLoading: true });
    Requests.deleteDog(dog).finally(() => {
      set({ isLoading: false });
    });
  },
}));
