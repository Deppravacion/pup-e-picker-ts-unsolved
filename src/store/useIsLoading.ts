import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (by: boolean) => void;
}

export const useIsLoading = create<LoadingState>()((set) => ({
  isLoading: false,
  setIsLoading: (by) => set(() => ({ isLoading: by })),
}));
