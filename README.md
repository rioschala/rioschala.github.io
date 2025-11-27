Project Documentation & Usage Guide

Welcome to the project! This document serves as a reference for running the project, authoring content, and utilizing the built-in formatting features.

Project Commands

This project uses pnpm as the package manager and Astro as the framework. Below are the essential commands to run and build the project.

Command

Action

Description

pnpm install

Install

Installs all dependencies defined in package.json.

pnpm run dev

Development

Starts the local development server at http://localhost:4321. Hot-reloading is enabled.

pnpm run build

Build

Builds the production site to the ./dist/ directory.

pnpm run preview

Preview

Previews the locally built ./dist/ folder to check the production build before deploying.

pnpm run astro check

Type Check

Runs diagnostic checks against your project's types and content.

📝 Frontmatter Requirements

All content files (Markdown .md or MDX .mdx) must begin with a YAML frontmatter block enclosed by triple dashes ---.

Standard Schema

Below is the required structure for the frontmatter:

---
title: "Title of the Post"
description: "A brief summary of the content for SEO and previews."
pubDate: "2023-10-27" # Format: YYYY-MM-DD
updatedDate: "2023-11-01" # Optional
heroImage: "/blog-placeholder-1.jpg" # Path relative to the /public folder
tags: ["astro", "docs", "tutorial"]
layout: "../../layouts/BlogPost.astro" # Optional, usually auto-handled
---


🎨 Content Features

1. KaTeX (Mathematics)

This project supports LaTeX math equations via KaTeX.

Inline Math:
Wrap the equation in single dollar signs $.

Syntax: Let $f(x) = x^2$ be the function.

Result: Let $f(x) = x^2$ be the function.

Block Math:
Wrap the equation in double dollar signs $$.

Syntax:

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$


Result:

\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}

2. Admonitions (Callouts)

Use admonitions to highlight warnings, tips, or notes. We use the specific directive syntax :::.

Syntax:

:::note
This is a standard note.
:::

:::tip[Pro Tip]
You can add a custom title to the directive!
:::

:::caution
Be careful with this configuration.
:::

:::danger
Do not delete production database keys.
:::


3. Tabs (MDX Only)

To group content into switchable tabs, use the <Tabs> and <TabItem> components. This requires using a .mdx file.

Syntax:

import { Tabs, TabItem } from '@astrojs/starlight/components'; // Path may vary based on config

<Tabs>
  <TabItem label="npm">
    ```bash
    npm install astro
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```bash
    pnpm add astro
    ```
  </TabItem>
</Tabs>


4. Code Blocks

Use triple backticks for code blocks. Specify the language after the opening ticks for syntax highlighting.

Syntax:

```typescript
const getGreeting = (name: string) => {
    return `Hello, ${name}!`;
}
```


Result:

const getGreeting = (name: string) => {
    return `Hello, ${name}!`;
}


📚 Standard Markdown Reference

A quick refresher on standard Markdown elements supported out of the box.

Typography

Bold: **text** or __text__ → text

Italic: *text* or _text_ → text

Strikethrough: ~~text~~ → ~~text~~

Blockquote: > text

Lists

Unordered:

- Item 1
- Item 2
  - Subitem


Ordered:

1. First
2. Second
3. Third


Links & Images

Link: [Link Text](https://example.com)

Image: ![Alt Text](/path/to/image.jpg)

Tables

| Header 1 | Header 2 |
| :------- | :------- |
| Row 1    | Data 1   |
| Row 2    | Data 2   |
