// blog/pages/tags/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Posts from '../../components/Posts';

import { getAllTagIds, getPosts } from '../../lib/posts';

export default function Tag({ postsByTagData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Tag: ${postsByTagData.id}`}
        description={`Posts by tag ${postsByTagData.id}`}
      />
      <h2 className="h1">Tag: {postsByTagData.id}</h2>
      <div className="entry-meta posted-on">
        {postsByTagData.allPostsData.length == 1
          ? postsByTagData.allPostsData.length + ' post'
          : postsByTagData.allPostsData.length + ' posts'}
      </div>
      <section className="all-post-data">
        <Posts posts={postsByTagData.allPostsData} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllTagIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByTagData = {
    id: params.id,
    allPostsData: getPosts({ tag: params.id }),
  };
  return {
    props: {
      postsByTagData,
    },
  };
}
