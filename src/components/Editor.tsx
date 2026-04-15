import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { markdown } from '@codemirror/lang-markdown';

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

    try {
      const startState = EditorState.create({
        doc: value,
        extensions: [
          basicSetup,
          markdown(),
          EditorView.updateListener.of((update: any) => {
            if (update.docChanged) {
              onChange(update.state.doc.toString());
            }
          })
        ]
      });

      const view = new EditorView({
        state: startState,
        parent: containerRef.current
      });

      viewRef.current = view;

      return () => {
        view.destroy();
        viewRef.current = null;
      };
    } catch (error) {
      console.error('Editor initialization error:', error);
    }
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
        transition: 'border-color 0.3s ease',
        backgroundColor: '#282c34'
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
