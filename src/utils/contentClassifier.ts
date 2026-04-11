import type { ContentType, ContentClassification } from '../types';
import { CONTENT_RULES, TEMPLATE_RECOMMENDATIONS } from '../hooks/useContentType';

/**
 * Classify content based on keywords
 */
export const classifyContent = (text: string): ContentClassification => {
  if (!text || text.trim().length === 0) {
    return {
      type: 'unknown',
      confidence: 0,
      recommendedTemplate: 'minimal-bw',
    };
  }

  const content = text.toLowerCase();
  const scores: Record<ContentType, number> = {
    tech: 0,
    product: 0,
    emotion: 0,
    life: 0,
    food: 0,
    business: 0,
    news: 0,
    unknown: 0,
  };

  // Calculate scores
  (Object.keys(CONTENT_RULES) as ContentType[]).forEach((type) => {
    if (type === 'unknown') return;
    
    const rule = CONTENT_RULES[type];
    rule.keywords.forEach((keyword) => {
      if (content.includes(keyword.toLowerCase())) {
        scores[type] += rule.weight;
      }
    });
  });

  // Find highest score
  let maxScore = 0;
  let detectedType: ContentType = 'unknown';

  (Object.keys(scores) as ContentType[]).forEach((type) => {
    if (scores[type] > maxScore) {
      maxScore = scores[type];
      detectedType = type;
    }
  });

  // Calculate confidence
  const wordCount = content.split(/\s+/).length;
  const confidence = wordCount > 0 
    ? Math.min(maxScore / Math.max(3, wordCount * 0.1), 1) 
    : 0;

  if (maxScore < 2 || confidence < 0.1) {
    return {
      type: 'unknown',
      confidence: 0,
      recommendedTemplate: 'minimal-bw',
    };
  }

  return {
    type: detectedType,
    confidence: Math.round(confidence * 100) / 100,
    recommendedTemplate: TEMPLATE_RECOMMENDATIONS[detectedType],
  };
};

/**
 * Get content type display name
 */
export const getContentTypeName = (type: ContentType): string => {
  const names: Record<ContentType, string> = {
    tech: '技术教程',
    product: '产品测评',
    emotion: '情感故事',
    life: '生活随笔',
    food: '美食探店',
    business: '职场干货',
    news: '资讯',
    unknown: '通用',
  };
  return names[type];
};

/**
 * Get template recommendation message
 */
export const getRecommendationMessage = (classification: ContentClassification): string | null => {
  if (classification.type === 'unknown' || classification.confidence < 0.2) {
    return null;
  }

  const typeNames = {
    tech: '技术教程',
    product: '产品测评',
    emotion: '情感故事',
    life: '生活随笔',
    food: '美食探店',
    business: '职场干货',
    news: '资讯',
    unknown: '通用',
  };

  return `检测到这是一篇${typeNames[classification.type]}，已为您推荐相应风格`;
};
