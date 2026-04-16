declare module 'juice' {
  interface Options {
    extraCss?: string;
    removeStyleTags?: boolean;
    preserveImportant?: boolean;
    preserveMediaQueries?: boolean;
    preserveFontFaces?: boolean;
    applyWidthAttributes?: boolean;
    applyHeightAttributes?: boolean;
    applyAttributesTableElements?: boolean;
  }

  function juice(content: string, options?: Options): string;
  export = juice;
}

declare module 'markdown-it' {
  interface Options {
    html?: boolean;
    linkify?: boolean;
    typographer?: boolean;
    highlight?: (str: string, lang: string) => string | undefined;
  }

  class MarkdownIt {
    constructor(options?: Options);
    render(src: string): string;
    use(plugin: any, options?: any): MarkdownIt;
    utils: {
      escapeHtml(str: string): string;
    };
  }

  export = MarkdownIt;
}

declare module 'markdown-it-task-lists' {
  interface Options {
    enabled?: boolean;
    label?: boolean;
    lineNumber?: boolean;
  }

  const taskLists: any;
  export = taskLists;
}

declare module '@codemirror/view' {
  import { Extension } from '@codemirror/state';

  export const basicSetup: Extension;

  export class EditorView {
    static theme(spec: { [selector: string]: any }): Extension;
    static updateListener: {
      of(f: (update: any) => void): Extension;
    };
    constructor(config: {
      state: any;
      parent: HTMLElement;
    });
    readonly state: any;
    readonly dom: HTMLElement;
    dispatch(transaction: any): void;
    destroy(): void;
  }
}

declare module '@codemirror/state' {
  export class EditorState {
    static create(config: {
      doc: string;
      extensions: any[];
    }): EditorState;
    readonly doc: { toString(): string; length: number };
    update(config: { changes: { from: number; to: number; insert: string } }): any;
  }
}
