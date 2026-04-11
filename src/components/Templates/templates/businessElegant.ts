import type { Template } from '../../../types';

export const businessElegant: Template = {
  id: 'business-elegant',
  name: '商务大气',
  description: '适合职场干货、商务类文章',
  preview: '',
  category: 'business',
  styles: {
    body: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: 16,
      color: '#374151',
      backgroundColor: '#ffffff',
      lineHeight: 1.8,
      padding: '30px 50px',
    },
    h1: {
      fontSize: 28,
      fontWeight: 700,
      color: '#1f2937',
      textAlign: 'center',
      margin: '20px 0',
      letterSpacing: '2px',
    },
    h2: {
      fontSize: 22,
      fontWeight: 600,
      color: '#111827',
      margin: '24px 0 14px',
      paddingLeft: '12px',
      borderLeft: '4px solid #2563eb',
    },
    h3: {
      fontSize: 18,
      fontWeight: 600,
      color: '#1f2937',
      margin: '18px 0 10px',
    },
    paragraph: {
      lineHeight: 2,
      textAlign: 'justify',
      margin: '14px 0',
    },
    blockquote: {
      borderLeft: '3px solid #93c5fd',
      padding: '12px 20px',
      color: '#6b7280',
      fontStyle: 'normal',
      margin: '18px 0',
      backgroundColor: '#f9fafb',
    },
    code: {
      fontFamily: 'Fira Code, Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#f3f4f6',
      color: '#1f2937',
      padding: '12px 16px',
      borderRadius: '4px',
    },
    list: {
      lineHeight: 2,
      padding: '0 24px',
    },
    image: {
      borderRadius: '4px',
      margin: '18px 0',
    },
  },
};
