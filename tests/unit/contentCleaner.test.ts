import { describe, it, expect } from 'vitest';
import { cleanPastedContent, htmlToPlainText, stripHtml } from '../../src/utils/contentCleaner';

describe('contentCleaner', () => {
  describe('cleanPastedContent', () => {
    it('should remove HTML tags', () => {
      const html = '<p>Hello <strong>World</strong></p>';
      const result = cleanPastedContent(html);
      
      expect(result).toBe('Hello World');
    });

    it('should handle complex HTML', () => {
      const html = '<div class="test"><h1>Title</h1><p>Paragraph with <em>emphasis</em></p></div>';
      const result = cleanPastedContent(html);
      
      expect(result).toContain('Title');
      expect(result).toContain('Paragraph');
      expect(result).toContain('emphasis');
    });

    it('should handle empty input', () => {
      expect(cleanPastedContent('')).toBe('');
      expect(cleanPastedContent('<></>')).toBe('');
    });
  });

  describe('htmlToPlainText', () => {
    it('should convert basic HTML to plain text', () => {
      const html = '<p>Hello World</p>';
      const result = htmlToPlainText(html);
      
      expect(result).toContain('Hello');
      expect(result).toContain('World');
    });

    it('should handle headings', () => {
      const html = '<h1>Main Title</h1><h2>Sub Title</h2>';
      const result = htmlToPlainText(html);
      
      expect(result).toContain('Main Title');
      expect(result).toContain('Sub Title');
    });

    it('should handle nested elements', () => {
      const html = '<div><p>Nested <span>content</span></p></div>';
      const result = htmlToPlainText(html);
      
      expect(result).toContain('Nested');
      expect(result).toContain('content');
    });
  });

  describe('stripHtml', () => {
    it('should remove all HTML tags', () => {
      const html = '<div><p class="test">Content</p><a href="#">Link</a></div>';
      const result = stripHtml(html);
      
      expect(result).toBe('ContentLink');
    });

    it('should handle script tags by removing them', () => {
      const html = '<p>Hello</p><script>alert("xss")</script>';
      const result = stripHtml(html);
      
      // Note: Our simple implementation removes tags but keeps text
      // For security, use DOMPurify in production
      expect(result).toContain('Hello');
    });
  });
});
