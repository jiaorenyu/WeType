import React from 'react';
import clsx from 'clsx';
import { Tooltip } from '../../common';

interface AlignmentProps {
  editor: any;
  isBlockActive: (format: string) => unknown;
  onAlignmentChange: (alignment: 'left' | 'center' | 'right' | 'justify') => void;
}

export const Alignment: React.FC<AlignmentProps> = ({ isBlockActive, onAlignmentChange }) => {
  const currentAlign = (isBlockActive('align') as string) || 'left';

  const options = [
    { value: 'left', icon: 'M4 6h16M4 12h16M4 18h16', label: '左对齐' },
    { value: 'center', icon: 'M4 6h16M8 12h8M6 18h12', label: '居中' },
    { value: 'right', icon: 'M4 6h16M8 12h8M6 18h12', label: '右对齐', flip: true },
    { value: 'justify', icon: 'M4 6h16M4 12h16M4 18h16', label: '两端对齐' },
  ];

  return (
    <div className="flex items-center gap-1">
      {options.map((option) => (
        <Tooltip key={option.value} content={option.label}>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              onAlignmentChange(option.value as 'left' | 'center' | 'right' | 'justify');
            }}
            className={clsx(
              'p-2 rounded hover:bg-gray-100 transition-colors',
              currentAlign === option.value && 'bg-primary-100 text-primary-700'
            )}
          >
            <svg
              className={clsx('w-5 h-5', option.flip && 'transform scale-x-[-1]')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
            </svg>
          </button>
        </Tooltip>
      ))}
    </div>
  );
};
