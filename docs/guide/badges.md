# Badges

Badges are small inline status indicators — labels like "beta", "new", or "deprecated" that provide quick visual context. They can appear in headings, paragraphs, list items, table cells, and anywhere else inline content is allowed.

## Basic syntax

A badge is written as `{badge: text}` inside curly braces:

```bachmark
## API Reference {badge: beta}

This feature is {badge: new} in version 2.0.
```

The text after `badge:` becomes the badge label. Leading and trailing whitespace around the label is trimmed — `{badge: beta}` and `{badge:beta}` are equivalent.

## Badge types

Badges support the same semantic types as [callouts](/guide/layout-blocks#callouts-alerts), giving them distinct visual styles:

```bachmark
{badge: text}              <!-- default — neutral style -->
{badge-info: text}         <!-- informational — typically blue -->
{badge-tip: text}          <!-- positive/success — typically green -->
{badge-warning: text}      <!-- caution — typically yellow/orange -->
{badge-danger: text}       <!-- critical — typically red -->
```

The type determines the badge's visual treatment (color, icon, border). The exact rendering is up to the renderer — BachMark defines the semantics, not the colors.

### Examples

```bachmark
## Authentication {badge-warning: Deprecated}

The `v1` auth endpoint is {badge-danger: removed} in version 3.0.
Use the {badge-tip: recommended} OAuth 2.0 flow instead.

- `username` — {badge: required}
- `avatar` — {badge: optional}
- `bio` — {badge-info: new in v2.1}
```

## Badge icons

Badges can display an icon alongside their label. Use the `icon` attribute to specify an icon by name or by file path.

### Named icons

Reference an icon from the renderer's icon library by name:

```bachmark
{badge: beta icon=flask}
{badge-danger: removed icon=trash}
{badge-tip: stable icon=circle-check}
{badge-warning: deprecated icon=alert-triangle}
```

The renderer resolves the icon name to the appropriate graphic from its configured icon set. BachMark does not mandate a specific icon library — the available icon names depend on the renderer. A recommended set of icon names will be published alongside the BachMark specification to encourage consistency across renderers.

If the renderer doesn't recognize an icon name, it renders the badge without an icon and emits a warning.

### Custom icon files

For project-specific icons, provide a relative file path to an SVG or PNG file:

```bachmark
{badge: enterprise icon=./icons/enterprise.svg}
{badge-info: partner icon=./assets/partner-logo.png}
```

The renderer distinguishes named icons from file paths by the presence of a path separator (`/`) or a file extension (`.svg`, `.png`). A value like `flask` is a named icon; `./icons/flask.svg` is a file path.

File paths are relative to the current document, following the same convention as [media embeds](/guide/basics#media-embeds).

If the file is not found, the badge renders without an icon and a warning is emitted.

### Default icons per badge type

Renderers may provide default icons for typed badges — for example, a warning triangle for `badge-warning` or a circle-x for `badge-danger`. This is a renderer decision, not specified by BachMark. The `icon` attribute overrides any default icon the renderer would otherwise display.

### Badges without icons

A badge without an `icon` attribute renders as a text-only label, unless the renderer provides a default icon for the badge type:

```bachmark
{badge: beta}                  <!-- text only (unless renderer adds a default icon) -->
{badge: beta icon=flask}       <!-- explicit icon -->
```

## Badges in headings

Badges are particularly useful in headings — they give readers an immediate signal about section status without cluttering the heading text:

```bachmark
# Getting Started
## Installation
## Configuration {badge: required}
## Plugins {badge-info: new}
## Legacy Mode {badge-warning: deprecated}
```

### Badges and heading IDs

Badges can coexist with [custom heading IDs](/guide/headings#custom-heading-ids). The badge is part of the heading's inline content; the `{#id}` is a separate attribute. Place the badge before the custom ID:

```bachmark
## API Reference {badge: beta} {#api-ref}
```

→ The heading text is "API Reference" with a "beta" badge, and the anchor is `#api-ref`.

Badges are **not** included in auto-generated heading IDs. A heading like `## Plugins {badge-info: new}` generates the anchor `#plugins`, not `#plugins-new`.

### Badges and numbered headings

Badges work with `#n` headings too:

```bachmark
#n Introduction
##n Core API {badge: stable}
##n Experimental API {badge-warning: experimental}
```

The badge doesn't affect the numbering — it's purely visual.

## Badges in other contexts

Badges work wherever inline content is allowed:

```bachmark
<!-- In paragraphs -->
The `fetchAll()` method {badge-warning: deprecated} will be removed in v4.

<!-- In list items -->
- `GET /users` — {badge-tip: stable}
- `GET /users/search` — {badge: beta}
- `POST /users/import` — {badge-info: new in v2.0}

<!-- In table cells -->
| Endpoint         | Status                    |
| ---------------- | ------------------------- |
| `/v2/users`      | {badge-tip: stable}       |
| `/v2/search`     | {badge: beta}             |
| `/v1/users`      | {badge-danger: removed}   |

<!-- In callouts -->
::: warning
The `legacyMode` option {badge-danger: removed} is no longer supported.
:::
```

## Badges inside inline formatting

Badges can appear inside emphasis, links, and other inline constructs:

```bachmark
**Important method {badge: required}**

See [Authentication {badge-info: updated}](/guide/auth).
```

They also work placed directly after inline formatting — both positions are valid:

```bachmark
**Important method** {badge: required}
```

However, inline formatting inside the badge label itself is **not** supported — the label is plain text:

```bachmark
{badge: **bold**}    <!-- label is literally "**bold**", not bold text -->
```

## Parsing rules

- A badge starts with `{badge` (optionally followed by `-type`) and then `:`, followed by the label text, optional attributes, and a closing `}`.
- The label must contain at least one non-whitespace character. `{badge: }` (empty label) is not a valid badge — it's treated as literal text.
- Badges cannot span multiple lines. The opening `{` and closing `}` must be on the same line.
- The optional `icon` attribute appears after the label text, separated by a space: `{badge: text icon=name}`. The `icon` value cannot contain spaces.
- If the label text contains a literal `}`, escape it as `\}`:

```bachmark
{badge: value \} required}
```

- Unrecognized types are treated as the default type with a warning. `{badge-custom: text}` renders as a default-styled badge and emits a warning that `custom` is not a recognized badge type.
- Unrecognized icon names render the badge without an icon, with a warning. Missing icon files also produce a warning.

### Recognized badge types

| Syntax                 | Type    | Typical style  |
| ---------------------- | ------- | -------------- |
| `{badge: ...}`         | default | Neutral / gray |
| `{badge-info: ...}`    | info    | Blue           |
| `{badge-tip: ...}`     | tip     | Green          |
| `{badge-warning: ...}` | warning | Yellow/orange  |
| `{badge-danger: ...}`  | danger  | Red            |

## Rendering behavior

| Output | Behavior                                                                                                                               |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| HTML   | Rendered as an inline element (typically a `<span>`) with a class reflecting the badge type. The renderer applies appropriate styling. |
| PDF    | Rendered as an inline label with background color and styled text.                                                                     |

Badges are purely visual — they carry no semantic weight for the parser beyond identifying them as badge nodes in the AST.
