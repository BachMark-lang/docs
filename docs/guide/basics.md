# Basics

BachMark's core syntax is based on [CommonMark](https://spec.commonmark.org/). If you've written Markdown before, this will feel familiar. This page covers the fundamentals — the building blocks you'll use in every document.

::: info Key difference from Markdown
BachMark does **not** support raw HTML. Every feature has its own syntax — there's no `<div>`, `<br>`, or `<details>` fallback. If you need something that Markdown would require HTML for, BachMark has a dedicated construct for it (see [Layout Blocks](/guide/layout-blocks)).

The one exception is **comments** — BachMark uses the familiar `<!-- -->` syntax for content that is visible in the source but excluded from all output. See [Comments](#comments) below.
:::

## Paragraphs

Paragraphs are separated by blank lines. Consecutive lines of text are joined into a single paragraph.

```bachmark
This is a paragraph. It can span
multiple lines in the source.

This is a second paragraph.
```

A single newline within a paragraph does **not** create a line break — it's treated as a space, just like CommonMark.

### Hard line breaks

To force a line break within a paragraph, end a line with two or more spaces, or use a backslash (`\`) before the newline:

```bachmark
First line  
Second line (two trailing spaces above)

First line\
Second line (backslash before newline)
```

## Emphasis

BachMark uses asterisks and underscores for emphasis, following CommonMark's rules:

```bachmark
*italic* or _italic_
**bold** or __bold__
***bold italic*** or ___bold italic___
```

Recommendation: prefer asterisks (`*`) for consistency. Underscores can behave unexpectedly inside words in some edge cases — BachMark follows CommonMark's intra-word rules here.

## Strikethrough

Wrap text in double tildes:

```bachmark
~~This text is struck through.~~
```

## Underline

Wrap text in double plus signs:

```bachmark
++This text is underlined.++
```

The `++` delimiters follow the same parsing rules as `~~` for strikethrough — the opening `++` must be followed by a non-space character, and the closing `++` must be preceded by a non-space character.

::: tip When to use underline
In web content, underlined text is typically associated with hyperlinks. Use underline sparingly to avoid confusing readers. It's most useful in PDF output and formal documents where underline carries different conventions — for example, legal documents, fill-in-the-blank fields, or academic formatting requirements.
:::

## Highlighted text

Wrap text in double equals signs to mark it as highlighted:

```bachmark
==This text is highlighted.==
```

Renderers typically display highlighted text with a colored background (like a marker pen). The exact color and style is up to the renderer.

Highlighted text is useful for drawing attention to key terms, important phrases, or recently changed content:

```bachmark
The deadline has been moved to ==March 15th==.

Key takeaway: the API returns ==paginated results== by default.
```

### Combining with other inline formatting

Highlighted text can be combined with emphasis and other inline styles:

```bachmark
This is ==**bold and highlighted**== text.
This is ==*italic and highlighted*== text.
```

## Subscript and superscript

Use tildes for subscript and carets for superscript:

```bachmark
H~2~O is water.
E = mc^2^ is a famous equation.
The 1^st^ of January.
```

The content between the delimiters can be any text — it's not limited to characters that have Unicode sub/superscript variants. The renderer handles the positioning (e.g. CSS `<sub>`/`<sup>` in HTML, baseline shift in PDF).

Subscript and superscript cannot contain spaces. If you need spaces, use multiple spans:

```bachmark
x^a^~i~ works, but x^a b^ does not.
```

::: tip
For complex mathematical expressions, use [math syntax](#math) instead of superscripts and subscripts. `$x^{a+b}$` is clearer and more capable than trying to nest `^..^` spans.
:::

## Inline code

Use backticks for inline code spans:

```bachmark
Call the `getUser()` function.

Use ``backticks (`) inside code`` by doubling the outer backticks.
```

## Links

### Inline links

```bachmark
[Link text](https://example.com)
[Link with title](https://example.com "Example Site")
```

### Reference links

```bachmark
[Link text][ref-id]

[ref-id]: https://example.com "Optional title"
```

Reference definitions can appear anywhere in the document. They are not rendered as visible content.

### Autolinks

URLs wrapped in angle brackets are automatically linked:

```bachmark
<https://example.com>
<user@example.com>
```

### Bare URL auto-linking

Plain URLs in text are also automatically linked, without needing angle brackets:

```bachmark
Check out https://example.com for more info.
```

The renderer turns this into a clickable link. This matches GFM behavior.

## Media embeds

Images, audio, and video all use the same embed syntax. The renderer determines the appropriate presentation based on the file type (detected by extension or MIME type).

### Images

```bachmark
![Alt text](photo.png)
![Alt text](photo.png "Optional title")
```

Reference-style works too:

```bachmark
![Alt text][img-ref]

[img-ref]: photo.png "Optional title"
```

### Audio

```bachmark
![Episode 42: BachMark deep dive](podcast-ep42.mp3)
![Background music](ambient.ogg "Looping ambient track")
```

### Video

```bachmark
![Demo recording](tutorial.mp4)
![Conference talk](keynote.webm "Recorded 2025-06-15")
```

### How it works

The `![]()` syntax means "embed this resource." The alt text serves as a label or accessible description. How exactly the resource is presented — an `<img>` tag, an audio player, a video player, a download link — is up to the renderer, based on the file type.

Reference-style syntax works for all media types:

```bachmark
![Demo video][vid-ref]

[vid-ref]: demo.mp4 "Product walkthrough"
```

::: tip
BachMark is renderer-driven, so you cannot specify dimensions (width, height) or playback options (autoplay, loop) in the syntax. These are presentation concerns handled by the renderer.
:::

## Lists

### Unordered lists

Use `-`, `*`, or `+` as list markers:

```bachmark
- First item
- Second item
- Third item
```

### Ordered lists

Use numbers followed by a period or closing parenthesis:

```bachmark
1. First item
2. Second item
3. Third item
```

The starting number matters — `3. Item` starts the list at 3. Subsequent numbers don't need to be sequential; it is your own decision how you count.

### Nested lists

Indent by 2–4 spaces (consistently) to create sub-lists:

```bachmark
- Top level
  - Nested item
    - Deeply nested
- Back to top level
```

### Loose vs. tight lists

A list with blank lines between items is a "loose" list — each item is wrapped in a paragraph. A list without blank lines is "tight":

```bachmark
- Tight item 1
- Tight item 2

- Loose item 1

- Loose item 2
```

This follows CommonMark behavior exactly.

### Task lists

Add `[ ]` or `[x]` after a list marker to create a task list:

```bachmark
- [x] Write the parser
- [x] Define the AST
- [ ] Build the renderer
- [ ] Write the spec
```

Task lists are a visual feature — the checkboxes are not interactive in the rendered output. They indicate status in the source document.

Task items can be nested and mixed with regular list items:

```bachmark
- [x] Phase 1
  - [x] Research
  - [x] Prototype
- [ ] Phase 2
  - [ ] Implementation
  - Regular note (not a task)
```

## Definition lists

Use a term followed by a line starting with `: ` for definitions:

```bachmark
BachMark
: A markup language for technical documentation.

CommonMark
: A standardized specification for Markdown.
: Also the name of the organization that maintains it.
```

A term can have multiple definitions (each on its own `: ` line). Terms are plain inline content — emphasis, code, and links work inside them.

Definition content follows the same rules as list items — you can include multiple paragraphs, code blocks, and other block content by indenting:

````bachmark
AST
: Abstract Syntax Tree. A structured representation of the parsed document.

  The BachMark AST is a JSON structure that renderers consume to produce output.

  ```json
  { "type": "document", "children": [...] }
  ```
````

## Blockquotes

Prefix lines with `>`:

```bachmark
> This is a blockquote.
>
> It can span multiple paragraphs.
```

Blockquotes can be nested and can contain any other block-level content:

```bachmark
> Outer quote
>
> > Nested quote
>
> Back to outer
```

## Math

BachMark supports mathematical notation using TeX/LaTeX syntax.

### Inline math

Wrap expressions in single dollar signs:

```bachmark
The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

Euler's identity: $e^{i\pi} + 1 = 0$.
```

The dollar signs must be adjacent to the content — `$ x $` with spaces after the opening or before the closing `$` is not parsed as math.

### Block math

Use double dollar signs for display-mode equations:

```bachmark
$$
\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$
```

Block math is rendered as a centered, standalone equation. The `$$` delimiters must each be on their own line.

### What's inside math spans

BachMark does not parse or validate the math content — it's passed through as-is to the renderer. Most renderers will use KaTeX or MathJax (for HTML) or a native math engine (for PDF) to typeset the expressions.

No BachMark syntax is processed inside math spans. `$**not bold**$` renders the asterisks literally as part of the math expression.

## Footnotes

Footnotes let you add references or supplementary information without interrupting the main text.

### Defining and referencing

Place a reference in the text with `[^label]` and define the footnote content elsewhere in the document:

```bachmark
BachMark is based on CommonMark[^1] with extensions for documentation[^docs].

[^1]: https://commonmark.org/
[^docs]: Including callouts, code groups, math, and more.
```

Labels can be numbers or text — they're identifiers, not display numbers. The renderer assigns sequential numbers in the order footnotes are referenced.

### Multi-paragraph footnotes

Indent continuation lines to include multiple paragraphs or block content in a footnote:

````bachmark
This claim needs a longer explanation[^detail].

[^detail]: The first paragraph of the footnote.

    A second paragraph, indented to continue the footnote.

    ```
    Even code blocks work inside footnotes.
    ```
````

### Placement

Footnote definitions can appear anywhere in the document — they don't need to be at the bottom. The renderer collects them and typically displays them at the end of the page or document.

Footnote definitions are not rendered where they appear in the source. If a footnote is defined but never referenced, it is ignored.

## Horizontal rules

Three or more hyphens, asterisks, or underscores on a line by themselves:

```bachmark
---
***
___
```

All three produce the same result. Spaces between characters are allowed (`- - -`).

## Escaping

Use a backslash to escape any ASCII punctuation character:

```bachmark
\*Not italic\*
\# Not a heading
\[Not a link\]
\$Not math\$
\+\+Not underlined\+\+
\=\=Not highlighted\=\=
\~\~Not struck through\~\~
```

This prevents BachMark from interpreting the character as syntax.

## Comments

BachMark uses HTML-style comments to include content that is visible in the source but excluded from the rendered output:

```bachmark
<!-- This text won't appear in the output -->

Visible paragraph.

<!--
Multi-line comments
work too.
-->
```

Comments work both as standalone blocks and inline within other content:

```bachmark
This is a paragraph with <!-- hidden note --> some text.

The reader sees: "This is a paragraph with some text."
```

### How comments are processed

Comments are stripped in a pre-processing pass before the main parser runs. As far as the parser is concerned, the comment was never there. This means:

- Comments cannot affect parsing. Bold, links, lists, and every other construct behave exactly as if the comment text didn't exist.
- Whitespace left behind after stripping follows normal rules — inline content already collapses multiple spaces, so the result is always clean.

```bachmark
**bold<!-- comment -->text**
```

→ After stripping: `**boldtext**` → renders as **boldtext**.

```bachmark
Hello <!-- name --> world
```

→ After stripping: `Hello  world` → normal inline whitespace collapsing → "Hello world".

### Comments inside code

Content inside fenced code blocks and inline code spans is literal. Comments are _not_ stripped inside code:

````bachmark
```html
<!-- This stays visible in the code block -->
<div>Example</div>
```
````

```bachmark
Use `<!-- comment -->` to write comments in BachMark.
```

In both cases, the `<!-- -->` is preserved as-is — it's code content, not a BachMark comment.

### Pre-processing order

The comment stripping pass is aware of two constructs:

1. **Fenced code blocks** (` ``` ` / `~~~`) — everything between fences is skipped.
2. **Inline code spans** (`` ` `` / ` `` `) — everything inside backticks is skipped.

All other `<!-- ... -->` sequences are removed before the main parser begins.

::: tip Why HTML comment syntax?
Even though BachMark doesn't support raw HTML, `<!-- -->` is universally recognized by editors, syntax highlighters, and developers. Inventing a new comment syntax would add friction for zero benefit — and since comments are stripped before parsing, they don't introduce any HTML into the language itself.
:::
