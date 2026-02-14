import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../../../shared/src/types';

interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  syncFromStorage: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          };
        }
        return { items: [...state.items, { ...item, quantity: 1 }] };
      }),

      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),

      updateQuantity: (id, quantity) => set((state) => ({
        items: quantity <= 0
          ? state.items.filter(item => item.id !== id)
          : state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
      })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      syncFromStorage: () => {
        try {
          const stored = localStorage.getItem('cart-storage');
          if (stored) {
            const data = JSON.parse(stored);
            if (data.state && data.state.items) {
              set({ items: data.state.items });
            }
          }
        } catch (error) {
          console.error('Error syncing cart from localStorage:', error);
        }
      }
    }),
    { name: 'cart-storage' }
  )
);

// 监听 localStorage 变化，同步到 Zustand store
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e) => {
    if (e.key === 'cart-storage' && e.newValue) {
      try {
        const data = JSON.parse(e.newValue);
        if (data.state && data.state.items) {
          useCartStore.setState({ items: data.state.items });
        }
      } catch (error) {
        console.error('Error syncing cart from storage event:', error);
      }
    }
  });

  // 自定义事件监听（用于同一标签页内的更新）
  window.addEventListener('cart-updated', () => {
    useCartStore.getState().syncFromStorage();
  });
}