"use client";

import { ArrowLeft, Calendar, Clock, Share2, Tag } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// 模拟新闻详细数据（在实际项目中这些数据应该从数据库或API获取）
const newsDetails = {
  1: {
    id: 1,
    title: "苹果发布全新 MacBook Pro，搭载 M4 芯片",
    publishDate: "2025-06-15",
    category: "硬件",
    author: "科技编辑部",
    readTime: "5分钟",
    summary: "苹果公司在WWDC上发布了搭载M4芯片的全新MacBook Pro，性能提升显著...",
    content: `
      <p>在今年的全球开发者大会（WWDC）上，苹果公司正式发布了全新的MacBook Pro系列，搭载了备受期待的M4芯片。这款新芯片标志着苹果在自研芯片领域又迈出了重要一步。</p>
      
      <h2>M4芯片的突破性能</h2>
      <p>M4芯片采用了最新的3纳米工艺制程，相比上一代M3芯片，CPU性能提升了25%，GPU性能提升了35%。这意味着用户在进行视频编辑、3D渲染和机器学习任务时将获得更加流畅的体验。</p>
      
      <p>新芯片集成了16核CPU（8个性能核心+8个效率核心）和20核GPU，同时配备了全新的神经网络引擎，AI计算能力相比M3提升了40%。</p>
      
      <h2>设计与显示升级</h2>
      <p>新款MacBook Pro在设计上延续了苹果一贯的简约风格，但在细节上有所改进。屏幕采用了新一代Liquid Retina XDR显示技术，峰值亮度达到1600尼特，支持更广的色域和更高的对比度。</p>
      
      <p>键盘和触控板也得到了优化，提供了更好的触感反馈。同时，新增了黑色和银色两种配色选择。</p>
      
      <h2>电池续航和连接性</h2>
      <p>得益于M4芯片的高能效设计，新款MacBook Pro的电池续航时间达到了22小时，相比上一代提升了15%。这对于经常需要移动办公的用户来说是一个重大改进。</p>
      
      <p>在连接性方面，新款MacBook Pro配备了4个Thunderbolt 5接口，支持更快的数据传输速度，同时保留了MagSafe充电接口和3.5mm耳机插孔。</p>
      
      <h2>价格和上市时间</h2>
      <p>14英寸MacBook Pro起售价为14999元，16英寸版本起售价为18999元。用户可以从今天开始预订，预计将在6月30日正式发货。</p>
      
      <p>苹果表示，这次发布的MacBook Pro将为专业用户带来前所未有的性能体验，特别是在内容创作和软件开发领域。</p>
    `,
    tags: ["苹果", "MacBook Pro", "M4芯片", "笔记本电脑"],
    relatedNews: [2, 5, 7]
  },
  2: {
    id: 2,
    title: "OpenAI 推出 GPT-5，AI 能力再次突破",
    publishDate: "2025-06-12",
    category: "人工智能",
    author: "AI研究团队",
    readTime: "7分钟",
    summary: "OpenAI正式发布GPT-5模型，在推理和创造性任务上表现出色...",
    content: `
      <p>OpenAI今天正式发布了备受期待的GPT-5大语言模型，这是继GPT-4之后的又一重大突破。新模型在多个关键指标上都实现了显著提升。</p>
      
      <h2>技术突破</h2>
      <p>GPT-5采用了全新的Transformer架构，参数量达到了1.8万亿，是GPT-4的3倍。更重要的是，模型的推理能力和创造性得到了显著增强。</p>
      
      <p>在标准化测试中，GPT-5在数学推理、科学问题解决和创意写作等任务上的表现都超越了人类平均水平。</p>
      
      <h2>多模态能力</h2>
      <p>GPT-5不仅支持文本处理，还具备了强大的图像、音频和视频理解能力。用户可以上传图片、音频文件或视频，模型能够准确理解内容并进行相应的分析和回答。</p>
      
      <h2>实时性能</h2>
      <p>相比GPT-4，GPT-5的响应速度提升了50%，同时计算成本降低了30%。这使得大规模商业应用成为可能。</p>
      
      <h2>安全性改进</h2>
      <p>OpenAI在GPT-5中加入了更强的安全机制，包括更好的内容过滤、偏见检测和事实核查能力。公司表示已经通过了严格的安全测试。</p>
      
      <p>GPT-5将首先向ChatGPT Plus用户开放，随后逐步扩展到更多用户群体。</p>
    `,
    tags: ["OpenAI", "GPT-5", "人工智能", "大语言模型"],
    relatedNews: [4, 9, 10]
  }
  // 可以继续添加更多新闻详情...
};

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

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

interface NewsDetailPageProps {
  params: {
    id: string;
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  // const newsId = parseInt(params.id);
  const par = await params;

  const newsId = parseInt(par.id);
  const news = newsDetails[newsId as keyof typeof newsDetails];

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
              
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>阅读时长 {news.readTime}</span>
              </div>
              
              <div className="flex items-center">
                <span>作者：{news.author}</span>
              </div>

              <button
                onClick={handleShare}
                className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              >
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </button>
            </div>

            {/* 摘要 */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {news.summary}
              </p>
            </div>
          </header>

          {/* 文章内容 */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div 
              className="text-gray-800 dark:text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* 标签 */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">相关标签</h3>
            <div className="flex flex-wrap gap-2">
              {news.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 相关文章推荐（简化版） */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">相关文章</h3>
            <div className="grid gap-4 md:grid-cols-2">
              {news.relatedNews.slice(0, 4).map((relatedId) => {
                const relatedNews = newsDetails[relatedId as keyof typeof newsDetails];
                if (!relatedNews) return null;
                
                return (
                  <Link
                    key={relatedId}
                    href={`/news/${relatedId}`}
                    className="block p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {relatedNews.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(relatedNews.publishDate)}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}