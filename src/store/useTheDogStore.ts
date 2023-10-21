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
  favDogs: Dog[];
  notFavDogs: Dog[];
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setActiveTab: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  isFormActive: boolean;
  setIsFormActive: (by: boolean) => void;
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  getDogs: () => void;
  refetchDogs: () => Promise<void>;
  toggleFavorite: (dogId: number, isFav: boolean) => void;
  removeDog: (dogId: number) => void;
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
  refetchDogs: async () => {
    set({ isLoading: true });
    return Requests.getAllDogs()
      .then((dogs) =>
        set({
          allDogs: dogs,
          favDogs: dogs.filter((dog) => dog.isFavorite === true),
          notFavDogs: dogs.filter((dog) => dog.isFavorite === false),
        })
      )
      .finally(() => {
        set({ isLoading: false });
      });
  },
  favDogs: [],
  notFavDogs: [],
  toggleFavorite: (dogId, isFav) => {
    set({ isLoading: true });
    set((state) => {
      const dog = state.allDogs.find((dog) => dog.id === dogId);
      if (dog) {
        dog.isFavorite = !isFav;
      }
      return {
        allDogs: state.allDogs,
        favDogs: state.allDogs.filter((dog) => dog.isFavorite === true),
        notFavDogs: state.allDogs.filter((dog) => dog.isFavorite === false),
      };
    });
    Requests.updateDog(dogId, !isFav)
      .then((response) => {
        if (!response.ok) {
          set((state) => ({ allDogs: state.allDogs }));
          toast.error("something went wrong");
        } else return;
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
  removeDog: (dogId) => {
    set({ isLoading: true });
    set((state) => {
      return {
        allDogs: state.allDogs.filter((dog) => dog.id !== dogId),
        favDogs: state.allDogs.filter((dog) => dog.isFavorite === true),
        notFavDogs: state.allDogs.filter((dog) => dog.isFavorite === false),
      };
    });
    Requests.deleteDog(dogId)
      .then((response) => {
        if (!response.ok) {
          set((state) => ({ allDogs: state.allDogs }));
          toast.error("something went wrong");
        } else return;
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));
