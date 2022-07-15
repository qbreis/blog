import React from 'react';

const Sitemap = () => {
    return null;
};

export const getServerSideProps = async ({ res }: any) => {
    const BASE_URL = 'http://localhost:3000';

    const sitemap = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/posts/hola-world</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.1</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/categories/nextjs</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.1</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/categories/bulma</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/categories/test</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/posts/ssg-ssr</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://nextjs-blog-qbreis.vercel.app/posts/pre-rendering</loc>
        <lastmod>2022-07-15T16:56:31+01:00</lastmod>
        <priority>0.8</priority>
    </url>
</urlset>
`;

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default Sitemap;