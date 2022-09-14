import Layout from '../../components/Layout';
import { getAllPostIds /* 1 */, getPostData /* 2 */ } from '../../lib/posts';

export default function Post({ postData }: any) {
  function testingJs() {
    console.log("Trying to do something with that img[src$='#img-thumbnail']");
  }

  if (typeof window !== 'undefined') {
    // To access the document in Next.js you need await the page render first
    // Listen for all clicks on the document, and then check if the clicked element has the selector you care about.
    /*
    document.addEventListener('click', function (event) {
      console.log('wha?');

      console.log(event);
    });
    */
  }

  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div className="excerpt">{postData.excerpt}</div>
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
