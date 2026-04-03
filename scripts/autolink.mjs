import fs from 'fs/promises';
import path from 'path';

async function walk(dir) {
    let results = [];
    const list = await fs.readdir(dir);
    for (let file of list) {
        file = path.join(dir, file);
        const stat = await fs.stat(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(await walk(file));
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                results.push(file);
            }
        }
    }
    return results;
}

const contentDir = path.join(process.cwd(), 'src/content/post');

async function main() {
    const files = await walk(contentDir);
    const posts = [];

    // Pass 1: Parse all titles
    for (const file of files) {
        const content = await fs.readFile(file, 'utf-8');
        const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (frontmatterMatch) {
            let titleMatch = frontmatterMatch[1].match(/title:\s*["']([^"']+)["']/i) || frontmatterMatch[1].match(/title:\s*([^\n]+)/i);
            if (titleMatch) {
                const title = titleMatch[1].trim();
                const relativePath = path.relative(contentDir, file);
                const fileDir = path.dirname(relativePath);
                const fileName = path.basename(relativePath, path.extname(relativePath));
                const slug = fileDir === '.' ? fileName : `${fileDir.split(path.sep).join('/')}/${fileName}`;
                
                if (title.length > 4) { // Only descriptive titles to avoid false positives
                    posts.push({ title, slug, file, content });
                }
            }
        }
    }

    posts.sort((a, b) => b.title.length - a.title.length);
    console.log(`Found ${posts.length} eligible posts for auto-linking.`);

    let filesModified = 0;

    // Pass 2: Replace
    for (let currentPost of posts) {
        let content = currentPost.content;
        let isModified = false;

        // Apply targets one by one
        for (const targetPost of posts) {
            if (currentPost.slug === targetPost.slug) continue;

            const protectedRegions = [];
            const fmMatch = content.match(/^---\r?\n[\s\S]*?\r?\n---/);
            if (fmMatch) protectedRegions.push({ start: fmMatch.index, end: fmMatch.index + fmMatch[0].length });
            
            const cbRegex = /```[\s\S]*?```/g;
            let cbMatch;
            while ((cbMatch = cbRegex.exec(content)) !== null) {
                protectedRegions.push({ start: cbMatch.index, end: cbMatch.index + cbMatch[0].length });
            }
            
            // Existing Markdown Links
            const linkRegex = /\[.*?\]\(.*?\)/g;
            let linkMatch;
            while ((linkMatch = linkRegex.exec(content)) !== null) {
                protectedRegions.push({ start: linkMatch.index, end: linkMatch.index + linkMatch[0].length });
            }
            
            // Markdown Image Tags
            const imageRegex = /!\[.*?\]\(.*?\)/g;
            let imageMatch;
            while ((imageMatch = imageRegex.exec(content)) !== null) {
                protectedRegions.push({ start: imageMatch.index, end: imageMatch.index + imageMatch[0].length });
            }

            // HTML tags like <a ...>
            const htmlRegex = /<[^>]+>/g;
            let htmlMatch;
            while ((htmlMatch = htmlRegex.exec(content)) !== null) {
                protectedRegions.push({ start: htmlMatch.index, end: htmlMatch.index + htmlMatch[0].length });
            }

            const escapedTitle = targetPost.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const targetRegex = new RegExp(`\\b(${escapedTitle})\\b`, 'gi');
            
            const matchesToReplace = [];
            let match;
            while ((match = targetRegex.exec(content)) !== null) {
                const start = match.index;
                const end = match.index + match[0].length;
                
                const isProtected = protectedRegions.some(region => 
                    (start >= region.start && start < region.end) || 
                    (end > region.start && end <= region.end) ||
                    (start <= region.start && end >= region.end)
                );

                if (!isProtected) {
                    matchesToReplace.push({ start, end, originalText: match[0] });
                    break; // Only replace the first occurrence per post to avoid spam
                }
            }

            // Replace backwards to avoid shifting index issues
            for (let i = matchesToReplace.length - 1; i >= 0; i--) {
                const rep = matchesToReplace[i];
                content = content.substring(0, rep.start) + `[${rep.originalText}](/posts/${targetPost.slug}/)` + content.substring(rep.end);
                isModified = true;
            }
        }

        if (isModified) {
            await fs.writeFile(currentPost.file, content, 'utf-8');
            filesModified++;
        }
    }
    console.log(`Successfully auto-linked ${filesModified} files!`);
}

main().catch(console.error);
