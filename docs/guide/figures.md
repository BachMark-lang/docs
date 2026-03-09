# Figures

A figure is a block-level wrapper that adds a caption and optional numbering to content — typically an image, but figures can contain any block content. Figures are essential for technical reports, academic documents, and any content where readers need to reference visual elements by number.

## Basic syntax

Wrap content in a `:::figure` container. The last paragraph inside becomes the caption:

```bachmark
::: figure
![Server architecture](arch.png)

The high-level architecture showing how services communicate.
:::
```

The renderer displays this as a captioned figure — the image above, the caption below (or above, depending on renderer conventions). Without the `:::figure` wrapper, an image is just an inline media embed with no caption or numbering.

## Figure numbering

Figures are automatically numbered in document order. The renderer prefixes the caption with a label like "Figure 1:", "Figure 2:", etc. The exact label text and format (Arabic numerals, Roman numerals, chapter-relative numbering) is up to the renderer.

```bachmark
::: figure
![Database schema](schema.png)

Entity-relationship diagram for the user management module.
:::

Some text discussing the schema...

::: figure
![Sequence diagram](auth-flow.png)

Authentication flow between client, gateway, and identity provider.
:::
```

→ Rendered as:

> **Figure 1:** Entity-relationship diagram for the user management module.
>
> ...
>
> **Figure 2:** Authentication flow between client, gateway, and identity provider.

Numbering is automatic — rearranging figures updates the numbers without any manual changes.

## Figure IDs

Add `{#id}` after `figure` to assign a stable ID for [cross-referencing](/guide/cross-references):

```bachmark
::: figure {#arch-diagram}
![Server architecture](arch.png)

The high-level architecture showing how services communicate.
:::

See {@fig:arch-diagram} for the full architecture overview.
```

The cross-reference `{@fig:arch-diagram}` resolves to the figure's number (e.g. "Figure 1"). Cross-references are covered in detail on the [Cross-References](/guide/cross-references) page.

Without an explicit ID, figures are still numbered but cannot be referenced by ID from elsewhere in the document.

### ID rules

- The ID can contain letters, numbers, hyphens, and underscores.
- IDs must be unique within the document. Duplicate figure IDs emit a warning — the second occurrence gets a `-2` suffix.
- The `{#id}` is placed directly after `figure` on the opening line, before any content.

## Captions

The caption is the last paragraph inside the figure container. Everything before it is the figure's content (typically an image or other media).

```bachmark
::: figure {#performance}
![Benchmark results](bench.png)

Response time comparison across three configurations.
Measured on a 4-core VM with 8 GB RAM.
:::
```

Captions support inline formatting — emphasis, links, inline code, math, badges, and emoji all work:

```bachmark
::: figure {#formula}
![Equation derivation](derivation.png)

Derivation of $E = mc^2$ from the **Lorentz transformation**. See [Wikipedia](https://en.wikipedia.org/wiki/Mass%E2%80%93energy_equivalence) for background.
:::
```

### Figures without captions

If a figure container has no trailing paragraph, it has no caption. The figure is still numbered but displays no caption text:

```bachmark
::: figure {#logo}
![Company logo](logo.svg)
:::
```

This is useful when you need a numbered, referenceable figure but the image is self-explanatory.

### Unnumbered figures

If you want a caption but no "Figure X:" label, add `unnumbered` to the opening line:

```bachmark
::: figure {unnumbered}
![Team photo](team.jpg)

The BachMark core team at the 2025 offsite.
:::
```

This produces a captioned image without a number prefix. Unnumbered figures do not participate in the numbering sequence — they don't consume a number or affect the count of subsequent figures.

You can combine `unnumbered` with an ID:

```bachmark
::: figure {#team-photo unnumbered}
![Team photo](team.jpg)

The BachMark core team at the 2025 offsite.
:::
```

An unnumbered figure with an ID can still be linked to via its anchor, but [cross-references](/guide/cross-references) cannot resolve it to a number — a warning is emitted if you try.

## Rich figure content

Figures aren't limited to images. Any block content can go inside a figure — code blocks, tables, block math, even multiple images:

### Code listing

````bachmark
::: figure {#listing-parser}
```rust
fn parse(input: &str) -> Result<Ast, Error> {
    let tokens = tokenize(input)?;
    let ast = build_tree(tokens)?;
    Ok(ast)
}
```

Core parsing function — tokenizes the input, then builds the AST.
:::
````

### Block math

```bachmark
::: figure {#gauss-integral}
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

The Gaussian integral, fundamental to probability theory and statistics.
:::
```

### Multiple images

```bachmark
::: figure {#comparison}
![Before](before.png)
![After](after.png)

Performance dashboard before and after the optimization. Left: original, right: optimized.
:::
```

How multiple images are laid out (side by side, stacked, grid) is a renderer decision. If you need explicit control over layout, use a [row](/guide/layout-blocks#layout-rows-side-by-side-content) inside the figure:

```bachmark
::: figure {#side-by-side}
:::: row
::: col
![Before](before.png)
:::
::: col
![After](after.png)
:::
::::

Side-by-side comparison of the dashboard.
:::
```

Note the increased colon count — the `::::row` must use more colons than the `:::col` children, and the outer `:::figure` uses the same count as the cols since it's not nesting inside them. If this gets confusing, a simpler structure with two separate figures may be clearer.

## Figures vs. plain media embeds

| Feature              | `![]()` media embed | `:::figure` |
| -------------------- | ------------------- | ----------- |
| Displays the content | ✅                  | ✅          |
| Caption              | ❌                  | ✅          |
| Auto-numbered        | ❌                  | ✅          |
| Referenceable by ID  | ❌                  | ✅          |
| Block-level wrapper  | ❌                  | ✅          |
| Supports any content | Media only          | Any blocks  |

Use plain `![]()` for inline images that don't need captions or numbering — icons, decorative images, quick screenshots. Use `:::figure` when the content is a meaningful part of the document that readers may need to reference.

## Figures in PDF output

Figures are particularly important for PDF and paged output. Renderers should:

- Display figures where they appear in the source. The author controls the document's structure — if a figure is placed between two paragraphs, it stays between those paragraphs.
- Add "Figure X" labels to the caption automatically (unless the figure is `unnumbered`).
- Include figures in a List of Figures (if the renderer supports it).

If a figure is too large to fit on the current page, the renderer may push it to the next page and continue with the following text. But the figure's position in the reading order must match its position in the source — renderers should not float figures to the top or bottom of unrelated pages.

## Parsing rules

- A figure is a `:::figure` container block. It follows the same nesting rules as other [container blocks](/guide/layout-blocks#container-nesting).
- The optional `{#id}` and/or `{unnumbered}` attributes must appear on the same line as `:::figure`, separated by spaces. They can appear in any order: `:::figure {#my-id unnumbered}` and `:::figure {unnumbered #my-id}` are equivalent.
- The caption is identified as the last paragraph directly inside the figure container. If the last block inside the figure is not a paragraph (e.g. it's a code block or an image with no trailing text), the figure has no caption.
- Numbered figures are counted sequentially in document order, starting from 1. Only figures inside `:::figure` containers participate in numbering — plain `![]()` embeds do not. Figures marked `unnumbered` are excluded from the count.
- Figures cannot be nested inside other figures. If a `:::figure` appears inside another `:::figure`, a warning is emitted and the inner figure is treated as a generic container.
