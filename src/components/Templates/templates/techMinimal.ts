import type { Template } from '../../../types';

export const techMinimal: Template = {
  id: 'tech-minimal',
  name: '科技极简',
  description: '适合技术教程、编程类文章',
  preview: '',
  category: 'tech',
  styles: {
    body: {
      fontFamily: 'Inter, -apple-system, sans-serif',
      fontSize: 15,
      color: '#1a202c',
      backgroundColor: '#ffffff',
      lineHeight: 1.7,
      padding: '20px 40px',
    },
    h1: {
      fontSize: 26,
      fontWeight: 700,
      color: '#0f172a',
      textAlign: 'left',
      margin: '24px 0 16px',
      paddingLeft: '12px',
      borderLeft: '4px solid #3b82f6',
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,
      color: '#1e293b',
      margin: '20px 0 12px',
    },
    h3: {
      fontSize: 17,
      fontWeight: 600,
      color: '#334155',
      margin: '16px 0 8px',
    },
    paragraph: {
      lineHeight: 1.8,
      textAlign: 'left',
      margin: '10px 0',
    },
    blockquote: {
      borderLeft: '4px solid #3b82f6',
      padding: '12px 20px',
      color: '#64748b',
      fontStyle: 'normal',
      margin: '16px 0',
      backgroundColor: '#f1f5f9',
    },
    code: {
      fontFamily: 'Fira Code, Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#1e293b',
      color: '#e2e8f0',
      padding: '16px',
      borderRadius: '8px',
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
