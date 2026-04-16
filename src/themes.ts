import { ThemeConfig } from './types';

// 极客代码主题 - 深色代码块,技术感强
export const geekTheme: ThemeConfig = {
  name: 'geek',
  displayName: '极客代码',
  preview: '#1A5F7A',
  css: `
    .article-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      font-size: 15px;
      line-height: 1.7;
      color: #2c3e50;
      max-width: 100%;
      margin: 0;
      padding: 20px;
    }

    .article-content h1,
    .article-content h2,
    .article-content h3,
    .article-content h4 {
      color: #1A5F7A;
      font-weight: 600;
      margin-top: 28px;
      margin-bottom: 14px;
    }

    .article-content h1 {
      font-size: 24px;
      border-bottom: 3px solid #1A5F7A;
      padding-bottom: 10px;
    }

    .article-content h2 {
      font-size: 20px;
      border-left: 4px solid #1A5F7A;
      padding-left: 12px;
    }

    .article-content h3 {
      font-size: 18px;
    }

    .article-content p {
      margin: 16px 0;
      text-align: justify;
    }

    .article-content a {
      color: #1A5F7A;
      text-decoration: none;
      border-bottom: 1px dashed #1A5F7A;
    }

    .article-content a:hover {
      border-bottom-style: solid;
    }

    .article-content ul,
    .article-content ol {
      padding-left: 24px;
      margin: 16px 0;
    }

    .article-content li {
      margin: 8px 0;
      line-height: 1.8;
    }

    .article-content blockquote {
      border-left: 4px solid #1A5F7A;
      background: linear-gradient(to right, rgba(26, 95, 122, 0.05), transparent);
      padding: 16px;
      margin: 20px 0;
      font-style: italic;
      color: #555;
    }

    .article-content pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0;
      position: relative;
    }

    .article-content code {
      font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
      font-size: 13px;
    }

    .article-content pre code {
      background: transparent;
      padding: 0;
    }

    .article-content p code,
    .article-content li code {
      background: rgba(26, 95, 122, 0.1);
      padding: 2px 6px;
      border-radius: 4px;
      color: #1A5F7A;
    }

    .article-content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 20px auto;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      background: #f5f5f5;
    }

    .article-content img[src=""],
    .article-content img:not([src]) {
      min-height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
    }

    .article-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }

    .article-content th,
    .article-content td {
      border: 1px solid #e0e0e0;
      padding: 12px;
      text-align: left;
    }

    .article-content th {
      background: #1A5F7A;
      color: white;
      font-weight: 600;
    }

    .article-content tr:nth-child(even) {
      background: #f8f9fa;
    }

    /* 任务列表样式 */
    .article-content ul.task-list {
      list-style: none;
      padding-left: 0;
    }

    .article-content .task-list-item {
      list-style: none;
      margin: 8px 0;
      padding-left: 28px;
      position: relative;
    }

    .article-content .task-list-item input[type="checkbox"] {
      position: absolute;
      left: 0;
      top: 4px;
      width: 18px;
      height: 18px;
      margin: 0;
      cursor: pointer;
      accent-color: #1A5F7A;
    }

    .article-content .task-list-item input[type="checkbox"]:checked {
      background: #1A5F7A;
      border-color: #1A5F7A;
    }

    .article-content .task-list-item input[type="checkbox"]:checked + span {
      text-decoration: line-through;
      color: #999;
    }
  `
};

// 文艺阅读主题 - 衬线字体,大留白,优雅
export const literaryTheme: ThemeConfig = {
  name: 'literary',
  displayName: '文艺阅读',
  preview: '#8B4513',
  css: `
    .article-content {
      font-family: 'Georgia', 'Times New Roman', 'Songti SC', serif;
      font-size: 16px;
      line-height: 1.9;
      color: #333;
      max-width: 100%;
      margin: 0;
      padding: 30px 20px;
    }

    .article-content h1,
    .article-content h2,
    .article-content h3,
    .article-content h4 {
      font-family: 'Georgia', 'Times New Roman', serif;
      color: #8B4513;
      font-weight: 600;
      margin-top: 36px;
      margin-bottom: 18px;
    }

    .article-content h1 {
      font-size: 26px;
      text-align: center;
      margin-bottom: 24px;
    }

    .article-content h2 {
      font-size: 22px;
      text-align: center;
      margin-top: 40px;
    }

    .article-content h3 {
      font-size: 19px;
      margin-top: 32px;
    }

    .article-content p {
      margin: 24px 0;
      text-align: justify;
      text-indent: 2em;
    }

    .article-content p:first-of-type {
      text-indent: 0;
    }

    .article-content a {
      color: #8B4513;
      text-decoration: none;
      font-style: italic;
    }

    .article-content a:hover {
      text-decoration: underline;
    }

    .article-content ul,
    .article-content ol {
      padding-left: 32px;
      margin: 24px 0;
    }

    .article-content li {
      margin: 12px 0;
      line-height: 2;
    }

    .article-content blockquote {
      border: none;
      background: #fff8e8;
      padding: 20px 24px;
      margin: 28px 0;
      position: relative;
      font-style: italic;
    }

    .article-content blockquote::before {
      content: '"';
      font-size: 48px;
      color: #8B4513;
      position: absolute;
      top: -10px;
      left: 10px;
      opacity: 0.3;
    }

    .article-content pre {
      background: #f5f5f0;
      color: #333;
      padding: 20px;
      border-radius: 0;
      overflow-x: auto;
      margin: 24px 0;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      border-left: 3px solid #8B4513;
    }

    .article-content code {
      font-family: 'Courier New', monospace;
      font-size: 14px;
    }

    .article-content pre code {
      background: transparent;
      padding: 0;
    }

    .article-content p code,
    .article-content li code {
      background: #fff8e8;
      padding: 2px 6px;
      color: #8B4513;
    }

    .article-content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 30px auto;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .article-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 28px 0;
    }

    .article-content th,
    .article-content td {
      border: 1px solid #ddd;
      padding: 14px;
      text-align: left;
    }

    .article-content th {
      background: #8B4513;
      color: white;
      font-family: 'Georgia', serif;
    }

    .article-content tr:hover {
      background: #faf8f5;
    }

    /* 任务列表样式 */
    .article-content ul.task-list {
      list-style: none;
      padding-left: 0;
    }

    .article-content .task-list-item {
      list-style: none;
      margin: 10px 0;
      padding-left: 32px;
      position: relative;
    }

    .article-content .task-list-item input[type="checkbox"] {
      position: absolute;
      left: 0;
      top: 6px;
      width: 20px;
      height: 20px;
      margin: 0;
      cursor: pointer;
      accent-color: #8B4513;
    }

    .article-content .task-list-item input[type="checkbox"]:checked {
      background: #8B4513;
      border-color: #8B4513;
    }

    .article-content .task-list-item input[type="checkbox"]:checked + span {
      text-decoration: line-through;
      color: #999;
    }
  `
};

// 简约商务主题 - 干净利落,专业
export const minimalTheme: ThemeConfig = {
  name: 'minimal',
  displayName: '简约商务',
  preview: '#2c3e50',
  css: `
    .article-content {
      font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
      font-size: 15px;
      line-height: 1.8;
      color: #2c3e50;
      max-width: 100%;
      margin: 0;
      padding: 24px;
    }

    .article-content h1,
    .article-content h2,
    .article-content h3,
    .article-content h4 {
      color: #2c3e50;
      font-weight: 700;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    .article-content h1 {
      font-size: 22px;
      border-bottom: 2px solid #2c3e50;
      padding-bottom: 8px;
    }

    .article-content h2 {
      font-size: 18px;
    }

    .article-content h3 {
      font-size: 16px;
    }

    .article-content p {
      margin: 14px 0;
      text-align: left;
    }

    .article-content a {
      color: #2c3e50;
      text-decoration: underline;
      font-weight: 500;
    }

    .article-content a:hover {
      color: #34495e;
    }

    .article-content ul,
    .article-content ol {
      padding-left: 20px;
      margin: 14px 0;
    }

    .article-content li {
      margin: 6px 0;
      line-height: 1.7;
    }

    .article-content blockquote {
      border-left: 3px solid #2c3e50;
      background: #f8f9fa;
      padding: 12px 16px;
      margin: 16px 0;
    }

    .article-content pre {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      color: #2c3e50;
      padding: 14px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 16px 0;
    }

    .article-content code {
      font-family: 'Consolas', 'Monaco', monospace;
      font-size: 13px;
    }

    .article-content pre code {
      background: transparent;
      padding: 0;
    }

    .article-content p code,
    .article-content li code {
      background: #e9ecef;
      padding: 2px 5px;
      border-radius: 3px;
      color: #495057;
    }

    .article-content img {
      max-width: 100%;
      height: auto;
      display: block;
      margin: 16px auto;
    }

    .article-content table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }

    .article-content th,
    .article-content td {
      border: 1px solid #dee2e6;
      padding: 10px 12px;
      text-align: left;
    }

    .article-content th {
      background: #f1f3f5;
      color: #2c3e50;
      font-weight: 600;
    }

    .article-content tr:hover {
      background: #f8f9fa;
    }

    /* 任务列表样式 */
    .article-content ul.task-list {
      list-style: none;
      padding-left: 0;
    }

    .article-content .task-list-item {
      list-style: none;
      margin: 6px 0;
      padding-left: 26px;
      position: relative;
    }

    .article-content .task-list-item input[type="checkbox"] {
      position: absolute;
      left: 0;
      top: 3px;
      width: 16px;
      height: 16px;
      margin: 0;
      cursor: pointer;
      accent-color: #2c3e50;
    }

    .article-content .task-list-item input[type="checkbox"]:checked {
      background: #2c3e50;
      border-color: #2c3e50;
    }

    .article-content .task-list-item input[type="checkbox"]:checked + span {
      text-decoration: line-through;
      color: #999;
    }
  `
};

export const themes: ThemeConfig[] = [
  geekTheme,
  literaryTheme,
  minimalTheme
];

export const getThemeByName = (name: string): ThemeConfig => {
  return themes.find(t => t.name === name) || minimalTheme;
};
