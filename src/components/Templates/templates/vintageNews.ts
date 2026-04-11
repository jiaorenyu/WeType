import type { Template } from '../../../types';

export const vintageNews: Template = {
  id: 'vintage-news',
  name: '复古报纸',
  description: '适合资讯类、传统媒体风格',
  preview: '',
  category: 'news',
  styles: {
    body: {
      fontFamily: 'Georgia, Times New Roman, serif',
      fontSize: 15,
      color: '#2c2c2c',
      backgroundColor: '#fdf6e3',
      lineHeight: 1.7,
      padding: '24px 40px',
    },
    h1: {
      fontSize: 32,
      fontWeight: 700,
      color: '#1a1a1a',
      textAlign: 'center',
      margin: '16px 0',
      borderBottom: '3px double #1a1a1a',
      padding: '0 0 12px 0',
    },
    h2: {
      fontSize: 22,
      fontWeight: 700,
      color: '#333',
      margin: '20px 0 12px',
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
      color: '#444',
      margin: '16px 0 10px',
    },
    paragraph: {
      lineHeight: 1.8,
      textAlign: 'justify',
      margin: '10px 0',
    },
    blockquote: {
      borderLeft: '3px solid #8b7355',
      padding: '10px 20px',
      color: '#666',
      fontStyle: 'italic',
      margin: '14px 0',
    },
    code: {
      fontFamily: 'Courier New, monospace',
      fontSize: 13,
      backgroundColor: '#eee8d5',
      color: '#2c2c2c',
      padding: '10px',
      borderRadius: '2px',
    },
    list: {
      lineHeight: 1.7,
      padding: '0 24px',
    },
    image: {
      borderRadius: '0',
      margin: '12px 0',
    },
  },
};
