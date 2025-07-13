import Pagination from '@/components/Pagination';
import { Prisma, PrismaClient } from '@prisma/client';
import { Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const prisma = new PrismaClient()

// 按月份分组新闻
function groupNewsByMonth(news: PostWithSelectedFields[]) {
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

    acc[monthKey].items.push(item as any);
    return acc;
  }, {} as Record<string, { name: string; items: PostWithSelectedFields[] }>);

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

type PostWithSelectedFields = Prisma.PostGetPayload<{
  select: {
    id: true
    title: true
    category: true
    publishDate: true
    summary: true
    htmlname: true
  }
}>

// 每页显示的文章数量
const POSTS_PER_PAGE = 10;

async function getPostsWithPagination(page: number = 1): Promise<{
  posts: PostWithSelectedFields[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}> {
  try {
    const skip = (page - 1) * POSTS_PER_PAGE;

    // 获取总数
    const totalCount = await prisma.post.count();

    // 获取分页数据
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        category: true,
        publishDate: true,
        summary: true,
        htmlname: true,
      },
      orderBy: {
        publishDate: 'desc'
      },
      skip,
      take: POSTS_PER_PAGE
    });

    const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

    return {
      posts,
      totalCount,
      totalPages,
      currentPage: page
    };
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// 分页组件
// function Pagination({
//   currentPage,
//   totalPages
// }: {
//   currentPage: number;
//   totalPages: number;
// }) {
//   // 生成页码数组
//   const getPageNumbers = () => {
//     const delta = 2; // 当前页前后显示的页数
//     const pages: (number | string)[] = [];

//     // 如果总页数小于等于7，显示所有页码
//     if (totalPages <= 7) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       // 总是显示第一页
//       pages.push(1);

//       // 如果当前页距离第一页较远，添加省略号
//       if (currentPage - delta > 2) {
//         pages.push('...');
//       }

//       // 添加当前页周围的页码
//       const start = Math.max(2, currentPage - delta);
//       const end = Math.min(totalPages - 1, currentPage + delta);

//       for (let i = start; i <= end; i++) {
//         pages.push(i);
//       }

//       // 如果当前页距离最后一页较远，添加省略号
//       if (currentPage + delta < totalPages - 1) {
//         pages.push('...');
//       }

//       // 总是显示最后一页
//       if (totalPages > 1) {
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   const pageNumbers = getPageNumbers();

//   if (totalPages <= 1) {
//     return null;
//   }

//   return (
//     <nav className="flex items-center justify-center space-x-2 mt-8">
//       {/* 上一页按钮 */}
//       {currentPage === 1 ? (
//         <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md cursor-not-allowed">
//           <ChevronLeft className="h-4 w-4 mr-1" />
//           上一页
//         </span>
//       ) : (
//         <Link
//           href={`?page=${currentPage - 1}`}
//           className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//         >
//           <ChevronLeft className="h-4 w-4 mr-1" />
//           上一页
//         </Link>
//       )}

//       {/* 页码 */}
//       <div className="flex space-x-1">
//         {pageNumbers.map((page, index) => {
//           if (page === '...') {
//             return (
//               <span
//                 key={`ellipsis-${index}`}
//                 className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
//               >
//                 ...
//               </span>
//             );
//           }

//           const pageNum = page as number;
//           const isCurrentPage = pageNum === currentPage;

//           return (
//             <Link
//               key={pageNum}
//               href={`?page=${pageNum}`}
//               className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
//                 isCurrentPage
//                   ? 'bg-blue-600 text-white border border-blue-600'
//                   : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
//               }`}
//             >
//               {pageNum}
//             </Link>
//           );
//         })}
//       </div>

//       {/* 下一页按钮 */}
//       {currentPage === totalPages ? (
//         <span className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 dark:text-gray-600 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md cursor-not-allowed">
//           下一页
//           <ChevronRight className="h-4 w-4 ml-1" />
//         </span>
//       ) : (
//         <Link
//           href={`?page=${currentPage + 1}`}
//           className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
//         >
//           下一页
//           <ChevronRight className="h-4 w-4 ml-1" />
//         </Link>
//       )}
//     </nav>
//   );
// }
interface NewsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const { posts, totalCount, totalPages } = await getPostsWithPagination(currentPage);
  const groupedNews = groupNewsByMonth(posts);


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              科技游戏新闻赏
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              最新的科技资讯和行业动态
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              共 {totalCount} 篇文章，第 {currentPage} 页，共 {totalPages} 页
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
                  {monthGroup.items.map((news: any) => (
                    <Link
                      key={news.id}
                      href={`/news/${news.htmlname}`}
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

          {/* 分页组件 */}
          <Pagination currentPage={currentPage} totalPages={totalPages} />

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
