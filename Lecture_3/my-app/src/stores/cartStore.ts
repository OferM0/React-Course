import { create } from "zustand";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  getTotalItemCount: () => number;
}

const loadFromLocalStorage = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const item = window.localStorage.getItem("cart-items");
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error("Error loading cart from localStorage:", error);
    return [];
  }
};

const saveToLocalStorage = (items: CartItem[]) => {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem("cart-items", JSON.stringify(items));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: loadFromLocalStorage(),
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: 1 }];
      }
      saveToLocalStorage(newItems);
      return { items: newItems };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems = state.items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
      saveToLocalStorage(newItems);
      return { items: newItems };
    }),
  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      saveToLocalStorage(newItems);
      return { items: newItems };
    }),
  clearCart: () =>
    set(() => {
      saveToLocalStorage([]);
      return { items: [] };
    }),
  getTotalItemCount: () =>
    get().items.reduce((sum, item) => sum + item.quantity, 0),
}));
