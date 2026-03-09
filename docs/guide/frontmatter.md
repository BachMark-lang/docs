# Frontmatter

Frontmatter is an optional metadata block at the very beginning of a BachMark document. It uses YAML-like key-value syntax and is delimited by `---`.

## Basic syntax

```bachmark
---
title: My Document
author: Erik
date: 2025-06-15
---

# Document content starts here
```

### Rules

- The opening `---` **must** be the very first line of the document.
- Only **one** frontmatter block per document.
- If the closing `---` is missing, the block is treated as normal text and a **warning** is emitted. The parser does not consume the rest of the document as frontmatter.

## Keys

Keys are **case-insensitive**: `Title`, `title`, and `TITLE` all refer to the same key. Best practice is to write keys in lowercase.

If the same key appears more than once (case-insensitive), the **last value wins** and a warning is emitted.

```bachmark
---
title: First title
Title: Second title
---
```

→ Title is `Second title`, with a warning about the duplicate.

## Value types

Frontmatter supports these value types:

| Type     | Example                              |
| -------- | ------------------------------------ |
| String   | `title: My Document`                 |
| Number   | `version: 3`                         |
| Boolean  | `draft: true`                        |
| List     | `tags: [guide, intro]`               |
| Object   | `author: { name: Erik, url: ... }`   |
| Date     | `date: 2025-06-15`                   |
| Datetime | `updated: 2025-06-15T14:30:00+02:00` |

### Date and datetime formats

Dates and datetimes follow a fixed format:

- **Date:** `YYYY-MM-DD`
- **Datetime:** `YYYY-MM-DDTHH:mm:ss` with an optional timezone (`Z`, `+01:00`, `+02:00`, etc.)

```bachmark
---
date: 2025-06-15
updated: 2025-06-15T14:30:00+02:00
---
```

### Date placeholders

Instead of a fixed date, you can use placeholders inside frontmatter values. These remain as strings in the AST — renderers or build tools expand them at render time (or leave them as-is).

| Placeholder   | Expands to                                   |
| ------------- | -------------------------------------------- |
| `${DATE}`     | `YYYY-MM-DD` (local timezone)                |
| `${DATETIME}` | `YYYY-MM-DDTHH:mm:ss+XX:00` (local timezone) |
| `${YEAR}`     | `YYYY`                                       |

```bachmark
---
date: ${DATE}
copyright: Copyright © ${YEAR} BachIndustries
---
```

Date placeholders only work inside frontmatter values. To reference frontmatter values in the document body, use [inline variables](#inline-variables).

## Markup in values

Frontmatter values are **plain data** — no inline markup is parsed. The one exception is the `license` key, which may contain inline link syntax:

```bachmark
---
license: "[MIT](https://opensource.org/licenses/MIT)"
---
```

All other keys treat their values as raw strings, even if they contain characters that look like BachMark syntax.

## Inline variables

Frontmatter values can be referenced anywhere in the document body using `{{key}}` syntax:

```bachmark
---
title: BachMark Guide
author: Erik
version: 2.1
---

# {{title}}

This is version {{version}} of the guide, written by {{author}}.
```

→ Renders as: "This is version 2.1 of the guide, written by Erik."

### How variables are resolved

- Variable names are **case-insensitive**, matching frontmatter key behavior — `{{title}}`, `{{Title}}`, and `{{TITLE}}` all resolve to the same value.
- If a key doesn't exist, the `{{key}}` text is left as-is and a **warning** is emitted.
- Whitespace inside the braces is trimmed: `{{ title }}` is the same as `{{title}}`.

### Nested keys

For object values in frontmatter, use dot notation:

```bachmark
---
author:
  name: Erik
  url: https://example.com
---

Written by [{{author.name}}]({{author.url}}).
```

If the path doesn't resolve (e.g. the key exists but isn't an object, or the nested key is missing), the variable is left as-is with a warning.

### List values

Referencing a list value directly renders it as a comma-separated string:

```bachmark
---
tags: [guide, intro, tutorial]
---

Tags: {{tags}}
```

→ Renders as: "Tags: guide, intro, tutorial"

### Variables inside other constructs

Inline variables work wherever inline content is allowed — paragraphs, headings, links, callouts, table cells, etc. They are expanded before other inline parsing occurs.

```bachmark
---
api_base: https://api.example.com
---

::: tip
The base URL is {{api_base}}.
:::
```

Variables are **not** expanded inside fenced code blocks or inline code spans, just like comments are not stripped inside code. The `{{key}}` text is preserved literally in code:

````bachmark
```bash
# This stays as literal text:
curl {{api_base}}/users
```
````

### Custom variables

Any frontmatter key can be used as a variable — there's no distinction between "built-in" keys and custom ones. This means you can define reusable values:

```bachmark
---
company: BachIndustries
repo: https://github.com/bachmark/bachmark
support_email: help@bachmark.dev
---

File issues on [GitHub]({{repo}}).
For questions, contact {{support_email}}.

Copyright © ${YEAR} {{company}}.
```

::: tip Date placeholders vs. inline variables
These are two separate systems that work in different places:

- **Date placeholders** (`${DATE}`, `${YEAR}`, etc.) work inside **frontmatter values** and are expanded by the renderer at build time.
- **Inline variables** (`{{key}}`) work in the **document body** and reference frontmatter values.

You can combine them: a frontmatter value can use a date placeholder, and the body can reference that value with an inline variable.
:::

## Table of contents configuration

The ToC is controlled through frontmatter keys:

```bachmark
---
toc: true
tocDepth: 3
---
```

### `toc`

Enables or disables table of contents generation.

- Type: `boolean`
- Default: `false`

### `tocDepth`

Controls the maximum heading level included in the ToC. Only headings with a level ≤ `tocDepth` are included.

- Type: `integer` (1–6)
- Default: `3` (when `toc: true` and `tocDepth` is not specified)
- Out-of-range values are **clamped** to 1–6 with a warning.

### Which headings appear in the ToC?

By default, all headings (both regular and numbered) are ToC candidates, filtered by `tocDepth`. Numbered headings (`#n`) display their calculated section number as a prefix in the ToC entry; regular headings do not.

```bachmark
---
toc: true
tocDepth: 2
---

#n Introduction
## Background
##n Syntax
### Details
```

The ToC for this document contains:

- **1 Introduction** (numbered, level 1)
  - Background (regular, level 2)
  - **1.1 Syntax** (numbered, level 2)

The `### Details` heading is excluded because its level (3) exceeds `tocDepth` (2).

How the ToC is displayed (sidebar, top of page, floating, etc.) is up to the renderer.
