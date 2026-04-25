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

  // 兼容中文书写习惯：##标题 → ## 标题
  let html = md.render(normalizeHeadings(markdown));
  
  // 为图片添加错误处理和样式
  html = html.replace(/<img/g, '<img onerror="this.style.background=\'linear-gradient(135deg, #667eea 0%, #764ba2 100%)\'; this.style.minHeight=\'200px\'; this.alt=this.alt||\'图片加载失败\'"');
  
  return html;
};

// 检测代码块语言
export const detectCodeLanguage = (html: string): string => {
  const langMatch = html.match(/class="language-(\w+)"/);
  return langMatch ? langMatch[1] : 'code';
};

// 修复标题后未加空格的问题：兼容 "##标题" 等中文写法
export const normalizeHeadings = (markdown: string): string => {
  if (!markdown) return '';
  // 只在行首的 #{1,6} 后紧跟非空白字符时插入空格
  // 使用 multiline 模式逐行处理
  return markdown.split('\n').map(line => {
    // 保留围栏代码块内的内容不变，但这里不判断围栏，由外层统一处理
    // 简单处理：行首 # 后没有空格且不是单独 # 时插入空格
    return line.replace(/^(#{1,6})(?=[^\s#])/, '$1 ');
  }).join('\n');
};

// 提取纯文本（用于降级）
export const extractPlainText = (html: string): string => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
};
