import type { Descendant } from 'slate';

export interface ExampleArticle {
  id: string;
  title: string;
  category: string;
  content: Descendant[];
}

export const exampleArticles: ExampleArticle[] = [
  {
    id: 'tech',
    title: 'React 18 新特性完全指南',
    category: 'tech',
    content: [
      {
        type: 'heading',
        level: 1,
        children: [{ text: 'React 18 新特性完全指南' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'React 18 是自 React 17 发布以来的重大版本更新，带来了许多令人兴奋的新特性和性能优化。本文将详细介绍并发模式（Concurrent Features）和其他重要改进。' },
        ],
      },
      {
        type: 'heading',
        level: 2,
        children: [{ text: '并发渲染（Concurrent Rendering）' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: '并发渲染是 React 18 最核心的改进。它允许 React ' },
          { text: '同时准备多个版本的 UI', italic: true },
          { text: '，从而使更新变得更加可中断和可恢复。' },
        ],
      },
      {
        type: 'code-block',
        language: 'javascript',
        children: [
          { text: '// 使用 createRoot 启用并发模式\nimport { createRoot } from \'react-dom/client\';\n\nconst container = document.getElementById(\'root\');\nconst root = createRoot(container);\nroot.render(<App />);' },
        ],
      },
      {
        type: 'heading',
        level: 2,
        children: [{ text: '自动批处理（Automatic Batching）' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: 'React 18 自动批处理所有状态更新，无论它们来自哪里。这意味着即使在 setTimeout 或 Promise 中，性能也会得到显著提升。' },
        ],
      },
      {
        type: 'blockquote',
        children: [
          { text: '提示：批处理减少了不必要的重新渲染，是提升应用性能的关键技术。' },
        ],
      },
      {
        type: 'heading',
        level: 3,
        children: [{ text: '核心优势' }],
      },
      {
        type: 'bulleted-list',
        children: [
          { type: 'list-item', children: [{ text: '减少渲染次数，提升性能' }] },
          { type: 'list-item', children: [{ text: '更好的用户体验' }] },
          { type: 'list-item', children: [{ text: '更简洁的代码' }] },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: '通过本文的学习，相信你已经对 React 18 的新特性有了全面的了解。建议在实际项目中多多实践，才能真正掌握这些强大的功能。' },
        ],
      },
    ],
  },
  {
    id: 'emotion',
    title: '深夜的咖啡馆',
    category: 'emotion',
    content: [
      {
        type: 'heading',
        level: 1,
        children: [{ text: '深夜的咖啡馆' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: '凌晨两点的街道，霓虹灯还亮着。我推开咖啡馆的门，熟悉的咖啡香扑面而来。' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: '这个城市从来不缺深夜不归的人。我们各自坐在角落，对着发光的屏幕，' },
          { text: '却在同一个空间里相互陪伴', italic: true },
          { text: '。' },
        ],
      },
      {
        type: 'blockquote',
        children: [
          { text: '有时候，最温暖的孤独，是知道有人和你一样醒着。' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: '咖啡凉了又续，窗外的天色渐渐泛白。我们都在用自己的方式，' },
          { text: '熬过那些难眠的夜晚', bold: true },
          { text: '。' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: '这座城市太大了，大到可以容纳所有的梦想和失落。但此刻，我只属于这家咖啡馆，属于手中这杯温热的咖啡，属于这个漫长的夜。' },
        ],
      },
    ],
  },
  {
    id: 'life',
    title: '周末的早午餐',
    category: 'life',
    content: [
      {
        type: 'heading',
        level: 1,
        children: [{ text: '周末的早午餐' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: '周末的意义，大概就是可以睡到自然醒，然后慢悠悠地准备一顿丰盛的早午餐。' },
        ],
      },
      {
        type: 'paragraph',
        children: [
          { text: '今天尝试做的是 ' },
          { text: '班尼迪克蛋', bold: true },
          { text: '，配上一杯手冲咖啡，简单却满足。' },
        ],
      },
      {
        type: 'heading',
        level: 2,
        children: [{ text: '所需食材' }],
      },
      {
        type: 'numbered-list',
        children: [
          { type: 'list-item', children: [{ text: '英式马芬 2个' }] },
          { type: 'list-item', children: [{ text: '培根 4片' }] },
          { type: 'list-item', children: [{ text: '鸡蛋 2个' }] },
          { type: 'list-item', children: [{ text: '荷兰酱适量' }] },
        ],
      },
      {
        type: 'heading',
        level: 2,
        children: [{ text: '制作步骤' }],
      },
      {
        type: 'paragraph',
        children: [
          { text: '先煎培根至酥脆，同时烤热马芬。煮一锅沸水，用漩涡法制防水波蛋。最后淋上荷兰酱就完成了。' },
        ],
      },
      {
        type: 'blockquote',
        children: [
          { text: '生活不需要太复杂，一份用心的早餐，就能让整个周末都变得美好起来。' },
        ],
      },
    ],
  },
];
