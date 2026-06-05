import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./api";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface UserSession {
  name: string;
  email: string;
  role: "user" | "admin";
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  user: UserSession | null;
  isCartOpen: boolean;
  addToCart: (product: Product, size: string) => void;
  removeFromCart: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  setCartOpen: (open: boolean) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      user: null,
      isCartOpen: false,

      addToCart: (product, size) =>
        set((state) => {
          const existingIndex = state.cart.findIndex(
            (item) => item.product.id === product.id && item.selectedSize === size
          );

          if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += 1;
            return { cart: newCart, isCartOpen: true }; // Auto-open cart drawer
          }

          return { 
            cart: [...state.cart, { product, quantity: 1, selectedSize: size }],
            isCartOpen: true // Auto-open cart drawer
          };
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

      login: (email, name) => 
        set(() => {
          const lowerEmail = email.toLowerCase().trim();
          if (lowerEmail === "admin@aurascent.com") {
            return {
              user: {
                name: "Administrator",
                email: "admin@aurascent.com",
                role: "admin",
              }
            };
          }
          return {
            user: {
              name: name || "Customer",
              email: lowerEmail,
              role: "user",
            }
          };
        }),

      logout: () => set({ user: null }),
      
      setCartOpen: (open) => set({ isCartOpen: open }),
    }),
    {
      name: "aurascent-cart-store-v3",
    }
  )
);
