// blog/pages/posts/index.tsx

import Home from '../index';
import { getPosts } from '../../lib/posts';

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

export default Home;
