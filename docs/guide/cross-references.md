# Cross-References

Cross-references let you refer to numbered elements — figures, tables, headings, and equations — by their ID rather than a hard-coded number. When you rearrange content, the references update automatically.

## Basic syntax

A cross-reference is written as `{@type:id}`:

```bachmark
See {@fig:arch-diagram} for the full architecture.

The results are summarized in {@tbl:benchmarks}.

As described in {@sec:installation}, the setup is straightforward.
```

The renderer resolves each reference to the element's number and renders it as a clickable link. For example, `{@fig:arch-diagram}` might render as "Figure 3" — linked to the figure with ID `arch-diagram`.

## Reference types

Each reference type has a prefix that tells the renderer what kind of element to look for:

| Prefix  | Targets               | Typical output |
| ------- | --------------------- | -------------- |
| `@fig:` | Figures (`:::figure`) | "Figure 1"     |
| `@tbl:` | Tables                | "Table 2"      |
| `@sec:` | Headings (sections)   | "Section 3.1"  |
| `@eq:`  | Block math equations  | "Equation 4"   |

The output label text ("Figure", "Table", "Section", "Equation") is determined by the renderer. Localized renderers would use the appropriate translation.

## Referencing figures

Figures are the most common cross-reference target. Assign an ID to a figure, then reference it:

```bachmark
::: figure {#er-diagram}
![Entity-relationship diagram](er.png)

Database schema for the user management module.
:::

The relationships between entities are shown in {@fig:er-diagram}.
```

→ Renders as: "The relationships between entities are shown in Figure 1."

The reference is a clickable link — clicking it scrolls to (or navigates to) the figure.

Only numbered figures can be cross-referenced. Referencing an `unnumbered` figure emits a warning, since there is no number to display.

## Referencing tables

Tables need an ID to be referenceable. Add a `@table-id` directive directly below the table (following the same attachment rules as [`@table-style`](/guide/table-style)):

```bachmark
| Endpoint     | Latency | Throughput |
| ------------ | ------- | ---------- |
| `/users`     | 12ms    | 850 rps    |
| `/search`    | 45ms    | 320 rps    |

@table-id {#benchmarks}
```

Tables with an `@table-id` are automatically numbered. Tables without one are not numbered and cannot be cross-referenced.

When both `@table-id` and `@table-style` are present, they can appear in any order below the table:

```bachmark
| A   | B   |
| --- | --- |
| 1   | 2   |

@table-id {#my-table}
@table-style {
  :A { align: right }
}
```

Reference it from elsewhere:

```bachmark
The performance metrics are listed in {@tbl:benchmarks}.
```

→ Renders as: "The performance metrics are listed in Table 1."

### Table captions

Adding a `@table-id` enables a caption. Place the caption text after the ID:

```bachmark
| Method | Time  |
| ------ | ----- |
| GET    | 12ms  |
| POST   | 18ms  |

@table-id {#api-latency} API endpoint response times under standard load.
```

The caption text supports inline formatting — emphasis, links, code, math, and badges all work. The renderer displays the caption near the table (typically above or below), prefixed with the table's number (e.g. "Table 1: API endpoint response times under standard load.").

### Unnumbered tables with captions

If you want a caption but no number, use `unnumbered`:

```bachmark
| Key   | Value |
| ----- | ----- |
| name  | Erik  |

@table-id {unnumbered} Example configuration values.
```

This produces a captioned table without a "Table X:" prefix. Like unnumbered figures, these don't participate in the numbering sequence and cannot be cross-referenced by number.

## Referencing headings

Headings are referenceable by their [custom ID](/guide/headings#custom-heading-ids) or auto-generated ID:

```bachmark
## Installation {#install}

...

##n API Design

...

As described in {@sec:install}, you need Node.js 18 or later.

The design decisions are explained in {@sec:api-design}.
```

For numbered headings (`#n`), the reference resolves to the section number — `{@sec:install}` might render as "Section 2.1". For regular (unnumbered) headings, the renderer falls back to the heading text — `{@sec:install}` might render as "Installation".

Both custom IDs (`{#install}`) and auto-generated IDs (`api-design` from "API Design") work as reference targets.

## Referencing equations

Block math equations can be assigned an ID using `{#id}` after the closing `$$`:

```bachmark
$$
E = mc^2
$$ {#mass-energy}

Einstein's mass-energy equivalence ({@eq:mass-energy}) is fundamental to modern physics.
```

→ Renders as: "Einstein's mass-energy equivalence (Equation 1) is fundamental to modern physics."

Equations with an ID are automatically numbered. The renderer typically displays the number in parentheses to the right of the equation, following mathematical convention: "(1)", "(2)", etc.

Equations without an `{#id}` are not numbered and cannot be cross-referenced.

### Inline math

Inline math (`$...$`) cannot be assigned an ID or cross-referenced. If you need a numbered, referenceable equation, use block math.

## Reference output format

The renderer controls how cross-references are displayed. Typical formats:

| Reference           | Possible output |
| ------------------- | --------------- |
| `{@fig:diagram}`    | "Figure 3"      |
| `{@tbl:results}`    | "Table 1"       |
| `{@sec:install}`    | "Section 2.1"   |
| `{@eq:mass-energy}` | "Equation 4"    |

Some renderers may offer a "compact" format using abbreviations ("Fig. 3", "Tbl. 1", "Sec. 2.1", "Eq. 4"). The format is a renderer setting, not something the author controls per-reference.

## Broken references

If a cross-reference targets an ID that doesn't exist, the reference text is rendered as-is (e.g. `{@fig:missing}` appears literally as "{@fig:missing}" in the output) and a warning is emitted.

This makes broken references visible to both authors (via warnings) and readers (via the unresolved text), so they're easy to find and fix.

## Cross-references in context

Cross-references work wherever inline content is allowed:

```bachmark
::: tip
For setup instructions, see {@sec:install}. The benchmark
data is available in {@tbl:benchmarks} and visualized
in {@fig:perf-chart}.
:::

| Topic           | Reference          |
| --------------- | ------------------ |
| Architecture    | {@fig:arch}        |
| Performance     | {@tbl:benchmarks}  |
| Setup           | {@sec:install}     |
```

## Linking with custom text

Cross-references always produce auto-generated text ("Figure 1", "Table 2"). When you want custom display text instead, use a regular link targeting the element's ID:

```bachmark
::: figure {#perf-chart}
![Performance over time](perf.png)

Monthly response times for the past year.
:::

<!-- Auto-numbered: -->
The trend is visible in {@fig:perf-chart}.
→ "The trend is visible in Figure 1."

<!-- Custom text: -->
The trend is visible in [the performance chart](#perf-chart).
→ "The trend is visible in the performance chart."
```

This works for every element that has an ID — figures, tables, equations, and headings:

```bachmark
| Method | Latency |
| ------ | ------- |
| GET    | 12ms    |

@table-id {#api-latency} API response times.

As you can see in [the latency table](#api-latency), GET requests are fast.

Refer to [the setup section](#install) for instructions.
```

Every `{#id}` — whether on a figure, table, equation, or heading — creates an anchor that regular links can target. Use `{@type:id}` when you want the number to stay in sync automatically. Use `[text](#id)` when you want to choose the words yourself.

## Cross-references vs. links

Regular links and cross-references serve different purposes:

| Feature          | `[text](#id)` link       | `{@type:id}` cross-reference                  |
| ---------------- | ------------------------ | --------------------------------------------- |
| Display text     | You write it             | Auto-generated from the number                |
| Stays up to date | You maintain it manually | Updates automatically                         |
| Targets          | Any element with an ID   | Numbered figures, tables, headings, equations |
| Best for         | "See the feature table"  | "See Table 3"                                 |

Both produce clickable links to the same target. Choose based on whether you want auto-numbered text or custom wording.

## Parsing rules

- A cross-reference starts with `{@` followed by a type prefix (`fig:`, `tbl:`, `sec:`, `eq:`), then the target ID, and ends with `}`.
- The ID can contain letters, numbers, hyphens, and underscores.
- Cross-references cannot span multiple lines. The opening `{@` and closing `}` must be on the same line.
- Unrecognized type prefixes are treated as broken references with a warning.
- Cross-references are resolved after the full document is parsed, since the target may appear before or after the reference.
- Cross-references inside fenced code blocks and inline code spans are not processed — the text is preserved literally.
