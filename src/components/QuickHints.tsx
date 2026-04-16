import React from 'react';

interface QuickHintsProps {
  visible: boolean;
}

const QuickHints: React.FC<QuickHintsProps> = ({ visible }) => {
  if (!visible) return null;

  const hints = [
    { label: '**粗体**', insert: '**', desc: '粗体文本' },
    { label: '*斜体*', insert: '*', desc: '斜体文本' },
    { label: '[链接](url)', insert: '[', desc: '插入链接' },
    { label: '```代码```', insert: '```', desc: '代码块' },
    { label: '# 标题', insert: '# ', desc: '一级标题' },
    { label: '> 引用', insert: '> ', desc: '引用块' }
  ];

  const handleClick = (hint: typeof hints[0]) => {
    // 这个功能会在父组件中实现
    console.log('Hint clicked:', hint);
  };

  return (
    <div
      className="quick-hints"
      style={{
        position: 'absolute',
        bottom: '80px',
        left: '24px',
        right: '24px',
        background: '#f8f9fa',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        animation: 'fadeInUp 0.3s ease-out',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
      }}
    >
      <div
        style={{
          fontSize: '12px',
          color: '#666',
          marginRight: '8px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        快捷语法:
      </div>
      {hints.map((hint, index) => (
        <button
          key={index}
          onClick={() => handleClick(hint)}
          style={{
            padding: '6px 12px',
            border: 'none',
            background: '#fff',
            borderRadius: '6px',
            fontSize: '12px',
            color: '#1A5F7A',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: 'monospace',
            boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1A5F7A';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fff';
            e.currentTarget.style.color = '#1A5F7A';
          }}
          title={hint.desc}
        >
          {hint.label}
        </button>
      ))}
    </div>
  );
};

export default QuickHints;
