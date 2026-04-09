import { create } from 'zustand';
import { AppState, StyleConfig, PresetStyle } from '../types';

// 预设风格
const presets: PresetStyle[] = [
  {
    name: '简约',
    config: {
      primaryColor: '#1677ff',
      textColor: '#333333',
      bgColor: '#ffffff',
      baseFontSize: 15,
      h2FontSize: 24,
      h3FontSize: 20,
      lineHeight: 1.6,
      paragraphMargin: 16,
      quoteBorderColor: '#1677ff',
      quoteBgColor: '#f0f5ff',
      quoteBorderRadius: 4,
      codeBgColor: '#f5f5f5',
      codeBorderRadius: 4
    }
  },
  {
    name: '优雅',
    config: {
      primaryColor: '#722ed1',
      textColor: '#444444',
      bgColor: '#fafafa',
      baseFontSize: 16,
      h2FontSize: 26,
      h3FontSize: 22,
      lineHeight: 1.7,
      paragraphMargin: 18,
      quoteBorderColor: '#722ed1',
      quoteBgColor: '#f7f3ff',
      quoteBorderRadius: 6,
      codeBgColor: '#f0f0f0',
      codeBorderRadius: 6
    }
  },
  {
    name: '科技',
    config: {
      primaryColor: '#00b8d9',
      textColor: '#262626',
      bgColor: '#f5f5f5',
      baseFontSize: 14,
      h2FontSize: 22,
      h3FontSize: 18,
      lineHeight: 1.5,
      paragraphMargin: 14,
      quoteBorderColor: '#00b8d9',
      quoteBgColor: '#e6f7fa',
      quoteBorderRadius: 4,
      codeBgColor: '#e6e6e6',
      codeBorderRadius: 4
    }
  },
  {
    name: '文艺',
    config: {
      primaryColor: '#fa8c16',
      textColor: '#595959',
      bgColor: '#ffffff',
      baseFontSize: 15,
      h2FontSize: 24,
      h3FontSize: 20,
      lineHeight: 1.8,
      paragraphMargin: 20,
      quoteBorderColor: '#fa8c16',
      quoteBgColor: '#fff7e6',
      quoteBorderRadius: 8,
      codeBgColor: '#f9f0e6',
      codeBorderRadius: 8
    }
  }
];

// 默认自定义风格
const defaultCustomStyle: StyleConfig = {
  primaryColor: '#1677ff',
  textColor: '#333333',
  bgColor: '#ffffff',
  baseFontSize: 15,
  h2FontSize: 24,
  h3FontSize: 20,
  lineHeight: 1.6,
  paragraphMargin: 16,
  quoteBorderColor: '#1677ff',
  quoteBgColor: '#f0f5ff',
  quoteBorderRadius: 4,
  codeBgColor: '#f5f5f5',
  codeBorderRadius: 4
};

// 从localStorage加载数据
const loadFromLocalStorage = (): {
  content: string;
  currentPreset: string;
  customStyle: StyleConfig;
} => {
  try {
    const content = localStorage.getItem('wetype_draft_content') || '';
    const currentPreset = localStorage.getItem('wetype_last_preset') || '简约';
    const customStyleStr = localStorage.getItem('wetype_custom_style');
    const customStyle = customStyleStr ? JSON.parse(customStyleStr) : defaultCustomStyle;
    return { content, currentPreset, customStyle };
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return {
      content: '',
      currentPreset: '简约',
      customStyle: defaultCustomStyle
    };
  }
};

// 保存数据到localStorage
const saveToLocalStorage = (content: string, currentPreset: string, customStyle: StyleConfig) => {
  try {
    localStorage.setItem('wetype_draft_content', content);
    localStorage.setItem('wetype_last_preset', currentPreset);
    localStorage.setItem('wetype_custom_style', JSON.stringify(customStyle));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// 创建store
export const useStore = create<AppState>((set, get) => {
  const { content, currentPreset, customStyle } = loadFromLocalStorage();

  return {
    content,
    setContent: (content) => {
      set({ content });
      saveToLocalStorage(content, get().currentPreset, get().customStyle);
    },
    currentPreset,
    setCurrentPreset: (currentPreset) => {
      set({ currentPreset });
      saveToLocalStorage(get().content, currentPreset, get().customStyle);
    },
    customStyle,
    setCustomStyle: (customStyle) => {
      set({ customStyle });
      saveToLocalStorage(get().content, get().currentPreset, customStyle);
    },
    isMobilePreview: false,
    setIsMobilePreview: (isMobilePreview) => set({ isMobilePreview }),
    presets,
    resetCustomStyle: () => {
      set({ customStyle: defaultCustomStyle });
      saveToLocalStorage(get().content, get().currentPreset, defaultCustomStyle);
    },
    saveToLocalStorage: () => {
      const { content, currentPreset, customStyle } = get();
      saveToLocalStorage(content, currentPreset, customStyle);
    },
    loadFromLocalStorage: () => {
      const { content, currentPreset, customStyle } = loadFromLocalStorage();
      set({ content, currentPreset, customStyle });
    }
  };
});