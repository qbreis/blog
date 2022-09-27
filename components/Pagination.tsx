import { useState } from 'react';

export default function Pagination({ posts, totalOfPosts }: any) {
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
      <p className="pagination">
        Showing {listOfPosts.length} posts out of {totalOfPosts}
        <span onClick={loadMorePosts}>Load more posts</span>
      </p>
      <button onClick={loadMorePosts}>Load more posts</button>
    </>
  );
}
