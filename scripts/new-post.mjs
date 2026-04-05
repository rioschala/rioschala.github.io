import fs from 'fs/promises';
import path from 'path';

async function main() {
    const title = process.argv[2];
    
    if (!title) {
        console.error("Please provide a title for the post. For example: npm run new \"My Awesome Post\"");
        process.exit(1);
    }
    
    const date = new Date();
    // YYYY-MM-DD
    const dateStr = date.toISOString().split('T')[0];
    
    // Formatting for the frontmatter
    const publishDate = date.toLocaleDateString("en-GB", {
        day: "2-digit", 
        month: "short", 
        year: "numeric"
    }); // Gives format like '05 Apr 2026'

    // Slugify the title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const fileName = `${dateStr}-${slug}.mdx`;
    
    const contentDir = path.join(process.cwd(), 'src/content/post');
    const filePath = path.join(contentDir, fileName);
    
    const template = `---
title: ${title}
description: ''
publishDate: ${publishDate}
tags: []
draft: true
---
import { Tabs, TabItem } from '@astrojs/starlight/components';

Write your post here...
`;

    try {
        await fs.writeFile(filePath, template, { flag: 'wx' }); // 'wx' fails if file exists
        console.log(`\n✅ Post created successfully!`);
        console.log(`📂 Location: src/content/post/${fileName}\n`);
    } catch (err) {
        if (err.code === 'EEXIST') {
            console.error(`❌ File ${fileName} already exists.`);
        } else {
            console.error(err);
        }
    }
}

main().catch(console.error);
