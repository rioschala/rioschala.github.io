import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import expressiveCode from "astro-expressive-code";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import { expressiveCodeOptions } from "./src/site.config";

// Remark plugins
import remarkDirective from "remark-directive";/* Handle ::: directives as nodes */
import remarkUnwrapImages from "remark-unwrap-images";
import { remarkAdmonitions } from "./src/utils/remark-admonitions";/* Add admonitions */
import { remarkReadingTime } from "./src/utils/remark-reading-time";

// Rehype plugins
import rehypeExternalLinks from "rehype-external-links";

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
        ],
        remarkPlugins: [remarkUnwrapImages, remarkReadingTime, remarkDirective, remarkAdmonitions],
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