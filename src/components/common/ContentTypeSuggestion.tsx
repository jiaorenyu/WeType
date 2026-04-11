import React from 'react';
import type { ContentType } from '../../types';
import { getContentTypeName } from '../../utils';

interface ContentTypeSuggestionProps {
  type: ContentType;
  confidence: number;
  templateName: string;
  onConfirm: () => void;
  onDismiss: () => void;
}

const TYPE_ICONS: Record<ContentType, string> = {
  tech: '💻',
  product: '📱',
  emotion: '💝',
  life: '🌿',
  food: '🍜',
  business: '💼',
  news: '📰',
  unknown: '📝',
};

export const ContentTypeSuggestion: React.FC<ContentTypeSuggestionProps> = ({
  type,
  confidence,
  templateName,
  onConfirm,
  onDismiss,
}) => {
  if (type === 'unknown' || confidence < 0.2) return null;

  return (
    <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex items-center gap-4">
      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-xl">
        {TYPE_ICONS[type] || '📝'}
      </div>
      
      <div className="flex-1">
        <p className="text-sm text-primary-800 font-medium">
          检测到这是一篇{getContentTypeName(type)}
          <span className="text-primary-500 ml-1">
            (置信度: {Math.round(confidence * 100)}%)
          </span>
        </p>
        <p className="text-sm text-primary-600">
          已为您推荐【{templateName}】风格
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
        >
          确认使用
        </button>
        <button
          onClick={onDismiss}
          className="px-4 py-2 text-primary-600 hover:bg-primary-100 rounded-lg transition-colors text-sm"
        >
          稍后
        </button>
      </div>
    </div>
  );
};
