# File Includes

File includes let you embed the content of another BachMark file into the current document. This is useful for reusable content blocks — shared disclaimers, common setup instructions, boilerplate sections — that appear across multiple documents.

## Basic syntax

Use `@include` followed by a file path:

```bachmark
@include ./shared/disclaimer.bm
```

The contents of the referenced file are inserted at that position in the document, as if the text had been written directly in the source. The include directive itself is removed from the output.

The file path is relative to the current document.

## How includes are processed

Includes are resolved in a pre-processing pass before the main parser runs — similar to how [comments](/guide/basics#comments) are stripped. Once resolved, the parser sees a single flat document with all included content inlined.

```bachmark
# My Document

Some introductory text.

@include ./setup-instructions.bm

## Next Steps

Continue with the advanced guide.
```

If `setup-instructions.bm` contains:

```bachmark
## Setup

1. Install dependencies
2. Run the dev server
3. Open the browser
```

The parser sees:

```bachmark
# My Document

Some introductory text.

## Setup

1. Install dependencies
2. Run the dev server
3. Open the browser

## Next Steps

Continue with the advanced guide.
```

The included content participates fully in the document — headings are part of the ToC, figures are numbered in sequence, cross-references work across included boundaries.

## Rules

- `@include` must appear alone on its own line (ignoring leading/trailing whitespace), just like [`@page-break`](/guide/page-breaks).
- Surround includes with blank lines so they sit clearly between blocks.
- The file path must be a relative path. Absolute paths are not allowed.
- The included file must have a BachMark extension: `.bm`, `.bachmark`, `.bachm`, or `.bmark`. Other file types are not included as content — use [code block file imports](/guide/code-blocks#file-imports) for embedding source code.
- If the file is not found, a warning is emitted and the `@include` line is removed from the output (nothing is inserted).

## Nested includes

Included files can themselves contain `@include` directives:

```bachmark
<!-- main.bm -->
# Guide

@include ./chapters/intro.bm
@include ./chapters/setup.bm
```

```bachmark
<!-- chapters/setup.bm -->
## Setup

@include ../shared/prerequisites.bm

Follow these steps to get started.
```

Nested paths are resolved relative to the file they appear in, not the root document. In the example above, `../shared/prerequisites.bm` is relative to `chapters/setup.bm`.

### Circular include detection

If file A includes file B and file B includes file A (directly or through a chain), the parser detects the cycle, emits a warning, and stops resolving at the point where the cycle would begin. The circular `@include` is removed from the output without inserting anything.

```bachmark
<!-- a.bm -->
@include ./b.bm    <!-- resolves normally -->

<!-- b.bm -->
@include ./a.bm    <!-- cycle detected — warning, nothing inserted -->
```

## Including partial content

By default, `@include` inserts the entire file. To include only a specific section, use a line range:

```bachmark
@include ./reference.bm {lines=5-20}
```

This inserts only lines 5 through 20 of the referenced file. Line numbers are 1-based.

### Named sections

For more stable references, you can define named sections in the included file using `<!-- @section name -->` and `<!-- @end -->` markers:

```bachmark
<!-- shared/warnings.bm -->

<!-- @section security -->
::: warning Security notice
All API requests must use HTTPS. Unencrypted HTTP requests are rejected.
:::
<!-- @end -->

<!-- @section deprecation -->
::: warning Deprecation notice
The v1 API will be removed on 2026-01-01.
:::
<!-- @end -->
```

Then include a specific section:

```bachmark
@include ./shared/warnings.bm {section=security}
```

Only the content between `<!-- @section security -->` and `<!-- @end -->` is inserted. The section markers themselves are not included in the output.

Named sections are more robust than line ranges — they survive edits to the included file without breaking the include.

If the named section is not found, a warning is emitted and nothing is inserted.

## Includes and frontmatter

Included files should **not** contain their own frontmatter blocks. Only the root document's frontmatter is used. If an included file contains a frontmatter block (`---` delimited), it is treated as normal content (likely a horizontal rule followed by text), which is probably not what you want.

```bachmark
<!-- root.bm — this frontmatter is used -->
---
title: My Document
author: Erik
---

@include ./chapter.bm
```

```bachmark
<!-- chapter.bm — no frontmatter here -->
## Chapter One

Content starts directly.
```

This keeps the frontmatter model simple — one document, one frontmatter block, one set of metadata.

## Includes and headings

Included content becomes part of the document's heading structure. This means:

- Included headings appear in the ToC (if enabled).
- Included numbered headings (`#n`) continue the document's numbering sequence.
- Heading IDs from included files must not conflict with IDs in the root document or other includes. Conflicts are resolved with a `-2` suffix and a warning.

Be mindful of heading levels in included files. If your root document uses `#` for the title and `##` for major sections, included files should start at `##` or lower to maintain a consistent hierarchy.

## Includes and cross-references

Cross-references work across include boundaries. A figure defined in an included file can be referenced from the root document, and vice versa:

```bachmark
<!-- root.bm -->
See {@fig:arch} for the architecture overview.

@include ./diagrams.bm
```

```bachmark
<!-- diagrams.bm -->
::: figure {#arch}
![Architecture](arch.png)

System architecture overview.
:::
```

This works because includes are resolved before parsing — by the time cross-references are resolved, the content is a single flat document.

## Includes vs. code block file imports

BachMark has two features for pulling in external files, each for a different purpose:

| Feature                                                   | Syntax                             | Inserts as                        |
| --------------------------------------------------------- | ---------------------------------- | --------------------------------- |
| File include                                              | `@include ./file.bm`               | Parsed BachMark content           |
| [Code block file import](/guide/code-blocks#file-imports) | ` ```js {file=./code.js} ` ` ``` ` | Literal code (syntax highlighted) |

Use `@include` when you want the content to be part of the document — parsed, rendered, and participating in numbering and cross-references. Use code block file imports when you want to display source code.

## Parsing rules

- `@include` must be the only content on its line (leading/trailing whitespace is ignored).
- The file path follows `@include`, separated by a space.
- Optional attributes (`{lines=...}` or `{section=...}`) appear after the path, separated by a space.
- `{lines=...}` and `{section=...}` are mutually exclusive. Using both emits a warning — `{section=...}` takes priority.
- Includes are resolved before comment stripping and before the main parser runs. The resolution order is: resolve includes (recursively) → strip comments → parse.
- `@include` inside fenced code blocks is not processed — it's preserved as literal text.
