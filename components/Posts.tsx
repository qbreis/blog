// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';

import { useState } from 'react';

export default function Posts({ posts }: any) {
  const [limit, setLimit] = useState(3);
  const [listOfPosts, setListOfPosts] = useState(posts.slice(0, 3));

  const loadMorePosts = async () => {
    console.log('Load more posts');
    const newLimit = limit + 3;
    setLimit(newLimit);
    setListOfPosts(posts.slice(0, newLimit));
  };

  return (
    <>
      <p className="pagination">
        limit: {limit} out of {posts.length}
      </p>
      <ul>
        {listOfPosts.map((post: any) => {
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
      <button onClick={loadMorePosts}>Load more posts</button>
    </>
  );
}
