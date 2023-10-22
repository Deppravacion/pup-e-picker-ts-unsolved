import { create } from "zustand";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

interface DogStore {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[]) => void;
  // favDogs: Dog[];
  // notFavDogs: Dog[];
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setActiveTab: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  isFormActive: boolean;
  setIsFormActive: (formStatus: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  refetchDogs: () => Promise<void>;
  toggleFavorite: (dogId: number, isFav: boolean) => void;
  removeDog: (dogId: number) => void;
  onClickFavDogs: () => void;
  onClickNotFavDogs: () => void;
  onClickCreateDogForm: () => void;
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
  isFormActive: false,
  setIsFormActive: (formStatus) => set(() => ({ isFormActive: formStatus })),

  createDog: async (dog) => {
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
  refetchDogs: async () => {
    set({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) =>
        set({
          allDogs: dogs,
          // favDogs: dogs.filter((dog) => dog.isFavorite),
          // notFavDogs: dogs.filter((dog) => !dog.isFavorite),
        })
      )
      .finally(() => {
        set({ isLoading: false });
      });
  },
  toggleFavorite: (dogId, isFav) => {
    set((state) => {
      const dog = state.allDogs.find((dog) => dog.id === dogId);
      if (dog) {
        dog.isFavorite = !isFav;
      }
      return {
        allDogs: state.allDogs,
        // favDogs: state.allDogs.filter((dog) => dog.isFavorite),
        // notFavDogs: state.allDogs.filter((dog) => !dog.isFavorite),
      };
    });
    Requests.updateDog(dogId, !isFav).then((response) => {
      if (!response.ok) {
        set((state) => ({ allDogs: state.allDogs }));
        toast.error("something went wrong");
      } else return;
    });
  },
  removeDog: (dogId) => {
    set((state) => {
      return {
        allDogs: state.allDogs.filter((dog) => dog.id !== dogId),
        // favDogs: state.allDogs.filter((dog) => dog.isFavorite),
        // notFavDogs: state.allDogs.filter((dog) => !dog.isFavorite),
      };
    });
    Requests.deleteDog(dogId).then((response) => {
      if (!response.ok) {
        set((state) => ({ allDogs: state.allDogs }));
        toast.error("something went wrong");
      } else return;
    });
  },
  onClickFavDogs: () => {
    if (get().activeTab === "favDogs") {
      return set({ activeTab: "allDogs" });
    }
    return set({ activeTab: "favDogs" });
  },
  onClickNotFavDogs: () => {
    if (get().activeTab === "notFavDogs") {
      return set({ activeTab: "allDogs" });
    }
    return set({ activeTab: "notFavDogs" });
  },
  onClickCreateDogForm: () => {
    if (get().activeTab === "createDogForm") {
      return set({ activeTab: "allDogs" });
    }
    return set({ activeTab: "createDogForm" });
  },
}));

export const selectDogs = {
  favDogs: (store: DogStore) => store.allDogs.filter((dog) => dog.isFavorite),
  notFavDogs: (store: DogStore) => store.allDogs.filter((dog) => !dog.isFavorite),
}