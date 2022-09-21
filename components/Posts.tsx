// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';

export default function Posts({ posts }: any) {
  return (
    <ul>
      {posts.map((post: any) => {
        return (
          post.id && (
            <li className="sinle-post-item" key={post.id}>
              <h2 className="h4">
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>
              <Date dateString={post.date} />
              <Categories categories={post.categories} />
              <Tags tags={post.tags} />
            </li>
          )
        );
      })}
    </ul>
  );
}
