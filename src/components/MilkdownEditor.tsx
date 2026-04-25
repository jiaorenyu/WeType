import React, { useEffect, useRef } from 'react';
import { Editor } from '@milkdown/kit/core';
import { defaultValueCtx, parserCtx, editorViewCtx } from '@milkdown/kit/core';
import { commonmark } from '@milkdown/kit/preset/commonmark';
import { gfm } from '@milkdown/kit/preset/gfm';
import { listener, listenerCtx, ListenerManager } from '@milkdown/kit/plugin/listener';
import { history } from '@milkdown/kit/plugin/history';
import { Milkdown, useEditor } from '@milkdown/react';

// 主题 CSS 选择器适配
function adaptThemeCss(themeCss: string): string {
  return themeCss
    .replace(/\.article-content /g, '.milkdown-content ')
    .replace(/\.article-content\./g, '.milkdown-content.')
    .replace(/\.article-content\b/g, '.milkdown-content');
}

interface MilkdownEditorProps {
  content: string;
  onChange: (markdown: string) => void;
  themeCss: string;
  onReady: (getEditor: () => Editor | undefined) => void;
}

const MilkdownEditor: React.FC<MilkdownEditorProps> = ({
  content,
  onChange,
  themeCss,
  onReady,
}) => {
  const isFirstRender = useRef(true);
  const isExternalUpdate = useRef(false);
  const prevContentRef = useRef(content);

  const { loading, get } = useEditor(() => {
    return Editor.make()
      .config((ctx) => {
        // 设置初始内容
        ctx.set(defaultValueCtx, content);

        // 监听 Markdown 变更
        ctx.set(listenerCtx, new ListenerManager()
          .markdownUpdated((_ctx, md, prev) => {
            if (md !== prev && !isExternalUpdate.current) {
              onChange(md);
            }
          })
        );
      })
      .use(commonmark)
      .use(gfm)
      .use(history)
      .use(listener);
  }, []);

  // 通知父组件 editor 实例准备就绪
  useEffect(() => {
    if (!loading && isFirstRender.current) {
      isFirstRender.current = false;
      onReady(get);
    }
  }, [loading, get, onReady]);

  // 当外部 content 变化时，同步到编辑器
  useEffect(() => {
    if (loading || isFirstRender.current) {
      prevContentRef.current = content;
      return;
    }

    if (content !== prevContentRef.current) {
      prevContentRef.current = content;
      isExternalUpdate.current = true;

      const editor = get();
      if (editor) {
        editor.action((ctx) => {
          const view = ctx.get(editorViewCtx);
          const p = ctx.get(parserCtx);
          const doc = p(content);
          if (!doc) return;

          const tr = view.state.tr.replaceWith(0, view.state.doc.content.size, doc.content);
          view.dispatch(tr);
        });
      }

      // 重置标志
      setTimeout(() => {
        isExternalUpdate.current = false;
      }, 100);
    }
  }, [content, loading, get]);

  return (
    <div className="milkdown-editor-wrapper">
      <div className="milkdown-content">
        <style>{adaptThemeCss(themeCss)}</style>
        <Milkdown />
      </div>
    </div>
  );
};

export default MilkdownEditor;
