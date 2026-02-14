/**
 * 微前端应用桥接层
 * 
 * 提供跨框架的状态管理和通信机制
 * 支持 React、Vue 等不同框架的微前端应用
 */

import type { CartItem } from './types';

// 状态类型定义
interface AppState {
  cart: {
    items: CartItem[];
  };
}

// 监听器类型
type Listener<T = any> = (state: T) => void;
type Unsubscribe = () => void;

/**
 * 微前端桥接类
 * 
 * 核心功能：
 * 1. 集中式状态管理
 * 2. 发布订阅模式
 * 3. 框架无关的 API
 */
class MicroAppBridge {
  private listeners: Map<string, Set<Listener>> = new Map();
  private state: AppState = {
    cart: {
      items: [],
    },
  };

  /**
   * 订阅状态变化
   * 
   * @param key - 状态键名
   * @param callback - 状态变化时的回调函数
   * @returns 取消订阅的函数
   */
  subscribe<K extends keyof AppState>(
    key: K,
    callback: Listener<AppState[K]>
  ): Unsubscribe {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    this.listeners.get(key)!.add(callback);

    // 立即调用一次，传递当前状态
    callback(this.state[key]);

    // 返回取消订阅函数
    return () => {
      this.listeners.get(key)?.delete(callback);
    };
  }

  /**
   * 更新状态并通知所有订阅者
   * 
   * @param key - 状态键名
   * @param updater - 状态更新函数或新状态值
   */
  setState<K extends keyof AppState>(
    key: K,
    updater: ((prevState: AppState[K]) => AppState[K]) | AppState[K]
  ): void {
    const oldValue = this.state[key];

    // 支持函数式更新和直接赋值
    this.state[key] =
      typeof updater === 'function'
        ? (updater as Function)(oldValue)
        : updater;

    // 通知所有订阅者
    this.listeners.get(key)?.forEach((callback) => {
      callback(this.state[key]);
    });
  }

  /**
   * 获取当前状态
   * 
   * @param key - 状态键名
   * @returns 当前状态值
   */
  getState<K extends keyof AppState>(key: K): AppState[K] {
    return this.state[key];
  }

  /**
   * 购物车操作 - 添加商品
   */
  addCartItem(item: Omit<CartItem, 'quantity'>): void {
    this.setState('cart', (cart) => {
      const existingItem = cart.items.find((i) => i.id === item.id);

      if (existingItem) {
        // 商品已存在，增加数量
        return {
          items: cart.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        // 新商品，添加到列表
        return {
          items: [...cart.items, { ...item, quantity: 1 }],
        };
      }
    });
  }

  /**
   * 购物车操作 - 移除商品
   */
  removeCartItem(id: string): void {
    this.setState('cart', (cart) => ({
      items: cart.items.filter((item) => item.id !== id),
    }));
  }

  /**
   * 购物车操作 - 更新商品数量
   */
  updateCartItemQuantity(id: string, quantity: number): void {
    this.setState('cart', (cart) => {
      if (quantity <= 0) {
        // 数量为 0，移除商品
        return {
          items: cart.items.filter((item) => item.id !== id),
        };
      } else {
        // 更新数量
        return {
          items: cart.items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        };
      }
    });
  }

  /**
   * 购物车操作 - 清空购物车
   */
  clearCart(): void {
    this.setState('cart', { items: [] });
  }

  /**
   * 购物车计算 - 获取总商品数量
   */
  getCartTotalItems(): number {
    return this.state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }

  /**
   * 购物车计算 - 获取总价格
   */
  getCartTotalPrice(): number {
    return this.state.cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  /**
   * 调试方法 - 打印当前状态
   */
  debug(): void {
    console.log('[MicroAppBridge] Current State:', this.state);
    console.log('[MicroAppBridge] Listeners:', {
      cart: this.listeners.get('cart')?.size || 0,
    });
  }
}

// 导出单例实例
export const bridge = new MicroAppBridge();

// 开发环境下暴露到 window 便于调试
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).__MICRO_APP_BRIDGE__ = bridge;
}
