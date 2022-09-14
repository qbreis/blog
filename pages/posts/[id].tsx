import Layout from '../../components/Layout';
import { getAllPostIds /* 1 */, getPostData /* 2 */ } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds(); /* 1 */
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id); /* 2 */
  return {
    props: {
      postData,
    },
  };
}
