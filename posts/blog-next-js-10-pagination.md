---
title: 'Blog - Next.js - Chapter #10 - Pagination'
excerpt: 'In this chapter I cover pagination functionality for list of posts.'
date: '2022-12-16'
categories: ['nextjs']
tags: ['nextjs', 'typescript', 'pagination']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

## 10.1 Using State Variables

I add in `blog/components/Posts.tsx` after unordered list `<ul>` of posts, a button to load more posts.

In order to load more posts I want to use two state variables; one to hold the number of posts to show which will be `limit` and it will be set initially to `3` hard coded, and yet another one to hold the posts to show, which will be `listOfPosts` and it will be set initially to first 3 posts in `posts`, that is `posts.slice(0, 3)`.

So in `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 7 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 10 + 10px);height: calc(1.26em * 2);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 13 + 10px);height: calc(1.26em * 6);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 21 + 10px);height: calc(1.26em * 4);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 26 + 10px);height: calc(1.26em * 1);"></div>
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

I like to take care of the details so still in `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 8 + 10px);height: calc(1.26em * 2);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 12 + 10px);height: calc(1.26em * 3);"></div>
</div>

```typescript
/* Keep the existing code here */

export default function Posts({ posts }: any) {
  /* Keep the existing code here */

  return (
    <>
      <p className="pagination">
        Showing {limit < posts.length ? limit : posts.length}{' '}
        {posts.length > 1 ? 'posts' : 'post'} out of {posts.length}
      </p>
      <ul>/* Keep the existing code here */</ul>
      {limit < posts.length && (
        <button onClick={loadMorePosts}>Load more posts</button>
      )}
    </>
  );
}
```

## 10.2 Component Pagination

Actually I want to see how many posts are listed out of how many, on the top, before the unordered list and at the bottom, and I want to show button 'Load more posts' only at the bottom, and only when there are more posts to load.

For all this I create new file `blog/components/Pagination.tsx`:

```typescript
//blog/components/Pagination.tsx

export default function Pagination({ limit, posts, onClick }: any) {
  return (
    <>
      {limit < posts.length && (
        <p className="pagination">
          Showing {limit < posts.length ? limit : posts.length}{' '}
          {posts.length > 1 ? 'posts' : 'post'} out of {posts.length}
          {onClick && (
            <span
              className="icon-arrow pointing-right align-left link-alike"
              onClick={onClick}
            >
              Load more posts
            </span>
          )}
        </p>
      )}
    </>
  );
}
```

And then I update `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 2 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 8 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 10 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
/* Keep the existing code here */

import Pagination from '../components/Pagination';

/* Keep the existing code here */
export default function Posts({ posts }: any) {
  return (
    <>
      <Pagination posts={posts} limit={limit} />
      <ul>/* Keep the existing code here */</ul>
      <Pagination posts={posts} limit={limit} onClick={loadMorePosts} />
    </>
  );
}
```

## 10.3 Set Pagination Limit:

I want to set pagination limit in `blog/next.config.js`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 11 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
/** @type {import('next').NextConfig} */
const siteInfoTitle = 'qbreis — enric gatell';
const siteInfoDescription = `This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.
  
Many of these annotations are related to their corresponding Git repository.`;
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    siteInfoTitle: siteInfoTitle,
    siteInfoDescription: siteInfoDescription,
    paginationLimit: 3,
  },
};

module.exports = nextConfig;
```

And then in `blog/pages/index.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 1 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
/* Keep the existing code here */
<Posts posts={posts} paginationLimit={process.env.paginationLimit} />
/* Keep the existing code here */
```

And in `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 1 + 10px);height: calc(1.26em * 2);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 4 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 8 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
/* Keep the existing code here */
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

  /* Keep the existing code here */
}
```

## 10.4 Pagination for List of Posts for Categories and Tags

I also want to do paginate for list of posts for one single category, so in `blog/pages/tags/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 9 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
/* Keep the existing code here */

export default function Tag({ postsByTagData }: any) {
  return (
    <Layout>
      /* Keep the existing code here */
      <section className="all-post-data">
        <Posts
          posts={postsByTagData.allPostsData}
          paginationLimit={process.env.paginationLimit}
          key={`Tag: ${postsByTagData.id}`}
        />
      </section>
    </Layout>
  );
}
/* Keep the existing code here */
```

Note that I specify attribute `key` in `<Posts />` component, this is to refresh state variable `limit` when loading new list of posts for one single tag page and avoid kind of a bug. I also specify `Tag:` just in case some category has exactly the same name as the tag.

Same thing for `blog/pages/categories/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 9 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
/* Keep the existing code here */

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      /* Keep the existing code here */
      <section className="all-post-data">
        <Posts
          posts={postsByCategoryData.allPostsData}
          paginationLimit={process.env.paginationLimit}
          key={`Category: ${postsByCategoryData.id}`}
        />
      </section>
    </Layout>
  );
}
/* Keep the existing code here */
```
