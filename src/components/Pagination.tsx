// components/Pagination.tsx
'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  // 生成页码数组
  const getPageNumbers = () => {
    const delta = 2; // 当前页前后显示的页数
    const pages: (number | string)[] = [];

    // 如果总页数小于等于7，显示所有页码
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 总是显示第一页
      pages.push(1);

      // 如果当前页距离第一页较远，添加省略号
      if (currentPage - delta > 2) {
        pages.push('...');
      }

      // 添加当前页周围的页码
      const start = Math.max(2, currentPage - delta);
      const end = Math.min(totalPages - 1, currentPage + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 如果当前页距离最后一页较远，添加省略号
      if (currentPage + delta < totalPages - 1) {
        pages.push('...');
      }

      // 总是显示最后一页
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center justify-center space-x-2 mt-8">
      {/* 上一页按钮 */}
      <Link
        href={`?page=${currentPage - 1}`}
        className={`flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
          currentPage === 1
            ? 'cursor-not-allowed opacity-50'
            : 'hover:text-gray-700 dark:hover:text-gray-200'
        }`}
        onClick={currentPage === 1 ? (e) => e.preventDefault() : undefined}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        上一页
      </Link>

      {/* 页码 */}
      <div className="flex space-x-1">
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-2 text-sm font-medium text-gray-500 dark:text-gray-400"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={`?page=${pageNum}`}
              className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                isCurrentPage
                  ? 'bg-blue-600 text-white border border-blue-600'
                  : 'text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* 下一页按钮 */}
      <Link
        href={`?page=${currentPage + 1}`}
        className={`flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
          currentPage === totalPages
            ? 'cursor-not-allowed opacity-50'
            : 'hover:text-gray-700 dark:hover:text-gray-200'
        }`}
        onClick={currentPage === totalPages ? (e) => e.preventDefault() : undefined}
      >
        下一页
        <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </nav>
  );
}