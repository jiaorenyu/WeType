import { marked } from 'marked';
import DOMPurify from 'dompurify';

/**
 * 解析 Markdown 内容并生成安全的 HTML
 * @param content Markdown 内容
 * @returns 解析后的 HTML 字符串
 */
export const parseMarkdown = (content: string): string => {
  if (!content) return '';
  
  try {
    // 解析 Markdown 为 HTML
    const html = marked(content);
    
    // 净化 HTML，防止 XSS 攻击
    const sanitizedHtml = DOMPurify.sanitize(html as string);
    
    // 处理图片，添加响应式样式
    const processedHtml = sanitizedHtml.replace(
      /<img\s+src="([^"]+)"\s*alt="([^"]*)"?\s*\/?>/g,
      '<img src="$1" alt="$2" style="max-width:100%; height:auto; display:block; margin:0 auto;" />'
    );
    
    return processedHtml;
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return content;
  }
};

/**
 * 生成带样式的 HTML 片段，用于复制到剪贴板
 * @param content 解析后的 HTML 内容
 * @param styleConfig 样式配置
 * @returns 完整的 HTML 片段
 */
export const generateHtmlWithStyles = (content: string, styleConfig: any): string => {
  const { 
    primaryColor, 
    textColor, 
    bgColor, 
    baseFontSize, 
    h2FontSize, 
    h3FontSize, 
    lineHeight, 
    paragraphMargin, 
    quoteBorderColor, 
    quoteBgColor, 
    quoteBorderRadius, 
    codeBgColor, 
    codeBorderRadius 
  } = styleConfig;

  const styles = `
    <style>
      .article-content {
        font-size: ${baseFontSize}px;
        line-height: ${lineHeight};
        color: ${textColor};
        background-color: ${bgColor};
        padding: 20px;
      }
      
      .article-content h2 {
        font-size: ${h2FontSize}px;
        color: ${primaryColor};
        margin-top: 30px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        border-bottom: 2px solid ${primaryColor};
      }
      
      .article-content h3 {
        font-size: ${h3FontSize}px;
        color: ${primaryColor};
        margin-top: 25px;
        margin-bottom: 12px;
      }
      
      .article-content p {
        margin-bottom: ${paragraphMargin}px;
      }
      
      .article-content a {
        color: ${primaryColor};
        text-decoration: none;
      }
      
      .article-content a:hover {
        text-decoration: underline;
      }
      
      .article-content ul, .article-content ol {
        margin-bottom: ${paragraphMargin}px;
        padding-left: 20px;
      }
      
      .article-content li {
        margin-bottom: 8px;
      }
      
      .article-content blockquote {
        border-left: 4px solid ${quoteBorderColor};
        background-color: ${quoteBgColor};
        padding: 15px;
        border-radius: ${quoteBorderRadius}px;
        margin-bottom: ${paragraphMargin}px;
      }
      
      .article-content pre {
        background-color: ${codeBgColor};
        padding: 15px;
        border-radius: ${codeBorderRadius}px;
        overflow-x: auto;
        margin-bottom: ${paragraphMargin}px;
      }
      
      .article-content code {
        background-color: ${codeBgColor};
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', Courier, monospace;
      }
      
      .article-content pre code {
        background-color: transparent;
        padding: 0;
      }
      
      .article-content img {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        margin-bottom: ${paragraphMargin}px;
      }
    </style>
  `;

  return `
    <div class="wx-editor-preview">
      ${styles}
      <div class="article-content">
        ${content}
      </div>
    </div>
  `;
};