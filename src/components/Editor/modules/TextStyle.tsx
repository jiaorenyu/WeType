import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../../common';

interface TextStyleProps {
  editor: any;
  isActive: (format: string) => boolean;
  onToggle: (format: string) => void;
}

export const TextStyle: React.FC<TextStyleProps> = ({ isActive, onToggle }) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip content="加粗 (Ctrl+B)">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle('bold');
          }}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            isActive('bold') && 'bg-primary-100 text-primary-700'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="斜体 (Ctrl+I)">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle('italic');
          }}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            isActive('italic') && 'bg-primary-100 text-primary-700'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 4h-9M14 20H5M15 4L9 20" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="下划线 (Ctrl+U)">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle('underline');
          }}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            isActive('underline') && 'bg-primary-100 text-primary-700'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v7a5 5 0 0 0 10 0V4M5 21h14" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
