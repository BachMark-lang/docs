# Emoji Shortcodes

BachMark supports emoji shortcodes — short text identifiers wrapped in colons that resolve to emoji characters. If you've used GitHub, Slack, or Discord, this syntax will feel familiar.

## Basic syntax

Wrap a shortcode in colons:

```bachmark
This feature is great :rocket:

BachMark supports :thumbsup: and :thumbsdown: reactions.

:warning: Be careful with this setting.
```

→ Renders as: This feature is great 🚀

The shortcode is replaced with the corresponding Unicode emoji character. The colon syntax is removed from the output — it's purely a source-level convenience.

## Shortcode names

BachMark uses the standard emoji shortcode set used by GitHub. A few common examples:

| Shortcode            | Emoji | Description        |
| -------------------- | ----- | ------------------ |
| `:smile:`            | 😄    | Smiling face       |
| `:thumbsup:`         | 👍    | Thumbs up          |
| `:thumbsdown:`       | 👎    | Thumbs down        |
| `:rocket:`           | 🚀    | Rocket             |
| `:warning:`          | ⚠️    | Warning sign       |
| `:white_check_mark:` | ✅    | Check mark         |
| `:x:`                | ❌    | Cross mark         |
| `:bulb:`             | 💡    | Light bulb         |
| `:memo:`             | 📝    | Memo               |
| `:fire:`             | 🔥    | Fire               |
| `:star:`             | ⭐    | Star               |
| `:heart:`            | ❤️    | Red heart          |
| `:construction:`     | 🚧    | Under construction |
| `:tada:`             | 🎉    | Party popper       |
| `:lock:`             | 🔒    | Lock               |
| `:key:`              | 🔑    | Key                |
| `:bug:`              | 🐛    | Bug                |
| `:gear:`             | ⚙️    | Gear               |
| `:clipboard:`        | 📋    | Clipboard          |
| `:link:`             | 🔗    | Link               |

This is a small sample. The full list follows the [GitHub emoji shortcode set](https://github.com/ikatyang/emoji-cheat-sheet), which covers thousands of emoji.

## Where shortcodes work

Emoji shortcodes are inline content and work anywhere inline content is allowed — paragraphs, headings, list items, table cells, callouts, and badges:

```bachmark
## :rocket: Getting Started

- :white_check_mark: Parser complete
- :construction: Renderer in progress
- :x: Spec not started

| Feature     | Status                  |
| ----------- | ----------------------- |
| Parsing     | :white_check_mark: Done |
| Rendering   | :construction: WIP      |

::: tip :bulb: Pro tip
You can use emoji in callout titles too.
:::
```

## Shortcodes vs. Unicode emoji

You can always use Unicode emoji characters directly in your BachMark source:

```bachmark
This works too: 🚀 🎉 ✅
```

Shortcodes are a convenience — they're easier to type, easier to read in source, and don't require an emoji picker. Both approaches produce the same output. Use whichever you prefer.

## Literal colons

Shortcodes are only recognized when the text between colons matches a known emoji name. Colons in normal text are not affected:

```bachmark
The time is 12:30.          <!-- not a shortcode — "30" is not an emoji -->
See section 3:results.      <!-- not a shortcode — "results" is not an emoji -->
Mix ratio is 1:1.           <!-- not a shortcode -->
```

If you need a literal colon pair around a word that happens to match an emoji name, escape one of the colons:

```bachmark
The symbol is called \:star: in the codebase.
```

→ Renders as: The symbol is called \:star: in the codebase.

## Shortcodes inside code

Emoji shortcodes are **not** processed inside fenced code blocks or inline code spans — the text is preserved literally:

````bachmark
```
:rocket: stays as text in code blocks.
```
````

```bachmark
The syntax is `:rocket:` with colons on both sides.
```

In both cases, the `:rocket:` text appears as-is in the output.

## Parsing rules

- A shortcode starts with `:` followed by one or more lowercase letters, digits, underscores, or hyphens (`-`), and ends with `:`.
- No spaces are allowed inside the colons. `: rocket :` is not a shortcode.
- The text between colons is matched against the known emoji set. If no match is found, the text is left as-is (colons included) — no warning is emitted, since false positives from normal colon usage would be noisy.
- Shortcodes are resolved during inline parsing, after code spans are identified but before other inline formatting is applied.

## Rendering behavior

| Output | Behavior                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------- |
| HTML   | Replaced with the Unicode emoji character. The renderer may wrap it in a `<span>` for consistent sizing. |
| PDF    | Replaced with the Unicode emoji character. The renderer uses an emoji-capable font for display.          |
