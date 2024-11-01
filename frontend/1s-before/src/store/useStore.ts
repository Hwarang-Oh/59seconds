// store/useStore.ts
import { create } from 'zustand';

interface StoreState {
  exampleState: string;
  setExampleState: (value: string) => void;
}

const useStore = create<StoreState>((set: (partial: Partial<StoreState>) => void) => ({
  exampleState: 'Hello Zustand',
  setExampleState: (value: string) => set({ exampleState: value }),
}));

export default useStore;
