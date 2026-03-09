# Roadmap

This page outlines what's planned for BachMark — the language, the tooling, and the ecosystem. Items are listed in rough priority order within each phase. No dates are attached — things ship when they're ready.

## Phase 1 — Language specification

The foundation. Everything else builds on a complete, unambiguous spec.

- :white_check_mark: Core syntax specification (CommonMark baseline + extensions)
- :white_check_mark: Frontmatter and inline variables
- :white_check_mark: Headings with auto-numbering and custom IDs
- :white_check_mark: Tables and table style
- :white_check_mark: Code blocks with annotation system
- :white_check_mark: Layout blocks (callouts, tabs, code groups, rows)
- :white_check_mark: Figures with captions and numbering
- :white_check_mark: Cross-references
- :white_check_mark: Bibliography and citations
- :white_check_mark: Badges with icons
- :white_check_mark: Keyboard keys, emoji shortcodes, colored text
- :white_check_mark: File includes
- :white_check_mark: Page breaks
- :construction: Formal specification document with conformance examples
- :construction: JSON AST schema definition

## Phase 2 — Rust core library

A Rust library that implements the full BachMark pipeline. Designed as separate crates for clean separation.

- Parser (`bm` → AST) — reads BachMark source files and produces the JSON AST
- HTML renderer (AST → HTML) — generates standalone HTML pages
- PDF renderer (AST → PDF) — generates PDF directly from the AST, not by printing HTML
- Shared AST types — the common data structures used across all crates

Each stage is independently usable. You can parse to AST and write your own renderer, or plug into the existing HTML/PDF pipelines.

## Phase 3 — CLI toolset

A single CLI binary (built from the Rust crates above) that handles the full workflow.

- `bachmark parse` — convert a `.bm` file to JSON AST
- `bachmark html` — render a `.bm` file to a standalone HTML page
- `bachmark pdf` — render a `.bm` file to PDF
- `bachmark fmt` — format/prettify BachMark source files (auto-align tables, normalize whitespace, consistent style)
- `bachmark check` — lint a document and report warnings (broken cross-references, missing files, heading level skips, etc.)

The CLI is the reference implementation of the BachMark specification.

## Phase 4 — Language Server Protocol (LSP)

An LSP server that editors can connect to for a rich authoring experience.

- Syntax diagnostics (warnings and errors as you type)
- Autocompletion for frontmatter keys, cross-reference IDs, emoji shortcodes, icon names, and citation keys
- Go-to-definition for cross-references, file includes, and footnotes
- Hover information (preview resolved variables, cross-reference targets, emoji)
- Document symbols (heading outline)
- Rename support for IDs (rename a figure ID and update all references)
- Code actions (quick fixes for common warnings)

## Phase 5 — Editor extensions

Editor integrations built on top of the LSP.

- **VSCode extension** — syntax highlighting, LSP integration, preview pane, snippet support
- **IntelliJ / JetBrains plugin** — syntax highlighting, LSP integration, editor inspections
- **Neovim / Vim** — Tree-sitter grammar, LSP client configuration
- Syntax highlighting grammars (TextMate / Tree-sitter) published separately for other editors

## Phase 6 — Documentation tool

A standalone documentation platform — BachMark's answer to GitBook, VitePress, and Docusaurus. Built for BachMark files as the authoring format.

- Site configuration (`bachmark.config.yaml`) — sidebar structure, navigation, theme settings, global metadata
- Multi-page documentation with automatic navigation and sidebar
- Full-text search
- Theming and customization
- Dev server with hot reload
- Static site generation (HTML output)
- PDF export (single-page and full-site)
- Versioned documentation

### Documentation tool — extended features

- OpenAPI / API documentation blocks — import an OpenAPI spec and reference endpoints within your docs
- Diagram support — Mermaid pass-through for flowcharts, sequence diagrams, and other diagram types
- Shared glossary — define terms once, get tooltips across all pages
- Custom named containers — define project-specific callout types with icons and colors via config
- Badge-based access control — restrict pages by badge (e.g., only show "internal" pages to certain audiences)
- Sidebar badge display — badges on headings are surfaced in the navigation sidebar

## Phase 7 — Advanced features

Features that extend BachMark beyond standard documentation tooling.

- Graph and coordinate system visualization — a native syntax for plotting functions and data, inspired by GeoGebra but designed for documents rather than interactive exploration
- Interactive playground — a web-based editor where you type BachMark and see rendered output live
- Migration from VitePress — the BachMark documentation itself moves from VitePress to the BachMark documentation tool

## Contributing

BachMark is an open project. If you're interested in contributing to any of these areas — especially the Rust implementation, editor extensions, or specification feedback — check the [GitHub organization](https://github.com/BachMark-lang) for repositories and issue trackers.
