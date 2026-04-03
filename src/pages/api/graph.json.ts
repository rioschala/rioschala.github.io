import type { APIRoute } from "astro";
import { getGraphData } from "@/data/post";

export const GET: APIRoute = async () => {
	const data = await getGraphData();
	return new Response(JSON.stringify(data), {
		headers: {
			"content-type": "application/json",
		},
	});
};
