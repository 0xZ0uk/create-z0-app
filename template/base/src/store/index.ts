import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type {} from "@redux-devtools/extension"; // required for devtools typing

import { BearSlice, createBearSlice } from "./slices/bear";
import { FishSlice, createFishSlice } from "./slices/fish";
import { SharedSlice, createSharedSlice } from "./slices/shared";

export interface StoreState extends BearSlice, FishSlice, SharedSlice {}

export const useStore = create<StoreState>()(
  devtools((...a) => ({
    ...createBearSlice(...a),
    ...createFishSlice(...a),
    ...createSharedSlice(...a),
  })),
);
