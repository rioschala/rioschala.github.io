import type { APIContext, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import robotoMono from "../../assets/roboto-mono-regular.ttf";
import robotoMonoBold from "../../assets/roboto-mono-700.ttf";
import { siteConfig } from "@/site-config";
import { getFormattedDate } from "@/utils";

export const getStaticPaths: GetStaticPaths = async () => {
	const posts = await getCollection("post");
	return posts.map((post) => ({
		params: { slug: post.slug },
		props: { post },
	}));
};

export const GET = async ({ props }: APIContext) => {
	const { post } = props;
	const date = getFormattedDate(post.data.publishDate, { month: "short" });

	const markup = html`
		<div style="display: flex; flex-direction: column; height: 100%; width: 100%; background-color: #1d1f21; color: #fff; padding: 40px 80px; justify-content: center;">
			<div style="display: flex; flex-direction: column; gap: 20px;">
				<div style="font-size: 32px; color: #a9b1d6;">${date}</div>
				<div style="font-size: 64px; font-weight: bold; line-height: 1.1;">${post.data.title}</div>
				<div style="display: flex; gap: 20px; margin-top: 20px;">
					${post.data.tags.map((tag: string) => `<span style="background-color: #2e303e; padding: 8px 16px; border-radius: 8px; font-size: 24px;">#${tag}</span>`).join("")}
				</div>
			</div>
			<div style="position: absolute; bottom: 40px; right: 80px; font-size: 32px; color: #a9b1d6;">
				${siteConfig.title}
			</div>
		</div>
	`;

	const svg = await satori(markup as unknown as React.ReactNode, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: "Roboto Mono",
				data: Buffer.from(robotoMono),
				weight: 400,
				style: "normal",
			},
			{
				name: "Roboto Mono",
				data: Buffer.from(robotoMonoBold),
				weight: 700,
				style: "normal",
			},
		],
	});

	const png = await sharp(Buffer.from(svg)).png().toBuffer();

	return new Response(png as unknown as BodyInit, {
		headers: {
			"Content-Type": "image/png",
		},
	});
};
