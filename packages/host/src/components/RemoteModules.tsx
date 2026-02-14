import React from 'react';
import { VueWrapper } from './VueWrapper';

// 远程模块不可用时的降级组件
const ModuleNotAvailable: React.FC<{
  moduleName: string;
  port: number;
  description: string;
}> = ({ moduleName, port, description }) => (
  <div className="p-8 text-center">
    <h2 className="text-xl font-semibold text-orange-600 mb-2">
      {moduleName} module not available
    </h2>
    <p className="text-gray-600 mb-4">{description}</p>
    <p className="text-sm text-gray-500">
      Start the {moduleName.toLowerCase()} service on port {port} to enable this feature
    </p>
  </div>
);

// 动态加载远程模块，支持降级处理
export const ProductsApp = React.lazy(() =>
  import('products/App').catch(() => ({
    default: () => (
      <ModuleNotAvailable
        moduleName="Products"
        port={3001}
        description="Browse and add products to your cart. This module uses React 16 + Redux."
      />
    )
  }))
);

// Cart 是 Vue 组件，需要特殊处理
export const CartApp = React.lazy(() =>
  import('cart/CartAppWrapper')
    .then((module) => ({
      default: () => <VueWrapper createApp={module.createCartApp} />
    }))
    .catch(() => ({
      default: () => (
        <ModuleNotAvailable
          moduleName="Cart"
          port={3002}
          description="Manage your shopping cart. This module uses Vue 3 + Pinia."
        />
      )
    }))
);