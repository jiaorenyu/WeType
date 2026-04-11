import type { Template } from '../../../types';

export const energeticOrange: Template = {
  id: 'energetic-orange',
  name: '活力橙',
  description: '适合活动推广、促销文案',
  preview: '',
  category: 'general',
  styles: {
    body: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: 15,
      color: '#3d3d3d',
      backgroundColor: '#fffaf0',
      lineHeight: 1.8,
      padding: '24px 36px',
    },
    h1: {
      fontSize: 28,
      fontWeight: 700,
      color: '#e65100',
      textAlign: 'center',
      margin: '20px 0',
    },
    h2: {
      fontSize: 21,
      fontWeight: 600,
      color: '#ff6d00',
      margin: '18px 0 12px',
    },
    h3: {
      fontSize: 17,
      fontWeight: 600,
      color: '#f57c00',
      margin: '14px 0 10px',
    },
    paragraph: {
      lineHeight: 1.9,
      textAlign: 'left',
      margin: '12px 0',
    },
    blockquote: {
      borderLeft: '4px solid #ff9800',
      padding: '12px 20px',
      color: '#795548',
      fontStyle: 'normal',
      margin: '16px 0',
      backgroundColor: '#fff3e0',
    },
    code: {
      fontFamily: 'Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#ffe0b2',
      color: '#e65100',
      padding: '12px',
      borderRadius: '6px',
    },
    list: {
      lineHeight: 1.8,
      padding: '0 22px',
    },
    image: {
      borderRadius: '12px',
      margin: '14px 0',
    },
  },
};
