import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./api";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],

      addToCart: (product, size) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === size
          );

          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += 1;
            return { cart: newCart };
          }

          return { cart: [...state.cart, { product, quantity: 1, selectedSize: size }] };
        }),

      removeFromCart: (productId, size) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => !(item.product.id === productId && item.selectedSize === size)
          ),
        })),

      updateQuantity: (productId, size, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.product.id === productId && item.selectedSize === size
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
            ),
        })),

      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) =>
        set((state) => {
          const index = state.wishlist.indexOf(productId);
          if (index > -1) {
            return { wishlist: state.wishlist.filter((id) => id !== productId) };
          }
          return { wishlist: [...state.wishlist, productId] };
        }),
    }),
    {
      name: "aurascent-cart-store",
    }
  )
);
