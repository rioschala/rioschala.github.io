import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { expressiveCodeOptions } from "./src/site.config";
import rehypeUnwrapImages from 'rehype-unwrap-images';

// Remark plugins
import remarkDirective from "remark-directive";/* Handle ::: directives as nodes */

import { remarkAdmonitions } from "./src/utils/remark-admonitions";/* Add admonitions */
import { remarkReadingTime } from "./src/utils/remark-reading-time";
import remarkMath from "remark-math"; // <-- new

// Rehype plugins
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex"; // <-- new

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
    image: {
        domains: ["webmention.io"],
    },
    integrations: [expressiveCode(expressiveCodeOptions), icon(), tailwind({
        applyBaseStyles: false,
        nesting: true,
		}), sitemap(), mdx(), react()],
    markdown: {
        rehypePlugins: [
            [
                rehypeExternalLinks,
                {
                    rel: ["nofollow, noreferrer"],
                    target: "_blank",
                },
            ],
            rehypeKatex,rehypeUnwrapImages,  // <-- add this so math is rendered as KaTeX
        ],
        remarkPlugins: [
            
            remarkReadingTime,
            remarkDirective,
            remarkAdmonitions,
            remarkMath, // <-- add this to parse $...$ and $$...$$
        ],
        remarkRehype: {
            footnoteLabelProperties: {
                className: [""],
            },
        },
    },
    // https://docs.astro.build/en/guides/prefetch/
    prefetch: true,
    // ! Please remember to replace the following site property with your own domain
    site: "https://rioschala.github.io",
    base: '/',
    outDir: 'dist',
    vite: {
        optimizeDeps: {
            exclude: ["@resvg/resvg-js"],
        },
        plugins: [rawFonts([".ttf", ".woff"])],
        server: {
            watch: {ignored:  ['node_modules/@iconify-json/**', '**/icons/**']},},
        build: {
            rollupOptions: {
                output: {
                    manualChunks: {
                        'tldraw-chunk': ['tldraw']
                    }
                }
            },
            chunkSizeWarningLimit: 3000
        }
    },
});

function rawFonts(ext: string[]) {
    return {
        name: "vite-plugin-raw-fonts",
        // @ts-expect-error:next-line
        transform(_, id) {
            if (ext.some((e) => id.endsWith(e))) {
                const buffer = fs.readFileSync(id);
                return {
                    code: `export default ${JSON.stringify(buffer)}`,
                    map: null,
                };
            }
        },
    };
}