# Bibliography & Citations

Citations let you reference sources — books, papers, websites, specifications — without interrupting the flow of your writing. BachMark collects all cited sources and produces a formatted bibliography at the end of the document.

## Basic syntax

Define a source with `[@key]:` and cite it in text with `[@key]`:

```bachmark
BachMark builds on the CommonMark specification[@commonmark].

[@commonmark]: CommonMark Spec, John MacFarlane et al., 2024, https://spec.commonmark.org/
```

→ Renders as: "BachMark builds on the CommonMark specification [1]."

The renderer replaces `[@commonmark]` with a number (or other label format, depending on the renderer) and adds the full source to the bibliography section at the end of the document.

## Defining sources

Source definitions use the `[@key]:` syntax, followed by the source information:

```bachmark
[@commonmark]: CommonMark Spec, John MacFarlane et al., 2024, https://spec.commonmark.org/
[@rest]: Fielding, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. 2000.
[@mdn-fetch]: MDN Web Docs, Fetch API, https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
```

The text after `[@key]:` is the source description — it's treated as inline content, so emphasis, links, and inline code all work:

```bachmark
[@bach-repo]: *BachMark* source repository, [GitHub](https://github.com/bachmark-lang/bachmark), 2025.
```

### Source definition placement

Source definitions can appear anywhere in the document, just like [footnote definitions](/guide/basics#footnotes). They are not rendered where they appear — the renderer collects them into the bibliography.

A common convention is to place all source definitions at the bottom of the document under a heading:

```bachmark
# My Document

Content with citations[@source-a] and more citations[@source-b].

## References

[@source-a]: First source description.
[@source-b]: Second source description.
```

The "References" heading is just a regular heading — BachMark doesn't treat it specially. The heading is optional but recommended for readability of the source file.

## Citing sources

### Single citation

Place `[@key]` at the point where the citation should appear:

```bachmark
The REST architectural style[@rest] defines a set of constraints for web services.
```

→ Renders as: "The REST architectural style [1] defines a set of constraints for web services."

### Multiple citations

Cite several sources at once by separating keys with `;`:

```bachmark
Several documentation tools[@vitepress; @docusaurus; @gitbook] take this approach.
```

→ Renders as: "Several documentation tools [1, 2, 3] take this approach."

The renderer decides how to format multiple citations — typically as a comma-separated list inside a single bracket pair.

### Citation with context

Add a note after the key to provide context like page numbers or chapters:

```bachmark
As Fielding describes[@rest, Chapter 5], the uniform interface simplifies architecture.

The spec defines this behavior[@commonmark, Section 6.3] explicitly.
```

→ Renders as: "As Fielding describes [1, Chapter 5], the uniform interface simplifies architecture."

The context text appears alongside the citation number. A comma separates the key from the context.

### Citation at the start of a sentence

When a citation appears at the start of a sentence, you may want the author name rather than just a number. This is a renderer concern — some renderers offer a "narrative" citation style. BachMark's syntax is the same regardless:

```bachmark
[@rest] introduced the concept of stateless communication.
```

How this renders (as "[1] introduced..." or "Fielding [1] introduced..." or "Fielding (2000) introduced...") depends on the renderer and its configured citation style.

## The bibliography

The renderer automatically generates a bibliography section containing all cited sources, in the order they were first referenced. Sources that are defined but never cited are excluded from the bibliography.

The bibliography is placed at the end of the document, after all content. The renderer may add a heading (e.g. "References" or "Bibliography") automatically, or rely on the author to provide one.

### Bibliography formatting

How each source is displayed in the bibliography is a renderer decision. A minimal renderer might just output the source text as-is. A more sophisticated renderer could parse structured fields and apply a citation style (APA, IEEE, Chicago, etc.).

BachMark defines the content and association (which key maps to which source text). The renderer defines the presentation.

## Citations vs. footnotes

Citations and [footnotes](/guide/basics#footnotes) are separate systems that serve different purposes:

| Feature     | Footnotes (`[^label]`)              | Citations (`[@key]`)                     |
| ----------- | ----------------------------------- | ---------------------------------------- |
| Purpose     | Side comments, tangential info      | Attributing sources                      |
| Reuse       | Each reference creates a new marker | Same source can be cited many times      |
| Output      | Numbered footnotes at page/doc end  | Numbered bibliography at document end    |
| Definitions | `[^label]: content`                 | `[@key]: source description`             |
| Duplicates  | Each `[^label]` gets its own number | Repeated `[@key]` reuses the same number |

The key difference: citing `[@rest]` five times throughout a document always refers to the same bibliography entry with the same number. Referencing `[^1]` is a single footnote at a single point — you can't reuse it at multiple locations.

Both can coexist in the same document:

```bachmark
The REST architectural style[@rest] emphasizes stateless communication[^1].

[^1]: Statelessness means each request contains all information needed to process it.
[@rest]: Fielding, Roy Thomas. Architectural Styles and the Design of Network-based Software Architectures. 2000.
```

→ The footnote and citation are numbered independently: the citation might be "[1]" in the bibliography while the footnote is "1" in the footnote section. Renderers should make the two visually distinguishable to avoid confusion.

## Citations in context

Citations work wherever inline content is allowed — paragraphs, list items, table cells, callouts, figure captions:

```bachmark
| Approach    | Source                |
| ----------- | --------------------- |
| REST        | [@rest]               |
| GraphQL     | [@graphql]            |

::: tip
The CommonMark specification[@commonmark] covers the baseline syntax in detail.
:::

::: figure {#comparison}
![Benchmark results](bench.png)

Performance comparison based on data from [@bench-paper].
:::
```

## Parsing rules

- A citation reference starts with `[@` and ends with `]`. It must be on a single line.
- The key can contain letters, numbers, hyphens, and underscores. Keys are case-sensitive — `[@Rest]` and `[@rest]` are different citations.
- Multiple keys are separated by `;` with optional whitespace: `[@a; @b; @c]`.
- Context text follows the key after a comma: `[@key, context]`. The context is plain inline text.
- A source definition starts with `[@key]:` at the beginning of a line (ignoring leading whitespace), followed by the source text. The definition continues on subsequent indented lines, following the same continuation rules as [footnotes](/guide/basics#footnotes).
- If a citation references a key with no matching definition, the citation text is rendered as-is and a warning is emitted.
- If a source is defined but never cited, it is excluded from the bibliography — no warning is emitted.
- Citations inside fenced code blocks and inline code spans are not processed.

## Rendering behavior

| Output | Behavior                                                                                                                                       |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| HTML   | Citations render as links to the corresponding bibliography entry. The bibliography is rendered as an ordered list at the end of the document. |
| PDF    | Citations render as numbered references. The bibliography appears as a formatted section at the end of the document.                           |
