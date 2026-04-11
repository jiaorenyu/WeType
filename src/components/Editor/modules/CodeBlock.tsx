import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../../common';

interface CodeBlockProps {
  editor: any;
  isBlockActive: (format: string) => boolean;
  onToggle: (format: string) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ isBlockActive, onToggle }) => {
  return (
    <Tooltip content="代码块">
      <button
        onMouseDown={(e) => {
          e.preventDefault();
          onToggle('code-block');
        }}
        className={clsx(
          'p-2 rounded hover:bg-gray-100 transition-colors',
          isBlockActive('code-block') && 'bg-primary-100 text-primary-700'
        )}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      </button>
    </Tooltip>
  );
};
