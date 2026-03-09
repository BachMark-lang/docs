# Page Breaks

BachMark supports page breaks as a hint for paged media (PDF, printing).

```bachmark
@page-break
```

## When to use page breaks

Use `@page-break` when you want to start a new page in PDF output, control pagination for printed documents, or separate chapters in page-based formats.

Don't use page breaks for visual spacing on websites. Use headings or normal document structure instead.

## Rules

`@page-break` must appear alone on its line (ignoring leading/trailing whitespace). Surround it with blank lines so it clearly sits between blocks:

```bachmark
# Chapter 1

Text...

@page-break

# Chapter 2

More text...
```

`@page-break` is not allowed inside paragraphs or inline content. It can appear wherever a normal block can appear — between paragraphs, between headings, inside container blocks, etc.

## Rendering behavior

| Output        | Behavior             |
| ------------- | -------------------- |
| PDF / paged   | Forces a new page    |
| HTML (screen) | Ignored by default   |
| HTML (print)  | Creates a page break |
