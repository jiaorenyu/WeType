export interface StyleConfig {
  // 基础颜色
  primaryColor: string;     // 主色调（标题装饰、链接）
  textColor: string;        // 正文颜色
  bgColor: string;          // 文章背景色
  // 字体
  baseFontSize: number;     // px
  h2FontSize: number;       // px
  h3FontSize: number;       // px
  lineHeight: number;       // 纯数字
  paragraphMargin: number;  // px
  // 引用块
  quoteBorderColor: string;
  quoteBgColor: string;
  quoteBorderRadius: number;
  // 代码块
  codeBgColor: string;
  codeBorderRadius: number;
}

export interface PresetStyle {
  name: string;
  config: StyleConfig;
}

export interface AppState {
  content: string;
  setContent: (content: string) => void;
  currentPreset: string;
  setCurrentPreset: (preset: string) => void;
  customStyle: StyleConfig;
  setCustomStyle: (style: StyleConfig) => void;
  isMobilePreview: boolean;
  setIsMobilePreview: (isMobile: boolean) => void;
  presets: PresetStyle[];
  resetCustomStyle: () => void;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}