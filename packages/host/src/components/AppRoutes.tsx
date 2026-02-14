import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ProductsApp, CartApp } from './RemoteModules';
import { Loading } from './ui';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/products/*" 
        element={
          <Suspense fallback={<div className="p-8"><Loading size="lg" /></div>}>
            <ProductsApp />
          </Suspense>
        } 
      />
      <Route 
        path="/cart/*" 
        element={
          <Suspense fallback={<div className="p-8"><Loading size="lg" /></div>}>
            <CartApp />
          </Suspense>
        } 
      />
    </Routes>
  );
};