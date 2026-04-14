// 复制到剪贴板
export const copyToClipboard = async (html: string, plainText: string): Promise<boolean> => {
  try {
    // 尝试使用现代 Clipboard API
    if (navigator.clipboard && navigator.clipboard.write) {
      const clipboardItem = new ClipboardItem({
        'text/html': new Blob([html], { type: 'text/html' }),
        'text/plain': new Blob([plainText], { type: 'text/plain' })
      });
      await navigator.clipboard.write([clipboardItem]);
      return true;
    }

    // 降级方案：使用传统方法
    const textArea = document.createElement('div');
    textArea.innerHTML = html;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);

    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(textArea);

    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }

    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);

    if (selection) {
      selection.removeAllRanges();
    }

    return successful;
  } catch (error) {
    console.error('Copy failed:', error);
    return false;
  }
};

// 检测是否是 Markdown 内容
export const isMarkdown = (text: string): boolean => {
  const markdownIndicators = [
    /^#{1,6}\s+/m,           // 标题
    /^\*\*.*\*\*/m,          // 粗体
    /^- .+/m,                // 无序列表
    /^\d+\. .+/m,            // 有序列表
    /^\> .+/m,               // 引用
    /\[.+\]\(.+\)/,          // 链接
    /```[\s\S]*?```/,        // 代码块
    /^\|.+?\|/m              // 表格
  ];

  return markdownIndicators.some(pattern => pattern.test(text));
};
