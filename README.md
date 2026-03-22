# Module Federation Micro-Frontend Demo

[中文](README.zh.md) | **English**

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/paduma/module-federation-demo?file=README.md)

A micro-frontend demo project using Webpack 5 Module Federation, showcasing cross-framework integration with React 18, React 16, and Vue 3.

## ✨ Features

- 🚀 **Module Federation** - Runtime dynamic loading of remote modules
- 🎯 **Cross-Framework** - React 18 + React 16 + Vue 3 integration
- 🔄 **Real-time State Sync** - Cross-framework state synchronization
- 📦 **Independent Deployment** - Each micro-frontend can be deployed independently
- 🛡️ **Type Safety** - Full TypeScript support
- ⚡ **Hot Module Replacement** - Fast development experience

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│           Host Application              │
│         (React 18 + TypeScript)         │
│                                         │
│  ┌─────────────┐    ┌──────────────┐  │
│  │  Products   │    │    Cart      │  │
│  │  (React 16) │    │   (Vue 3)    │  │
│  │             │    │              │  │
│  │  - Redux    │    │  - Pinia     │  │
│  │  - Remote   │    │  - Remote    │  │
│  └─────────────┘    └──────────────┘  │
│                                         │
│         Module Federation               │
└─────────────────────────────────────────┘
```

## 📦 Project Structure

```
module-federation-demo/
├── packages/
│   ├── host/          # Host app (React 18 + TypeScript)
│   ├── products/      # Products app (React 16 + JavaScript)
│   ├── cart/          # Cart app (Vue 3 + TypeScript)
│   └── shared/        # Shared types and components
└── README.md          # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

```bash
# Install all dependencies
npm install
```

### Development

```bash
# Start all micro-frontends
npm run dev
```

This will start:

- **Host**: http://localhost:4000
- **Products**: http://localhost:3001
- **Cart**: http://localhost:3002

### Try It Out

1. Open http://localhost:4000
2. Navigate to "Products" page
3. Click "Add to Cart" on any product
4. Watch the cart count update in real-time in the navigation bar ✨
5. Click "Cart" to view your shopping cart

## 🌐 Online Demo

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/paduma/module-federation-demo?file=README.md)

Click the badge above to try it out instantly in your browser!

## 🛠️ Tech Stack

### Host Application

- React 18.3.1 + TypeScript
- React Router 6.20.1
- Zustand (State Management)
- Tailwind CSS
- Webpack 5 Module Federation

### Products Application

- React 16.14.0 + JavaScript
- Redux (State Management)
- Webpack 5 Module Federation

### Cart Application

- Vue 3.5.28 + TypeScript
- Pinia (State Management)
- Composition API
- Webpack 5 Module Federation

## 🌿 Branch Strategy

This project uses multiple branches for different purposes:

- **`main`** - Main development branch
- **`demo/stackblitz`** - StackBlitz online demo

## 🔧 Build

```bash
# Build all applications
npm run build
```

## 📖 Key Concepts

### Module Federation

Webpack 5's Module Federation allows multiple separate builds to form a single application. Each micro-frontend can be developed and deployed independently.

### Cross-Framework State Sync

This project demonstrates real-time state synchronization between React (Zustand) and Vue (Pinia) using:

- localStorage as the data layer
- Custom events for same-tab synchronization
- Storage events for cross-tab synchronization

Want to learn how this works in detail? Stay tuned for the upcoming course! 🎓

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 👤 Author

**Brook** ([@paduma](https://github.com/paduma))

## 🙏 Acknowledgments

- Webpack Module Federation team
- React and Vue communities
- All contributors

---

**Last Updated**: 2026-02-14  
**Status**: ✅ Demo Ready | 🎓 Educational Purpose
