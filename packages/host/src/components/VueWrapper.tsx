import React, { useEffect, useRef, useState } from 'react';

interface VueWrapperProps {
  createApp: (container: Element) => any;
}

/**
 * Vue 组件包装器（改进版），用于在 React 应用中渲染 Vue 组件
 * 
 * 改进点：
 * - 添加错误处理和恢复机制
 * - 优化挂载/卸载时序，避免内存泄漏
 * - 添加加载状态显示
 * - 更健壮的生命周期管理
 */
export const VueWrapper: React.FC<VueWrapperProps> = ({ createApp }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const vueAppRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const mountTimeoutRef = useRef<NodeJS.Timeout>();
  const unmountTimeoutRef = useRef<NodeJS.Timeout>();
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;

    const mountApp = async () => {
      if (!containerRef.current) return;

      try {
        // 清除之前的超时
        if (mountTimeoutRef.current) {
          clearTimeout(mountTimeoutRef.current);
        }

        // 延迟挂载，确保 DOM 完全准备好
        await new Promise(resolve => {
          mountTimeoutRef.current = setTimeout(resolve, 50);
        });

        if (!isMountedRef.current || !containerRef.current) return;

        // 创建并挂载 Vue 应用
        const app = createApp(containerRef.current);

        if (!isMountedRef.current) {
          // 如果组件已卸载，立即清理
          app.unmount();
          return;
        }

        vueAppRef.current = app;
        setIsReady(true);
        setError(null);
      } catch (err) {
        console.error('Error mounting Vue component:', err);
        if (isMountedRef.current) {
          setError(err as Error);
        }
      }
    };

    mountApp();

    // 清理函数
    return () => {
      isMountedRef.current = false;
      setIsReady(false);

      // 清除挂载超时
      if (mountTimeoutRef.current) {
        clearTimeout(mountTimeoutRef.current);
      }

      // 延迟卸载，确保所有异步操作完成
      if (vueAppRef.current) {
        const appToUnmount = vueAppRef.current;
        vueAppRef.current = null;

        unmountTimeoutRef.current = setTimeout(() => {
          try {
            appToUnmount.unmount();
          } catch (err) {
            console.error('Error unmounting Vue component:', err);
          }
        }, 100);
      }
    };
  }, [createApp]);

  // 清理卸载超时
  useEffect(() => {
    return () => {
      if (unmountTimeoutRef.current) {
        clearTimeout(unmountTimeoutRef.current);
      }
    };
  }, []);

  if (error) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h3 style={{ color: '#ff4d4f', marginBottom: '16px' }}>Vue 组件加载失败</h3>
        <p style={{ color: '#666', marginBottom: '24px' }}>{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          style={{
            padding: '10px 24px',
            backgroundColor: '#1890ff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          刷新页面
        </button>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        opacity: isReady ? 1 : 0.3,
        transition: 'opacity 0.3s ease-in-out'
      }}
    />
  );
};
