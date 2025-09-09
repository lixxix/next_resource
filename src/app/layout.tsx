import FirebaseAnalyticsProvider from "@/components/FirebaseAnalyticsProvider";
import Navigation from "@/components/Navigation";
import { PageviewTracker } from "@/components/PageviewTracker";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "科技游戏新闻赏",
  description: "分享科技新鲜事",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body
        className={`bg-white text-black dark:bg-gray-800 dark:text-gray-200`}
      >
        <Navigation />
        <FirebaseAnalyticsProvider>
          {children}
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
        </FirebaseAnalyticsProvider>
        <a
          href="https://www.wanjiazhan.com"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-10 right-10 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          aria-label="游戏"
        >
          <span className="text-2xl">🎮</span>
        </a>
      </body>
    </html>
  );
}
