# CODEBUDDY.md This file provides guidance to CodeBuddy when working with code in this repository.

## Project Overview

WeType（轻悦公众号排版工坊）是一款纯前端的微信公众号排版工具。用户在左侧输入 Markdown，右侧实时预览带样式的 HTML，并可一键复制粘贴到公众号编辑器。无后端依赖，所有数据存储在 localStorage。

## Commands

### Development
```bash
npm run dev        # 启动开发服务器（Vite，默认 http://localhost:5173）
npm run build      # TypeScript 类型检查 + Vite 生产构建，输出到 dist/
npm run preview    # 预览生产构建产物
npm run lint       # ESLint 检查（ts/tsx），零警告策略（--max-warnings 0）
```

无测试框架，目前项目不含测试。

## Architecture

### Tech Stack

- **框架**：React 18 + TypeScript，Vite 构建
- **状态管理**：Zustand（单一全局 store）
- **UI 组件**：Ant Design 5
- **样式**：Tailwind CSS 4 + `src/index.css` 自定义 CSS 类
- **Markdown 解析**：`marked` 库，DOMPurify 净化 XSS

### Data Flow

```
用户输入 Markdown
    ↓
useStore.setContent()  →  自动同步 localStorage
    ↓
App.tsx useEffect 监听 content 变化
    ↓
parseMarkdown()  →  marked 解析 + DOMPurify 净化 + img 响应式处理
    ↓
dangerouslySetInnerHTML 渲染预览区
    ↓
handleCopyHtml()  →  generateHtmlWithStyles() 内嵌 <style> 标签
                   →  document.execCommand('copy') 写入剪贴板
```

### State（`src/store/index.ts`）

Zustand store 管理全部应用状态，每次变更自动写入 localStorage（键名前缀 `wetype_`）：

| 状态字段 | 类型 | 说明 |
|---|---|---|
| `content` | `string` | Markdown 编辑器内容 |
| `currentPreset` | `string` | 当前选中的预设风格名称 |
| `customStyle` | `StyleConfig` | 自定义风格配置对象 |
| `isMobilePreview` | `boolean` | 是否启用手机宽度预览（375px） |
| `presets` | `PresetStyle[]` | 内置预设列表（简约/优雅/科技/文艺），硬编码在 store 中 |

### Style System（`src/types/index.ts`）

`StyleConfig` 接口定义所有可调样式参数：主色调、正文色、背景色、各级字号、行距、段落间距、引用块颜色/圆角、代码块颜色/圆角。

**样式优先级**：选中预设时使用 `presets[n].config`；选中"自定义"时使用 `customStyle`。当前逻辑：`presets.find(p => p.name === currentPreset)?.config || customStyle`——即当 `currentPreset` 名称与任一预设匹配时使用预设，否则 fallback 到 customStyle。

### Key Components

- **`App.tsx`**：唯一页面组件，包含编辑区（`<textarea>`）、工具栏（H2/H3/粗体等按钮，目前无实际插入逻辑）、预览区（`dangerouslySetInnerHTML`）、顶部预设选择器。
- **`StylePanel.tsx`**：Ant Design `Modal` 实现的自定义风格面板，本地维护 `localStyle` 临时状态，保存时才写入全局 store。
- **`utils/markdownParser.ts`**：两个纯函数：`parseMarkdown`（输入 Markdown → 输出净化 HTML）和 `generateHtmlWithStyles`（输入 HTML + StyleConfig → 输出带内联 `<style>` 的完整 HTML 片段，用于粘贴到公众号）。

### Copy-to-WeChat 机制

公众号编辑器不支持外部 CSS 文件，因此复制时需将所有样式内联。`generateHtmlWithStyles` 生成一个包含 `<style>` 标签的 HTML 字符串，通过 `document.execCommand('copy')` 写入剪贴板（非 Clipboard API，保留富文本格式）。

### localStorage Keys

| Key | 内容 |
|---|---|
| `wetype_draft_content` | Markdown 草稿 |
| `wetype_last_preset` | 上次选中的预设名称 |
| `wetype_custom_style` | 自定义风格 JSON |
