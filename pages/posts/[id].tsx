// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import MetaData from '../../components/MetaData';
import { newLinesIntoParagraphs } from '../../lib/functions';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        <h1>{postData.title}</h1>
        <div className="excerpt">
          {newLinesIntoParagraphs(postData.excerpt)}
        </div>
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
