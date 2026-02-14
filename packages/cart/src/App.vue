<template>
  <div class="cart-container">
    <div class="cart-header">
      <h1>Shopping Cart (Vue 3 + Pinia)</h1>
      <p class="tech-stack">🔧 Tech Stack: Vue 3.3 + Pinia + Composition API</p>
    </div>

    <div v-if="cartItems.length === 0" class="empty-cart">
      <div class="empty-cart-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Add some products to get started!</p>
      <button @click="goToProducts" class="shop-now-btn">
        Shop Now
      </button>
    </div>

    <div v-else class="cart-content">
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.id" 
          class="cart-item"
        >
          <img :src="item.image || 'https://via.placeholder.com/80x80'" :alt="item.name" class="item-image">
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">${{ item.price }}</p>
          </div>
          <div class="quantity-controls">
            <button @click="decreaseQuantity(item.id)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.id)" class="quantity-btn">+</button>
          </div>
          <div class="item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeItem(item.id)" class="remove-btn">
            ✕
          </button>
        </div>
      </div>

      <div class="cart-summary">
        <div class="summary-row">
          <span>Total Items:</span>
          <span>{{ totalItems }}</span>
        </div>
        <div class="summary-row">
          <span>Subtotal:</span>
          <span>${{ totalPrice.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Tax (8.5%):</span>
          <span>${{ (totalPrice * 0.085).toFixed(2) }}</span>
        </div>
        <div class="summary-row total-row">
          <span>Total:</span>
          <span>${{ (totalPrice * 1.085).toFixed(2) }}</span>
        </div>
        <div class="cart-actions">
          <button @click="clearCart" class="clear-btn">Clear Cart</button>
          <button @click="checkout" class="checkout-btn">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useCartStore } from './store';
import { CartStorageData } from '../../shared/src/types';

const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const totalItems = computed(() => Number(cartStore.getTotalItems));
const totalPrice = computed(() => Number(cartStore.getTotalPrice));

const increaseQuantity = (id: string): void => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item) {
    cartStore.updateQuantity(id, item.quantity + 1);
  }
};

const decreaseQuantity = (id: string): void => {
  const item = cartItems.value.find((item) => item.id === id);
  if (item && item.quantity > 1) {
    cartStore.updateQuantity(id, item.quantity - 1);
  }
};

const removeItem = (id: string): void => {
  cartStore.removeItem(id);
};

const clearCart = (): void => {
  if (confirm('Are you sure you want to clear your cart?')) {
    cartStore.clearCart();
  }
};

const checkout = (): void => {
  alert(`Checkout completed! Total: $${(totalPrice.value * 1.085).toFixed(2)}`);
  cartStore.clearCart();
};

const goToProducts = (): void => {
  // 通知 Host 应用导航到产品页面
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'NAVIGATE', path: '/products' }, '*');
  } else {
    window.location.href = '/products';
  }
};

// 监听来自其他应用的购物车更新
onMounted(() => {
  // 设置全局 API 供其他应用调用
  (window as Window).__MF_CART_API__ = {
    addItem: (item: { id: string; name: string; price: number; image?: string }) => {
      cartStore.addItem(item);
    },
    removeItem: (id: string) => {
      cartStore.removeItem(id);
    },
    getItems: () => {
      return cartStore.items;
    },
    getTotalItems: () => {
      return Number(cartStore.getTotalItems);
    }
  };

  // 监听 localStorage 变化（降级方案）
  const handleStorageChange = (): void => {
    try {
      const stored: string | null = localStorage.getItem('cart-storage');
      if (stored) {
        const data: CartStorageData = JSON.parse(stored);
        if (data.state && data.state.items) {
          // 同步 localStorage 数据到 Pinia store
          cartStore.$patch({ items: data.state.items });
        }
      }
    } catch (error: unknown) {
      console.error('Error syncing cart from localStorage:', error);
    }
  };

  window.addEventListener('storage', handleStorageChange);
  
  // 初始加载时同步一次
  handleStorageChange();
});

// 监听 Pinia store 变化，同步到 localStorage
watch(
  () => cartStore.items,
  (newItems) => {
    try {
      const cartData: CartStorageData = {
        state: { items: newItems },
      };
      localStorage.setItem('cart-storage', JSON.stringify(cartData));
      
      // 触发自定义事件通知 Host 应用更新
      window.dispatchEvent(new CustomEvent('cart-updated'));
    } catch (error: unknown) {
      console.error('Error saving cart to localStorage:', error);
    }
  },
  { deep: true }
);
</script>

<style scoped>
.cart-container {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.cart-header {
  text-align: center;
  margin-bottom: 30px;
}

.cart-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.tech-stack {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-block;
  font-size: 0.9rem;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-cart-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-cart h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.shop-now-btn {
  background: #42b883;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.2s;
}

.shop-now-btn:hover {
  background: #369870;
}

.cart-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 80px 1fr auto auto auto;
  gap: 16px;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.item-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.item-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
  color: #333;
}

.item-price {
  color: #666;
  margin: 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: background-color 0.2s;
}

.quantity-btn:hover {
  background: #f5f5f5;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
}

.item-total {
  font-weight: 600;
  color: #059669;
  font-size: 1.1rem;
}

.remove-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #ef4444;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.remove-btn:hover {
  background: #dc2626;
}

.cart-summary {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  height: fit-content;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 8px 0;
}

.total-row {
  border-top: 2px solid #e5e7eb;
  font-weight: 700;
  font-size: 1.2rem;
  color: #059669;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.clear-btn, .checkout-btn {
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.clear-btn {
  background: #f3f4f6;
  color: #374151;
}

.clear-btn:hover {
  background: #e5e7eb;
}

.checkout-btn {
  background: #059669;
  color: white;
}

.checkout-btn:hover {
  background: #047857;
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }
  
  .cart-item {
    grid-template-columns: 60px 1fr auto;
    gap: 12px;
  }
  
  .item-total, .remove-btn {
    grid-column: 2 / 4;
    justify-self: end;
  }
}
</style>