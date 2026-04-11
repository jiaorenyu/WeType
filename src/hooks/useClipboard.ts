import { useCallback } from 'react';
import { useToastStore } from './useToast';

interface UseClipboardReturn {
  copyToClipboard: (text: string) => Promise<boolean>;
}

export const useClipboard = (): UseClipboardReturn => {
  const addToast = useToastStore((state) => state.addToast);

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      addToast({
        message: '复制成功，请到公众号后台粘贴',
        type: 'success',
        duration: 3000,
      });
      return true;
    } catch {
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        addToast({
          message: '复制成功，请到公众号后台粘贴',
          type: 'success',
          duration: 3000,
        });
        return true;
      } catch {
        addToast({
          message: '复制失败，请手动复制内容',
          type: 'error',
          duration: 5000,
        });
        return false;
      }
    }
  }, [addToast]);

  return { copyToClipboard };
};
