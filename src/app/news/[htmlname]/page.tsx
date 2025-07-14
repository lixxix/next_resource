import { Post, PrismaClient } from '@prisma/client';
import { ArrowLeft, Calendar, ChevronLeft, ChevronRight, Clock, Tag } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import "../../sspai-ui.css";

const prisma = new PrismaClient()

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

interface PostWithNavigation {
  post: Post;
  previousPost: Post | null;
  nextPost: Post | null;
}

async function getPostWithNavigation(htmlname: string): Promise<PostWithNavigation | null> {
  try {
    const post = await prisma.post.findUnique({
      where: { htmlname: htmlname },
    });

    if (!post) {
      return null;
    }

    // 获取上一篇文章（发布日期较早的文章）
    const previousPost = await prisma.post.findFirst({
      where: {
        publishDate: {
          lt: post.publishDate, // 发布日期小于当前文章
        },
      },
      orderBy: {
        publishDate: 'desc', // 按发布日期降序排列，取最接近的一篇
      },
      select: {
        id: true,
        title: true,
        summary: true,
        publishDate: true,
        category: true,
        htmlname: true,
      },
    }) as Post | null;

    // 获取下一篇文章（发布日期较晚的文章）
    const nextPost = await prisma.post.findFirst({
      where: {
        publishDate: {
          gt: post.publishDate, // 发布日期大于当前文章
        },
      },
      orderBy: {
        publishDate: 'asc', // 按发布日期升序排列，取最接近的一篇
      },
      select: {
        id: true,
        title: true,
        summary: true,
        publishDate: true,
        category: true,
        htmlname: true,
      },
    }) as Post | null;

    return { post, previousPost, nextPost };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// 格式化日期
function formatDate(date: Date) {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface NewsDetailPageProps {
  params: Promise<{
    htmlname: string;
  }>;
}

// 生成动态 metadata
export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const par = await params;
  const ret = await getPostWithNavigation(par.htmlname);
  
  if (!ret || !ret.post) {
    return {
      title: '文章未找到',
      description: '您访问的文章不存在或已被删除'
    };
  }

  const { post } = ret;
  
  return {
    title: `${post.title} - 科技游戏新闻赏`,
    description: post.summary,
    keywords: [post.category, '科技', '新闻', '资讯'].join(', '),
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.publishDate.toISOString(),
      authors: post.author ? [post.author] : undefined,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
    },
    alternates: {
      canonical: `/news/${post.htmlname}`
    }
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const par = await params;
  const ret = await getPostWithNavigation(par.htmlname);
  
  let news: Post | null = null;
  let previousPost: Post | null = null;
  let nextPost: Post | null = null;

  if (ret != null) {
    news = ret.post;
    previousPost = ret.previousPost;
    nextPost = ret.nextPost;
  }

  if (!news) {
    notFound();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      // 备用分享方案：复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('链接已复制到剪贴板');
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <article className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <div className="mb-6">
            <Link
              href="/news"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              返回新闻列表
            </Link>
          </div>

          {/* 文章头部 */}
          <header className="mb-8">
            <div className="mb-4">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                <Tag className="h-3 w-3 mr-1" />
                {news.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {news.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <time>{formatDate(news.publishDate)}</time>
              </div>
              
              {news.readTime && (
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>阅读时长 {news.readTime}</span>
                </div>
              )}
              
              {news.author && (
                <div className="flex items-center">
                  <span>作者：{news.author}</span>
                </div>
              )}
            </div>

            {/* 摘要 */}
            {/* <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {news.summary}
              </p>
            </div> */}
          </header>

          {/* 文章内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>


          {/* 上一篇/下一篇导航 */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid gap-4 md:grid-cols-2">
              {/* 上一篇 */}
              <div className="flex">
                {previousPost ? (
                  <Link
                    href={`/news/${previousPost.htmlname}`}
                    className="flex-1 group flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <ChevronLeft className="h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors mr-3 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">上一篇</p>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {previousPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {formatDate(previousPost.publishDate)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                    <div className="text-center">
                      <ChevronLeft className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">没有上一篇了</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 下一篇 */}
              <div className="flex">
                {nextPost ? (
                  <Link
                    href={`/news/${nextPost.htmlname}`}
                    className="flex-1 group flex items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <div className="flex items-center min-w-0 flex-1">
                      <div className="min-w-0 flex-1 text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">下一篇</p>
                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {nextPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          {formatDate(nextPost.publishDate)}
                        </p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors ml-3 flex-shrink-0" />
                    </div>
                  </Link>
                ) : (
                  <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                    <div className="text-center">
                      <ChevronRight className="h-5 w-5 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 dark:text-gray-400">没有下一篇了</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
