// blog/pages/index.tsx

import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';
import Posts from '../components/Posts';
import { newLinesIntoParagraphs } from '../lib/functions';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  return (
    <Layout home>
      <div className="excerpt">
        {newLinesIntoParagraphs(String(process.env.siteInfoDescription))}
      </div>
      <section className="all-post-data">
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}
