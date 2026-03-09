# Keyboard Keys

Keyboard keys render individual keys and key combinations as styled key caps — the visual boxes you see in documentation when describing shortcuts, hotkeys, or user input.

## Basic syntax

Use `{kbd: key}` to render a single key:

```bachmark
Press {kbd: Enter} to confirm.

Hit {kbd: Esc} to cancel the operation.
```

The renderer displays each key as a styled cap (typically a bordered, slightly raised box).

## Key combinations

Separate keys with `+` to show a key combination:

```bachmark
Press {kbd: Ctrl+C} to copy and {kbd: Ctrl+V} to paste.

Use {kbd: Ctrl+Shift+P} to open the command palette.
```

The renderer splits the combination at each `+` and displays each segment as its own key cap, connected by a `+` separator. The visual treatment of the separator (whether it's a `+` character, a space, or something else) is up to the renderer.

### Sequential keys (not held together)

For keys pressed in sequence rather than held simultaneously, use `then` as the separator:

```bachmark
Press {kbd: Ctrl+K then Ctrl+C} to comment out a block.

In Vim, type {kbd: d then d} to delete a line.
```

The renderer should visually distinguish simultaneous combinations (`+`) from sequences (`then`) — for example, "Ctrl+K → Ctrl+C" or "Ctrl+K, then Ctrl+C".

## Common key names

BachMark does not enforce a specific set of key names — the label text is passed through to the renderer as-is. However, for consistency across documents, these conventional names are recommended:

| Key name    | Usage               |
| ----------- | ------------------- |
| `Ctrl`      | Control key         |
| `Shift`     | Shift key           |
| `Alt`       | Alt / Option key    |
| `Cmd`       | Command key (macOS) |
| `Enter`     | Enter / Return key  |
| `Esc`       | Escape key          |
| `Tab`       | Tab key             |
| `Space`     | Spacebar            |
| `Backspace` | Backspace key       |
| `Delete`    | Delete key          |
| `Up`        | Up arrow            |
| `Down`      | Down arrow          |
| `Left`      | Left arrow          |
| `Right`     | Right arrow         |
| `Home`      | Home key            |
| `End`       | End key             |
| `PgUp`      | Page Up             |
| `PgDn`      | Page Down           |
| `F1`–`F12`  | Function keys       |

Single characters like `A`, `C`, `/`, `?` are also valid key names.

### Platform-specific shortcuts

For documentation that covers multiple platforms, you can combine keyboard keys with [tabs](/guide/layout-blocks#tabs-generic):

```bachmark
:::: tabs
::: tab macOS
Press {kbd: Cmd+Shift+P} to open the command palette.
:::

::: tab Windows / Linux
Press {kbd: Ctrl+Shift+P} to open the command palette.
:::
::::
```

## The `+` key

Since `+` is used as the combination separator, writing a literal plus key requires escaping:

```bachmark
Press {kbd: Ctrl+\+} to zoom in.

Press {kbd: \+} to increase the value.
```

The `\+` inside a kbd span is interpreted as the literal `+` key.

## Keyboard keys in context

Keyboard keys work wherever inline content is allowed — paragraphs, list items, table cells, callouts, headings:

```bachmark
### Keyboard shortcuts

| Action         | Shortcut              |
| -------------- | --------------------- |
| Copy           | {kbd: Ctrl+C}         |
| Paste          | {kbd: Ctrl+V}         |
| Undo           | {kbd: Ctrl+Z}         |
| Command palette| {kbd: Ctrl+Shift+P}   |

::: tip
Most shortcuts also work with {kbd: Cmd} instead of {kbd: Ctrl} on macOS.
:::
```

## Combining with other inline formatting

Keyboard keys can appear inside emphasis and other inline constructs:

```bachmark
**Press {kbd: Enter} to continue.**

If that doesn't work, try *holding {kbd: Shift} while clicking*.
```

## Parsing rules

- A keyboard key span starts with `{kbd:` and ends with `}`. The opening and closing must be on the same line.
- The label must contain at least one non-whitespace character. `{kbd: }` is not valid.
- Whitespace around each key name is trimmed: `{kbd: Ctrl + C }` is equivalent to `{kbd: Ctrl+C}`.
- The `+` character splits the label into individual key segments, except when escaped as `\+`.
- The `then` keyword (case-insensitive, surrounded by spaces) splits the label into sequential groups.
- Inline formatting inside the label is not processed — the label is plain text.

## Rendering behavior

| Output | Behavior                                                                                                         |
| ------ | ---------------------------------------------------------------------------------------------------------------- |
| HTML   | Each key is rendered as an inline element (typically a `<kbd>` tag or styled `<span>`) with appropriate styling. |
| PDF    | Each key is rendered as a bordered inline box with monospace or sans-serif text.                                 |
