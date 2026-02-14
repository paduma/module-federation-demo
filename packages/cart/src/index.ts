// 异步导入 bootstrap 以确保共享模块正确加载
import('./bootstrap').catch(err => console.error('Error loading bootstrap:', err));
