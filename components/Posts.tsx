// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';

import { useState } from 'react';

import Pagination from '../components/Pagination';

export default function Posts({ posts, paginationLimit }: any) {
  const [limit, setLimit] = useState(paginationLimit);
  const [listOfPosts, setListOfPosts] = useState(
    posts.slice(0, paginationLimit)
  );

  const loadMorePosts = async () => {
    const newLimit = limit + paginationLimit;
    setLimit(newLimit);
    setListOfPosts(posts.slice(0, newLimit));
  };

  return (
    <>
      <Pagination posts={posts} limit={limit} />
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
      <Pagination posts={posts} limit={limit} onClick={loadMorePosts} />
    </>
  );
}
