import type { Template } from '../../../types';

export const girlPink: Template = {
  id: 'girl-pink',
  name: '少女粉',
  description: '适合女性向、生活类内容',
  preview: '',
  category: 'life',
  styles: {
    body: {
      fontFamily: 'PingFang SC, Microsoft YaHei, sans-serif',
      fontSize: 15,
      color: '#5d4e60',
      backgroundColor: '#fff5f8',
      lineHeight: 1.9,
      padding: '24px 32px',
    },
    h1: {
      fontSize: 26,
      fontWeight: 500,
      color: '#e91e8c',
      textAlign: 'center',
      margin: '20px 0',
      letterSpacing: '2px',
    },
    h2: {
      fontSize: 20,
      fontWeight: 500,
      color: '#ec407a',
      margin: '18px 0 12px',
      paddingLeft: '10px',
      borderLeft: '3px solid #f48fb1',
    },
    h3: {
      fontSize: 17,
      fontWeight: 500,
      color: '#f06292',
      margin: '14px 0 10px',
    },
    paragraph: {
      lineHeight: 2,
      textAlign: 'left',
      margin: '12px 0',
    },
    blockquote: {
      borderLeft: '3px solid #f8bbd9',
      padding: '12px 20px',
      color: '#ad7a99',
      fontStyle: 'italic',
      margin: '16px 0',
      backgroundColor: '#fce4ec',
    },
    code: {
      fontFamily: 'Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#fce4ec',
      color: '#c2185b',
      padding: '12px',
      borderRadius: '8px',
    },
    list: {
      lineHeight: 2,
      padding: '0 22px',
    },
    image: {
      borderRadius: '16px',
      margin: '14px 0',
    },
  },
};
