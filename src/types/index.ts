import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

// Custom Slate types
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  backgroundColor?: string;
  fontSize?: number;
  fontFamily?: string;
  letterSpacing?: number;
};

export type ParagraphElement = {
  type: 'paragraph';
  align?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number;
  marginLeft?: number;
  marginRight?: number;
  children: CustomText[];
};

export type HeadingElement = {
  type: 'heading';
  level: 1 | 2 | 3;
  align?: 'left' | 'center' | 'right' | 'justify';
  children: CustomText[];
};

export type BlockquoteElement = {
  type: 'blockquote';
  children: Descendant[];
};

export type CodeBlockElement = {
  type: 'code-block';
  language?: string;
  children: CustomText[];
};

export type BulletedListElement = {
  type: 'bulleted-list';
  children: ListItemElement[];
};

export type NumberedListElement = {
  type: 'numbered-list';
  children: ListItemElement[];
};

export type ListItemElement = {
  type: 'list-item';
  children: Descendant[];
};

export type CustomElement =
  | ParagraphElement
  | HeadingElement
  | BlockquoteElement
  | CodeBlockElement
  | BulletedListElement
  | NumberedListElement
  | ListItemElement;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

// Template types
export interface TemplateStyle {
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: number | string;
  fontStyle?: string;
  color?: string;
  backgroundColor?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  lineHeight?: number;
  letterSpacing?: number | string;
  padding?: string;
  paddingLeft?: string;
  margin?: string;
  borderLeft?: string;
  borderBottom?: string;
  border?: string;
  borderRadius?: string;
  letterSpacingText?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  category: 'tech' | 'life' | 'business' | 'emotion' | 'food' | 'general' | 'news';
  styles: {
    body: TemplateStyle;
    h1: TemplateStyle;
    h2: TemplateStyle;
    h3: TemplateStyle;
    paragraph: TemplateStyle;
    blockquote: TemplateStyle;
    code: TemplateStyle;
    list: TemplateStyle;
    image: TemplateStyle;
  };
}

// Content type classification
export type ContentType = 
  | 'tech'      // 技术教程
  | 'product'   // 产品测评
  | 'emotion'   // 情感故事
  | 'life'      // 生活随笔
  | 'food'      // 美食探店
  | 'business'  // 职场干货
  | 'news'      // 资讯
  | 'unknown';  // 未知

export interface ContentClassification {
  type: ContentType;
  confidence: number;
  recommendedTemplate: string;
}

// Editor state
export interface EditorState {
  content: Descendant[];
  selectedTemplate: string | null;
  contentType: ContentType;
  isDirty: boolean;
}

// Toast notification
export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}
