// prisma/seed.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const samplePost = await prisma.post.create({
    data: {
      id: 1,
      title: "苹果发布全新 MacBook Pro,搭载 M4 芯片",
      publishDate: new Date("2025-06-15"),
      category: "硬件",
      author: "科技编辑部",
      readTime: "5分钟",
      summary: "苹果公司在WWDC上发布了搭载M4芯片的全新MacBook Pro,性能提升显著...",
      content: `
        <p>在今年的全球开发者大会(WWDC)上,苹果公司正式发布了全新的MacBook Pro系列,搭载了备受期待的M4芯片。这款新芯片标志着苹果在自研芯片领域又迈出了重要一步。</p>
        
        <h2>M4芯片的突破性能</h2>
        <p>M4芯片采用了最新的3纳米工艺制程,相比上一代M3芯片,CPU性能提升了25%,GPU性能提升了35%。这意味着用户在进行视频编辑、3D渲染和机器学习任务时将获得更加流畅的体验。</p>
        
        <p>新芯片集成了16核CPU(8个性能核心+8个效率核心)和20核GPU,同时配备了全新的神经网络引擎,AI计算能力相比M3提升了40%。</p>
        
        <h2>设计与显示升级</h2>
        <p>新款MacBook Pro在设计上延续了苹果一贯的简约风格,但在细节上有所改进。屏幕采用了新一代Liquid Retina XDR显示技术,峰值亮度达到1600尼特,支持更广的色域和更高的对比度。</p>
        
        <p>键盘和触控板也得到了优化,提供了更好的触感反馈。同时,新增了黑色和银色两种配色选择。</p>
        
        <h2>电池续航和连接性</h2>
        <p>得益于M4芯片的高能效设计,新款MacBook Pro的电池续航时间达到了22小时,相比上一代提升了15%。这对于经常需要移动办公的用户来说是一个重大改进。</p>
        
        <p>在连接性方面,新款MacBook Pro配备了4个Thunderbolt 5接口,支持更快的数据传输速度,同时保留了MagSafe充电接口和3.5mm耳机插孔。</p>
        
        <h2>价格和上市时间</h2>
        <p>14英寸MacBook Pro起售价为14999元,16英寸版本起售价为18999元。用户可以从今天开始预订,预计将在6月30日正式发货。</p>
        
        <p>苹果表示,这次发布的MacBook Pro将为专业用户带来前所未有的性能体验,特别是在内容创作和软件开发领域。</p>
      `,
      tags: ["苹果", "MacBook Pro", "M4芯片", "笔记本电脑"],
      relatedNews: [2, 5, 7]
    }
  });

  // 添加一些相关文章示例
  await prisma.post.createMany({
    data: [
      {
        id: 2,
        title: "M4芯片详细评测：性能跑分解析",
        publishDate: new Date("2025-06-16"),
        category: "评测",
        author: "技术评测团队",
        readTime: "8分钟",
        summary: "深度评测苹果M4芯片的性能表现，与竞争对手进行全面对比...",
        content: "<p>详细评测内容...</p>",
        tags: ["M4芯片", "性能评测", "苹果"],
        relatedNews: [1, 5]
      },
      {
        id: 5,
        title: "苹果生态系统的未来展望",
        publishDate: new Date("2025-06-17"),
        category: "分析",
        author: "行业分析师",
        readTime: "6分钟",
        summary: "分析苹果硬件和软件生态系统的发展趋势...",
        content: "<p>生态系统分析内容...</p>",
        tags: ["苹果", "生态系统", "未来趋势"],
        relatedNews: [1, 2]
      },
      {
        id: 7,
        title: "笔记本电脑市场竞争格局分析",
        publishDate: new Date("2025-06-18"),
        category: "市场",
        author: "市场研究部",
        readTime: "7分钟",
        summary: "2025年笔记本电脑市场的竞争态势和发展前景...",
        content: "<p>市场分析内容...</p>",
        tags: ["笔记本电脑", "市场分析", "竞争格局"],
        relatedNews: [1]
      }
    ]
  });

  console.log('种子数据已成功创建!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });