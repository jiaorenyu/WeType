import React, { useCallback } from 'react';
import { useInstance } from '@milkdown/react';
import { editorViewCtx, schemaCtx } from '@milkdown/kit/core';
import { toggleMark, wrapIn, lift } from '@milkdown/prose/commands';

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
    { label: '≡', title: '无序列表', action: 'bulletList' },
    { label: '1.', title: '有序列表', action: 'orderedList' },
    { label: '▬', title: '分割线', action: 'hr' },
  ],
  [
    { label: '🔗', title: '链接', action: 'link' },
    { label: '📷', title: '图片', action: 'image' },
    { label: '```', title: '代码块', action: 'codeBlock' },
  ],
];

/** 列表切换：不在列表中 → 包裹；在相同列表中 → 提升（取消列表）; 在不同列表中 → 替换类型 */
function toggleList(
  state: any,
  dispatch: ((tr: any) => void) | undefined,
  schema: any,
  targetType: any,
): boolean {
  const { $from } = state.selection;
  const tr = state.tr;

  // 查找父级列表节点（bullet_list 或 ordered_list）
  let listInfo: { depth: number; node: any } | null = null;
  for (let d = $from.depth; d > 0; d--) {
    const node = $from.node(d);
    if (
      node.type === schema.nodes.bullet_list ||
      node.type === schema.nodes.ordered_list
    ) {
      listInfo = { depth: d, node };
      break;
    }
  }

  // 情况 1：不在任何列表中 → 包裹
  if (!listInfo) {
    return wrapIn(targetType)(state, dispatch);
  }

  // 情况 2：在相同类型的列表中 → 提升（取消列表）
  if (listInfo.node.type === targetType) {
    return lift(state, dispatch);
  }

  // 情况 3：在不同类型的列表中 → 替换列表节点类型（只传目标类型支持的 attrs）
  const sharedAttrs: Record<string, unknown> = {};
  if (listInfo.node.attrs.spread !== undefined) {
    sharedAttrs.spread = listInfo.node.attrs.spread;
  }
  const listPos = $from.before(listInfo.depth);
  tr.setNodeMarkup(listPos, targetType, sharedAttrs);
  if (dispatch) dispatch(tr);
  return true;
}

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
          if (schema.marks.emphasis) {
            toggleMark(schema.marks.emphasis)(state, dispatch);
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
          if (schema.marks.inlineCode) {
            toggleMark(schema.marks.inlineCode)(state, dispatch);
          }
          return true;
        }
        case 'blockquote': {
          if (schema.nodes.blockquote) {
            wrapIn(schema.nodes.blockquote)(state, dispatch);
          }
          return true;
        }
        case 'bulletList':
        case 'orderedList': {
          const targetType = btn.action === 'bulletList'
            ? schema.nodes.bullet_list
            : schema.nodes.ordered_list;
          if (targetType) {
            toggleList(state, dispatch, schema, targetType);
          }
          return true;
        }
        case 'hr': {
          if (schema.nodes.hr) {
            dispatch(tr.replaceSelectionWith(schema.nodes.hr.create()).scrollIntoView());
          }
          return true;
        }
        case 'codeBlock': {
          if (schema.nodes.code_block) {
            const selectedText = state.doc.textBetween(sel.from, sel.to);
            const node = selectedText
              ? schema.nodes.code_block.create({ language: '' }, schema.text(selectedText))
              : schema.nodes.code_block.createAndFill();
            if (node) {
              dispatch(tr.replaceRangeWith(sel.from, sel.to, node).scrollIntoView());
            }
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
