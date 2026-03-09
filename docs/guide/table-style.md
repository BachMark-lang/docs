# Table Style

::: warning Draft
This feature is still being designed. The attachment rules and selector system described below are stable, but the list of supported style properties is not final and will change.
:::

BachMark separates table content from table presentation. The `@table-style` block lets you apply styling hints to a table without mixing presentation into the table syntax itself.

Key constraints:

- A `@table-style` block applies to the table directly above it.
- There are no table IDs — styling is always positional.
- No font selection or font sizes. Typography is the renderer's job.

## Syntax

```bachmark
| A | B |
|---|---|
| 1 | 2 |

@table-style {
  :A {
    align: right
  }

  A1 {
    background: subtle
  }
}
```

The style block contains one or more rules, each with a selector and a set of key/value pairs. Values are typically unquoted identifiers or numbers — the renderer decides how to interpret them.

## Attachment

A `@table-style` block always targets the table directly above it.

Between the table and the `@table-style` block, only whitespace and comments are allowed. Any other content (paragraphs, headings, lists, etc.) breaks the attachment — the style block has no table to target and a warning is emitted.

```bachmark
| A | B |
|---|---|
| 1 | 2 |

<!-- This comment is fine -->

@table-style {
  :A { align: right }
}
```

## Selectors

Selectors use an A1-style notation similar to spreadsheets. Columns are identified by their letter (A, B, C, ...) and rows by their number (1 = header row, 2 = first body row, etc.).

### Cells

| Selector | Target                       |
| -------- | ---------------------------- |
| `A1`     | A single cell                |
| `A1:C3`  | A rectangular range of cells |

### Columns

| Selector | Target                           |
| -------- | -------------------------------- |
| `:A`     | An entire column                 |
| `:A:C`   | A range of columns (A through C) |

### Rows

| Selector | Target                         |
| -------- | ------------------------------ |
| `:1`     | An entire row (1 = header row) |
| `:1:3`   | A range of rows (1 through 3)  |

## Style properties

The exact list of properties will be defined in the spec. The following are examples of what renderers may support:

| Property     | Values                    | Description                 |
| ------------ | ------------------------- | --------------------------- |
| `align`      | `left`, `center`, `right` | Text alignment within cells |
| `background` | Renderer-defined tokens   | Background color or style   |
| `wrap`       | `true`, `false`           | Whether cell content wraps  |
| `border`     | `none`, `thin`, `thick`   | Cell border style           |

Background values are intentionally abstract — tokens like `subtle`, `warning`, or `accent` rather than hex colors. This keeps documents portable across renderers and themes.

If a renderer doesn't recognize a property, it should ignore it and may emit a warning.

## Full example

```bachmark
| Key | Value |
| --- | ----: |
| cpu | 42%   |
| ram | 73%   |

@table-style {
  :A { align: left }
  :B { align: right }

  B2 { background: warning }
}
```

This right-aligns column B, left-aligns column A, and gives cell B2 (the "73%" cell) a warning-style background.

## Scope

`@table-style` only affects presentation, not structure. It cannot add or remove rows and columns, change the parsed text content of cells, or enable block-level content inside cells.
