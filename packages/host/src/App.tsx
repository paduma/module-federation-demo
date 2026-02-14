import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { AppRoutes } from './components/AppRoutes';
import './styles.css';

// 类型声明文件会被 TypeScript 自动识别，无需导入

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
};

export default App;