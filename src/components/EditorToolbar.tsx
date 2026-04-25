import React, { useCallback } from 'react';
import { useInstance } from '@milkdown/react';
import { editorViewCtx, schemaCtx } from '@milkdown/kit/core';
import { toggleMark, wrapIn } from '@milkdown/prose/commands';

type ToolbarButton = {
  label: string;
  title: string;
  action: string;
  payload?: Record<string, any>;
};

const buttonGroups: ToolbarButton[][] = [
  [
    { label: 'H1', title: '一级标题', action: 'heading', payload: { level: 1 } },
    { label: 'H2', title: '二级标题', action: 'heading', payload: { level: 2 } },
    { label: 'H3', title: '三级标题', action: 'heading', payload: { level: 3 } },
  ],
  [
    { label: 'B', title: '粗体', action: 'bold' },
    { label: 'I', title: '斜体', action: 'italic' },
    { label: 'S', title: '删除线', action: 'strikethrough' },
    { label: '</>', title: '行内代码', action: 'code' },
  ],
  [
    { label: '"', title: '引用', action: 'blockquote' },
    { label: '•', title: '无序列表', action: 'bulletList' },
    { label: '1.', title: '有序列表', action: 'orderedList' },
    { label: '—', title: '分割线', action: 'hr' },
  ],
  [
    { label: '🔗', title: '链接', action: 'link' },
    { label: '📷', title: '图片', action: 'image' },
    { label: '```', title: '代码块', action: 'codeBlock' },
  ],
];

const EditorToolbar: React.FC = () => {
  const [loading, getEditor] = useInstance();

  const runCommand = useCallback((btn: ToolbarButton) => {
    if (loading) return;
    const editor = getEditor();
    if (!editor) return;

    editor.action((ctx) => {
      const view = ctx.get(editorViewCtx);
      const schema = ctx.get(schemaCtx);
      const { state, dispatch } = view;
      const { tr } = state;
      const sel = state.selection;

      switch (btn.action) {
        case 'heading': {
          const { level } = btn.payload || {};
          if (!level || !schema.nodes.heading) return false;
          dispatch(tr
            .setBlockType(sel.from, sel.to, schema.nodes.heading, { level })
            .scrollIntoView()
          );
          return true;
        }
        case 'bold': {
          if (schema.marks.strong) {
            toggleMark(schema.marks.strong)(state, dispatch);
          }
          return true;
        }
        case 'italic': {
          if (schema.marks.em) {
            toggleMark(schema.marks.em)(state, dispatch);
          }
          return true;
        }
        case 'strikethrough': {
          if (schema.marks.strike_through) {
            toggleMark(schema.marks.strike_through)(state, dispatch);
          }
          return true;
        }
        case 'code': {
          const codeMark = schema.marks.code_inline || schema.marks.inline_code;
          if (codeMark) {
            toggleMark(codeMark)(state, dispatch);
          }
          return true;
        }
        case 'blockquote': {
          if (schema.nodes.blockquote) {
            wrapIn(schema.nodes.blockquote)(state, dispatch);
          }
          return true;
        }
        case 'bulletList': {
          if (schema.nodes.bullet_list) {
            wrapIn(schema.nodes.bullet_list)(state, dispatch);
          }
          return true;
        }
        case 'orderedList': {
          if (schema.nodes.ordered_list) {
            wrapIn(schema.nodes.ordered_list)(state, dispatch);
          }
          return true;
        }
        case 'hr': {
          if (schema.nodes.horizontal_rule) {
            dispatch(tr.replaceSelectionWith(schema.nodes.horizontal_rule.create()).scrollIntoView());
          }
          return true;
        }
        case 'codeBlock': {
          if (schema.nodes.code_block) {
            dispatch(tr
              .setBlockType(sel.from, sel.to, schema.nodes.code_block)
              .scrollIntoView()
            );
          }
          return true;
        }
        case 'link': {
          if (schema.marks.link) {
            const url = prompt('请输入链接地址：');
            if (url) {
              toggleMark(schema.marks.link, { href: url })(state, dispatch);
            }
          }
          return true;
        }
        case 'image': {
          if (schema.nodes.image) {
            const url = prompt('请输入图片地址：');
            if (url) {
              const node = schema.nodes.image.create({ src: url, alt: '' });
              dispatch(tr.replaceSelectionWith(node).scrollIntoView());
            }
          }
          return true;
        }
        default:
          return false;
      }
    });
  }, [loading, getEditor]);

  return (
    <div className="editor-toolbar">
      {buttonGroups.map((group, gi) => (
        <React.Fragment key={gi}>
          {gi > 0 && <div className="toolbar-divider" />}
          {group.map((btn, bi) => (
            <button
              key={`${gi}-${bi}`}
              className="toolbar-btn"
              title={btn.title}
              onClick={() => runCommand(btn)}
            >
              {btn.label}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default EditorToolbar;
