// import { create } from "zustand";
import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";

interface DogStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[]) => void;
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setActiveTab: (activeTab: "allDogs" | "favDogs" | "notFavDogs") => void;
  isFormActive: boolean;
  setIsFormActive: (by: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => void;
  getDogs: () => void;
  updateDog: (dogId: number, key: boolean) => void;
  deleteDog: (dogId: number) => void;
  refetchDogs: () => void;
}

export const useTheDogStore = create<DogStore>()((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => ({ isLoading: isLoading }),
  allDogs: [],
  setAllDogs: (dogs) => set(() => ({ allDogs: dogs })),
  activeTab: "allDogs",
  setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
  isFormActive: false,
  setIsFormActive: (by) => set(() => ({ isFormActive: by })),
  createDog: (dog) => {
    set({ isLoading: true });
    Requests.postDog(dog).finally(() => {
      set({ isLoading: false });
    });
  },
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
  refetchDogs: () => {
    set({ isLoading: true });
    Requests.getAllDogs()
      .then((dogs) => set({ allDogs: dogs }))
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
