import React from 'react';
import clsx from 'clsx';
import { useSlate } from 'slate-react';
import { Editor } from 'slate';
import type { CustomText } from '../../types';

interface FormatButtonProps {
  format: keyof Omit<CustomText, 'text'>;
  children: React.ReactNode;
  className?: string;
}

export const FormatButton: React.FC<FormatButtonProps> = ({
  format,
  children,
  className,
}) => {
  const editor = useSlate();
  const isActive = isMarkActive(editor, format);

  return (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, format);
      }}
      className={clsx(
        'p-2 rounded hover:bg-gray-100 transition-colors',
        isActive && 'bg-primary-100 text-primary-700',
        className
      )}
    >
      {children}
    </button>
  );
};

// Helper functions
const isMarkActive = (editor: any, format: string): boolean => {
  const marks = Editor.marks(editor);
  return marks ? marks[format as keyof Omit<CustomText, 'text'>] === true : false;
};

const toggleMark = (editor: any, format: string) => {
  const isActive = isMarkActive(editor, format);
  
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
