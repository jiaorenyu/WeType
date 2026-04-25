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

