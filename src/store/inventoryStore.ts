import { create } from "zustand";

export type Fruit = "apple" | "banana" | "orange";

export interface InventoryState {
  inventory: Record<Fruit, number>;
  setInventory: (inv: Record<Fruit, number>) => void;
  updateFruit: (fruit: Fruit, amount: number) => void;
  resetInventory: () => void;
}

const defaultInventory: Record<Fruit, number> = {
  apple: 10,
  banana: 10,
  orange: 10,
};

export const useInventoryStore = create<InventoryState>((set) => ({
  inventory: { ...defaultInventory },
  setInventory: (inv) => set({ inventory: { ...inv } }),
  updateFruit: (fruit, amount) =>
    set((state) => ({
      inventory: { ...state.inventory, [fruit]: amount },
    })),
  resetInventory: () => set({ inventory: { ...defaultInventory } }),
}));
