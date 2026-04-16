export type ThemeType = 'geek' | 'literary' | 'minimal';

export interface ThemeConfig {
  name: string;
  displayName: string;
  css: string;
  preview: string;
}

export interface MarkdownContent {
  html: string;
  plainText?: string;
}
