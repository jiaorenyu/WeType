# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (default http://localhost:5173)
npm run build     # TypeScript type check + Vite production build → dist/
npm run preview   # Preview production build
npm run lint      # ESLint check (ts/tsx), zero-warnings policy (--max-warnings 0)
```

No test framework is configured.

## Tech Stack

- **Framework**: React 18 + TypeScript, Vite 5 build
- **Routing**: react-router-dom v7 with HashRouter
- **Editor**: Milkdown v7 (WYSIWYG) — wraps ProseMirror, replaces the earlier CodeMirror 6 + markdown-it preview approach
- **Markdown → HTML**: markdown-it + highlight.js + markdown-it-task-lists
- **Style inlining**: juice (for WeChat-compatible clipboard output)
- **Styling**: Plain CSS (no CSS-in-JS, no Tailwind)
- **State**: React hooks only (useState, useEffect, useCallback, useRef)

## Project Structure

```
src/
├── main.tsx                  # Entry point: renders <App> inside HashRouter
├── App.tsx                   # Route definitions: / → HomePage, /editor → EditorPage
├── pages/
│   ├── HomePage.tsx          # Landing page with hero, features, CTA
│   ├── HomePage.css          # Home page styles
│   └── EditorPage.tsx        # Editor page: orchestrates editor, toolbar, theme, export
├── components/
│   ├── MilkdownEditor.tsx    # Milkdown WYSIWYG editor wrapper + theme CSS injection
│   ├── EditorToolbar.tsx     # Toolbar buttons that dispatch ProseMirror commands
│   └── ThemeSelector.tsx     # Dropdown theme picker (3 themes)
├── utils/
│   ├── markdown.ts           # markdown-it parser + code highlighting + plain text extraction
│   ├── juice.ts              # CSS inlining + WeChat HTML compatibility transforms
│   └── clipboard.ts          # Clipboard write (text/html + text/plain) + markdown detection
├── types.ts                  # ThemeType, ThemeConfig, MarkdownContent interfaces
├── types/index.d.ts          # Module declarations for juice, markdown-it, markdown-it-task-lists
├── themes.ts                 # Three theme definitions (geek, literary, minimal) with full CSS
├── sampleContent.ts          # Default sample Markdown article
├── App.css                   # All editor page + component styles (incl. responsive)
├── index.css                 # Global reset
└── highlight.css             # highlight.js theme
```

## Architecture

### Data Flow

```
User edits in Milkdown WYSIWYG
    ↓
Milkdown listener fires markdownUpdated → EditorPage setContent(md)
    ↓ (when user clicks "复制到公众号")
parseMarkdown(content) → HTML (markdown-it + highlight.js)
    ↓
generateWeChatHtml(html, theme) → inlined HTML (juice + WeChat compat transforms)
    ↓
copyToClipboard(wechatHtml, plainText) → navigator.clipboard.write()
```

### Key Patterns

- **Editor ↔ Content sync**: EditorPage holds the source-of-truth `content` string. MilkdownEditor syncs bidirectionally via `onChange`/`defaultValueCtx`. External updates (paste detection, "load sample", "clear") use the editor API directly via `editor.action()`.
- **Theme system**: Three themes are defined as `ThemeConfig` objects containing full CSS strings. Theme CSS targets `.article-content` selectors, which `MilkdownEditor` adapts to `.milkdown-content` at runtime. The editor injects a `<style>` tag for the current theme.
- **WeChat export pipeline**: `markdown.ts` parses → `juice.ts` inlines CSS → WeChat-specific transforms (div→section, remove flex/grid, strip transform, compress style attributes). The clipboard receives both `text/html` and `text/plain` formats.
- **Paste detection**: A global `paste` listener in `EditorPage` detects pasted Markdown (via regex indicators) when the editor is not focused, and replaces editor content + shows a notification.
- **Milkdown setup in MilkdownEditor.tsx**: Uses `useEditor()` with commonmark + GFM presets, history plugin, listener plugin. Custom paste handling intercepts Markdown text and parses it directly into the ProseMirror doc.

### Build Output (Vite manual chunks)

```
milkdown  chunk: @milkdown/kit + @milkdown/react
markdown  chunk: markdown-it + highlight.js
juice     chunk: juice
```

## Important Notes

- The project has **no test framework**. Do not add tests unless explicitly asked.
- ESLint is strict: `--max-warnings 0`, `noUnusedLocals`, `noUnusedParameters`. Run `npm run lint` before committing.
- The old CODEBUDDY.md is outdated — it references CodeMirror 6 and the dual-column layout, but the codebase now uses Milkdown WYSIWYG with a single-column layout.
- Milkdown wraps ProseMirror internally. The toolbar in `EditorToolbar.tsx` accesses `editorViewCtx` and `schemaCtx` to dispatch ProseMirror commands directly.
- TypeScript module declarations for third-party libs are in `src/types/index.d.ts` (juice, markdown-it, markdown-it-task-lists).
- tailwind.config.js exists but Tailwind is NOT used — all styling is plain CSS.
