# Why BachMark?

Markdown — and particularly [CommonMark](https://commonmark.org/) — is a great baseline for writing. But documentation often needs more: callouts, tabs, code groups, footnotes, math, proper PDF output. CommonMark doesn't define any of these, so every tool adds its own extensions in its own way.

BachMark starts from that CommonMark baseline and adds a defined set of extensions for documentation, as a single language with clear rules.

## What BachMark adds to CommonMark

CommonMark covers the fundamentals well — paragraphs, emphasis, links, lists, blockquotes, code blocks. BachMark keeps all of that and extends it with features that documentation authors regularly need:

**Structure and navigation.** Auto-numbered headings (`#n`), custom heading IDs, table of contents via frontmatter, cross-references (`{@fig:id}`, `{@tbl:id}`, `{@sec:id}`, `{@eq:id}`), and file includes for multi-file documents.

**Rich content blocks.** Callouts/alerts, collapsible details, code groups with tabs, generic tab containers, and captioned figures with auto-numbering — all using a consistent `:::` container syntax.

**Technical writing.** Footnotes, citations with auto-generated bibliography, math (`$inline$` and `$$block$$`), definition lists, task lists, subscript/superscript, underline, highlighted text, and a code block annotation system for line highlighting, diffs, and error markers.

**Inline annotations.** Badges (`{badge: beta}`) for status indicators with optional icons, keyboard keys (`{kbd: Ctrl+C}`) for shortcuts, emoji shortcodes (`:rocket:`), and colored text (`{color=red: text}`) — all usable anywhere inline content is allowed.

**Tables with styling.** GFM-compatible pipe tables, plus a `@table-style` block for presentation hints like alignment and background colors, and `@table-id` for captions and cross-referencing.

**Frontmatter and variables.** YAML-style metadata with date placeholders and inline variables (`{{key}}`) that reference frontmatter values anywhere in the document.

**Media embeds.** Images, audio, and video use the same `![]()` syntax — the renderer determines the appropriate presentation based on the file type.

## How it differs from "Markdown + plugins"

Most documentation tools extend Markdown through plugins or renderer-specific syntax. That works, but it means your content is tied to a specific tool — callouts in VitePress look different from callouts in Obsidian or Docusaurus, and moving between them usually requires rewriting.

BachMark takes a different approach: the extensions are part of the language itself, not add-ons. A BachMark document should parse the same way regardless of which renderer processes it.

A few specific differences from standard Markdown workflows:

**No raw HTML.** BachMark doesn't use HTML as an escape hatch. If a feature is needed, it has its own syntax. The one exception is `<!-- comments -->`, which are stripped during pre-processing and don't introduce HTML into the output.

**Renderer-driven presentation.** Authors control content and structure. Typography — fonts, sizes, spacing — is the renderer's job. This keeps documents portable across different output formats.

**HTML and PDF as equal outputs.** Both are first-class targets. The PDF pipeline works from the AST directly, not by rendering HTML in a browser and printing it. Features like cross-references, figure numbering, and bibliography generation work across both outputs.

## Who is it for?

BachMark is aimed at people writing technical documentation, knowledge bases, specs, or structured content who want a single source format that works well for both web and print output.

## Design principles

1. **If CommonMark does it well, keep it.** Paragraphs, emphasis, lists, blockquotes — these don't need reinventing.
2. **If documentation authors need it regularly, build it in.** Callouts, code groups, footnotes, and math shouldn't require plugins.
3. **If it's ambiguous, define it.** Every feature should have clear parsing rules. "It depends on the renderer" isn't an acceptable answer for how something is parsed.
4. **If it's a presentation choice, leave it to the renderer.** Authors choose structure and semantics. Renderers choose visual presentation.

## Inspirations

BachMark draws ideas from [CommonMark](https://commonmark.org/), [GitHub Flavored Markdown](https://github.github.com/gfm/), [VitePress](https://vitepress.dev/), [VuePress](https://vuepress.vuejs.org/), and frontmatter conventions used across the Markdown ecosystem.
