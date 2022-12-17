// blog/pages/index.tsx

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import { getPosts } from '../lib/posts';
import { newLinesIntoParagraphs } from '../lib/functions';

export async function getStaticProps() {
  const posts = getPosts({ limit: process.env.paginationLimit, start: 0 });
  return {
    props: {
      posts
    },
  };
}

export default function Home({ posts, totalOfPosts }: any) {
  return (
    <Layout home>
      <div className="excerpt">
        {newLinesIntoParagraphs(String(process.env.siteInfoDescription))}
      </div>
      <section className="all-post-data">
        <Posts posts={posts} paginationLimit={process.env.paginationLimit} />
      </section>
    </Layout>
  );
}
