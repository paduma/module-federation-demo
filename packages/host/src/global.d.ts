/// <reference types="react" />
/// <reference types="react-dom" />

// 微前端通信接口类型
interface MicroFrontendCartAPI {
  addItem: (item: { id: string; name: string; price: number; image?: string }) => void;
  removeItem: (id: string) => void;
  getItems: () => Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
  getTotalItems: () => number;
}

interface NavigationMessage {
  type: 'NAVIGATE';
  path: string;
}

interface CartUpdateMessage {
  type: 'CART_UPDATE';
  items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>;
}

type MicroFrontendMessage = NavigationMessage | CartUpdateMessage;

// Module Federation 远程模块类型声明
declare module 'products/App' {
  import { ComponentType } from 'react';
  const ProductsApp: ComponentType;
  export default ProductsApp;
}

declare module 'cart/App' {
  import { ComponentType } from 'react';
  const CartApp: ComponentType;
  export default CartApp;
}

declare module 'cart/CartAppWrapper' {
  export function createCartApp(container: Element): any;
  const wrapper: {
    App: any;
    createCartApp: (container: Element) => any;
  };
  export default wrapper;
}

// 扩展 Window 接口
declare global {
  interface Window {
    // 微前端购物车 API
    __MF_CART_API__?: MicroFrontendCartAPI;

    // PostMessage 通信
    addEventListener(
      type: 'message',
      listener: (event: MessageEvent<MicroFrontendMessage>) => void
    ): void;
  }
}