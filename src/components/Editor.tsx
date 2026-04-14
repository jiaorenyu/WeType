import React, { useEffect, useRef } from 'react';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import { basicSetup } from '@codemirror/basic-setup';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, onFocus, onBlur }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        markdown(),
        oneDark,
        EditorView.updateListener.of((update: { docChanged: boolean; state: { doc: { toString: () => string } } }) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.theme({
          '&': { height: '100%' },
          '.cm-scroller': { overflow: 'auto', height: '100%' },
          '.cm-content': { padding: '24px', fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace", fontSize: '14px' },
          '.cm-editor': { height: '100%' },
          '.cm-focused': { outline: 'none' }
        })
      ]
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current
    });

    viewRef.current = view;

    // 焦点事件
    view.dom.addEventListener('focus', () => onFocus?.());
    view.dom.addEventListener('blur', () => onBlur?.());

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []);

  // 当外部 value 改变时更新编辑器
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== value) {
      const transaction = viewRef.current.state.update({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: value
        }
      });
      viewRef.current.dispatch(transaction);
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="editor-wrapper"
      style={{
        height: '100%',
        border: '2px solid transparent',
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease'
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = '#1A5F7A';
        onFocus?.();
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'transparent';
        onBlur?.();
      }}
    />
  );
};

export default Editor;
