// blog/pages/posts/[id].tsx

import Link from 'next/link';
import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
import { 
  getAllPostIds, 
  getPostData, 
  getPosts // ........ To get posts for navigation, if needed
} from '../../lib/posts';
import PostsNavigation from '../../components/PostsNavigation'; // ........ Importing the PostsNavigation component
import { newLinesIntoParagraphs } from '../../lib/functions';

export default function Post({ 
  postData,
  posts // ........ If I want to use posts for navigation, I can pass them here
}: any) {
  if (!postData) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>

      {/* ........ Add navigation to previous and next posts */}
      <PostsNavigation posts={posts} currentPostId={postData.id} />

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
          {newLinesIntoParagraphs(postData.excerpt)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>

      {/* ........ Add navigation to previous and next posts */}
      <PostsNavigation posts={posts} currentPostId={postData.id} />

    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds({ limit: 3 });
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  const posts = getPosts(); // ........ get full list of posts here
  return {
    props: {
      postData,
      posts, // ........ Pass the posts to the component for navigation
    },
  };
}
