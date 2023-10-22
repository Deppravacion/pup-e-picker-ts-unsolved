import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";
import { MouseEvent } from "react";

interface DogStore {
  isLoading: boolean;
  allDogs: Dog[];
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setIsLoading: (isLoading: boolean) => void;
  setAllDogs: (dogs: Dog[]) => void;
  setActiveTab: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  refetchDogs: () => Promise<void>;
  toggleFavorite: (dogId: number, isFav: boolean) => void;
  removeDog: (dogId: number) => void;
  toggleTab: (event: MouseEvent) => void;
}

export const useTheDogStore = create<DogStore>()((set, get) => ({
  isLoading: false,
  setIsLoading: (isLoading) => ({ isLoading: isLoading }),
  allDogs: [],
  setAllDogs: (dogs) => set(() => ({ allDogs: dogs })),
  favDogs: [],
  notFavDogs: [],
  activeTab: "allDogs",
  setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
  createDog: (dog) => {
    const existingDogs = get().allDogs;
    const newDogs = [...existingDogs, dog];
    set({ allDogs: newDogs });
    return Requests.postDog(dog)
      .then((response) => {
        if (!response.ok) {
          set((state) => ({ allDogs: state.allDogs }));
          toast.error("something went wrong");
        } else return;
      })
      .then(() => {
        return get().refetchDogs();
      })
      .then(() => {
        toast.success("your dog has been created");
      })
      .catch(() => {
        toast.error("changes reverted");
        set({ allDogs: existingDogs });
      });
  },
  // createDog: (dog) => {
  //   return Requests.postDog(dog)
  //     .then(() => {
  //       return get().refetchDogs();
  //     })
  //     .then(() => {
  //       toast.success("your dog has been created");
  //     })
  //     .finally(() => {
  //       set({ isLoading: false });
  //     });
  // },
  refetchDogs: async () => {
    set({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) =>
        set({
          allDogs: dogs,
        })
      )
      .finally(() => {
        set({ isLoading: false });
      });
  },
  toggleFavorite: (dogId, isFav) => {
    const existingDogs = get().allDogs;
    const newDogs = existingDogs.map((dog) =>
      dogId === dog.id ? { ...dog, isFavorite: !dog.isFavorite } : dog
    );
    set({ allDogs: newDogs });
    Requests.updateDog(dogId, !isFav)
      .then((response) => {
        if (!response.ok) {
          set((state) => ({ allDogs: state.allDogs }));
          toast.error("something went wrong");
        } else return;
      })
      .catch(() => {
        toast.error("changes reverted");
        set({ allDogs: existingDogs });
      });
  },
  removeDog: (dogId) => {
    const existingDogs = get().allDogs;
    set((state) => {
      return {
        allDogs: state.allDogs.filter((dog) => dog.id !== dogId),
      };
    });
    Requests.deleteDog(dogId)
      .then((response) => {
        if (!response.ok) {
          set((state) => ({ allDogs: state.allDogs }));
          toast.error("something went wrong");
        } else return;
      })
      .catch(() => {
        toast.error("changes reverted");
        set({ allDogs: existingDogs });
      });
  },
  toggleTab: (event: MouseEvent) => {
    const target = event.target as HTMLDivElement;
    const id: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm" =
      target.id as "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
    if (get().activeTab === id) {
      console.log(get().activeTab);
      console.log(id);
      return set({ activeTab: "allDogs" });
    }
    return set({ activeTab: id });
  },
}));

export const selectDogs = {
  favDogs: (store: DogStore) => store.allDogs.filter((dog) => dog.isFavorite),
  notFavDogs: (store: DogStore) =>
    store.allDogs.filter((dog) => !dog.isFavorite),
  allDogsCount: (store: DogStore) => store.allDogs.length,
  favDogsCount: (store: DogStore) => selectDogs.favDogs(store).length,
  notFavDogsCount: (store: DogStore) => selectDogs.notFavDogs(store).length,
  filteredDogs: (store: DogStore): Dog[] => {
    switch (store.activeTab) {
      case "allDogs":
        return store.allDogs;
      case "favDogs":
        return selectDogs.favDogs(store);
      case "notFavDogs":
        return selectDogs.notFavDogs(store);
      case "createDogForm":
        return [];
    }
  },
};
