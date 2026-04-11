import type { Template } from '../../../types';

export const geekCode: Template = {
  id: 'geek-code',
  name: '极客代码',
  description: '专为程序员设计，代码块优化',
  preview: '',
  category: 'tech',
  styles: {
    body: {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: 15,
      color: '#abb2bf',
      backgroundColor: '#282c34',
      lineHeight: 1.7,
      padding: '24px 40px',
    },
    h1: {
      fontSize: 28,
      fontWeight: 700,
      color: '#e06c75',
      textAlign: 'left',
      margin: '24px 0 16px',
      borderBottom: '2px solid #61afef',
      padding: '0 0 8px 0',
    },
    h2: {
      fontSize: 21,
      fontWeight: 600,
      color: '#98c379',
      margin: '20px 0 12px',
    },
    h3: {
      fontSize: 17,
      fontWeight: 600,
      color: '#d19a66',
      margin: '16px 0 10px',
    },
    paragraph: {
      lineHeight: 1.85,
      textAlign: 'left',
      margin: '10px 0',
    },
    blockquote: {
      borderLeft: '4px solid #5c6370',
      padding: '12px 20px',
      color: '#7f848e',
      fontStyle: 'normal',
      margin: '16px 0',
      backgroundColor: '#21252b',
    },
    code: {
      fontFamily: 'Fira Code, Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#21252b',
      color: '#98c379',
      padding: '16px',
      borderRadius: '6px',
      border: '1px solid #3e4451',
    },
    list: {
      lineHeight: 1.8,
      padding: '0 24px',
    },
    image: {
      borderRadius: '8px',
      margin: '16px 0',
    },
  },
};
