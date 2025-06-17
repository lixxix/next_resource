// tailwind.config.js
// 虽然 Tailwind v4 主要通过 CSS 配置，但有时仍需要这个文件来确保兼容性

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // 确保使用 class 策略
  theme: {
    extend: {},
  },
  plugins: [],
}