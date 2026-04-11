import { describe, it, expect } from 'vitest';
import { templates, getTemplateById, getTemplatesByCategory } from '../../src/data/templates';

describe('templates', () => {
  describe('templates array', () => {
    it('should have 10 templates', () => {
      expect(templates.length).toBe(10);
    });

    it('should have unique IDs', () => {
      const ids = templates.map(t => t.id);
      const uniqueIds = new Set(ids);
      
      expect(uniqueIds.size).toBe(templates.length);
    });

    it('should have all required categories', () => {
      const categories = new Set(templates.map(t => t.category));
      
      expect(categories.has('tech')).toBe(true);
      expect(categories.has('life')).toBe(true);
      expect(categories.has('business')).toBe(true);
      expect(categories.has('emotion')).toBe(true);
      expect(categories.has('food')).toBe(true);
    });
  });

  describe('getTemplateById', () => {
    it('should return correct template', () => {
      const template = getTemplateById('tech-minimal');
      
      expect(template).toBeDefined();
      expect(template?.name).toBe('科技极简');
    });

    it('should return undefined for invalid ID', () => {
      const template = getTemplateById('non-existent');
      
      expect(template).toBeUndefined();
    });
  });

  describe('getTemplatesByCategory', () => {
    it('should return tech templates', () => {
      const techTemplates = getTemplatesByCategory('tech');
      
      expect(techTemplates.length).toBe(2); // tech-minimal and geek-code
      expect(techTemplates.every(t => t.category === 'tech')).toBe(true);
    });

    it('should return life templates', () => {
      const lifeTemplates = getTemplatesByCategory('life');
      
      expect(lifeTemplates.length).toBe(2); // literary-clean and girl-pink
      expect(lifeTemplates.every(t => t.category === 'life')).toBe(true);
    });

    it('should return empty array for invalid category', () => {
      const templates = getTemplatesByCategory('invalid');
      
      expect(templates.length).toBe(0);
    });
  });

  describe('template structure', () => {
    it('should have all required style properties', () => {
      templates.forEach(template => {
        expect(template.styles.body).toBeDefined();
        expect(template.styles.h1).toBeDefined();
        expect(template.styles.h2).toBeDefined();
        expect(template.styles.h3).toBeDefined();
        expect(template.styles.paragraph).toBeDefined();
        expect(template.styles.blockquote).toBeDefined();
        expect(template.styles.code).toBeDefined();
        expect(template.styles.list).toBeDefined();
        expect(template.styles.image).toBeDefined();
      });
    });

    it('should have fontFamily in body style', () => {
      templates.forEach(template => {
        expect(template.styles.body.fontFamily).toBeDefined();
      });
    });
  });
});
