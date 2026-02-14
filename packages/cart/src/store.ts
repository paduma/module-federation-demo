import { defineStore } from 'pinia';
import { CartItem } from '../../shared/src/types';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),
  
  getters: {
    getTotalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    
    getTotalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    }
  },
  
  actions: {
    addItem(item: Omit<CartItem, 'quantity'>) {
      const existingItem = this.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },
    
    removeItem(id: string) {
      const index = this.items.findIndex(item => item.id === id);
      if (index > -1) {
        this.items.splice(index, 1);
      }
    },
    
    updateQuantity(id: string, quantity: number) {
      if (quantity <= 0) {
        this.removeItem(id);
        return;
      }
      
      const item = this.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    
    clearCart() {
      this.items = [];
    }
  }
});