import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: '1',
      name: 'MacBook Pro 16"',
      price: 2499,
      description: 'Powerful laptop for professionals',
      image: 'https://via.placeholder.com/300x200?text=MacBook+Pro',
      category: 'Electronics',
      inStock: true,
    },
    {
      id: '2',
      name: 'iPhone 15 Pro',
      price: 999,
      description: 'Latest iPhone with advanced features',
      image: 'https://via.placeholder.com/300x200?text=iPhone+15',
      category: 'Electronics',
      inStock: true,
    },
    {
      id: '3',
      name: 'Nike Air Max',
      price: 129,
      description: 'Comfortable running shoes',
      image: 'https://via.placeholder.com/300x200?text=Nike+Shoes',
      category: 'Fashion',
      inStock: false,
    },
    {
      id: '4',
      name: 'Coffee Maker',
      price: 89,
      description: 'Automatic drip coffee maker',
      image: 'https://via.placeholder.com/300x200?text=Coffee+Maker',
      category: 'Home',
      inStock: true,
    },
  ],
  loading: false,
  error: null,
  selectedCategory: 'All',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateProductStock: (state, action) => {
      const product = state.products.find(p => p.id === action.payload.id);
      if (product) {
        product.inStock = action.payload.inStock;
      }
    },
  },
});

export const { setLoading, setError, setSelectedCategory, updateProductStock } = productsSlice.actions;

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});