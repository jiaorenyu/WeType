import MarkdownIt from 'markdown-it';
import hljs from 'highlight.js';
import taskLists from 'markdown-it-task-lists';

// 初始化 markdown-it
const md: any = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str: string, lang: string): string {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const highlighted = hljs.highlight(str, { language: lang }).value;
        return `<pre class="hljs"><code class="language-${lang}">${highlighted}</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`;
  }
});

// 添加任务列表支持
md.use(taskLists, { enabled: true, label: true, lineNumber: true });

// 解析 Markdown 为 HTML
export const parseMarkdown = (markdown: string): string => {
  if (!markdown) return '';
  
  let html = md.render(markdown);
  
  // 为图片添加错误处理和样式
  html = html.replace(/<img/g, '<img onerror="this.style.background=\'linear-gradient(135deg, #667eea 0%, #764ba2 100%)\'; this.style.minHeight=\'200px\'; this.alt=this.alt||\'图片加载失败\'"');
  
  return html;
};

// 检测代码块语言
export const detectCodeLanguage = (html: string): string => {
  const langMatch = html.match(/class="language-(\w+)"/);
  return langMatch ? langMatch[1] : 'code';
};

// 提取纯文本（用于降级）
export const extractPlainText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
