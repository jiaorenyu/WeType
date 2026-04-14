import juice from 'juice';
import { ThemeConfig } from '../types';

// 内联样式生成器
export const inlineStyles = (html: string, theme: ThemeConfig): string => {
  const fullHtml = `
    <div class="article-content">
      ${html}
    </div>
  `;

  const options = {
    extraCss: theme.css,
    removeStyleTags: false,
    preserveImportant: true,
    preserveMediaQueries: false,
    preserveFontFaces: false,
    applyWidthAttributes: true,
    applyHeightAttributes: true,
    applyAttributesTableElements: true
  };

  try {
    const inlined = juice(fullHtml, options);
    return inlined;
  } catch (error) {
    console.error('Style inlining failed:', error);
    return fullHtml;
  }
};

// 生成微信兼容的 HTML
export const generateWeChatHtml = (html: string, theme: ThemeConfig): string => {
  const inlined = inlineStyles(html, theme);

  // 微信兼容性处理
  let wechatHtml = inlined
    // 将 div 转换为 section（微信更友好）
    .replace(/<div class="article-content">/g, '<section class="article-content">')
    .replace(/<\/div>/g, '</section>')
    // 移除不支持的 flex 属性
    .replace(/display:\s*flex[^;]*;?/g, 'display: block;')
    // 移除 grid 属性
    .replace(/display:\s*grid[^;]*;?/g, 'display: block;')
    // 移除 transform 属性
    .replace(/transform:[^;]*;?/g, '')
    // 压缩样式属性中的空格
    .replace(/style="([^"]*)"/g, (_match: string, styles: string) => {
      const compressed = styles.replace(/\s+/g, ' ').trim();
      return `style="${compressed}"`;
    });

  return wechatHtml;
};
