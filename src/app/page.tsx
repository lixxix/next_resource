import DebugThemeToggle from "@/components/DebugThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <DebugThemeToggle />
      
      <div className="container mx-auto px-4 py-8">
        {/* 测试区域 */}
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            暗色模式测试页面
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 卡片1 */}
            <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                测试卡片 1
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                这是一个测试卡片，用来验证暗色模式是否正常工作。
              </p>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded">
                测试按钮
              </button>
            </div>
            
            {/* 卡片2 */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                测试卡片 2
              </h2>
              <ul className="space-y-2">
                <li className="text-gray-700 dark:text-gray-300">✓ 背景颜色切换</li>
                <li className="text-gray-700 dark:text-gray-300">✓ 文字颜色切换</li>
                <li className="text-gray-700 dark:text-gray-300">✓ 边框颜色切换</li>
                <li className="text-gray-700 dark:text-gray-300">✓ 按钮颜色切换</li>
              </ul>
            </div>
          </div>
          
          {/* 表单测试 */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              表单元素测试
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  输入框测试
                </label>
                <input
                  type="text"
                  placeholder="输入一些文字..."
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  选择框测试
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                  <option>选项 1</option>
                  <option>选项 2</option>
                  <option>选项 3</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}