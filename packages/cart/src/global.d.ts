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

// Cart 应用全局类型扩展
declare global {
  interface Window {
    __MF_CART_API__?: MicroFrontendCartAPI;

    // PostMessage 通信
    parent: Window & {
      postMessage(message: MicroFrontendMessage, targetOrigin: string): void;
    };
  }
}

export { };