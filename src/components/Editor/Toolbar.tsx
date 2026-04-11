import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../common';
import { TextStyle, Alignment, List, CodeBlock } from './modules';

interface ToolbarProps {
  editor: any;
  isMarkActive: (format: string) => boolean;
  isBlockActive: (format: string, blockType?: string) => boolean;
  onToggleMark: (format: string) => void;
  onToggleBlock: (format: string) => void;
  onAlignmentChange: (alignment: 'left' | 'center' | 'right' | 'justify') => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  editor,
  isMarkActive,
  isBlockActive,
  onToggleMark,
  onToggleBlock,
  onAlignmentChange,
}) => {
  const [showHeading, setShowHeading] = React.useState(false);
  const [showColor, setShowColor] = React.useState(false);
  const [textColor, setTextColor] = React.useState('#333333');

  const headingLevels = [
    { label: '正文', level: 0 },
    { label: 'H1', level: 1 },
    { label: 'H2', level: 2 },
    { label: 'H3', level: 3 },
  ];

  const colors = [
    '#000000', '#333333', '#666666', '#999999',
    '#c0392b', '#e74c3c', '#e67e22', '#f1c40f',
    '#2ecc71', '#1abc9c', '#3498db', '#9b59b6',
  ];

  const getCurrentHeadingLevel = () => {
    if (isBlockActive('heading', 'type')) {
      // Check for heading level in the editor
      return 1; // Default to H1 for now
    }
    if (isBlockActive('paragraph')) return 0;
    return 0;
  };

  const currentLevel = getCurrentHeadingLevel();

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto">
        {/* Text formatting */}
        <TextStyle
          editor={editor}
          isActive={isMarkActive}
          onToggle={onToggleMark}
        />

        <div className="w-px h-6 bg-gray-300" />

        {/* Heading selector */}
        <div className="relative">
          <Tooltip content="标题级别">
            <button
              onClick={() => setShowHeading(!showHeading)}
              className="flex items-center gap-1 px-3 py-2 rounded hover:bg-gray-100 transition-colors min-w-[60px] justify-center"
            >
              <span className="font-medium text-sm">
                {headingLevels.find(h => h.level === currentLevel)?.label || '正文'}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </Tooltip>

          {showHeading && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20">
              {headingLevels.map((h) => (
                <button
                  key={h.level}
                  onClick={() => {
                    if (h.level === 0) {
                      onToggleBlock('paragraph');
                    } else {
                      onToggleBlock(`heading-${h.level}`);
                    }
                    setShowHeading(false);
                  }}
                  className={clsx(
                    'block w-full px-3 py-1.5 text-sm text-left rounded hover:bg-gray-100',
                    currentLevel === h.level
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700'
                  )}
                >
                  {h.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Text color */}
        <div className="relative">
          <Tooltip content="文字颜色">
            <button
              onClick={() => setShowColor(!showColor)}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
            >
              <div
                className="w-5 h-5 rounded border border-gray-300"
                style={{ backgroundColor: textColor }}
              />
            </button>
          </Tooltip>

          {showColor && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-20">
              <div className="grid grid-cols-4 gap-1">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setTextColor(color);
                      setShowColor(false);
                    }}
                    className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Alignment */}
        <Alignment
          editor={editor}
          isBlockActive={isBlockActive}
          onAlignmentChange={onAlignmentChange}
        />

        <div className="w-px h-6 bg-gray-300" />

        {/* List and code block */}
        <List
          editor={editor}
          isBlockActive={isBlockActive}
          onToggle={onToggleBlock}
        />

        <Tooltip content="引用块">
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onToggleBlock('blockquote');
            }}
            className={clsx(
              'p-2 rounded hover:bg-gray-100 transition-colors',
              isBlockActive('blockquote') && 'bg-primary-100 text-primary-700'
            )}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </Tooltip>

        <CodeBlock
          editor={editor}
          isBlockActive={isBlockActive}
          onToggle={onToggleBlock}
        />
      </div>
    </div>
  );
};
