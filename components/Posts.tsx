import Link from 'next/link';
import Date from '../components/Date'; /* 1 */

const Posts = ({ posts }: any) => {
  return (
    <ul>
      {posts.map((post: any) => {
        return (
          post.id && (
            <li className="sinle-post-item" key={post.id}>
              <h2 className="h4">
                {/* 1 */}
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>

              {/* 1 */}
              <Date dateString={post.date} />
            </li>
          )
        );
      })}
    </ul>
  );
};

export default Posts;
