import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../../common';

interface ListProps {
  editor: any;
  isBlockActive: (format: string) => boolean;
  onToggle: (format: string) => void;
}

export const List: React.FC<ListProps> = ({ isBlockActive, onToggle }) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip content="无序列表">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle('bulleted-list');
          }}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            isBlockActive('bulleted-list') && 'bg-primary-100 text-primary-700'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="有序列表">
        <button
          onMouseDown={(e) => {
            e.preventDefault();
            onToggle('numbered-list');
          }}
          className={clsx(
            'p-2 rounded hover:bg-gray-100 transition-colors',
            isBlockActive('numbered-list') && 'bg-primary-100 text-primary-700'
          )}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M7 12h14M7 4h14" />
          </svg>
        </button>
      </Tooltip>
    </div>
  );
};
