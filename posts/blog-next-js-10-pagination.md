---
title: 'Blog - Next.js - Chapter #10 - Pagination'
excerpt: 'In this chapter I cover pagination functionality for list of posts.'
date: '2022-12-16'
categories: ['nextjs']
tags: ['nextjs', 'typescript', 'pagination']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

I add in `blog/components/Posts.tsx` after unordered list `<ul>` of posts, a button to load more posts.

In order to load more posts I want to use two state variables; one to hold the number of posts to show which will be `limit` and it will be set initially to `3` hard coded, and yet another one to hold the posts to show, which will be `listOfPosts` and it will be set initially to first 3 posts in `posts`, that is `posts.slice(0, 3)`.

So in `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 7 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 10 + 10px);height: calc(1.26em * 2);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 13 + 10px);height: calc(1.26em * 6);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 21 + 10px);height: calc(1.26em * 4);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 43 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
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
```
