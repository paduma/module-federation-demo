import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Welcome to Micro-Frontend Demo
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          This is a demonstration of Webpack 5 Module Federation with different tech stacks
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">🛍️ Products Module</h3>
            <p className="text-gray-600 mb-2">
              Browse and add products to your cart. This module is loaded dynamically from a separate application.
            </p>
            <p className="text-sm text-blue-600 font-medium mb-4">
              Tech Stack: React 16 + Redux + Class Components
            </p>
            <Link 
              to="/products" 
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              View Products
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border">
            <h3 className="text-xl font-semibold mb-4">🛒 Cart Module</h3>
            <p className="text-gray-600 mb-2">
              Manage your shopping cart. State is shared across all micro-frontends.
            </p>
            <p className="text-sm text-green-600 font-medium mb-4">
              Tech Stack: Vue 3 + Pinia + Composition API
            </p>
            <Link 
              to="/cart" 
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              View Cart
            </Link>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">🏗️ Architecture Highlights</h3>
          <div className="grid md:grid-cols-4 gap-4 text-sm">
            <div>
              <strong>Module Federation:</strong> Dynamic remote loading
            </div>
            <div>
              <strong>Multi-Framework:</strong> React 16/18 + Vue 3
            </div>
            <div>
              <strong>State Management:</strong> Redux + Pinia + Zustand
            </div>
            <div>
              <strong>Routing:</strong> React Router v6 integration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};