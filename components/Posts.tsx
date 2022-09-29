// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';
import Pagination from '../components/Pagination';

import { useState } from 'react';

export default function Posts({ posts, totalOfPosts }: any) {
  const [paginationPage, setPaginationPage] = useState(1);
  const [listOfPosts, setListOfPosts] = useState(posts);

  const loadMorePosts = async () => {
    const res = await fetch('/api/posts/' + (paginationPage + 1));
    const posts = await res.json();
    setListOfPosts((value: any) => [...value, ...posts]);
    setPaginationPage(paginationPage + 1);
  };
  return (
    <>
      <Pagination listOfPosts={listOfPosts} totalOfPosts={totalOfPosts} />
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
      <Pagination
        listOfPosts={listOfPosts}
        totalOfPosts={totalOfPosts}
        onClick={loadMorePosts}
      />
    </>
  );
}
