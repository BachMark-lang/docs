# Headings & Structure

BachMark keeps the familiar `#` heading syntax from CommonMark and extends it with auto-numbered sections and custom heading IDs.

## Standard headings

ATX-style headings work exactly like CommonMark:

```bachmark
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

Setext-style headings (underlined with `===` or `---`) are also supported for levels 1 and 2, but ATX-style is recommended for clarity.

## Numbered headings

Add an `n` directly after the hash marks to make a heading automatically numbered:

```bachmark
#n Introduction
##n Scope
##n Syntax
#n Appendix
##n Notes
```

A renderer displays this as:

> **1 Introduction**
> 1.1 Scope
> 1.2 Syntax
> **2 Appendix**
> 2.1 Notes

The numbering is hierarchical and automatic. Authors never assign numbers manually — rearranging sections doesn't require renumbering.

### Syntax rules

The `n` is placed **immediately after the hashes**, before the space:

| Example         | Valid? | Result                                 |
| --------------- | ------ | -------------------------------------- |
| `#n Title`      | ✅     | Level 1, numbered                      |
| `##n Title`     | ✅     | Level 2, numbered                      |
| `######n Title` | ✅     | Level 6, numbered                      |
| `##n`           | ✅     | Level 2, numbered, empty title         |
| `##nTitle`      | ❌     | **Not a heading** — no space after `n` |

The critical rule: after the `n`, there must be a space, tab, or end of line. This prevents collisions with hashtag-like text.

Closing hashes are supported, following CommonMark ATX behavior:

```bachmark
##n Title ###
```

→ Title is `Title` (trailing hashes are stripped).

### Numbering behavior

Only `#n` headings participate in the numbering counter. Regular `#` headings are invisible to the numbering system — they don't reset or advance any counters.

```bachmark
#n Chapter One
## A regular heading (no number)
##n First section
##n Second section
```

→ Renders as:

> **1 Chapter One**
> A regular heading
> 1.1 First section
> 1.2 Second section

The numbering scheme (1.1, 1.2 vs. I, II, III vs. other formats) is determined by the renderer, not the author.

### When to use it

Auto-numbered headings are useful for formal or structured documents: specifications, technical reports, academic-style content, or any document where readers need to reference sections by number.

For guides, blog posts, or informal docs, plain headings are usually better.

## Level skipping and warnings

BachMark takes a "warn, don't fail" approach to heading structure. Unusual patterns produce warnings but are still parsed.

### Skipping levels downward

If the previous numbered heading was level `p` and the new one is level `k` where `k > p + 1`, a warning is emitted:

```bachmark
#n A
###n C
##n B
```

→ Result:

| Heading  | Number | Warning?               |
| -------- | ------ | ---------------------- |
| `#n A`   | 1      | —                      |
| `###n C` | 1.1.1  | ⚠️ Level 2 was skipped |
| `##n B`  | 1.2    | —                      |

### Document not starting at level 1

If the first numbered heading isn't level 1, a warning is emitted:

```bachmark
###n Start
```

→ `Start` gets number `1.1.1`, with a warning that parent levels 1 and 2 were not present.

### Too many hashes

More than six `#` marks is **not a heading** — it's treated as regular text.

## Heading IDs

Renderers generate anchor IDs from heading text for deep linking. The default convention is a GitHub-style slug: lowercase, spaces replaced with hyphens, special characters stripped.

```bachmark
##n My Section Title
```

→ Anchor: `#my-section-title`

You can then link to it:

```bachmark
See [My Section Title](#my-section-title) for details.
```

Section numbers are not included in the auto-generated ID. This keeps links stable — rearranging sections doesn't break anchors. Duplicate heading texts get a suffix: `-2`, `-3`, etc.

### Custom heading IDs

To override the auto-generated ID, add `{#your-id}` at the end of the heading:

```bachmark
## My Section Title {#my-section}
##n Installation Guide {#install}
```

→ Anchors: `#my-section` and `#install` instead of the auto-generated slugs.

The `{#...}` attribute is stripped from the heading text — it doesn't appear in the rendered output.

### When to use custom IDs

Custom IDs are useful when you want anchors that stay stable even if you reword the heading. With auto-generated IDs, renaming "Installation Guide" to "Setup Instructions" would break existing links to `#installation-guide`. A custom ID like `{#install}` survives the rename.

They're also useful for shorter, cleaner anchors — `{#install}` is easier to type and share than `#installation-guide`.

### Custom ID rules

- The `{#...}` must appear at the **end** of the heading line, after the heading text (and before any closing hashes).
- The ID can contain letters, numbers, hyphens, and underscores.
- If a custom ID conflicts with an auto-generated ID from another heading, the custom ID takes priority and the other heading's ID gets a suffix.

```bachmark
## Setup {#install}
##n Installation Guide
```

→ `## Setup` gets `#install` (custom), `##n Installation Guide` gets `#installation-guide` (auto-generated, no conflict).

### Custom IDs with numbered headings and closing hashes

Custom IDs work with all heading variants:

| Example                  | ID       |
| ------------------------ | -------- |
| `## Title {#my-id}`      | `#my-id` |
| `##n Title {#my-id}`     | `#my-id` |
| `## Title {#my-id} ##`   | `#my-id` |
| `##n Title {#my-id} ###` | `#my-id` |

When both closing hashes and a custom ID are present, the ID attribute must come before the closing hashes.

## Best practices

- **Start at `#` (level 1)** for the document title or top-level section.
- **Don't skip levels.** Going from `##` to `####` without `###` works but produces warnings and confuses readers.
- **Use `#n` consistently** within a document — mixing numbered and unnumbered headings at the same level is valid but can be disorienting.
- **Use custom IDs for headings you link to frequently.** This keeps links stable if you reword the heading later.
- **Let the renderer handle numbering format.** Don't try to bake a specific numbering style into your heading text.
