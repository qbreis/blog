import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  return (
    <Layout>
      <section className="all-post-data">
        <ul>
          {posts.map((post: any) => {
            return (
              post.id && (
                <li key={post.id}>
                  <h2 className="h4">
                    {/* 1 */}
                    <Link href={`/posts/${post.id}`}>
                      <a>
                        {post.title} - {post.date}
                      </a>
                    </Link>
                  </h2>
                </li>
              )
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
