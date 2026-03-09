# Code Blocks

BachMark supports fenced code blocks with a language identifier, just like CommonMark, and adds an annotation system for technical documentation — controlled through curly braces (`{}`) after the language identifier.

## Basic fenced code blocks

Use three or more backticks with an optional language identifier:

````bachmark
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
}
```
````

The language identifier is used by renderers for syntax highlighting. BachMark itself doesn't validate or interpret the code content.

Tildes (`~~~`) also work as fences.

### Indented code blocks

Lines indented by 4 spaces (or 1 tab) are treated as code blocks, for CommonMark compatibility. Fenced blocks are preferred — they support language identifiers and work with all the annotation features below.

## The annotation system

All code block annotations live in curly braces after the language identifier. This keeps the code content clean — no magic comments, no language-dependent markers.

````bachmark
```language {annotations}
code here
```
````

Annotations can be freely combined. Order doesn't matter.

## Line highlighting

Highlight specific lines to draw the reader's attention:

````bachmark
```javascript {2}
function greet(name) {
  console.log(`Hello, ${name}!`);  // ← highlighted
}
```
````

### Ranges and multiple lines

Specify individual lines, ranges, or a combination:

````bachmark
```javascript {1,3-4}
function greet(name) {       // ← highlighted
  const msg = `Hello!`;
  console.log(msg);          // ← highlighted
  return msg;                // ← highlighted
}
```
````

| Syntax      | Meaning             |
| ----------- | ------------------- |
| `{4}`       | Line 4 only         |
| `{1,4}`     | Lines 1 and 4       |
| `{1-3}`     | Lines 1 through 3   |
| `{1,3-5,8}` | Lines 1, 3–5, and 8 |

## Focus

Focus dims all lines _except_ the specified ones — useful for drawing attention to a specific part while keeping surrounding context visible:

````bachmark
```javascript {focus=2-3}
function processOrder(order) {
  const total = order.items.reduce((sum, i) => sum + i.price, 0);
  const tax = total * 0.19;
  return { total, tax, final: total + tax };
}
```
````

Lines 2–3 are fully visible; lines 1, 4, and 5 are dimmed.

## Colored diffs

Mark lines as additions or removals using `add` and `remove`:

````bachmark
```javascript {remove=2 add=3}
function greet(name) {
  console.log("old greeting");
  console.log(`Hello, ${name}!`);
}
```
````

`remove` lines get a red/removed style, `add` lines get a green/added style. The exact visual treatment is up to the renderer.

The line range syntax is the same as for highlighting — individual lines, ranges, and combinations all work:

````bachmark
```css {remove=2-3 add=4-6}
.button {
  background: red;
  color: white;
  background: blue;
  color: white;
  border-radius: 4px;
}
```
````

::: tip
For showing a complete before/after transformation, two code blocks in a [code group](/guide/layout-blocks#code-groups) is often clearer than diff annotations on a single block.
:::

## Error and warning annotations

Mark specific lines with error or warning indicators:

````bachmark
```javascript {error=3}
function divide(a, b) {
  // No zero check!
  return a / b;
}
```
````

````bachmark
```javascript {warning=1}
const data = fetchSync("/api/users");
processData(data);
```
````

`error` lines get an error indicator (typically a red underline or background), `warning` lines get a warning indicator (typically yellow). These are visual annotations for documentation — they mark lines the reader should pay attention to.

## Line numbers

Enable line numbers with the `lines` attribute:

````bachmark
```javascript {lines}
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}
```
````

Specify a custom starting line number:

````bachmark
```javascript {lines=15}
// Displayed starting at line 15
function existingFunction() {
  return true;
}
```
````

## File imports

Import code from external files instead of inlining it. Use an empty code fence with a `file` attribute:

````bachmark
```javascript {file=./src/utils/helpers.js}
```
````

The file path is relative to the current document. The language can be inferred from the file extension or explicitly set via the language identifier.

### Importing specific lines

Import a range of lines from a file:

````bachmark
```javascript {file=./src/utils/helpers.js lines=3-10}
```
````

This imports only lines 3 through 10 from the file.

### With explicit language

If the file extension doesn't match the desired highlighting:

````bachmark
```ini {file=./config/settings.conf}
```
````

### Combining with other annotations

All annotation features work with file imports:

````bachmark
```javascript {file=./src/utils/helpers.js lines=3-10 5-6 focus=5-6}
```
````

→ Imports lines 3–10, highlights lines 5–6 (relative to the imported range), and focuses on those same lines.

## Combining annotations

Multiple annotations can be used together on the same code block:

````bachmark
```typescript {lines 3-4 focus=3-4}
interface User {
  id: string;
  name: string;     // focused + highlighted
  email: string;    // focused + highlighted
  role: "admin" | "user";
}
```
````

When annotations overlap (e.g., a line is both highlighted and marked as an error), the renderer decides how to combine the visual indicators.

### Full annotation reference

| Annotation   | Syntax                           | Purpose                            |
| ------------ | -------------------------------- | ---------------------------------- |
| Highlight    | `{2}` or `{1,3-5}`               | Highlight specific lines           |
| Focus        | `{focus=2-3}`                    | Dim everything except these lines  |
| Add          | `{add=3}` or `{add=2-4}`         | Mark lines as additions (green)    |
| Remove       | `{remove=2}` or `{remove=1-3}`   | Mark lines as removals (red)       |
| Error        | `{error=5}` or `{error=3-4}`     | Mark lines with error indicator    |
| Warning      | `{warning=1}` or `{warning=2-3}` | Mark lines with warning indicator  |
| Line numbers | `{lines}` or `{lines=15}`        | Show line numbers (optional start) |
| File import  | `{file=./path/to/file.js}`       | Import code from external file     |

All annotations use the same line range syntax and can be freely combined.
