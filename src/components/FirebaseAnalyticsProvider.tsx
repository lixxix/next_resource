// app/components/FirebaseAnalyticsProvider.tsx
"use client";

import { analytics } from '@/firebase'; // 确保路径正确
import { useEffect } from 'react';

export default function FirebaseAnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 这个 effect 仅在客户端运行，并确保 analytics 实例被访问
    // 从而触发其初始化。
    analytics.then(instance => {
      if (instance) {
        console.log("Firebase Analytics initialized");
      }
    });
  }, []);

  return <>{children}</>;
}