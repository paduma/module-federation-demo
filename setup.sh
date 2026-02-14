#!/bin/bash

echo "🚀 Setting up Micro-Frontend Demo..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install dependencies for all packages
echo "📦 Installing package dependencies..."

cd packages/shared
npm install
cd ../..

cd packages/host  
npm install
cd ../..

cd packages/products
npm install
cd ../..

cd packages/cart
npm install
cd ../..

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Run 'npm run dev' to start all applications"
echo "2. Open http://localhost:3000 in your browser"
echo ""
echo "📱 Application URLs:"
echo "- Host App: http://localhost:3000"
echo "- Products App: http://localhost:3001" 
echo "- Cart App: http://localhost:3002"