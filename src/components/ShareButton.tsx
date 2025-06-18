'use client';

import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title: string;
  summary: string;
}

export default function ShareButton({ title, summary }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('分享失败:', error);
      }
    } else {
      // 备用分享方案：复制链接到剪贴板
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板');
      } catch (error) {
        console.log('复制失败:', error);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
    >
      <Share2 className="h-4 w-4 mr-1" />
      分享
    </button>
  );
}