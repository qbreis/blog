// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Link from 'next/link';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
import { getAllPostIds, getPostData } from '../../lib/posts';
// import { getPostsPaginatedIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  if (!postData) {
    return <h1>Loading...</h1>;
  }

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
          <Categories categories={postData.categories} />
          <Tags tags={postData.tags} />
        </div>
        <div className="excerpt">
          {postData.excerpt.replace('\\n', '&lt;br /&gt;')}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds({ limit: 3 });
  //const paths = getPostsPaginatedIds();
  return {
    paths,
    // fallback: false,
    // fallback: true,
    fallback: 'blocking',
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
