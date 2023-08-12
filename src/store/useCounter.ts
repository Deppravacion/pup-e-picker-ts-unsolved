import { create } from 'zustand'

interface CountState {
  count: number
  increase: () => void
}

export const useCounter = create<CountState>()((set) => ({
  count: 0,
  increase: () => set((state) => ({ count: state.count + 1 })),
}))