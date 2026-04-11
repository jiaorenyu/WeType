import { describe, it, expect } from 'vitest';
import { CONTENT_RULES, TEMPLATE_RECOMMENDATIONS } from '../../src/hooks/useContentType';
import { classifyContent } from '../../src/utils/contentClassifier';

describe('Content Type Classification', () => {
  describe('CONTENT_RULES', () => {
    it('should have all content types defined', () => {
      const types = ['tech', 'product', 'emotion', 'life', 'food', 'business', 'news', 'unknown'];
      
      types.forEach(type => {
        expect(CONTENT_RULES[type as keyof typeof CONTENT_RULES]).toBeDefined();
      });
    });

    it('should have keywords for tech type', () => {
      expect(CONTENT_RULES.tech.keywords.length).toBeGreaterThan(0);
      expect(CONTENT_RULES.tech.keywords).toContain('javascript');
      expect(CONTENT_RULES.tech.keywords).toContain('代码');
    });

    it('should have keywords for emotion type', () => {
      expect(CONTENT_RULES.emotion.keywords.length).toBeGreaterThan(0);
      expect(CONTENT_RULES.emotion.keywords).toContain('心情');
      expect(CONTENT_RULES.emotion.keywords).toContain('情感');
    });
  });

  describe('TEMPLATE_RECOMMENDATIONS', () => {
    it('should recommend correct templates', () => {
      expect(TEMPLATE_RECOMMENDATIONS.tech).toBe('tech-minimal');
      expect(TEMPLATE_RECOMMENDATIONS.emotion).toBe('midnight-radio');
      expect(TEMPLATE_RECOMMENDATIONS.life).toBe('literary-clean');
      expect(TEMPLATE_RECOMMENDATIONS.food).toBe('food-explore');
      expect(TEMPLATE_RECOMMENDATIONS.business).toBe('business-elegant');
      expect(TEMPLATE_RECOMMENDATIONS.unknown).toBe('minimal-bw');
    });
  });

  describe('classifyContent function', () => {
    it('should classify tech content correctly', () => {
      const techText = 'React 18 是自 React 17 发布以来的重大版本更新。本文将详细介绍 javascript 编程和代码开发。';
      const result = classifyContent(techText);
      
      expect(result.type).toBe('tech');
      expect(result.confidence).toBeGreaterThan(0);
    });

    it('should classify emotion content correctly', () => {
      const emotionText = '深夜独处，回忆往事，感受到孤独和成长的力量。这是一篇情感故事。';
      const result = classifyContent(emotionText);
      
      expect(result.type).toBe('emotion');
    });

    it('should classify life content correctly', () => {
      const lifeText = '周末时光，与朋友相聚，品尝美食，旅行中感受生活。';
      const result = classifyContent(lifeText);
      
      expect(result.type).toBe('life');
    });

    it('should return unknown for empty content', () => {
      const result = classifyContent('');
      
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0);
    });
  });
});
