import { create } from "zustand";
interface DogFormActive {
  createDogFormActive: boolean;
  setCreateDogFormActive: (by: boolean) => void;
}
export const useDogFormActive = create<DogFormActive>()((set) => ({
  createDogFormActive: false,
  setCreateDogFormActive: (by) => set(() => ({ createDogFormActive: by })),
}));
