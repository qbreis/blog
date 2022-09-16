// blog/pages/index.tsx

import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';
import Posts from '../components/Posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  // I pass prop home as attribute home to Layout component */}
  return (
    <Layout home>
      <section className="all-post-data">
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}
