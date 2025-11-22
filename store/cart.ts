import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { CartItem } from "@/lib/types"

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  setIsOpen: (isOpen: boolean) => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (newItem) => {
        const items = get().items
        const existingItem = items.find((item) => item.productId === newItem.productId)

        if (existingItem) {
          // If item already exists, increase quantity
          set({
            items: items.map((item) =>
              item.productId === newItem.productId ? { ...item, quantity: item.quantity + 1 } : item,
            ),
          })
        } else {
          // Add new item with quantity 1
          set({
            items: [...items, { ...newItem, quantity: 1 }],
          })
        }
      },

      removeItem: (productId) => {
        set({
          items: get().items.filter((item) => item.productId !== productId),
        })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId)
          return
        }

        set({
          items: get().items.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      setIsOpen: (isOpen) => {
        set({ isOpen })
      },
    }),
    {
      name: "learnhub-cart",
      partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
    },
  ),
)
