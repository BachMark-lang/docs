# Colored Text

BachMark supports colored text for cases where color carries meaning — marking additions and removals, status indicators, categorization, or visual emphasis. Since BachMark doesn't support raw HTML, colored text has its own inline syntax.

## Basic syntax

Use `{color=value: text}` to apply a color to text:

```bachmark
The {color=red: old API} was replaced by the {color=green: new API}.

Status: {color=orange: pending review}.
```

The value can be a named color or a hex code.

## Named colors

BachMark supports the full set of CSS named colors as defined in the [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#named-colors) specification — 148 color keywords covering 142 unique colors.

Some commonly used names:

```bachmark
{color=red: error message}
{color=green: success message}
{color=blue: informational text}
{color=orange: warning text}
{color=gray: de-emphasized text}
{color=purple: special note}
{color=tomato: a more specific red}
{color=dodgerblue: a brighter blue}
{color=mediumseagreen: a softer green}
{color=slategray: a muted gray-blue}
```

Named colors are case-insensitive — `{color=Red: text}`, `{color=red: text}`, and `{color=RED: text}` are all equivalent.

The full list of supported names includes everything from `aliceblue` to `yellowgreen`. Since these are standardized CSS color names, they are well-documented and widely known.

::: tip
Stick to common color names for readability. Writing `{color=red: text}` is clearer in source than `{color=palevioletred: text}`, even if both are valid.
:::

## Hex codes

For precise color control, use hex codes prefixed with `#`:

```bachmark
{color=#ff6b6b: this specific red}
{color=#1a1a2e: dark blue}
{color=#2ecc71: flat green}
```

### Supported hex formats

| Format      | Example       | Description                      |
| ----------- | ------------- | -------------------------------- |
| `#rrggbb`   | `#ff6b6b`     | 6-digit hex (red, green, blue)   |
| `#rrggbbaa` | `#ff6b6bcc`   | 8-digit hex with alpha channel   |
| `#rgb`      | `#f66`        | 3-digit shorthand                |
| `#rgba`     | `#f66c`       | 4-digit shorthand with alpha     |

Hex codes are case-insensitive — `#FF6B6B` and `#ff6b6b` are equivalent.

### Alpha channel

The alpha channel controls transparency. `00` is fully transparent, `ff` is fully opaque:

```bachmark
{color=#ff000080: 50% transparent red}
{color=#0000ff40: 25% transparent blue}
```

How transparency is rendered depends on the output format. HTML renderers apply CSS opacity. PDF renderers may approximate transparency or render it as a lighter shade.

::: warning Portability
Hex codes are passed through to the renderer as-is. Unlike named colors, they don't adapt to themes or dark mode. A color that works well on a light background may be illegible on a dark one. For portable documents, prefer named colors — renderers can map them to theme-appropriate values. Use hex codes only when you need a specific color and control the rendering context.
:::

## Combining with other inline formatting

Colored text can wrap or be wrapped by other inline formatting:

```bachmark
{color=red: **bold red text**}
**{color=red: also bold red text}**

{color=green: *italic green*}
{color=blue: `code is colored too`}
{color=red: ~~struck through in red~~}
```

Colored text can also contain badges, keyboard keys, and other inline constructs:

```bachmark
{color=green: The feature {badge-tip: stable} is ready.}
```

### Nesting colored text

Colored text can be nested. The innermost color wins for the overlapping region:

```bachmark
{color=blue: This is blue and {color=red: this part is red} and back to blue.}
```

## Colored text in context

Colored text works wherever inline content is allowed — paragraphs, headings, list items, table cells, callouts, and figure captions:

```bachmark
## {color=red: Breaking} Changes

- {color=green: Added} — new `/search` endpoint
- {color=red: Removed} — legacy `/find` endpoint
- {color=orange: Changed} — response format for `/users`

| Feature   | Status                       |
| --------- | ---------------------------- |
| Auth      | {color=green: implemented}   |
| Search    | {color=orange: in progress}  |
| Export    | {color=red: not started}     |
```

## When to use colored text

Color is most effective when it carries semantic meaning:

- **Additions and removals:** `{color=green: added}` / `{color=red: removed}` in changelogs.
- **Status indicators:** `{color=green: passing}` / `{color=red: failing}` in reports.
- **Categorization:** Color-coding items in a list or table.
- **Inline emphasis:** Drawing attention to a specific term when bold or highlighting isn't enough.

For general-purpose attention markers, consider [highlighted text](/guide/basics#highlighted-text) (`==text==`) or [badges](/guide/badges) instead — they're more portable and don't depend on specific colors rendering correctly.

## Parsing rules

- Colored text starts with `{color=` followed by a color value (named color or hex code), then `:`, the content text, and a closing `}`.
- The color value cannot contain spaces. It ends at the `:`.
- The content between `:` and `}` is parsed as normal inline content — emphasis, links, code, badges, and other inline constructs all work.
- Colored text can span multiple words but cannot span multiple lines. The opening `{color=` and closing `}` must be on the same line.
- Named colors are matched case-insensitively against the CSS Color Module Level 4 named color set.
- Hex codes must start with `#` and be 3, 4, 6, or 8 hex digits. Invalid hex codes are treated as literal text with a warning.
- Unrecognized named colors (not in the CSS set and not a valid hex code) are treated as literal text with a warning.
- Colored text is not processed inside fenced code blocks or inline code spans.

## Rendering behavior

| Output | Behavior                                                       |
| ------ | -------------------------------------------------------------- |
| HTML   | Rendered as a `<span>` with an inline `color` style or a class. Named colors may be mapped to theme-appropriate values by the renderer. |
| PDF    | Rendered with the specified text color. Hex codes are used as-is. Named colors are mapped to their defined RGB values. |
