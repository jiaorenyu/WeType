import { Editor, Transforms, Element as SlateElement, Text } from 'slate';
import type { CustomElement, CustomText } from '../types';

// Check if a mark is active
export const isMarkActive = (editor: Editor, format: keyof Omit<CustomText, 'text'>) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

// Check if a block type is active
export const isBlockActive = (editor: Editor, format: string, blockType = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        (n as Record<string, unknown>)[blockType] === format,
    })
  );

  return !!match;
};

// Toggle a mark
export const toggleMark = (editor: Editor, format: keyof Omit<CustomText, 'text'>) => {
  const isActive = isMarkActive(editor, format);
  
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

// Toggle a block type
export const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = ['bulleted-list', 'numbered-list'].includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
    split: true,
  });

  const newProperties: Partial<SlateElement> = {
    type: isActive ? 'paragraph' : isList ? 'list-item' : (format as CustomElement['type']),
  };
  
  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] } as CustomElement;
    Transforms.wrapNodes(editor, block);
  }
};

// Set alignment
export const setAlignment = (editor: Editor, alignment: 'left' | 'center' | 'right' | 'justify') => {
  Transforms.setNodes(editor, { align: alignment } as Partial<CustomElement>);
};

// Serialize editor content to plain text
export const serializeToText = (nodes: Array<Text | SlateElement>): string => {
  return nodes.map((n) => {
    if (Text.isText(n)) {
      return n.text;
    }
    if (SlateElement.isElement(n)) {
      const children = serializeToText(n.children as Array<Text | SlateElement>);
      switch ((n as CustomElement).type) {
        case 'heading':
        case 'paragraph':
          return `${children}\n`;
        case 'blockquote':
          return `> ${children}\n`;
        case 'bulleted-list':
        case 'numbered-list':
          return children;
        case 'list-item':
          return `• ${children}\n`;
        case 'code-block':
          return `\`\`\`\n${children}\n\`\`\`\n`;
        default:
          return children;
      }
    }
    return '';
  }).join('');
};

// Default initial value
export const initialValue = [
  {
    type: 'paragraph' as const,
    children: [{ text: '' }],
  },
];
