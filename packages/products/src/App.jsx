import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { store, setSelectedCategory } from './store';
import './styles.css';

class ProductCard extends Component {
  render() {
    const { product, onAddToCart } = this.props;
    
    return (
      <div className="product-card">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">${product.price}</span>
            <button
              className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
              onClick={() => onAddToCart(product)}
              disabled={!product.inStock}
            >
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class ProductsList extends Component {
  handleAddToCart = (product) => {
    // 尝试使用 Host 应用的购物车 API
    if (window.__MF_CART_API__) {
      window.__MF_CART_API__.addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      });
    } else {
      // 降级方案：使用 localStorage
      const cartItems = JSON.parse(
        localStorage.getItem('cart-storage') || '{"state":{"items":[]}}'
      );
      const existingItem = cartItems.state.items.find(
        (item) => item.id === product.id
      );
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cartItems.state.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: 1,
        });
      }
      
      localStorage.setItem('cart-storage', JSON.stringify(cartItems));
      alert(`${product.name} added to cart!`);
    }
  };

  render() {
    const { products, selectedCategory, setSelectedCategory } = this.props;
    
    const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
    const filteredProducts = selectedCategory === 'All' 
      ? products 
      : products.filter(p => p.category === selectedCategory);

    return (
      <div className="products-container">
        <div className="products-header">
          <h1>Products (React 16 + Redux)</h1>
          <p className="tech-stack">🔧 Tech Stack: React 16.14 + Redux Toolkit + Class Components + JavaScript</p>
        </div>
        
        <div className="category-filter">
          <label>Filter by category: </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={this.handleAddToCart}
            />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products.products,
  selectedCategory: state.products.selectedCategory,
});

const mapDispatchToProps = {
  setSelectedCategory,
};

const ConnectedProductsList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app">
          <ConnectedProductsList />
        </div>
      </Provider>
    );
  }
}

export default App;