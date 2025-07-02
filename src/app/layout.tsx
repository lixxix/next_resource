import FirebaseAnalyticsProvider from "@/components/FirebaseAnalyticsProvider";
import Navigation from "@/components/Navigation";
import { PageviewTracker } from "@/components/PageviewTracker";
import type { Metadata } from "next";
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
          <PageviewTracker />
        </FirebaseAnalyticsProvider>
      </body>
    </html>
  );
}
