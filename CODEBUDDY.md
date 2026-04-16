# CODEBUDDY.md

This file provides guidance to CodeBuddy when working on this repository.

## Project Overview

WriteNow 是一款纯前端、免登录的公众号排版工具。用户在左侧输入 Markdown,右侧实时预览带样式的 HTML,并可一键复制粘贴到公众号编辑器。

## Commands

### Development
```bash
npm run dev        # 启动开发服务器（Vite，默认 http://localhost:5173）
npm run build      # TypeScript 类型检查 + Vite 生产构建，输出到 dist/
npm run preview    # 预览生产构建产物
npm run lint       # ESLint 检查（ts/tsx），零警告策略（--max-warnings 0）
```

无测试框架。

## Architecture

### Tech Stack

- **框架**: React 18 + TypeScript，Vite 构建
- **状态管理**: React Hooks（无外部状态库）
- **编辑器**: CodeMirror 6
- **Markdown 解析**: markdown-it + highlight.js
- **样式内联**: juice
- **样式**: 原生 CSS（无 TailwindCSS）

### Data Flow

```
用户在 CodeMirror 编辑 Markdown
    ↓
useState(content) 更新
    ↓
parseMarkdown() 解析为 HTML
    ↓
Preview 组件渲染预览（带手机框装饰）
    ↓
用户点击「复制到公众号」
    ↓
generateWeChatHtml() 内联样式
    ↓
copyToClipboard() 写入剪贴板
```

### Theme System

三套内置主题,定义在 `src/themes.ts`:

- **geek** (极客代码): 深色代码块,主色调 #1A5F7A
- **literary** (文艺阅读): 衬线字体,大留白,主色调 #8B4513
- **minimal** (简约商务): 干净利落,主色调 #2c3e50

切换主题时触发 0.2s 淡入淡出动画。

### Key Components

- **App.tsx**: 主应用组件,管理所有状态（content, currentTheme, 复制状态等）
- **Editor.tsx**: CodeMirror 6 编辑器封装,支持语法高亮
- **Preview.tsx**: 预览组件,带手机框装饰（375px 宽度）
- **QuickHints.tsx**: 编辑器为空时显示的语法快捷提示条

### Utils

- **markdown.ts**: Markdown 解析（markdown-it）+ 代码高亮（highlight.js）
- **juice.ts**: 样式内联,生成微信兼容的 HTML
- **clipboard.ts**: 剪贴板操作,支持 text/html 和 text/plain 两种格式

### Type Definitions

类型定义位于 `src/types.ts` 和 `src/types/index.d.ts`:

- **ThemeType**: 'geek' | 'literary' | 'minimal'
- **ThemeConfig**: 主题配置接口（name, displayName, css, preview）

为第三方包创建了类型声明（juice, markdown-it, codemirror/*）。

## Key Features

1. **Paste Detection**: 监听全局 `paste` 事件,自动识别 Markdown 内容并提示
2. **Theme Animation**: 切换时预览区 `opacity` 从 1→0→1,过渡 0.2s
3. **Copy Feedback**: 按钮文字变为"✓ 已复制!",2 秒后恢复
4. **Quick Hints**: 编辑器为空时底部显示语法提示,打字后自动淡出
5. **Mobile Preview**: 预览区模拟 iPhone 宽度（375px）,带刘海装饰

## WeChat Compatibility

样式内联化处理:

1. 使用 `juice` 将 CSS 转换为行内 style 属性
2. 将 `<div>` 替换为 `<section>`（微信更友好）
3. 移除不支持的 CSS（`display: flex/grid`, `transform`）
4. 压缩 style 属性空格

## Build Output

构建产物分块:

- `index-D10KEsDG.js` (159KB): 应用代码
- `codemirror-ChONrlb0.js` (1.1MB): CodeMirror 及相关包
- `markdown-C5NOa6oX.js` (1MB): highlight.js（支持 190+ 语言）
- `juice-BT_erOZs.js` (334KB): juice 内联库
