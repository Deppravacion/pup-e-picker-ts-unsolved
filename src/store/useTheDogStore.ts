import { create } from "zustand";
// import { shallow } from "zustand/shallow";
// import { computed } from "zustand-middleware-computed-state";

import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogStore {
  isLoading: boolean;
  allDogs: Dog[];
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  notFavDogs: Dog[];
  favDogs: Dog[];
  setAllDogs: (dogs: Dog[]) => void;
  getFavDogs: () => void;
  setActiveTab: (activeTab: "allDogs" | "favDogs" | "notFavDogs") => void;

  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  updateDog: (dogId: number, key: boolean) => void;
  deleteDog: (dogId: number) => void;
  refetchDogs: () => Promise<void>;

  onClickFavDogs: (activeTab: "allDogs" | "favDogs") => void;
  onClickNotFavDogs: (activeTab: "allDogs" | "notFavDogs") => void;
  onClickCreateDog: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
}

export const useTheDogStore = create<DogStore>()((set, get) => ({
  favDogs: [],
  notFavDogs: [],
  allDogs: [],
  isLoading: false,
  activeTab: "favDogs",
  setAllDogs: (dogs) => set(() => ({ allDogs: dogs })),
  getFavDogs: () =>
    set((state) => ({
      favDogs: state.allDogs.filter((dog: Dog) => dog.isFavorite === true),
    })),
  onClickFavDogs: (activeTab) =>
    set({ activeTab: activeTab == "favDogs" ? "allDogs" : "favDogs" }),
  onClickNotFavDogs: (activeTab) =>
    set({ activeTab: activeTab == "notFavDogs" ? "allDogs" : "notFavDogs" }),
  onClickCreateDog: (activeTab) =>
    set({
      activeTab: activeTab === "createDogForm" ? "allDogs" : "createDogForm",
    }),
  setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
  createDog: async (dog) => {
    set({ isLoading: true });
    return Requests.postDog(dog)
      .then(() => {
        return get().refetchDogs();
      })
      .then(() => {
        toast.success("created a dog successfully");
      })
      .finally(() => {
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
      .finally(() => set({ isLoading: false }));
  },
}));
