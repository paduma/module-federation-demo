// 微前端全局类型定义

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

// 跨应用通信接口
export interface MicroFrontendCartAPI {
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  getItems: () => CartItem[];
  getTotalItems: () => number;
}

// PostMessage 通信类型
export interface NavigationMessage {
  type: 'NAVIGATE';
  path: string;
}

export interface CartUpdateMessage {
  type: 'CART_UPDATE';
  items: CartItem[];
}

export type MicroFrontendMessage = NavigationMessage | CartUpdateMessage;

// localStorage 数据结构
export interface CartStorageData {
  state: {
    items: CartItem[];
  };
  version?: number;
}