# Tables

BachMark supports pipe tables compatible with GitHub Flavored Markdown (GFM).

::: info
CommonMark does not define tables. In pure CommonMark, pipe-separated lines are just normal paragraphs. BachMark (like GFM) recognizes them as tables.
:::

## Basic syntax

A table consists of:

1. a **header row**
2. a **delimiter row** (dashes + optional colons for alignment)
3. zero or more **body rows**

```bachmark
| Name | Type | Notes |
| ---- | ---- | ----- |
| Alex | Dev  | likes *italics* |
| Bea  | Ops  | `kubectl` |
```

### Minimal syntax

Tables can be written very compactly. The outer pipes are optional, and the delimiter row only requires two dashes per column:

```bachmark
Name | Type | Notes
-- | -- | --
Alex | Dev | ok
```

This is valid and parses identically to the full version above. However, the padded style with outer pipes is strongly preferred for readability:

```bachmark
| Name | Type | Notes |
| ---- | ---- | ----- |
| Alex | Dev  | ok    |
```

::: tip
An official BachMark formatter is planned that can automatically reformat tables into the padded style.
:::

## Alignment

Alignment is defined in the delimiter row:

| Delimiter | Alignment                  |
| --------- | -------------------------- |
| `:---`    | Left                       |
| `---:`    | Right                      |
| `:---:`   | Center                     |
| `---`     | Default (renderer decides) |

```bachmark
| left | center | right |
| :--- | :----: | ----: |
| a    | b      | c     |
```

## What can go inside cells?

Cells support inline content — the same things you can put in a paragraph: emphasis, links, images, inline code, math (`$...$`), footnote references, subscript/superscript, and inline variables (`{{key}}`).

Block-level elements are **not** allowed inside table cells (no lists, no blockquotes, no fenced code blocks).

## Escaping pipes

To write a literal `|` in a cell, escape it as `\|`:

```bachmark
| value |
| ----- |
| a \| b |
| `\|` inside code |
| **\|** inside bold |
```

## Parsing rules

### Header row must match delimiter row

The number of cells in the header row must match the delimiter row. If they don't match, it's not recognized as a table — it stays normal text.

### Body rows may have fewer or more cells

- **Fewer cells** → missing cells become empty.
- **More cells** → extra cells are ignored.

### Table ends on a blank line or another block

A table stops at the first blank line, or at the beginning of another block-level structure (heading, blockquote, list, fenced code block, etc.).

Put a blank line after a table to avoid accidental continuation into the next paragraph.

## Best practices

- Always use leading and trailing `|` for readability.
- Keep the column count consistent across rows.
- Add a blank line after tables.
- Use `\|` when your content contains literal pipes.
- For presentation control beyond alignment, see [Table Style](/guide/table-style).
