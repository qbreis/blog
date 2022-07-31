const Feed = () => {
    return null;
};

export const getServerSideProps = async ({ res }: any) => {
    const BASE_URL = 'http://localhost:3000';

    const feed = `<?xml version="1.0" encoding="utf-8"?>
		<!--	created with www.mysitemapgenerator.com	-->
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">
	<channel>
		<title>qbreis — enric gatell</title>
		<link><![CDATA[https://nextjs-blog-qbreis.vercel.app]]></link>
		<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
		<language>es</language>
		<pubDate>Fri, 15 Jul 2022 17:03:19 +0300</pubDate>
		<generator>MySitemapGenerator (www.mysitemapgenerator.com)</generator>

		<item>
			<guid isPermaLink="false">3765839980</guid>
			<title>Two Forms of Pre-rendering</title>
			<link>https://nextjs-blog-qbreis.vercel.app/posts/pre-rendering</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
			<pubDate>Fri, 15 Jul 2022 17:03:19 +0300</pubDate>
		</item>
		<item>
			<guid isPermaLink="false">689689018</guid>
			<title>qbreis — enric gatell</title>
			<link>https://nextjs-blog-qbreis.vercel.app/categories/nextjs</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
			<pubDate>Fri, 15 Jul 2022 17:03:19 +0300</pubDate>
			<enclosure url="https://nextjs-blog-qbreis.vercel.app/q-logo.svg" type="image/svg+xml" />
		</item>
		<item>
			<guid isPermaLink="false">1341612228</guid>
			<title>qbreis — enric gatell</title>
			<link>https://nextjs-blog-qbreis.vercel.app/categories/bulma</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
			<pubDate>Fri, 15 Jul 2022 17:03:20 +0300</pubDate>
			<enclosure url="https://nextjs-blog-qbreis.vercel.app/q-logo.svg" type="image/svg+xml" />
		</item>
		<item>
			<guid isPermaLink="false">4065349994</guid>
			<title>Hola world</title>
			<link>https://nextjs-blog-qbreis.vercel.app/posts/hola-world</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>Excerpt test for hola mundo</description>
			<pubDate>Fri, 15 Jul 2022 17:03:20 +0300</pubDate>
		</item>
		<item>
			<guid isPermaLink="false">1223322754</guid>
			<title>qbreis — enric gatell</title>
			<link>https://nextjs-blog-qbreis.vercel.app/categories/test</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
			<pubDate>Fri, 15 Jul 2022 17:03:21 +0300</pubDate>
			<enclosure url="https://nextjs-blog-qbreis.vercel.app/q-logo.svg" type="image/svg+xml" />
		</item>
		<item>
			<guid isPermaLink="false">201097642</guid>
			<title>When to Use Static Generation v.s. Server-side Rendering</title>
			<link>https://nextjs-blog-qbreis.vercel.app/posts/ssg-ssr</link>
			<dc:creator>Administrator</dc:creator>
			<category>Site News</category>
			<description>This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.</description>
			<pubDate>Fri, 15 Jul 2022 17:03:21 +0300</pubDate>
		</item>
	</channel>
</rss>`;

res.setHeader('Content-Type', 'text/xml');
res.write(feed);
res.end();

return {
	props: {},
};
};

export default Feed;