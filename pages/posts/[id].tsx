// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Link from 'next/link';
import Date from '../../components/Date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { newLinesIntoParagraphs } from '../../lib/functions';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        {postData.repository && (
          <>
            <span style={{ fontSize: '0.7em' }}>Repository: </span>
            <Link href={postData.repository}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.7em', textDecoration: 'none' }}
              >
                {postData.repository}
              </a>
            </Link>
          </>
        )}
        <h1>{postData.title}</h1>
        <div className="entry-meta">
          <Date dateString={postData.date} />
        </div>
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
