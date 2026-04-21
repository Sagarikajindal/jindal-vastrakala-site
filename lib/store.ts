"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, color?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  totalINR: () => number;
  totalEUR: () => number;
  itemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, color) => {
        const items = get().items;
        const existing = items.find((i) => i.product.id === product.id);

        if (existing) {
          set({
            items: items.map((i) =>
              i.product.id === product.id
                ? {
                    ...i,
                    quantity: Math.min(i.quantity + 1, product.stock),
                  }
                : i
            ),
          });
        } else {
          set({
            items: [
              ...items,
              {
                product,
                quantity: 1,
                selectedColor: color,
              },
            ],
          });
        }

        set({ isOpen: true });
      },

      removeItem: (productId) =>
        set({
          items: get().items.filter((i) => i.product.id !== productId),
        }),

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeItem(productId);
          return;
        }

        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      toggleCart: () => set({ isOpen: !get().isOpen }),

      totalINR: () =>
        get().items.reduce((sum, i) => sum + i.product.priceINR * i.quantity, 0),

      totalEUR: () =>
        get().items.reduce((sum, i) => sum + i.product.priceEUR * i.quantity, 0),

      itemCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: "jv-cart",
    }
  )
);
