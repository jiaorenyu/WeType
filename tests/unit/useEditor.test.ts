import { describe, it, expect } from 'vitest';
import { createEditor, Editor, Transforms } from 'slate';
import { isMarkActive, isBlockActive, initialValue } from '../../src/hooks/useEditor';

describe('useEditor helpers', () => {
  describe('initialValue', () => {
    it('should have correct structure', () => {
      expect(initialValue).toBeDefined();
      expect(Array.isArray(initialValue)).toBe(true);
      expect(initialValue.length).toBe(1);
      expect(initialValue[0].type).toBe('paragraph');
    });
  });

  describe('createEditor', () => {
    it('should create editor instance', () => {
      const editor = createEditor();
      
      expect(editor).toBeDefined();
      expect(typeof editor.insertText).toBe('function');
      expect(typeof editor.insertNodes).toBe('function');
    });

    it('should have correct selection methods', () => {
      const editor = createEditor();
      
      expect(typeof editor.selection).toBe('object');
    });
  });

  describe('isMarkActive', () => {
    it('should return false when no marks', () => {
      const editor = createEditor();
      
      // Empty editor has no selection
      expect(isMarkActive(editor, 'bold')).toBe(false);
    });
  });

  describe('isBlockActive', () => {
    it('should return false when no selection', () => {
      const editor = createEditor();
      
      expect(isBlockActive(editor, 'paragraph')).toBe(false);
    });
  });
});
