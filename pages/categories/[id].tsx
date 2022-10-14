// blog/pages/categories/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Posts from '../../components/Posts'; /* 1 */

import { getAllCategoryIds /* 2 */, getPosts /* 3 */ } from '../../lib/posts';

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Category: ${postsByCategoryData.id}`}
        description={`Posts by category ${postsByCategoryData.id}`}
      />
      <h2 className="h1">Category: {postsByCategoryData.id}</h2>

      <div className="entry-meta posted-on">
        {postsByCategoryData.allPostsData /* 4 */.length == 1
          ? postsByCategoryData.allPostsData /* 4 */.length + ' post'
          : postsByCategoryData.allPostsData /* 4 */.length + ' posts'}
      </div>
      <section className="all-post-data">
        <Posts /* 1 */ posts={postsByCategoryData.allPostsData /* 4 */} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategoryIds(); /* 2 */
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByCategoryData = {
    id: params.id,
    allPostsData /* 4 */: getPosts(params.id) /* 3 */,
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}
