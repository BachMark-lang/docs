# BachMark Docs

The official documentation for [BachMark](https://github.com/BachMark-lang) — a CommonMark-inspired markup language built for technical documentation with first-class HTML & PDF output.

Built with [VitePress](https://vitepress.dev/) and deployed to GitHub Pages.

## Local development

Prerequisites: [Node.js](https://nodejs.org/) (v24+) and [pnpm](https://pnpm.io/) (v10+).

```bash
pnpm install
pnpm docs:dev
```

The dev server starts at `http://localhost:5173` with hot reload.

### Build & preview

```bash
pnpm docs:build
pnpm docs:preview
```

## Deployment

Pushes to `master` automatically build and deploy to GitHub Pages via the included [workflow](.github/workflows/deploy.yaml).

## Project structure

```
docs/
├── .vitepress/
│   └── config.mts          # VitePress site configuration
└── guide/
    ├── getting-started.md   # Quick start & syntax overview
    ├── why-bachmark.md      # Motivation & design principles
    ├── basics.md            # Core syntax reference
    ├── frontmatter.md       # Metadata, variables, ToC config
    ├── headings.md          # Auto-numbering & custom IDs
    ├── tables.md            # Pipe tables
    ├── table-style.md       # Table presentation hints
    ├── code-blocks.md       # Annotations, highlighting, diffs
    ├── layout-blocks.md     # Callouts, tabs, code groups, rows
    ├── figures.md           # Captioned & numbered figures
    ├── cross-references.md  # Refs to figures, tables, headings, equations
    ├── file-includes.md     # Multi-file document composition
    ├── bibliography.md      # Citations & auto-generated bibliography
    ├── badges.md            # Inline status indicators
    ├── keyboard-keys.md     # Styled key caps
    ├── emoji-shortcodes.md  # :rocket: → 🚀
    ├── colored-text.md      # Inline colored text
    ├── page-breaks.md       # PDF/print pagination control
    └── roadmap.md           # Planned phases & progress
```

## Contributing

Found a typo, unclear wording, or missing example? Contributions are welcome — every page has an "Edit this page on GitHub" link at the bottom.

For larger changes (new pages, structural reorganization), please open an issue first to discuss.

## License

[MIT](LICENSE)