// import { create } from "zustand";
import create from "zustand-store-addons";
import { Dog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

// interface DogStore {
//   isLoading: boolean;
//   allDogs: Dog[];
//   activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
//   favDogs: () => void;
//   notFavDogs: Dog[];
//   setAllDogs: (dogs: Dog[]) => void;
//   setActiveTab: (activeTab: "allDogs" | "favDogs" | "notFavDogs") => void;

//   createDog: (dog: Omit<Dog, "id">) => Promise<void>;
//   // getDogs: () => void;
//   updateDog: (dogId: number, key: boolean) => void;
//   deleteDog: (dogId: number) => void;
//   refetchDogs: () => Promise<void>;

//   onClickFavDogs: (activeTab: "allDogs" | "favDogs") => void;
//   onClickNotFavDogs: (activeTab: "allDogs" | "notFavDogs") => void;
//   onClickCreateDog: (
//     activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
//   ) => void;
// }

interface DogStoreAddons {
  allDogs: Dog[];
  setAllDogs: (dogs: Dog[]) => void;
  favDogs?: Dog[];
  totalDogs?: number;
  notFavDogs?: Dog[];
  isLoading: boolean;
  activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm";
  setActiveTab: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  onClickFavDogs?: (activeTab: "favDogs" | "allDogs") => void;
  onClickNotFavDogs?: (activeTab: "allDogs" | "notFavDogs") => void;
  onClickCreateDog?: (
    activeTab: "allDogs" | "favDogs" | "notFavDogs" | "createDogForm"
  ) => void;
  createDog?: (dog: Omit<Dog, "id">) => Promise<void>;
  updateDog?: (dogId: number, key: boolean) => void;
  deleteDog?: (dogId: number) => void;
  refetchDogs?: () => Promise<void>;
}

export const useTheDogStore = create<DogStoreAddons>(
  (set, get) => ({
    allDogs: [],
    setAllDogs: (dogs) => set({ allDogs: dogs }),
    isLoading: false,
    activeTab: "allDogs",
    setActiveTab: (activeTab) => set({ activeTab: activeTab }),
    onClickFavDogs: (activeTab) => set({ activeTab: activeTab }),
    onClickNotFavDogs: (activeTab) => set({ activeTab: activeTab }),
    onClickCreateDog: (activeTab) => set({ activeTab: activeTab }),

    createDog: async (dog) => {
      set({ isLoading: true });
      return Requests.postDog(dog)
        .then(() => {
          return get().refetchDogs;
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
  }),
  {
    computed: {
      favDogs() {
        return this.allDogs.filter((dog: Dog) => dog.isFavorite === true);
      },
      notFavDogs() {
        return this.allDogs.filter((dog: Dog) => dog.isFavorite === false);
      },
      onClickFavDogs() {
        return this.activeTab === "favDogs" ? "allDogs" : "favDogs";
      },
      onClickCreateDog() {
        return this.activeTab === "createDogForm" ? "allDogs" : "createDogForm";
      },
    },
    watchers: {
      allDogs(newTotal: number, preTotal: number) {
        if (newTotal != preTotal) {
          this.set({ totalDogs: newTotal });
        }
      },
    },
  }
);

// export const useTheDogStore = create<DogStore>()((set, get) => ({
//   onClickFavDogs: (activeTab) =>
//     set({ activeTab: activeTab == "favDogs" ? "allDogs" : "favDogs" }),
//   onClickNotFavDogs: (activeTab) =>
//     set({ activeTab: activeTab == "notFavDogs" ? "allDogs" : "notFavDogs" }),
//   onClickCreateDog: (activeTab) =>
//     set({
//       activeTab: activeTab === "createDogForm" ? "allDogs" : "createDogForm",
//     }),
//   favDogs: () => set(state => ({ favDogs: get().allDogs.filter((dog: Dog) => dog.isFavorite === true)})),
//   notFavDogs: get().allDogs.filter((dog: Dog) => dog.isFavorite === false),
//   allDogs: [],
//   isLoading: false,
//   activeTab: "allDogs",
//   setAllDogs: (dogs) => set(() => ({ allDogs: dogs })),
//   setActiveTab: (activeTab) => set(() => ({ activeTab: activeTab })),
//   createDog: async (dog) => {
//     set({ isLoading: true });
//     return Requests.postDog(dog)
//       .then(() => {
//         return get().refetchDogs();
//       })
//       .then(() => {
//         toast.success("created a dog successfully");
//       })
//       .finally(() => {
//         set({ isLoading: false });
//       });
//   },
//   // getDogs: () => {
//   //   set({ isLoading: true });
//   //   Requests.getAllDogs().finally(() => {
//   //     set({ isLoading: false });
//   //   });
//   // },
//   updateDog: (dogId, key) => {
//     set({ isLoading: true });
//     Requests.updateDog(dogId, key).finally(() => {
//       set({ isLoading: false });
//     });
//   },
//   deleteDog: (dog) => {
//     set({ isLoading: true });
//     Requests.deleteDog(dog).finally(() => {
//       set({ isLoading: false });
//     });
//   },
//   refetchDogs: async () => {
//     set({ isLoading: true });
//     return Requests.getAllDogs()
//       .then((dogs) => set({ allDogs: dogs }))
//       .finally(() => set({ isLoading: false }));
//   },
// }));
