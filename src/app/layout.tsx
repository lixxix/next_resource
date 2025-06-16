import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "科技新闻",
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
        {children}
      </body>
    </html>
  );
}
