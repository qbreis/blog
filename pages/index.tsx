// import Link from 'next/link';

import Layout from '../components/Layout';
import Posts from '../components/Posts';

import { getPosts } from '../lib/posts';

export async function getStaticProps() {
    const allPostsData = getPosts();
    return {
        props: {
            allPostsData,
        },
    };
}

export default function Home({ allPostsData }: any) {
    return (
        <Layout home>
            <section className="all-post-data">
                <Posts posts={allPostsData} />
            </section>
        </Layout>
    )
}