# 即刻排版 · 公众号极简助手

一款免登录、打开即用的公众号排版工具。

## ✨ 特性

- **免登录**：无需注册即可使用全部功能
- **富文本编辑**：基于 Slate.js 构建的强大编辑器
- **10 套精选模板**：涵盖科技、生活、商务、情感等场景
- **移动端预览**：实时模拟手机端显示效果
- **一键复制**：样式自动内联，粘贴到公众号后台不丢格式
- **内容类型识别**：智能推荐适合的排版风格

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 http://localhost:5173

### 构建生产版本

```bash
npm run build
```

### 运行测试

```bash
# 运行所有单元测试
npm test

# 运行测试并监听变化
npm run test:watch

# 运行 E2E 测试（需要先安装 Playwright 浏览器）
npm run test:e2e
```

## 📁 项目结构

```
src/
├── components/
│   ├── Editor/           # 富文本编辑器组件
│   ├── Preview/          # 移动端预览组件
│   ├── Templates/        # 模板系统
│   └── common/           # 通用组件
├── hooks/                # React Hooks
├── utils/                # 工具函数
├── types/                # TypeScript 类型定义
└── data/                 # 模板和示例数据
```

## 🎯 功能模块

### 1. 富文本编辑器
- 加粗、斜体、下划线
- 标题（H1、H2、H3）
- 对齐方式
- 引用块、代码块
- 有序/无序列表

### 2. 模板系统
| 模板 | 风格 | 适用场景 |
|------|------|---------|
| 文艺清新 | 浅色、留白 | 生活随笔 |
| 科技极简 | 蓝色调、代码高亮 | 技术教程 |
| 商务大气 | 简洁、专业 | 职场干货 |
| 深夜电台 | 深色、温暖 | 情感故事 |
| 极客代码 | 终端风格 | 程序员 |
| 美食探店 | 暖色调 | 美食推荐 |
| ... | ... | ... |

### 3. 移动端预览
- 375×667 模拟 iPhone SE
- 实时同步编辑内容
- 二维码全屏预览

### 4. 内容类型识别
基于关键词规则引擎，自动识别文章类型并推荐模板：
- 技术教程 → 科技极简/极客代码
- 情感故事 → 深夜电台
- 生活随笔 → 文艺清新
- 美食探店 → 美食探店
- ...

## 🛠 技术栈

- **框架**: React 18 + TypeScript
- **编辑器**: Slate.js
- **样式**: Tailwind CSS
- **状态管理**: Zustand
- **样式内联**: juice
- **部署**: Vercel

## 📝 开发说明

### 添加新模板

在 `src/components/Templates/templates/` 下创建新的模板文件：

```typescript
import type { Template } from '../../../types';

export const myTemplate: Template = {
  id: 'my-template',
  name: '我的模板',
  description: '描述',
  preview: '',
  category: 'general',
  styles: {
    body: { fontFamily: '...', ... },
    h1: { ... },
    // ... 其他样式
  },
};
```

### 添加内容类型规则

编辑 `src/hooks/useContentType.ts` 中的 `CONTENT_RULES`：

```typescript
const CONTENT_RULES = {
  myType: {
    keywords: ['关键词1', '关键词2'],
    weight: 1,
  },
  // ...
};
```

## 📄 许可证

MIT
