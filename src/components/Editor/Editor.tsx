import React, { useCallback, useMemo, useState } from 'react';
import { createEditor, Descendant, Editor, Transforms, Element as SlateElement, Text } from 'slate';
import { Slate, Editable, withReact, RenderElementProps, RenderLeafProps } from 'slate-react';
import { withHistory } from 'slate-history';
import { Toolbar } from './Toolbar';
import type { CustomElement, CustomText, Template } from '../../types';
import { cleanPastedContent } from '../../utils';

interface EditorProps {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
  template?: Template | null;
  onContentTypeChange?: (type: string, confidence: number) => void;
}

export const AppEditor: React.FC<EditorProps> = ({
  initialValue,
  onChange,
  template,
  onContentTypeChange,
}) => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  const [value, setValue] = useState<Descendant[]>(
    initialValue || [
      {
        type: 'paragraph',
        children: [{ text: '' }],
      },
    ]
  );

  // Sync initialValue changes from parent
  React.useEffect(() => {
    if (initialValue && JSON.stringify(initialValue) !== JSON.stringify(value)) {
      setValue(initialValue);
      // Also reset editor selection to start
      Transforms.select(editor, {
        anchor: { path: [0, 0], offset: 0 },
        focus: { path: [0, 0], offset: 0 },
      });
    }
  }, [initialValue, editor]);

  // Content type detection - simplified
  const plainText = useMemo(() => {
    return value.map((node) => {
      if (Text.isText(node)) return node.text;
      if (SlateElement.isElement(node)) {
        return serializeToPlainText(node as CustomElement);
      }
      return '';
    }).join('\n');
  }, [value]);

  // Notify parent of content type changes
  React.useEffect(() => {
    if (onContentTypeChange && plainText.length > 50) {
      // Simple keyword detection
      const keywords: Record<string, string[]> = {
        tech: ['javascript', 'python', '代码', '编程', 'react', 'vue', '开发'],
        emotion: ['心情', '感受', '回忆', '故事', '情感', '爱', '孤独'],
        life: ['生活', '日常', '周末', '旅行', '美食', '阅读'],
        food: ['好吃', '餐厅', '美食', '探店', '味道', '厨师'],
        business: ['职场', '面试', '简历', '工作', '管理', '同事'],
      };
      
      let detectedType = 'unknown';
      let maxCount = 0;
      
      Object.entries(keywords).forEach(([type, words]) => {
        const count = words.filter(w => plainText.toLowerCase().includes(w.toLowerCase())).length;
        if (count > maxCount) {
          maxCount = count;
          detectedType = type;
        }
      });
      
      onContentTypeChange(detectedType, maxCount / 10);
    }
  }, [plainText, onContentTypeChange]);

  const renderElement = useCallback((props: RenderElementProps) => {
    const element = props.element as CustomElement;
    const style = getElementStyle(element, template);

    switch (element.type) {
      case 'heading': {
        const level = element.level;
        if (level === 1) {
          return <h1 {...props.attributes} style={style} className="font-bold my-4">{props.children}</h1>;
        } else if (level === 2) {
          return <h2 {...props.attributes} style={style} className="font-bold my-4">{props.children}</h2>;
        } else {
          return <h3 {...props.attributes} style={style} className="font-bold my-4">{props.children}</h3>;
        }
      }
      case 'blockquote':
        return (
          <blockquote
            {...props.attributes}
            style={style}
            className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic"
          >
            {props.children}
          </blockquote>
        );
      
      case 'code-block':
        return (
          <pre
            {...props.attributes}
            style={style}
            className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto font-mono text-sm"
          >
            <code>{props.children}</code>
          </pre>
        );
      
      case 'bulleted-list':
        return (
          <ul {...props.attributes} className="list-disc pl-6 my-2">
            {props.children}
          </ul>
        );
      
      case 'numbered-list':
        return (
          <ol {...props.attributes} className="list-decimal pl-6 my-2">
            {props.children}
          </ol>
        );
      
      case 'list-item':
        return (
          <li {...props.attributes} className="my-1">
            {props.children}
          </li>
        );
      
      default:
        return (
          <p
            {...props.attributes}
            style={style}
            className="my-3 leading-relaxed"
          >
            {props.children}
          </p>
        );
    }
  }, [template]);

  const renderLeaf = useCallback((props: RenderLeafProps) => {
    let { children } = props;
    const leaf = props.leaf as CustomText;

    if (leaf.bold) {
      children = <strong>{children}</strong>;
    }
    if (leaf.italic) {
      children = <em>{children}</em>;
    }
    if (leaf.underline) {
      children = <u>{children}</u>;
    }
    if (leaf.color) {
      children = <span style={{ color: leaf.color }}>{children}</span>;
    }
    if (leaf.backgroundColor) {
      children = <span style={{ backgroundColor: leaf.backgroundColor }}>{children}</span>;
    }

    return <span {...props.attributes}>{children}</span>;
  }, []);

  const handleChange = useCallback((newValue: Descendant[]) => {
    setValue(newValue);
    onChange?.(newValue);
  }, [onChange]);

  // Helper functions
  const isMarkActive = useCallback((format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format as keyof Omit<CustomText, 'text'>] === true : false;
  }, [editor]);

  const isBlockActive = useCallback((format: string, blockType = 'type') => {
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
  }, [editor]);

  const toggleMark = useCallback((format: string) => {
    const isActive = isMarkActive(format);
    
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  }, [editor, isMarkActive]);

  const toggleBlock = useCallback((format: string) => {
    const isActive = isBlockActive(format);
    const isList = ['bulleted-list', 'numbered-list'].includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        ['bulleted-list', 'numbered-list'].includes((n as CustomElement).type),
      split: true,
    });

    let newType: CustomElement['type'] = 'paragraph';
    
    if (format === 'paragraph') {
      newType = 'paragraph';
    } else if (format.startsWith('heading-')) {
      newType = 'heading';
      const level = parseInt(format.split('-')[1]) as 1 | 2 | 3;
      Transforms.setNodes(editor, { type: 'heading', level } as Partial<CustomElement>);
      return;
    } else if (format === 'blockquote') {
      newType = 'blockquote';
    } else if (format === 'code-block') {
      newType = 'code-block';
    } else if (isList) {
      newType = 'list-item';
    }

    Transforms.setNodes(editor, { type: newType } as Partial<CustomElement>);

    if (!isActive && isList) {
      const block = { type: format, children: [] } as CustomElement;
      Transforms.wrapNodes(editor, block);
    }
  }, [editor, isBlockActive]);

  const handleAlignmentChange = useCallback((alignment: 'left' | 'center' | 'right' | 'justify') => {
    Transforms.setNodes(editor, { align: alignment } as Partial<CustomElement>);
  }, [editor]);

  // Clean pasted content
  const handlePaste = useCallback((event: React.ClipboardEvent) => {
    const html = event.clipboardData.getData('text/html');
    if (html) {
      event.preventDefault();
      const cleaned = cleanPastedContent(html);
      document.execCommand('insertText', false, cleaned);
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <Slate editor={editor} initialValue={value} onChange={handleChange}>
        <Toolbar
          editor={editor}
          isMarkActive={isMarkActive}
          isBlockActive={isBlockActive}
          onToggleMark={toggleMark}
          onToggleBlock={toggleBlock}
          onAlignmentChange={handleAlignmentChange}
        />
        
        <div className="flex-1 overflow-auto p-8 min-h-0">
          <Editable
            className="min-h-full outline-none prose prose-sm sm:prose lg:prose-lg max-w-none"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder="开始输入文章内容..."
            spellCheck
            onPaste={handlePaste}
            style={getBodyStyle(template)}
          />
        </div>
      </Slate>
    </div>
  );
};

// Helper functions
const getElementStyle = (element: CustomElement, template: Template | null | undefined): React.CSSProperties => {
  if (!template) return {};

  switch (element.type) {
    case 'heading':
      return template.styles[`h${element.level}`] as React.CSSProperties || {};
    case 'blockquote':
      return template.styles.blockquote as React.CSSProperties || {};
    case 'code-block':
      return template.styles.code as React.CSSProperties || {};
    default:
      return {};
  }
};

const getBodyStyle = (template: Template | null | undefined): React.CSSProperties => {
  if (!template) return {};
  return template.styles.body as React.CSSProperties || {};
};

const serializeToPlainText = (node: CustomElement): string => {
  if (Text.isText(node)) return node.text;
  
  const children = 'children' in node ? (node.children as Array<Text | SlateElement>).map(n => {
    if (Text.isText(n)) return n.text;
    if (SlateElement.isElement(n)) return serializeToPlainText(n as CustomElement);
    return '';
  }).join('') : '';
  
  switch (node.type) {
    case 'heading':
      return `${children}\n`;
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
};
