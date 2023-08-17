import { create } from "zustand";

interface FormStatus {
  isFormActive: boolean;
  setIsFormActive: (by: boolean) => void;
}

export const useIsFormActiveStore = create<FormStatus>()((set) => ({
  isFormActive: false,
  setIsFormActive: (by) => set(() => ({ isFormActive: by })),
}));
