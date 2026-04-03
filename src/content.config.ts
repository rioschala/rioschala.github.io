import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from 'astro/loaders';

/** * Helper to remove duplicate strings from the tags array 
 */
function removeDups(array: string[]) {
    if (!array.length) return array;
    const distinctItems = new Set(array);
    return Array.from(distinctItems);
}

const post = defineCollection({
    // The loader is required in Astro 6. 
    // This looks for markdown and mdx files inside src/content/post/
    loader: glob({ 
        pattern: '**/[^_]*.{md,mdx}', 
        base: "./src/content/post" 
    }),
    schema: ({ image }) =>
        z.object({
            coverImage: z
                .object({
                    alt: z.string(),
                    src: image(),
                })
                .optional(),
            description: z.string().min(20).max(160),
            draft: z.boolean().default(false),
            featured: z.boolean().default(false),
            ogImage: z.string().optional(),
            publishDate: z
                .string()
                .or(z.date())
                .transform((val) => new Date(val)),
            tags: z.preprocess((val) => {
                if (!val) return [];
                if (Array.isArray(val)) return val;
                if (typeof val === "string") {
                    return val
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean);
                }
                return [];
            }, z.array(z.string()))
            .transform(removeDups),
            title: z.string().max(60),
            updatedDate: z
                .string()
                .optional()
                .transform((str) => (str ? new Date(str) : undefined)),
        }),
});

export const collections = { post };