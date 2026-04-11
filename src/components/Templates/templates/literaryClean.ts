import type { Template } from '../../../types';

export const literaryClean: Template = {
  id: 'literary-clean',
  name: '文艺清新',
  description: '适合生活随笔、文艺类文章',
  preview: '',
  category: 'life',
  styles: {
    body: {
      fontFamily: 'Georgia, serif',
      fontSize: 16,
      color: '#333',
      backgroundColor: '#fafafa',
      lineHeight: 1.8,
      padding: '20px 30px',
    },
    h1: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#2c3e50',
      textAlign: 'center',
      margin: '20px 0',
    },
    h2: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#34495e',
      margin: '18px 0 12px',
    },
    h3: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#4a5568',
      margin: '15px 0 10px',
    },
    paragraph: {
      lineHeight: 2,
      textAlign: 'justify',
      margin: '12px 0',
    },
    blockquote: {
      borderLeft: '3px solid #a0aec0',
      padding: '10px 20px',
      color: '#718096',
      fontStyle: 'italic',
      margin: '15px 0',
    },
    code: {
      fontFamily: 'Fira Code, Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#edf2f7',
      color: '#2d3748',
      padding: '12px',
      borderRadius: '6px',
    },
    list: {
      lineHeight: 2,
      padding: '0 20px',
    },
    image: {
      borderRadius: '8px',
      margin: '15px auto',
    },
  },
};
