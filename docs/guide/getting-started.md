# Getting Started

BachMark is a markup language based on [CommonMark](https://commonmark.org/) with extensions for technical documentation. If you've written Markdown before, you already know most of BachMark.

## How it relates to Markdown

BachMark uses CommonMark as its baseline — paragraphs, emphasis, links, lists, blockquotes, and fenced code blocks all work the way you'd expect. On top of that, BachMark adds features that CommonMark doesn't define: callouts, code groups, footnotes, math, auto-numbered headings, and more.

A few things are intentionally different from typical Markdown:

- **No raw HTML.** Every feature has its own syntax. There's no `<div>` or `<br>` fallback.
- **Renderer-driven presentation.** Authors control content and structure. Fonts, sizes, and spacing are the renderer's job.
- **JSON AST.** The parser produces a well-defined AST, so different renderers can behave consistently.
- **HTML and PDF output.** Both are first-class targets. PDF is generated from the AST directly, not by printing a browser page.

For more background on these decisions, see [Why BachMark?](/guide/why-bachmark).

## Quick example

```bachmark
---
title: My Document
author: Erik
date: ${DATE}
toc: true
tocDepth: 3
---

#n Introduction

This is a paragraph with **bold**, *italic*, ++underlined++, and ==highlighted== text. Here's a [link](https://example.com) and some `inline code`.

The document title is {{title}}, written by {{author}}.

##n Key features {badge-tip: new}

::: tip
BachMark callouts use a familiar container syntax.
:::

Here's some math: the quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

- [x] Familiar syntax
- [x] Built-in callouts
- [ ] World domination

##n Code example

\`\`\`javascript {2 lines}
function greet(name) {
  console.log(`Hello, ${name}!`);  // highlighted
}
\`\`\`

::: figure {#screenshot}
![Application screenshot](app.png)

The main dashboard after logging in.
:::

As shown in {@fig:screenshot}, the dashboard provides an overview. Press {kbd: Ctrl+D} to toggle dark mode. :rocket:

A footnote reference looks like this[^1]. BachMark builds on CommonMark[@commonmark].

[^1]: And the footnote content goes here.
[@commonmark]: CommonMark Spec, John MacFarlane et al., 2024, https://spec.commonmark.org/
```

Everything above is valid BachMark. The basics work like CommonMark — the rest of the guide covers the extensions.

## Next steps

- [**Basics**](/guide/basics) — Paragraphs, emphasis, underline, highlighted text, links, lists, media embeds, blockquotes, footnotes, math, and more.
- [**Frontmatter**](/guide/frontmatter) — Document metadata, ToC configuration, date placeholders, and inline variables.
- [**Headings & Structure**](/guide/headings) — Auto-numbered headings, custom heading IDs, and document structure.
- [**Tables**](/guide/tables) — GFM-compatible pipe tables with alignment and inline content.
- [**Table Style**](/guide/table-style) — Presentation hints for tables using A1-notation selectors. _(Draft)_
- [**Code Blocks**](/guide/code-blocks) — Line highlighting, focus, diffs, error annotations, line numbers, and file imports.
- [**Layout Blocks**](/guide/layout-blocks) — Callouts, alerts, collapsible details, code groups, tabs, and side-by-side rows.
- [**Page Breaks**](/guide/page-breaks) — Controlling pagination for PDF and print output.
- [**Badges**](/guide/badges) — Inline status indicators with optional icons for headings, paragraphs, tables, and more.
- [**Keyboard Keys**](/guide/keyboard-keys) — Styled key caps for shortcuts and key combinations.
- [**Emoji Shortcodes**](/guide/emoji-shortcodes) — Text shortcodes like `:rocket:` that resolve to emoji characters.
- [**Colored Text**](/guide/colored-text) — Inline colored text using CSS named colors or hex codes.
- [**Figures**](/guide/figures) — Captioned, numbered figures for images, code listings, and other content.
- [**Cross-References**](/guide/cross-references) — Auto-numbered references to figures, tables, headings, and equations.
- [**File Includes**](/guide/file-includes) — Embed content from other BachMark files into your document.
- [**Bibliography & Citations**](/guide/bibliography) — Source attribution with auto-numbered citations and a generated bibliography.
