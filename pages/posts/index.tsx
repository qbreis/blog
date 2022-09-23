// blog/pages/posts/index.tsx

import Home from '../index';
import { getPosts } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: 3 });
  return {
    props: {
      posts,
    },
  };
}

export default Home;
