import { useMemo } from 'react';
import type { ContentType, ContentClassification } from '../types';

// Keyword rules for content classification
const CONTENT_RULES: Record<ContentType, { keywords: string[]; weight: number }> = {
  tech: {
    keywords: [
      'javascript', 'typescript', 'python', 'java', '编程', '代码', '开发',
      'react', 'vue', 'node', 'api', 'git', '程序员', '教程', '开发',
      'function', '变量', '函数', '前端', '后端', '全栈', '调试'
    ],
    weight: 1,
  },
  product: {
    keywords: [
      '测评', '评测', '对比', '体验', '推荐', '评测', '使用', '感受',
      '优缺点', '值得', '入手', '购买', '选择', '性价比', '产品'
    ],
    weight: 1,
  },
  emotion: {
    keywords: [
      '心情', '感受', '回忆', '故事', '情感', '喜欢', '爱', '想念',
      '心碎', '快乐', '悲伤', '温暖', '孤独', '成长', '人生', '感悟'
    ],
    weight: 1,
  },
  life: {
    keywords: [
      '生活', '日常', '今天', '周末', '旅行', '美食', '咖啡', '阅读',
      '电影', '朋友', '家人', '工作', '学习', '计划', '目标'
    ],
    weight: 0.8,
  },
  food: {
    keywords: [
      '好吃', '餐厅', '美食', '推荐', '探店', '菜品', '味道', '厨师',
      '甜点', '火锅', '烧烤', '咖啡', '下午茶', '必点', '招牌'
    ],
    weight: 1,
  },
  business: {
    keywords: [
      '职场', '面试', '简历', '技巧', '分享', '工作', '同事', '老板',
      '领导', '沟通', '加薪', '晋升', '辞职', '创业', '管理'
    ],
    weight: 1,
  },
  news: {
    keywords: [
      '新闻', '报道', '今日', '最新', '消息', '事件', '社会', '国际',
      '国内', '热点', '资讯', '政策', '经济', '科技', '体育'
    ],
    weight: 0.7,
  },
  unknown: {
    keywords: [],
    weight: 0,
  },
};

// Template recommendations
const TEMPLATE_RECOMMENDATIONS: Record<ContentType, string> = {
  tech: 'tech-minimal',
  product: 'business-elegant',
  emotion: 'midnight-radio',
  life: 'literary-clean',
  food: 'food-explore',
  business: 'business-elegant',
  news: 'minimal-bw',
  unknown: 'minimal-bw',
};

export const useContentType = (content: string): ContentClassification => {
  return useMemo(() => {
    if (!content || content.trim().length === 0) {
      return {
        type: 'unknown',
        confidence: 0,
        recommendedTemplate: 'minimal-bw',
      };
    }

    const text = content.toLowerCase();
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

    // Calculate scores based on keyword matches
    (Object.keys(CONTENT_RULES) as ContentType[]).forEach((type) => {
      if (type === 'unknown') return;
      
      const rule = CONTENT_RULES[type];
      rule.keywords.forEach((keyword) => {
        if (text.includes(keyword.toLowerCase())) {
          scores[type] += rule.weight;
        }
      });
    });

    // Find the type with highest score
    let maxScore = 0;
    let detectedType: ContentType = 'unknown';

    (Object.keys(scores) as ContentType[]).forEach((type) => {
      if (scores[type] > maxScore) {
        maxScore = scores[type];
        detectedType = type;
      }
    });

    // Calculate confidence (0-1)
    const totalKeywords = content.split(/\s+/).length;
    const confidence = totalKeywords > 0 ? Math.min(maxScore / Math.max(3, totalKeywords * 0.1), 1) : 0;

    // Only classify if confidence is above threshold
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
  }, [content]);
};

// Export rules for testing
export { CONTENT_RULES, TEMPLATE_RECOMMENDATIONS };
