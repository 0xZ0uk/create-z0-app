import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

interface GlobalStoreState {
  bears: number;
  increase: (by: number) => void;
}

export const useGlobalStore = create<GlobalStoreState>()(
  devtools((set) => ({
    bears: 0,
    increase: (by) => set((state) => ({ bears: state.bears + by })),
  })),
);
