import type { Template } from '../../../types';

export const foodExplore: Template = {
  id: 'food-explore',
  name: '美食探店',
  description: '适合美食推荐、探店类内容',
  preview: '',
  category: 'food',
  styles: {
    body: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: 16,
      color: '#4a4a4a',
      backgroundColor: '#fffbf5',
      lineHeight: 1.9,
      padding: '24px 36px',
    },
    h1: {
      fontSize: 28,
      fontWeight: 600,
      color: '#c0392b',
      textAlign: 'center',
      margin: '20px 0',
    },
    h2: {
      fontSize: 21,
      fontWeight: 600,
      color: '#d35400',
      margin: '18px 0 12px',
    },
    h3: {
      fontSize: 17,
      fontWeight: 600,
      color: '#e67e22',
      margin: '14px 0 10px',
    },
    paragraph: {
      lineHeight: 2,
      textAlign: 'left',
      margin: '12px 0',
    },
    blockquote: {
      borderLeft: '4px solid #f39c12',
      padding: '12px 20px',
      color: '#8b6914',
      fontStyle: 'italic',
      margin: '16px 0',
      backgroundColor: '#fef9e7',
    },
    code: {
      fontFamily: 'Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#fef5e7',
      color: '#b7791f',
      padding: '12px',
      borderRadius: '6px',
    },
    list: {
      lineHeight: 1.9,
      padding: '0 22px',
    },
    image: {
      borderRadius: '12px',
      margin: '16px 0',
    },
  },
};
