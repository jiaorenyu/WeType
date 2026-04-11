import React, { useMemo, useState } from 'react';
import { Descendant, Element as SlateElement, Text } from 'slate';
import type { CustomElement, Template } from '../../types';
import { QrCodeModal } from './QrCodeModal';
import { Button } from '../common';

interface MobilePreviewProps {
  content: Descendant[];
  template: Template | null | undefined;
}

export const MobilePreview: React.FC<MobilePreviewProps> = ({ content, template }) => {
  const [showQrModal, setShowQrModal] = useState(false);

  const renderedContent = useMemo(() => {
    return renderContent(content, template);
  }, [content, template]);

  return (
    <>
      <div className="w-[375px] h-full border-l border-gray-200 bg-gray-100 flex flex-col rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
          <h3 className="text-sm font-medium text-gray-700">手机预览</h3>
          <span className="text-xs text-gray-400">375 × 667</span>
        </div>

        {/* Preview area */}
        <div className="flex-1 overflow-hidden flex justify-center py-4 bg-gray-100 min-h-0">
          <div className="w-[375px] h-[667px] bg-white rounded-lg shadow-xl overflow-hidden relative flex-shrink-0">
            {/* Phone frame */}
            <div className="absolute inset-0 border-8 border-gray-900 rounded-[40px] pointer-events-none z-10" />
            
            {/* Status bar */}
            <div className="h-6 bg-gray-900 flex items-center justify-between px-6 text-white text-[10px] relative z-20">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <span>📶</span>
                <span>🔋</span>
              </div>
            </div>

            {/* Content */}
            <div 
              className="overflow-auto h-[calc(100%-24px)] p-4"
              style={getPreviewBodyStyle(template)}
            >
              {renderedContent}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white border-t border-gray-200 p-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQrModal(true)}
            className="w-full"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
            全屏预览二维码
          </Button>
        </div>
      </div>

      <QrCodeModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
      />
    </>
  );
};

// Helper functions
const getPreviewBodyStyle = (template: Template | null | undefined): React.CSSProperties => {
  if (!template) {
    return {
      fontFamily: 'Georgia, serif',
      fontSize: '16px',
      lineHeight: '1.8',
      color: '#333',
      padding: '16px',
    };
  }

  const bodyStyle = template.styles.body;
  return {
    fontFamily: bodyStyle.fontFamily || 'inherit',
    fontSize: bodyStyle.fontSize ? `${bodyStyle.fontSize}px` : '16px',
    lineHeight: bodyStyle.lineHeight || '1.8',
    color: bodyStyle.color || '#333',
    backgroundColor: bodyStyle.backgroundColor || '#fff',
    padding: bodyStyle.padding || '16px',
  };
};

const renderContent = (nodes: Descendant[], template: Template | null | undefined): React.ReactNode => {
  return nodes.map((node, index) => {
    if (Text.isText(node)) {
      return renderText(node, index);
    }
    
    if (SlateElement.isElement(node)) {
      return renderElement(node as CustomElement, template, index);
    }
    
    return null;
  });
};

const renderText = (node: any, key: number): React.ReactNode => {
  let content: React.ReactNode = node.text;
  
  if (node.bold) content = <strong key={key}>{content}</strong>;
  if (node.italic) content = <em key={key}>{content}</em>;
  if (node.underline) content = <u key={key}>{content}</u>;
  if (node.color) content = <span key={key} style={{ color: node.color }}>{content}</span>;
  
  return content;
};

const renderElement = (element: CustomElement, template: Template | null | undefined, key: number): React.ReactNode => {
  const children = 'children' in element ? renderContent(element.children as Descendant[], template) : null;
  const style = getElementStyle(element, template);

  switch (element.type) {
    case 'paragraph':
      return (
        <p key={key} style={style} className="my-3">
          {children}
        </p>
      );
    
    case 'heading': {
      const Tag = `h${element.level}` as 'h1' | 'h2' | 'h3';
      return (
        <Tag key={key} style={style} className="font-bold my-4">
          {children}
        </Tag>
      );
    }
    
    case 'blockquote':
      return (
        <blockquote
          key={key}
          style={style}
          className="border-l-4 border-gray-300 pl-4 my-4 text-gray-600 italic"
        >
          {children}
        </blockquote>
      );
    
    case 'code-block':
      return (
        <pre
          key={key}
          style={style}
          className="bg-gray-900 text-gray-100 p-4 rounded-lg my-4 overflow-x-auto text-sm"
        >
          <code>{children}</code>
        </pre>
      );
    
    case 'bulleted-list':
      return (
        <ul key={key} className="list-disc pl-6 my-2">
          {children}
        </ul>
      );
    
    case 'numbered-list':
      return (
        <ol key={key} className="list-decimal pl-6 my-2">
          {children}
        </ol>
      );
    
    case 'list-item':
      return (
        <li key={key} className="my-1">
          {children}
        </li>
      );
    
    default:
      return (
        <p key={key} style={style} className="my-3">
          {children}
        </p>
      );
  }
};

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
