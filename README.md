# Project Documentation & Syntax Guide

This document serves as the primary reference for building, running, and writing content for this Astro project.

##  Project Commands

We use **pnpm** for package management. Below are the built-in commands for the development lifecycle.

| Command | Action | Description |
| :--- | :--- | :--- |
| `pnpm install` | **Setup** | Installs all dependencies defined in `package.json`. |
| `pnpm run dev` | **Development** | Starts the local development server (usually at `localhost:4321`). |
| `pnpm run build` | **Production** | Builds the production-ready site into the `dist/` directory. |
| `pnpm run preview` | **Preview** | Previews the built `dist/` folder locally before deployment. |
| `pnpm run astro` | **CLI** | Runs the Astro CLI directly for other utilities. |

---

## 🛠️ Tools & Technologies

This project leverages a modern stack of tools to provide a performant and developer-friendly experience.

| Tool | Purpose |
| :--- | :--- |
| **[Astro](https://astro.build/)** | The web framework for building content-driven websites. |
| **[Tailwind CSS](https://tailwindcss.com/)** | A utility-first CSS framework for styling. |
| **[KaTeX](https://katex.org/)** | Fast math typesetting for the web. |
| **[Satori](https://github.com/vercel/satori)** | Generates Open Graph images from HTML/CSS. |
| **[Biome](https://biomejs.dev/)** | Fast formatter and linter for JavaScript/TypeScript. |
| **[Pagefind](https://pagefind.app/)** | A fully static search library. |
| **[Expressive Code](https://expressive-code.com/)** | A text marker for code blocks with syntax highlighting. |
| **[MDX](https://mdxjs.com/)** | Markdown for the component era, allowing React components in Markdown. |
| **[React](https://react.dev/)** | A JavaScript library for building user interfaces. |
| **[Astro Icon](https://www.astroicon.dev/)** | A straightforward icon system for Astro. |

---

## 📝 Frontmatter Requirements

Every Markdown (`.md`) or MDX (`.mdx`) file must begin with a Frontmatter block enclosed by triple dashes `---`.

**Required Fields:**
* `title`: (String) The primary heading of the page.
* `description`: (String) A brief summary for SEO and previews.
* `pubDate`: (Date) Format `YYYY-MM-DD`.

**Optional Fields:**
* `updatedDate`: (Date) When the post was last modified.
* `tags`: (Array) A list of related topics.

### Example
```yaml
---
title: "Getting Started with Systems Engineering"
description: "An intro to the first semester curriculum."
pubDate: "2023-11-27"
updatedDate: "2023-11-28"
tags: ["engineering", "guide", "intro"]
---
```

## 🧮 KaTeX (Mathematical Notation)

This project is configured to render math using KaTeX. You must use LaTeX syntax enclosed in dollar signs.

### Inline Math
Use single dollar signs `$` to wrap the formula.

* **Syntax:** ``Let $f(x) = x^2$ be the function.``
* **Renders as:** Let $f(x) = x^2$ be the function.

### Block Math
Use double dollar signs `$$` for equations that should stand on their own line.

**Syntax:**
```latex
$$
\int_{0}^{\infty} x^2 e^{-x} \, dx = 2!
$$
```

---

## ⚠️ Admonitions (Callouts)

We use `remark-directive` to create callout boxes. Use the `:::` syntax followed by the type.

**Available Types:** `note`, `tip`, `caution`, `warning`.

### Syntax Example

```text
:::tip[My Title]
This is a helpful tip.
:::
```
```text
:::danger
This is a warning message.
:::
```

---

## 🗂️ Tabs

Tabs are used to switch between different content views (e.g., Mac vs. Windows instructions).
*Note: This usually requires the file to be `.mdx` and the component to be imported.*

### Syntax

```tsx
<Tabs>
  <TabItem label="NPM">
    npm install astro
  </TabItem>
  <TabItem label="PNPM">
    pnpm add astro
  </TabItem>
</Tabs>
```

---

## 💻 Code Blocks

Use triple backticks to create code blocks. Always specify the language identifier for syntax highlighting.

### Standard Syntax

```text
```javascript
console.log('Hello world');
```

### Advanced Features (Line Highlighting & Titles)
*Depends on `rehype-pretty-code` or `shiki` configuration.*

```text
```python title="app.py" {2}
def main():
    print("This line is highlighted")
    return 0
```

---

## 📄 Standard Markdown Reference

### Text Formatting
* **Bold:** `**text**`
* *Italic:* `*text*`
* ~~Strikethrough~~: `~~text~~`
* `Inline Code`: Backticks `` `text` ``

### Lists

**Unordered:**
* Item 1
* Item 2
    * Indented sub-item

**Ordered:**
1.  Step One
2.  Step Two

### Blockquotes
Use the `>` character.

> This is a blockquote.
> It can span multiple lines.

### Links & Images
* **Link:** `[Title](URL)`
    * Example: `[Google](https://google.com)`
* **Image:** `![Alt Text](URL)`
    * Example: `![Screenshot](/images/screenshot.png)`

### Tables

Colons alignment: `---` (left), `:---:` (center), `---:` (right).

```markdown
| Command | Description |
| :--- | :--- |
| `git status` | Checks file status |
| `git push` | Uploads changes |
```
