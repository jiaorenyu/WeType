import React from 'react';
import clsx from 'clsx';
import type { Template } from '../../types';

interface TemplateSelectorProps {
  templates: Template[];
  selectedId: string | null;
  onSelect: (template: Template) => void;
  onClose?: () => void;
}

const TEMPLATE_PREVIEWS: Record<string, string> = {
  'literary-clean': '🌿',
  'tech-minimal': '💻',
  'business-elegant': '💼',
  'midnight-radio': '🌙',
  'minimal-bw': '⬛',
  'energetic-orange': '🍊',
  'vintage-news': '📰',
  'girl-pink': '🌸',
  'geek-code': '⚡',
  'food-explore': '🍜',
};

const CATEGORY_COLORS: Record<string, string> = {
  tech: 'bg-blue-100 text-blue-700',
  life: 'bg-green-100 text-green-700',
  business: 'bg-gray-100 text-gray-700',
  emotion: 'bg-purple-100 text-purple-700',
  food: 'bg-orange-100 text-orange-700',
  news: 'bg-red-100 text-red-700',
  general: 'bg-gray-100 text-gray-600',
};

const CATEGORY_NAMES: Record<string, string> = {
  tech: '技术',
  life: '生活',
  business: '商务',
  emotion: '情感',
  food: '美食',
  news: '资讯',
  general: '通用',
};

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedId,
  onSelect,
  onClose,
}) => {
  const [activeCategory, setActiveCategory] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const cats = new Set(templates.map((t) => t.category));
    return Array.from(cats);
  }, [templates]);

  const filteredTemplates = React.useMemo(() => {
    if (!activeCategory) return templates;
    return templates.filter((t) => t.category === activeCategory);
  }, [templates, activeCategory]);

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">选择模板</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="px-6 py-3 border-b border-gray-100 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveCategory(null)}
          className={clsx(
            'px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap',
            !activeCategory
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          全部
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={clsx(
              'px-3 py-1.5 text-sm font-medium rounded-full transition-colors whitespace-nowrap',
              activeCategory === cat
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            )}
          >
            {CATEGORY_NAMES[cat] || cat}
          </button>
        ))}
      </div>

      {/* Template grid */}
      <div className="p-6 grid grid-cols-2 gap-4 max-h-[400px] overflow-y-auto">
        {filteredTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className={clsx(
              'relative p-4 rounded-lg border-2 text-left transition-all hover:shadow-md',
              selectedId === template.id
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            )}
          >
            {/* Preview icon */}
            <div
              className="w-full h-20 rounded-lg flex items-center justify-center text-4xl mb-3"
              style={{
                backgroundColor: template.styles.body.backgroundColor || '#fff',
              }}
            >
              {TEMPLATE_PREVIEWS[template.id] || '📝'}
            </div>

            {/* Template info */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800">{template.name}</h3>
                <span
                  className={clsx(
                    'px-2 py-0.5 text-xs font-medium rounded-full',
                    CATEGORY_COLORS[template.category] || 'bg-gray-100 text-gray-600'
                  )}
                >
                  {CATEGORY_NAMES[template.category] || template.category}
                </span>
              </div>
              <p className="text-sm text-gray-500 line-clamp-1">{template.description}</p>
            </div>

            {/* Selected indicator */}
            {selectedId === template.id && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
