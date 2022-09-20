// blog/pages/categories/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';

import { getAllCategoryIds } from '../../lib/posts';

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Category: ${postsByCategoryData.id}`}
        description={`Posts by category ${postsByCategoryData.id}`}
      />
      <h2 className="h1">Category: {postsByCategoryData.id}</h2>
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
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}
