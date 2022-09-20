// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        <h1>{postData.title}</h1>
        <div className="entry-meta">
          <Date dateString={postData.date} />
          <Categories categories={postData.categories} />
        </div>
        <div className="excerpt">{postData.excerpt}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
