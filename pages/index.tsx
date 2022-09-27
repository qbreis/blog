// blog/pages/index.tsx

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: process.env.paginationLimit, start: 0 });
  const totalOfPosts = getPosts().length;
  return {
    props: {
      posts,
      totalOfPosts,
    },
  };
}

export default function Home({ posts, totalOfPosts }: any) {
  return (
    <Layout home>
      <div className="excerpt">{process.env.siteInfoDescription}</div>
      <section className="all-post-data">
        <Posts posts={posts} totalOfPosts={totalOfPosts} />
      </section>
    </Layout>
  );
}
