import { describe, it, expect } from 'vitest';
import { classifyContent, getContentTypeName, getRecommendationMessage } from '../../src/utils/contentClassifier';

describe('contentClassifier', () => {
  describe('classifyContent', () => {
    it('should classify tech content', () => {
      const text = '学习 javascript 编程和 react 开发技术，掌握代码技巧。';
      const result = classifyContent(text);
      
      expect(result.type).toBe('tech');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.recommendedTemplate).toBe('tech-minimal');
    });

    it('should classify emotion content', () => {
      const text = '心情低落，想起那些回忆，感受到孤独和成长的力量。';
      const result = classifyContent(text);
      
      expect(result.type).toBe('emotion');
      expect(result.recommendedTemplate).toBe('midnight-radio');
    });

    it('should classify food content', () => {
      const text = '今天去探店，餐厅的美食很好吃，味道很棒。';
      const result = classifyContent(text);
      
      expect(result.type).toBe('food');
      expect(result.recommendedTemplate).toBe('food-explore');
    });

    it('should classify business content', () => {
      const text = '职场面试技巧分享，如何写好简历，和同事沟通的方法。';
      const result = classifyContent(text);
      
      expect(result.type).toBe('business');
      expect(result.recommendedTemplate).toBe('business-elegant');
    });

    it('should return unknown for empty text', () => {
      const result = classifyContent('');
      
      expect(result.type).toBe('unknown');
      expect(result.confidence).toBe(0);
    });
  });

  describe('getContentTypeName', () => {
    it('should return correct Chinese names', () => {
      expect(getContentTypeName('tech')).toBe('技术教程');
      expect(getContentTypeName('product')).toBe('产品测评');
      expect(getContentTypeName('emotion')).toBe('情感故事');
      expect(getContentTypeName('life')).toBe('生活随笔');
      expect(getContentTypeName('food')).toBe('美食探店');
      expect(getContentTypeName('business')).toBe('职场干货');
      expect(getContentTypeName('news')).toBe('资讯');
      expect(getContentTypeName('unknown')).toBe('通用');
    });
  });

  describe('getRecommendationMessage', () => {
    it('should return message for valid classification', () => {
      const classification = { type: 'tech' as const, confidence: 0.5, recommendedTemplate: 'tech-minimal' };
      const message = getRecommendationMessage(classification);
      
      expect(message).toContain('技术教程');
      expect(message).toContain('已为您推荐');
    });

    it('should return null for unknown type', () => {
      const classification = { type: 'unknown' as const, confidence: 0, recommendedTemplate: 'minimal-bw' };
      const message = getRecommendationMessage(classification);
      
      expect(message).toBeNull();
    });

    it('should return null for low confidence', () => {
      const classification = { type: 'tech' as const, confidence: 0.1, recommendedTemplate: 'tech-minimal' };
      const message = getRecommendationMessage(classification);
      
      expect(message).toBeNull();
    });
  });
});
