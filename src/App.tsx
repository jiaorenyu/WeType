import React, { useState, useEffect, useRef } from 'react';
import SimpleEditor from './components/SimpleEditor';
import Preview from './components/Preview';
import QuickHints from './components/QuickHints';
import { themes, getThemeByName } from './themes';
import { parseMarkdown, extractPlainText } from './utils/markdown';
import { generateWeChatHtml } from './utils/juice';
import { copyToClipboard, isMarkdown } from './utils/clipboard';
import { sampleMarkdown } from './sampleContent';
import { ThemeType } from './types';
import './App.css';

const App: React.FC = () => {
  const [content, setContent] = useState(sampleMarkdown);
  const [html, setHtml] = useState('');
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('geek');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [copied, setCopied] = useState(false);
  const [pasteNotification, setPasteNotification] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  // 解析 Markdown
  useEffect(() => {
    const parsedHtml = parseMarkdown(content);
    setHtml(parsedHtml);
  }, [content]);

  // 显示/隐藏语法提示
  useEffect(() => {
    setShowHints(content.trim().length === 0);
  }, [content]);

  // 主题切换
  const handleThemeChange = (themeName: ThemeType) => {
    if (themeName !== currentTheme) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentTheme(themeName);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 100);
      }, 200);
    }
  };

  // 复制到公众号
  const handleCopy = async () => {
    const theme = getThemeByName(currentTheme);
    const wechatHtml = generateWeChatHtml(html, theme);
    const plainText = extractPlainText(html);

    const success = await copyToClipboard(wechatHtml, plainText);

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 下载 Markdown
  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'article.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  // 加载示例文章
  const handleLoadSample = () => {
    setContent(sampleMarkdown);
  };

  // 清空内容
  const handleClear = () => {
    setContent('');
  };

  // 全局粘贴监听
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      // 只在编辑器外部且没有焦点时处理
      const activeElement = document.activeElement;
      const isEditorFocused = activeElement?.closest('.editor-wrapper');

      if (!isEditorFocused && e.clipboardData) {
        const pastedText = e.clipboardData.getData('text');
        if (pastedText && isMarkdown(pastedText)) {
          e.preventDefault();
          setContent(pastedText);
          setPasteNotification(true);
          setTimeout(() => setPasteNotification(false), 2000);
        }
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, []);

  return (
    <div className="app">
      {/* 头部 */}
      <header className="header">
        <div className="logo">
          <h1>WriteNow</h1>
          <span className="slogan">Write, Format, Publish.</span>
        </div>
        <div className="theme-selector">
          {themes.map((theme) => (
            <button
              key={theme.name}
              className={`theme-button ${currentTheme === theme.name ? 'active' : ''}`}
              onClick={() => handleThemeChange(theme.name as ThemeType)}
              style={{ '--theme-color': theme.preview } as React.CSSProperties}
            >
              {theme.displayName}
            </button>
          ))}
        </div>
      </header>

      {/* 主内容区 */}
      <main className="main">
        {/* 编辑器 */}
        <section className="editor-section">
          <div className="editor-container" ref={editorRef}>
            <SimpleEditor
              value={content}
              onChange={setContent}
            />
            <QuickHints visible={showHints} />
          </div>
          <div className="editor-controls">
            <button className="control-button" onClick={handleClear}>
              清空
            </button>
            <button className="control-button" onClick={handleLoadSample}>
              示例文章
            </button>
          </div>
        </section>

        {/* 预览区 */}
        <section className="preview-section">
          <Preview
            html={html}
            themeName={currentTheme}
            isTransitioning={isTransitioning}
          />
        </section>
      </main>

      {/* 底部操作栏 */}
      <footer className="footer">
        <button
          className={`copy-button ${copied ? 'copied' : ''}`}
          onClick={handleCopy}
        >
          {copied ? (
            <>
              <span className="icon">✓</span>
              已复制！
            </>
          ) : (
            <>
              <span className="icon">📋</span>
              复制到公众号
            </>
          )}
        </button>
        <button className="download-button" onClick={handleDownload}>
          <span className="icon">↓</span>
          下载 .md
        </button>
      </footer>

      {/* 粘贴通知 */}
      {pasteNotification && (
        <div className="notification">
          已识别 Markdown 内容 ✨
        </div>
      )}
    </div>
  );
};

export default App;
