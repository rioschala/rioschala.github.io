import { getAllPosts } from "@/data/post";

export const GET = async () => {
	const allPosts = await getAllPosts();
	const previews: Record<string, { title: string; description: string }> = {};

	allPosts.forEach(p => {
		const url = `/posts/${p.id}/`;
		previews[url] = {
			title: p.data.title,
			// Fallback to a default if description happens to be empty
			description: p.data.description || "Click to read more about this topic..."
		};
	});

	return new Response(JSON.stringify(previews), {
		headers: {
			'Content-Type': 'application/json',
			// Enable caching since this API response only changes on rebuild
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
