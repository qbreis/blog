import Link from 'next/link';

const Posts = ({ posts }: any) => {
  return (
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
  );
};

export default Posts;
