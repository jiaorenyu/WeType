import { describe, it, expect } from 'vitest';
import { useToastStore } from '../../src/hooks/useToast';

describe('useToastStore', () => {
  it('should add a toast', () => {
    const store = useToastStore.getState();
    
    store.addToast({
      message: 'Test message',
      type: 'success',
      duration: 1000,
    });
    
    const toasts = useToastStore.getState().toasts;
    expect(toasts.length).toBeGreaterThan(0);
    expect(toasts[0].message).toBe('Test message');
    expect(toasts[0].type).toBe('success');
  });

  it('should remove a toast', () => {
    const store = useToastStore.getState();
    
    store.addToast({
      message: 'To be removed',
      type: 'info',
    });
    
    const toastId = useToastStore.getState().toasts.find(t => t.message === 'To be removed')?.id;
    if (toastId) {
      store.removeToast(toastId);
    }
    
    const toasts = useToastStore.getState().toasts;
    expect(toasts.some(t => t.message === 'To be removed')).toBe(false);
  });

  it('should generate unique IDs', () => {
    const store = useToastStore.getState();
    
    store.addToast({ message: 'Toast 1', type: 'info' });
    store.addToast({ message: 'Toast 2', type: 'info' });
    
    const toasts = useToastStore.getState().toasts;
    const ids = toasts.map(t => t.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });
});
