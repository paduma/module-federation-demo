# Module Federation 微前端演示项目

**中文** | [English](README.md)

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/paduma/module-federation-demo)

一个基于 Webpack 5 Module Federation 的微前端示例项目，展示了 React 18、React 16 和 Vue 3 的跨框架集成。

## ✨ 特性

- 🚀 **Module Federation** - 运行时动态加载远程模块
- 🎯 **跨框架集成** - React 18 + React 16 + Vue 3 混合使用
- 🔄 **实时状态同步** - 跨框架状态实时同步
- 📦 **独立部署** - 每个微前端可独立部署
- 🛡️ **类型安全** - 完整的 TypeScript 支持
- ⚡ **热模块替换** - 快速的开发体验

## 🏗️ 架构

```
┌─────────────────────────────────────────┐
│              主应用                      │
│         (React 18 + TypeScript)         │
│                                         │
│  ┌─────────────┐    ┌──────────────┐  │
│  │  商品应用   │    │  购物车应用  │  │
│  │  (React 16) │    │   (Vue 3)    │  │
│  │             │    │              │  │
│  │  - Redux    │    │  - Pinia     │  │
│  │  - 远程模块 │    │  - 远程模块  │  │
│  └─────────────┘    └──────────────┘  │
│                                         │
│         Module Federation               │
└─────────────────────────────────────────┘
```

## 📦 项目结构

```
module-federation-demo/
├── packages/
│   ├── host/          # 主应用 (React 18 + TypeScript)
│   ├── products/      # 商品应用 (React 16 + JavaScript)
│   ├── cart/          # 购物车应用 (Vue 3 + TypeScript)
│   └── shared/        # 共享类型和组件
└── README.md          # 本文件
```

## 🚀 快速开始

### 环境要求

- Node.js >= 16.0.0
- npm >= 8.0.0

### 安装依赖

```bash
# 安装所有依赖
npm install
```

### 开发模式

```bash
# 启动所有微前端应用
npm run dev
```

这将启动：

- **主应用**: http://localhost:4000
- **商品应用**: http://localhost:3001
- **购物车应用**: http://localhost:3002

### 功能演示

1. 打开 http://localhost:4000
2. 导航到"Products"页面
3. 点击任意商品的"Add to Cart"按钮
4. 观察导航栏中的购物车数量实时更新 ✨
5. 点击"Cart"查看购物车详情

## 🌐 在线演示

[![在 StackBlitz 中打开](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/paduma/module-federation-demo)

点击上方徽章，在浏览器中立即体验！

## 🛠️ 技术栈

### 主应用 (Host)

- React 18.3.1 + TypeScript
- React Router 6.20.1
- Zustand（状态管理）
- Tailwind CSS
- Webpack 5 Module Federation

### 商品应用 (Products)

- React 16.14.0 + JavaScript
- Redux（状态管理）
- Webpack 5 Module Federation

### 购物车应用 (Cart)

- Vue 3.5.28 + TypeScript
- Pinia（状态管理）
- Composition API
- Webpack 5 Module Federation

## 🌿 分支策略

本项目使用多个分支满足不同需求：

- **`main`** - 主开发分支
- **`demo/stackblitz`** - StackBlitz 在线演示

## 🔧 构建

```bash
# 构建所有应用
npm run build
```

## 📖 核心概念

### Module Federation

Webpack 5 的 Module Federation 允许多个独立构建组成一个应用。每个微前端可以独立开发和部署。

### 跨框架状态同步

本项目演示了 React (Zustand) 和 Vue (Pinia) 之间的实时状态同步，使用：

- localStorage 作为数据层
- 自定义事件实现同一标签页内同步
- Storage 事件实现跨标签页同步

想深入了解实现原理？敬请期待即将推出的课程！🎓

## 🤝 贡献

欢迎贡献！请随时提交 Pull Request。

## 📄 许可证

MIT

## 👤 作者

**Brook** ([@paduma](https://github.com/paduma))

## 🙏 致谢

- Webpack Module Federation 团队
- React 和 Vue 社区
- 所有贡献者

---

**最后更新**: 2026-03-22  
**状态**: ✅ 演示就绪 | 🎓 教学用途
