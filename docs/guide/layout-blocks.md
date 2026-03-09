# Layout Blocks

BachMark includes built-in containers for common documentation patterns: callouts, code groups, tabs, collapsible sections, and side-by-side layouts. These are part of the language, not plugins or renderer-specific extensions.

## Callouts (Alerts)

Callouts are visually distinct blocks used to draw attention to important information. They use a container syntax with triple colons (`:::`):

```bachmark
::: info
This is an informational callout.
:::

::: tip
Helpful advice for the reader.
:::

::: important
Key information the reader must not miss.
:::

::: warning
Something the reader should be careful about.
:::

::: caution
Irreversible action — data loss, breaking changes, or similar.
:::

::: danger
Critical safety warning — something will break or cause harm.
:::
```

### Available types

| Type        | Purpose                                          |
| ----------- | ------------------------------------------------ |
| `info`      | General information, context, or background      |
| `tip`       | Helpful advice, best practices, shortcuts        |
| `important` | Key information that must not be overlooked      |
| `warning`   | Potential issues, things to watch out for        |
| `caution`   | Irreversible or destructive actions              |
| `danger`    | Critical safety warnings, things that will break |

::: tip GFM comparison
GitHub Flavored Markdown uses blockquote-based alerts (`> [!NOTE]`, `> [!TIP]`, etc.). BachMark's `:::` container syntax serves the same purpose but supports custom titles, rich nested content, and doesn't overload the blockquote syntax.
:::

### Custom titles

By default, the callout title matches its type (e.g., a `tip` block displays "Tip"). You can override it:

```bachmark
::: tip Pro tip
You can chain multiple operations in a single call.
:::

::: warning Deprecated since v2.0
This endpoint will be removed in the next major release.
:::
```

The custom title replaces the default label entirely.

### No title

To display a callout with its colored styling and icon but no title bar, add `{notitle}` after the type:

```bachmark
::: info {notitle}
This callout has the info styling but no title.
:::

::: warning {notitle}
A warning without a title bar — just the colored content block.
:::
```

The `{notitle}` attribute removes the title entirely — no default label, no custom label. The callout's visual style (color, icon, border) is still determined by its type.

`{notitle}` can be combined with `details` for a styled collapsible block without a title — though in practice, collapsible blocks usually need a title to be useful:

```bachmark
::: details tip {notitle}
Collapsible content with tip styling but no title.
:::
```

### Rich content inside callouts

Callouts can contain any block-level content — paragraphs, lists, code blocks, images, even nested callouts:

```bachmark
::: warning Deprecation notice
The `v1` API will be removed in the next major release.

**What you need to do:**

- Migrate to `v2` endpoints
- Update your authentication flow
- Test against the staging environment

\`\`\`diff
- GET /v1/users
+ GET /v2/users
\`\`\`

::: tip
The migration guide is available at [/docs/migrate](/docs/migrate).
:::
:::
```

When nesting callouts, the outer container must use more colons than the inner one:

```bachmark
:::: warning
Outer warning content.

::: tip
Nested tip inside the warning.
:::
::::
```

## Details (collapsible blocks)

For content that's useful but not essential to every reader, use a `details` block:

```bachmark
::: details Click to expand
This content is hidden by default and revealed when the reader clicks.

It supports full block-level content inside — lists, code blocks, images, etc.
:::
```

Renderers display this as a collapsible/expandable section (like HTML's `<details>`, but without requiring HTML).

You can combine details with callout types for styled collapsible blocks:

```bachmark
::: details tip Advanced configuration
If you need fine-grained control, you can override individual settings:

\`\`\`yaml
overrides:
  timeout: 30s
  retries: 3
\`\`\`
:::
```

## Code groups

Code groups display multiple code blocks as a tabbed interface — useful for showing the same concept in multiple languages or configurations:

````bachmark
:::: code-group
```javascript
const greeting = "Hello, world!";
console.log(greeting);
```

```python
greeting = "Hello, world!"
print(greeting)
```

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}
```
::::
````

Each fenced code block's language identifier becomes the tab label. The reader sees tabs like **javascript | python | go** and can switch between them.

### Custom tab labels

If the language identifier isn't a good label, you can provide a custom one in square brackets:

````bachmark
:::: code-group
```bash [npm]
npm install bachmark
```

```bash [pnpm]
pnpm add bachmark
```

```bash [yarn]
yarn add bachmark
```
::::
````

The text in `[brackets]` overrides the tab label while keeping the correct syntax highlighting.

### Code block features inside groups

All code block features (line highlighting, focus, diffs, line numbers) work inside code groups:

````bachmark
:::: code-group
```javascript {2} [ES Modules]
// Modern import
import { parse } from 'bachmark';
```

```javascript {2} [CommonJS]
// Legacy require
const { parse } = require('bachmark');
```
::::
````

## Tabs (generic)

For non-code tabbed content, use a `tabs` container:

```bachmark
:::: tabs
::: tab Overview
This is a general description of the feature.
:::

::: tab Configuration
Here's how to configure it:

- Set `enabled: true` in your config
- Restart the service
:::

::: tab Examples
\`\`\`json
{
  "key": "value"
}
\`\`\`
:::
::::
```

Each `::: tab Label` block becomes a tab. The label text is used as the tab's title. Tabs can contain any block-level content.

## Layout rows (side-by-side content)

A `row` container places its `col` children next to each other horizontally. This is useful for comparisons, before/after examples, or any content that benefits from a side-by-side layout.

```bachmark
:::: row
::: col
**Before**

The old API required three separate calls to fetch user data, preferences, and permissions.
:::

::: col
**After**

The new API returns everything in a single request.
:::
::::
```

### Columns with any content

Each column is a normal block container — anything you can write in a document works inside a column: paragraphs, lists, images, code blocks, callouts, etc.

````bachmark
:::: row
::: col
```javascript
const old = require('legacy-api');
old.init({ verbose: true });
```
:::

::: col
```javascript
import { create } from 'new-api';
create();
```
:::
::::
````

### More than two columns

Rows are not limited to two columns:

```bachmark
:::: row
::: col
**Step 1**

Clone the repository.
:::

::: col
**Step 2**

Install dependencies.
:::

::: col
**Step 3**

Run the dev server.
:::
::::
```

### Nesting rows

A `row` can be nested inside a `col` for more complex layouts. Increase the colon count for each nesting level:

```bachmark
:::::: row
::: col
Left column — simple content.
:::

::::: col
Right column with a nested row:

:::: row
::: col
Nested left.
:::

::: col
Nested right.
:::
::::
:::::
::::::
```

This works but gets verbose quickly. If you find yourself nesting rows more than one level deep, consider simplifying the document structure.

### Rendering behavior

- **HTML:** typically rendered as a flex or grid row. If the viewport is too narrow, the renderer may make columns stack vertically or become horizontally scrollable.
- **PDF / paged output:** columns are laid out next to each other within the page's content area.

The exact layout behavior is up to the renderer. BachMark defines the structure (row with columns); the renderer decides spacing, breakpoints, and overflow handling.

## Container nesting

Containers can be nested by increasing the number of colons:

| Colons   | Usage                                                        |
| -------- | ------------------------------------------------------------ |
| `:::`    | Callouts, details, tab items, columns (`col`)                |
| `::::`   | Code groups, tab containers, rows (`row`), or wrapping `:::` |
| `:::::`  | Wrapping `::::` containers                                   |
| `::::::` | Wrapping `:::::` containers (rare)                           |

The rule: the outer container always uses more colons than any inner container. In practice, you rarely need more than two levels.
