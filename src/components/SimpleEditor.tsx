import React from 'react';

interface SimpleEditorProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SimpleEditor: React.FC<SimpleEditorProps> = ({ value, onChange, onFocus, onBlur }) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      style={{
        width: '100%',
        height: '100%',
        border: 'none',
        outline: 'none',
        padding: '24px',
        fontSize: '14px',
        lineHeight: '1.6',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace",
        backgroundColor: '#282c34',
        color: '#abb2bf',
        resize: 'none'
      }}
      placeholder="在此输入 Markdown 内容..."
    />
  );
};

export default SimpleEditor;
