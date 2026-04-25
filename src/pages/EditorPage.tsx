import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MilkdownProvider } from '@milkdown/react';
import MilkdownEditor from '../components/MilkdownEditor';
import EditorToolbar from '../components/EditorToolbar';
import ThemeSelector from '../components/ThemeSelector';
import { getThemeByName } from '../themes';
import { parseMarkdown, extractPlainText } from '../utils/markdown';
import { generateWeChatHtml } from '../utils/juice';
import { copyToClipboard, isMarkdown } from '../utils/clipboard';
import { sampleMarkdown } from '../sampleContent';
import { ThemeType } from '../types';
import '../App.css';

const EditorContent: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState(sampleMarkdown);
  const [currentTheme, setCurrentTheme] = useState<ThemeType>('geek');
  const [copied, setCopied] = useState(false);
  const [pasteNotification, setPasteNotification] = useState(false);

  // 主题切换
  const handleThemeChange = (themeName: ThemeType) => {
    if (themeName !== currentTheme) {
      setCurrentTheme(themeName);
    }
  };

  // 编辑器就绪
  const handleEditorReady = useCallback((_getEditor: () => any) => {
    // Editor instance is available via the callback if needed
  }, []);

  // 复制到公众号
  const handleCopy = async () => {
    const html = parseMarkdown(content);
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
      const activeElement = document.activeElement;
      const isEditorFocused = activeElement?.closest('.milkdown-editor-wrapper');

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
        <div className="logo" style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <h1>WriteNow</h1>
          <span className="slogan">Write, Format, Publish.</span>
        </div>
        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '8px 16px',
              border: '2px solid #e0e0e0',
              background: 'white',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#666',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#1A5F7A';
              e.currentTarget.style.color = '#1A5F7A';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e0e0e0';
              e.currentTarget.style.color = '#666';
            }}
          >
            ← 首页
          </button>
          <ThemeSelector value={currentTheme} onChange={handleThemeChange} />
        </div>
      </header>

      {/* 编辑器区域 - 单栏布局 */}
      <main className="editor-main">
        <EditorToolbar />
        <div className="editor-content-area">
          <MilkdownEditor
            content={content}
            onChange={setContent}
            themeCss={getThemeByName(currentTheme).css}
            onReady={handleEditorReady}
          />
        </div>
        <div className="editor-action-bar">
          <button className="action-btn secondary" onClick={handleClear}>
            清空
          </button>
          <button className="action-btn secondary" onClick={handleLoadSample}>
            示例文章
          </button>
          <div className="action-bar-spacer" />
          <button className="action-btn secondary" onClick={handleDownload}>
            <span className="icon">↓</span>
            下载 .md
          </button>
          <button
            className={`action-btn primary ${copied ? 'copied' : ''}`}
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
        </div>
      </main>

      {/* 粘贴通知 */}
      {pasteNotification && (
        <div className="notification">
          已识别 Markdown 内容 ✨
        </div>
      )}
    </div>
  );
};

const EditorPage: React.FC = () => {
  return (
    <MilkdownProvider>
      <EditorContent />
    </MilkdownProvider>
  );
};

export default EditorPage;
