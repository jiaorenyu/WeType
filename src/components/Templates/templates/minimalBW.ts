import type { Template } from '../../../types';

export const minimalBW: Template = {
  id: 'minimal-bw',
  name: '简约黑白',
  description: '通用场景，极简风格',
  preview: '',
  category: 'general',
  styles: {
    body: {
      fontFamily: 'Georgia, serif',
      fontSize: 16,
      color: '#000000',
      backgroundColor: '#ffffff',
      lineHeight: 1.8,
      padding: '20px 30px',
    },
    h1: {
      fontSize: 26,
      fontWeight: 700,
      color: '#000',
      textAlign: 'center',
      margin: '24px 0',
      letterSpacing: '1px',
    },
    h2: {
      fontSize: 20,
      fontWeight: 600,
      color: '#1a1a1a',
      margin: '20px 0 12px',
    },
    h3: {
      fontSize: 17,
      fontWeight: 600,
      color: '#333',
      margin: '16px 0 10px',
    },
    paragraph: {
      lineHeight: 1.8,
      textAlign: 'left',
      margin: '12px 0',
    },
    blockquote: {
      borderLeft: '2px solid #000',
      padding: '10px 20px',
      color: '#555',
      fontStyle: 'italic',
      margin: '16px 0',
    },
    code: {
      fontFamily: 'Consolas, monospace',
      fontSize: 14,
      backgroundColor: '#f5f5f5',
      color: '#333',
      padding: '12px',
      borderRadius: '4px',
    },
    list: {
      lineHeight: 1.8,
      padding: '0 20px',
    },
    image: {
      borderRadius: '0',
      margin: '16px 0',
    },
  },
};
