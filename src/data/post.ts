import type { CollectionEntry } from "astro:content";
import { getCollection } from "astro:content";

/** Note: this function filters out draft posts based on the environment */
export async function getAllPosts() {
  return await getCollection("post", ({ data }) => {
    // Only return posts that aren't drafts (if you use a draft flag)
    return import.meta.env.PROD ? data.draft !== true : true;
  });
}

export function sortMDByDate(posts: Array<CollectionEntry<"post">>) {
	return posts.sort((a, b) => {
		const aDate = new Date(a.data.updatedDate ?? a.data.publishDate).valueOf();
		const bDate = new Date(b.data.updatedDate ?? b.data.publishDate).valueOf();
		return bDate - aDate;
	});
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getAllTags(posts: Array<CollectionEntry<"post">>) {
	return posts.flatMap((post) => [...post.data.tags]);
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTags(posts: Array<CollectionEntry<"post">>) {
	return [...new Set(getAllTags(posts))];
}

/** Note: This function doesn't filter draft posts, pass it the result of getAllPosts above to do so. */
export function getUniqueTagsWithCount(
	posts: Array<CollectionEntry<"post">>,
): Array<[string, number]> {
	return [
		...getAllTags(posts).reduce(
			(acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
			new Map<string, number>(),
		),
	].sort((a, b) => b[1] - a[1]);
}

export async function getBacklinks(targetId: string) {
	const allPosts = await getAllPosts();
	const cleanTargetId = (targetId.split('#')[0] || '').replace(/\/$/, '').replace(/\.mdx?$/, '').toLowerCase();
	
	return sortMDByDate(allPosts.filter(post => {
		if (post.id === targetId) return false;
		if (!post.body) return false;
		
		const regex = /\[.*?\]\((.*?)\)/g;
		let match;
		while ((match = regex.exec(post.body)) !== null) {
			const href = match[1];
			if (!href || href.startsWith('http') || href.startsWith('mailto:')) continue;
			
			const cleanHref = (href.split('#')[0] || '').replace(/\/$/, '').toLowerCase();
			if (cleanHref.endsWith(cleanTargetId)) {
				return true;
			}
		}
		return false;
	}));
}

export async function getGraphData() {
	const allPosts = await getAllPosts();
	const nodes: any[] = [];
	const links: {source: string, target: string}[] = [];
	const tagSet = new Set<string>();
	
	// Add Post Nodes
	allPosts.forEach(p => {
		nodes.push({
			id: p.id,
			name: p.data.title,
			url: `/posts/${p.id}/`,
			group: 'post'
		});
		
		// Collect Unique Tags
		if (p.data.tags) {
			p.data.tags.forEach(tag => tagSet.add(tag));
		}
	});

	// Add Tag Nodes
	tagSet.forEach(tag => {
		const tagId = `tag-${tag}`;
		nodes.push({
			id: tagId,
			name: `#${tag}`,
			url: `/tags/${tag.toLowerCase()}/`,
			group: 'tag'
		});
	});

	allPosts.forEach(post => {
		// Link Post to its Tags
		if (post.data.tags) {
			post.data.tags.forEach(tag => {
				links.push({ source: post.id, target: `tag-${tag}` });
			});
		}

		if (!post.body) return;
		const regex = /\[.*?\]\((.*?)\)/g;
		let match;
		while ((match = regex.exec(post.body)) !== null) {
			const href = match[1];
			if (!href || href.startsWith('http') || href.startsWith('mailto:')) continue;
			
			const cleanHref = (href.split('#')[0] || '').replace(/\/$/, '').toLowerCase();
			allPosts.forEach(target => {
				if (post.id === target.id) return;
				const cleanTargetId = (target.id.split('#')[0] || '').replace(/\/$/, '').replace(/\.mdx?$/, '').toLowerCase();
				
				if (cleanHref.endsWith(cleanTargetId)) {
					links.push({ source: post.id, target: target.id });
				}
			});
		}
	});
	
	return { nodes, links };
}
