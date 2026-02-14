import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

/**
 * 创建并返回一个配置好的 Vue 应用工厂函数
 * 用于在 React Host 中正确初始化 Cart 应用
 */
export function createCartApp(container: Element) {
  const app = createApp(App);
  const pinia = createPinia();

  app.use(pinia);
  app.mount(container);
  return app;
}

// 默认导出 App 组件和创建函数
export default {
  App,
  createCartApp,
};
