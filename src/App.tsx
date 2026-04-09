import React, { useState, useEffect } from 'react';
import { Select, Button, message, Space } from 'antd';
import { useStore } from './store';
import { parseMarkdown, generateHtmlWithStyles } from './utils/markdownParser';
import StylePanel from './components/StylePanel';

const App: React.FC = () => {
  const {
    content,
    setContent,
    currentPreset,
    setCurrentPreset,
    customStyle,
    isMobilePreview,
    setIsMobilePreview,
    presets
  } = useStore();

  const [stylePanelVisible, setStylePanelVisible] = useState(false);
  const [parsedContent, setParsedContent] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  // 解析 Markdown 内容
  useEffect(() => {
    const html = parseMarkdown(content);
    setParsedContent(html);
  }, [content]);

  // 示例文章内容
  const sampleContent = `# 欢迎使用 WeType

## 什么是 WeType？

WeType 是一款 **免费、纯前端、开箱即用** 的公众号自动排版工具，支持多种预设风格与深度自定义，让你专注于内容创作，一键生成符合公众号规范的排版样式。

## 主要功能

- ✅ 支持 Markdown 语法
- ✅ 实时预览效果
- ✅ 多种预设风格
- ✅ 深度自定义样式
- ✅ 一键复制 HTML
- ✅ 本地数据存储

## 如何使用

1. 在左侧编辑器中输入或粘贴 Markdown 内容
2. 选择或自定义风格
3. 实时预览排版效果
4. 点击「复制 HTML」按钮
5. 粘贴到公众号编辑器中

## 示例内容

### 列表

- 无序列表项 1
- 无序列表项 2
  - 嵌套列表项
  - 嵌套列表项

1. 有序列表项 1
2. 有序列表项 2

### 引用

> 这是一个引用块，用于引用他人的话或重要内容。
> 支持多行引用。

### 代码块

\`\`\`javascript
// 这是一个 JavaScript 代码块
function hello() {
  console.log('Hello, WeType!');
}
\`\`\`

### 图片

![示例图片](https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wechat%20article%20illustration%20minimalist%20style&image_size=square)

### 表格

| 功能 | 描述 | 状态 |
|------|------|------|
| Markdown 解析 | 支持完整的 Markdown 语法 | ✅ |
| 实时预览 | 所见即所得 | ✅ |
| 风格定制 | 支持多种预设风格 | ✅ |
| 自定义样式 | 深度调整样式参数 | ✅ |
| 复制 HTML | 一键复制到剪贴板 | ✅ |
| 本地存储 | 自动保存草稿 | ✅ |

## 结语

WeType 致力于让公众号排版变得简单、高效、美观。希望它能成为你内容创作的得力助手！`;

  // 清空编辑器内容
  const handleClear = () => {
    setContent('');
  };

  // 加载示例文章
  const handleLoadSample = () => {
    setContent(sampleContent);
  };

  // 复制 HTML 到剪贴板
  const handleCopyHtml = async () => {
    try {
      // 获取当前使用的风格配置
      const currentStyle = presets.find(p => p.name === currentPreset)?.config || customStyle;
      
      // 生成带样式的 HTML
      const htmlToCopy = generateHtmlWithStyles(parsedContent, currentStyle);
      
      // 创建一个临时元素
      const tempElement = document.createElement('div');
      tempElement.innerHTML = htmlToCopy;
      document.body.appendChild(tempElement);
      
      // 选择并复制内容
      const range = document.createRange();
      range.selectNodeContents(tempElement);
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        
        await document.execCommand('copy');
        
        selection.removeAllRanges();
        document.body.removeChild(tempElement);
        
        message.success('HTML 已成功复制到剪贴板！');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (error) {
      console.error('复制失败:', error);
      message.error('复制失败，请手动复制。');
    }
  };

  // 切换手机预览模式
  const handleToggleMobilePreview = () => {
    setIsMobilePreview(!isMobilePreview);
  };

  // 打开风格自定义面板
  const handleOpenStylePanel = () => {
    setStylePanelVisible(true);
  };

  // 关闭风格自定义面板
  const handleCloseStylePanel = () => {
    setStylePanelVisible(false);
  };

  // 应用当前风格的样式
  const getCurrentStyle = () => {
    return presets.find(p => p.name === currentPreset)?.config || customStyle;
  };

  const currentStyle = getCurrentStyle();

  return (
    <div className="app-container">
      {/* 头部导航栏 */}
      <header className="header">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">WeType - 轻悦公众号排版工坊</h1>
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={currentPreset}
            onChange={setCurrentPreset}
            options={presets.map(p => ({ value: p.name, label: p.name }))}
            style={{ width: 120 }}
          />
          <Button type="primary" onClick={handleOpenStylePanel}>
            自定义
          </Button>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="main-content">
        {/* 左侧编辑区 */}
        <section className="editor-section">
          <h2 className="text-lg font-semibold mb-4">编辑区</h2>
          <div className="toolbar">
            <Button size="small">H2</Button>
            <Button size="small">H3</Button>
            <Button size="small">粗体</Button>
            <Button size="small">列表</Button>
            <Button size="small">链接</Button>
            <Button size="small">图片</Button>
            <Button size="small">代码</Button>
          </div>
          <div className="editor-container">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="在此输入或粘贴 Markdown 内容..."
            />
          </div>
          <div className="controls">
            <Button onClick={handleClear}>清空</Button>
            <Button onClick={handleLoadSample}>示例文章</Button>
          </div>
        </section>

        {/* 右侧预览区 */}
        <section className="preview-section">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">预览区</h2>
            <Space>
              <Button onClick={handleToggleMobilePreview}>
                {isMobilePreview ? '桌面预览' : '手机预览'}
              </Button>
              <Button type="primary" onClick={handleCopyHtml}>
                {isCopied ? '已复制' : '复制 HTML'}
              </Button>
            </Space>
          </div>
          <div className={`preview-container ${isMobilePreview ? 'mobile-preview' : ''}`}>
            <div 
              className="preview-content"
              style={{
                fontSize: `${currentStyle.baseFontSize}px`,
                lineHeight: currentStyle.lineHeight,
                color: currentStyle.textColor,
                backgroundColor: currentStyle.bgColor,
                padding: '20px'
              }}
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          </div>
        </section>
      </main>

      {/* 风格自定义面板 */}
      <StylePanel
        visible={stylePanelVisible}
        onCancel={handleCloseStylePanel}
      />
    </div>
  );
};

export default App;