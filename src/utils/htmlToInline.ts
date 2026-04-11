// @ts-ignore
import juice from 'juice';
import { Descendant, Element as SlateElement, Text } from 'slate';
import type { CustomElement, CustomText, Template } from '../types';

/**
 * Generate inline styles from template and editor content
 */
export const generateInlineHtml = (
  nodes: Descendant[],
  template: Template | null
): string => {
  const html = nodesToHtml(nodes);
  
  if (!template) {
    return html;
  }

  // Generate CSS from template
  const css = generateTemplateCSS(template);
  
  // Use juice to inline the styles
  const inlinedHtml = juice.inlineContent(html, css, {
    inlinePseudoElements: true,
    preserveImportant: true,
  });

  return inlinedHtml;
};

/**
 * Convert Slate nodes to HTML
 */
const nodesToHtml = (nodes: Descendant[]): string => {
  return nodes.map((node) => nodeToHtml(node)).join('');
};

/**
 * Convert a single Slate node to HTML
 */
const nodeToHtml = (node: Descendant): string => {
  if (Text.isText(node)) {
    return textToHtml(node as CustomText);
  }
  
  if (SlateElement.isElement(node)) {
    return elementToHtml(node as CustomElement);
  }
  
  return '';
};

/**
 * Convert text node to HTML
 */
const textToHtml = (node: CustomText): string => {
  let text = escapeHtml(node.text);
  
  if (node.bold) {
    text = `<strong>${text}</strong>`;
  }
  if (node.italic) {
    text = `<em>${text}</em>`;
  }
  if (node.underline) {
    text = `<u>${text}</u>`;
  }
  
  return text;
};

/**
 * Convert element node to HTML
 */
const elementToHtml = (element: CustomElement): string => {
  switch (element.type) {
    case 'paragraph': {
      const children = element.children.map((child) => textToHtml(child)).join('');
      return `<p style="${getParagraphStyle(element)}">${children}</p>`;
    }
    case 'heading': {
      const tag = `h${element.level}`;
      const children = element.children.map((child) => textToHtml(child)).join('');
      return `<${tag}>${children}</${tag}>`;
    }
    case 'blockquote': {
      const children = 'children' in element ? (element.children as Descendant[]).map(nodeToHtml).join('') : '';
      return `<blockquote style="border-left: 3px solid #ddd; padding-left: 1em; color: #666; font-style: italic;">${children}</blockquote>`;
    }
    case 'code-block': {
      const children = element.children.map((child) => textToHtml(child)).join('');
      return `<pre style="background: #f5f5f5; padding: 1em; border-radius: 4px; overflow-x: auto;"><code>${children}</code></pre>`;
    }
    case 'bulleted-list': {
      const children = 'children' in element ? (element.children as Descendant[]).map(nodeToHtml).join('') : '';
      return `<ul>${children}</ul>`;
    }
    case 'numbered-list': {
      const children = 'children' in element ? (element.children as Descendant[]).map(nodeToHtml).join('') : '';
      return `<ol>${children}</ol>`;
    }
    case 'list-item': {
      const children = 'children' in element ? (element.children as Descendant[]).map(nodeToHtml).join('') : '';
      return `<li>${children}</li>`;
    }
    default:
      return '';
  }
};

/**
 * Get paragraph inline styles
 */
const getParagraphStyle = (element: Record<string, unknown>): string => {
  const styles: string[] = [];
  
  if (element.align) {
    styles.push(`text-align: ${element.align}`);
  }
  if (element.lineHeight) {
    styles.push(`line-height: ${element.lineHeight}`);
  }
  if (element.letterSpacing) {
    styles.push(`letter-spacing: ${element.letterSpacing}px`);
  }
  if (element.marginLeft) {
    styles.push(`margin-left: ${element.marginLeft}px`);
  }
  if (element.marginRight) {
    styles.push(`margin-right: ${element.marginRight}px`);
  }
  
  return styles.join('; ');
};

/**
 * Generate CSS from template
 */
const generateTemplateCSS = (template: Template): string => {
  const { styles } = template;
  
  let css = 'body { ';
  if (styles.body) {
    if (styles.body.fontFamily) css += `font-family: ${styles.body.fontFamily}; `;
    if (styles.body.fontSize) css += `font-size: ${styles.body.fontSize}px; `;
    if (styles.body.color) css += `color: ${styles.body.color}; `;
    if (styles.body.backgroundColor) css += `background-color: ${styles.body.backgroundColor}; `;
    if (styles.body.lineHeight) css += `line-height: ${styles.body.lineHeight}; `;
    if (styles.body.padding) css += `padding: ${styles.body.padding}; `;
  }
  css += '} ';
  
  // Headings
  (['h1', 'h2', 'h3'] as const).forEach((heading) => {
    const style = styles[heading];
    if (style) {
      css += `${heading} { `;
      if (style.fontSize) css += `font-size: ${style.fontSize}px; `;
      if (style.fontWeight) css += `font-weight: ${style.fontWeight}; `;
      if (style.color) css += `color: ${style.color}; `;
      if (style.textAlign) css += `text-align: ${style.textAlign}; `;
      css += '} ';
    }
  });
  
  // Paragraph
  if (styles.paragraph) {
    const style = styles.paragraph;
    css += 'p { ';
    if (style.lineHeight) css += `line-height: ${style.lineHeight}; `;
    if (style.textAlign) css += `text-align: ${style.textAlign}; `;
    if (style.margin) css += `margin: ${style.margin}; `;
    css += '} ';
  }
  
  // Blockquote
  if (styles.blockquote) {
    const style = styles.blockquote;
    css += 'blockquote { ';
    if (style.borderLeft) css += `border-left: ${style.borderLeft}; `;
    if (style.padding) css += `padding: ${style.padding}; `;
    if (style.color) css += `color: ${style.color}; `;
    if (style.fontStyle) css += `font-style: ${style.fontStyle}; `;
    css += '} ';
  }
  
  // Code block
  if (styles.code) {
    const style = styles.code;
    css += 'pre, code { ';
    if (style.fontFamily) css += `font-family: ${style.fontFamily}; `;
    if (style.backgroundColor) css += `background-color: ${style.backgroundColor}; `;
    if (style.color) css += `color: ${style.color}; `;
    if (style.padding) css += `padding: ${style.padding}; `;
    if (style.borderRadius) css += `border-radius: ${style.borderRadius}; `;
    css += '} ';
  }
  
  return css;
};

/**
 * Escape HTML special characters
 */
const escapeHtml = (text: string): string => {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
};

/**
 * Fallback: generate plain text with formatting hints
 */
export const generateFallbackText = (nodes: Descendant[]): string => {
  return nodes.map((node) => {
    if (Text.isText(node)) {
      return (node as CustomText).text;
    }
    if (SlateElement.isElement(node)) {
      const element = node as CustomElement;
      const content = 'children' in element 
        ? (element.children as Descendant[]).map((n: Descendant) => {
            if (Text.isText(n)) return (n as CustomText).text;
            if (SlateElement.isElement(n)) {
              const childEl = n as CustomElement;
              if ('children' in childEl) {
                return (childEl.children as CustomText[]).map(c => c.text).join('');
              }
            }
            return '';
          }).join('')
        : '';
      
      switch (element.type) {
        case 'heading':
          return `\n【${content}】\n`;
        case 'blockquote':
          return `\n> ${content}\n`;
        case 'code-block':
          return `\n\`\`\`\n${content}\n\`\`\`\n`;
        case 'bulleted-list':
        case 'numbered-list':
          return `\n${content}`;
        case 'list-item':
          return `• ${content}\n`;
        default:
          return `${content}\n`;
      }
    }
    return '';
  }).join('');
};
