// blog/pages/categories/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Posts from '../../components/Posts'; /* 2 */

import { getAllCategoryIds, getPosts } from '../../lib/posts'; /* 1 */

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Category: ${postsByCategoryData.id}`}
        description={`Posts by category ${postsByCategoryData.id}`}
      />
      <h2 className="h1">Category: {postsByCategoryData.id}</h2>

      {/* 1 */}
      <div className="entry-meta posted-on">
        {postsByCategoryData.allPostsData.length == 1
          ? postsByCategoryData.allPostsData.length + ' post'
          : postsByCategoryData.allPostsData.length + ' posts'}
      </div>
      <section className="all-post-data">
        {/* 2 */}
        <Posts posts={postsByCategoryData.allPostsData} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategoryIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByCategoryData = {
    id: params.id,
    allPostsData: getPosts(params.id) /* 1 */,
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}