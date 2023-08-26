// import { create } from "zustand";
import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[]) => void;
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setActiveTab: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  isFormActive: boolean;
  setIsFormActive: (by: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  getDogs: () => void;
  updateDog: (dogId: number, key: boolean) => void;
  deleteDog: (dogId: number) => void;
  refetchDogs: () => Promise<void>;
}

export const useTheDogStore = create<DogStore>()((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => ({ isLoading: isLoading }),
  allDogs: [],
  setAllDogs: (dogs) => set(() => ({ allDogs: dogs })),
  activeTab: "allDogs",
  setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
  isFormActive: false,
  setIsFormActive: (by) => set(() => ({ isFormActive: by })),
  createDog: async (dog) => {
    set({ isLoading: true });
    return Requests.postDog(dog)
      .then(() => {
        return get().refetchDogs();
      })
      .then(() => {
        toast.success("your dog has been created");
      })
      .finally(() => {
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
  refetchDogs: async () => {
    set({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) => set({ allDogs: dogs }))
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
