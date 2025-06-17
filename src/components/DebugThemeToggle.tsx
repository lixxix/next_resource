/* 
   调试用的简单主题切换组件
   将此组件暂时放在页面中来测试暗色模式是否工作
*/

'use client';

import { useEffect, useState } from 'react';

export default function DebugThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 检查当前主题
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    console.log('切换主题到:', newTheme ? 'dark' : 'light');
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    // 调试信息
    console.log('HTML classes:', document.documentElement.classList.toString());
    console.log('Body computed style:', getComputedStyle(document.body).backgroundColor);
  };

  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg">
      <h3 className="text-sm font-bold mb-2 text-gray-900 dark:text-white">
        调试主题切换
      </h3>
      
      {/* 测试不同的暗色模式样式 */}
      <div className="space-y-2 text-xs">
        <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded">
          <span className="text-gray-800 dark:text-gray-200">
            背景测试区域
          </span>
        </div>
        
        <div className="p-2 border border-gray-300 dark:border-gray-600 rounded">
          <span className="text-blue-600 dark:text-blue-400">
            边框和文字测试
          </span>
        </div>
        
        <button
          onClick={toggleTheme}
          className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded text-sm font-medium transition-colors"
        >
          {isDark ? '切换到浅色模式' : '切换到深色模式'}
        </button>
        
        <div className="text-xs text-gray-600 dark:text-gray-400">
          当前模式: {isDark ? '深色' : '浅色'}
        </div>
      </div>
    </div>
  );
}