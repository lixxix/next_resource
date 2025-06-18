import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// 模拟新闻数据
const newsData = [
  {
    id: 1,
    title: "苹果发布全新 MacBook Pro，搭载 M4 芯片",
    publishDate: "2025-06-15",
    summary: "苹果公司在WWDC上发布了搭载M4芯片的全新MacBook Pro，性能提升显著...",
    category: "硬件"
  },
  {
    id: 2,
    title: "OpenAI 推出 GPT-5，AI 能力再次突破",
    publishDate: "2025-06-12",
    summary: "OpenAI正式发布GPT-5模型，在推理和创造性任务上表现出色...",
    category: "人工智能"
  },
  {
    id: 3,
    title: "特斯拉 FSD 完全自动驾驶功能正式上线",
    publishDate: "2025-06-08",
    summary: "特斯拉宣布其完全自动驾驶功能正式向所有车主开放...",
    category: "自动驾驶"
  },
  {
    id: 4,
    title: "微软 Azure 推出新一代云计算服务",
    publishDate: "2025-05-28",
    summary: "微软Azure发布了新的云计算基础设施，性能和安全性大幅提升...",
    category: "云计算"
  },
  {
    id: 5,
    title: "谷歌 Pixel 9 系列正式发布",
    publishDate: "2025-05-20",
    summary: "谷歌发布了Pixel 9系列智能手机，搭载最新的Tensor G4芯片...",
    category: "移动设备"
  },
  {
    id: 6,
    title: "Meta 发布新一代 VR 头显 Quest 4",
    publishDate: "2025-05-15",
    summary: "Meta推出Quest 4 VR头显，带来更高分辨率和更轻的重量...",
    category: "虚拟现实"
  },
  {
    id: 7,
    title: "英伟达发布 RTX 5090 显卡",
    publishDate: "2025-04-25",
    summary: "英伟达正式发布RTX 5090显卡，AI性能和游戏性能都有大幅提升...",
    category: "硬件"
  },
  {
    id: 8,
    title: "SpaceX 星际飞船成功登陆火星",
    publishDate: "2025-04-18",
    summary: "SpaceX的星际飞船首次成功登陆火星，标志着人类太空探索新纪元...",
    category: "航天科技"
  },
  {
    id: 9,
    title: "量子计算机首次实现商业化应用",
    publishDate: "2025-04-10",
    summary: "IBM的量子计算机在金融风险分析领域实现首次商业化应用...",
    category: "量子计算"
  },
  {
    id: 10,
    title: "华为发布鸿蒙 OS 5.0",
    publishDate: "2025-03-22",
    summary: "华为正式发布鸿蒙OS 5.0，进一步完善生态系统建设...",
    category: "操作系统"
  }
];

// 按月份分组新闻
function groupNewsByMonth(news: typeof newsData) {
  const grouped = news.reduce((acc, item) => {
    const date = new Date(item.publishDate);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
    
    if (!acc[monthKey]) {
      acc[monthKey] = {
        name: monthName,
        items: []
      };
    }
    
    acc[monthKey].items.push(item);
    return acc;
  }, {} as Record<string, { name: string; items: typeof newsData }>);

  // 按月份排序（最新的在前）
  return Object.entries(grouped)
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([key, value]) => ({ key, ...value }));
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric'
  });
}

// 获取类别颜色
function getCategoryColor(category: string) {
  const colors: Record<string, string> = {
    '硬件': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    '人工智能': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    '自动驾驶': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    '云计算': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
    '移动设备': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    '虚拟现实': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    '航天科技': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    '量子计算': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    '操作系统': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
  };
  
  return colors[category] || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
}

export default function NewsPage() {
  const groupedNews = groupNewsByMonth(newsData);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              科技新闻
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              最新的科技资讯和行业动态
            </p>
          </div>

          {/* 按月份分组的新闻列表 */}
          <div className="space-y-8">
            {groupedNews.map((monthGroup) => (
              <div key={monthGroup.key}>
                {/* 月份标题 */}
                <div className="flex items-center mb-6">
                  <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {monthGroup.name}
                  </h2>
                  <div className="ml-3 flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                  <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
                    {monthGroup.items.length} 篇文章
                  </span>
                </div>

                {/* 该月份的新闻列表 */}
                <div className="grid gap-4">
                  {monthGroup.items.map((news) => (
                    <Link
                      key={news.id}
                      href={`/news/${news.id}`}
                      className="group block"
                    >
                      <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:hover:shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-all duration-200 hover:border-blue-300 dark:hover:border-blue-600">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            {/* 新闻标题 */}
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                              {news.title}
                            </h3>
                            
                            {/* 新闻摘要 */}
                            <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                              {news.summary}
                            </p>
                            
                            {/* 发布日期和分类 */}
                            <div className="mt-4 flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <time className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(news.publishDate)}
                                </time>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(news.category)}`}>
                                  {news.category}
                                </span>
                              </div>
                              
                              <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-200" />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 空状态 */}
          {groupedNews.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Calendar className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                暂无新闻
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                请稍后再来查看最新的科技资讯
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}