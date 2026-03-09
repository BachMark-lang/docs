import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BachMark",
  description:
    "A CommonMark-inspired markup language for docs-first authoring with high-quality HTML and PDF output.",
  lastUpdated: true,
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    // Uncomment when German docs are ready:
    // de: {
    //   label: 'Deutsch',
    //   lang: 'de',
    //   link: '/de/',
    //   themeConfig: {
    //     nav: [
    //       { text: 'Anleitung', link: '/de/guide/getting-started' },
    //     ],
    //   },
    // },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    nav: [
      { text: "Guide", link: "/guide/getting-started" },
      { text: "Roadmap", link: "/guide/roadmap" },
      {
        text: "Links",
        items: [
          { text: "GitHub", link: "https://github.com/BachMark-lang" },
          { text: "Spec (coming soon)", link: "#" },
        ],
      },
    ],

    sidebar: {
      "/guide/": [
        {
          text: "Introduction",
          items: [
            { text: "Getting Started", link: "/guide/getting-started" },
            { text: "Why BachMark?", link: "/guide/why-bachmark" },
          ],
        },
        {
          text: "Syntax",
          items: [
            { text: "Basics", link: "/guide/basics" },
            { text: "Frontmatter", link: "/guide/frontmatter" },
            { text: "Headings & Structure", link: "/guide/headings" },
            { text: "Tables", link: "/guide/tables" },
            { text: "Table style", link: "/guide/table-style" },
            { text: "Code Blocks", link: "/guide/code-blocks" },
            { text: "Layout Blocks", link: "/guide/layout-blocks" },
            { text: "Badges", link: "/guide/badges" },
            { text: "Keyboard keys", link: "/guide/keyboard-keys" },
            { text: "Emoji Shortcodes", link: "/guide/emoji-shortcodes" },
            { text: "Colored Text", link: "/guide/colored-text" },
            { text: "Figures", link: "/guide/figures" },
            { text: "Cross-References", link: "/guide/cross-references" },
            { text: "File Includes", link: "/guide/file-includes" },
            { text: "Bibliography & Citations", link: "/guide/bibliography" },
            { text: "Page Breaks", link: "/guide/page-breaks" },
          ],
        },
        {
          text: "Project",
          items: [
            { text: "Roadmap", link: "/guide/roadmap" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/BachMark-lang" },
      { icon: "x", link: "https://x.com/BachErik_live" },
      { icon: "bluesky", link: "https://bsky.app/profile/bacherik.de" },
    ],

    editLink: {
      pattern: "https://github.com/BachMark-lang/docs/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2026–present BachErik and the BachMark contributors",
    },

    search: {
      provider: "local",
    },
  },

  sitemap: {
      hostname: 'https://bachmark.bacherik.de'
    },
});
