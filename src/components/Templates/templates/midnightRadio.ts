import type { Template } from '../../../types';

export const midnightRadio: Template = {
  id: 'midnight-radio',
  name: '深夜电台',
  description: '适合情感故事、深夜文案',
  preview: '',
  category: 'emotion',
  styles: {
    body: {
      fontFamily: 'Georgia, serif',
      fontSize: 17,
      color: '#e2e8f0',
      backgroundColor: '#1a1a2e',
      lineHeight: 2,
      padding: '30px 40px',
    },
    h1: {
      fontSize: 30,
      fontWeight: 400,
      color: '#f8f8f2',
      textAlign: 'center',
      margin: '30px 0',
      fontStyle: 'italic',
    },
    h2: {
      fontSize: 22,
      fontWeight: 400,
      color: '#bd93f9',
      textAlign: 'center',
      margin: '24px 0 16px',
    },
    h3: {
      fontSize: 18,
      fontWeight: 500,
      color: '#ff79c6',
      margin: '20px 0 12px',
    },
    paragraph: {
      lineHeight: 2.2,
      textAlign: 'justify',
      margin: '14px 0',
    },
    blockquote: {
      borderLeft: '3px solid #6272a4',
      padding: '14px 24px',
      color: '#8be9fd',
      fontStyle: 'italic',
      margin: '20px 0',
      backgroundColor: 'rgba(255,255,255,0.05)',
    },
    code: {
      fontFamily: 'Fira Code, Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#282a36',
      color: '#50fa7b',
      padding: '14px',
      borderRadius: '6px',
    },
    list: {
      lineHeight: 2,
      padding: '0 24px',
    },
    image: {
      borderRadius: '8px',
      margin: '20px 0',
    },
  },
};
