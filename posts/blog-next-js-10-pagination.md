---
title: 'Blog - Next.js - Chapter #10 - Pagination'
excerpt: 'In this chapter I ...'
date: '2021-09-24'
categories: ['nextjs']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

I found this quite useful for my purpose, although it is not a master class at all, it gives me some useful clues for what I want:

[Next.js SSG(static site generation) : getStaticProps(), getStaticPaths(), pagination and ISR](https://www.youtube.com/watch?v=kawwRJO5yZ8)

For a better understanding I am going to focus more on _how_ than _what_ and from there I will try to refactor the best I know.

## 10.1 Get only 3 posts

To get only 3 posts instead of _all_ I will add some functions into `blog/lib/posts.tsx`:

```typescript
export function getPostsPaginated(params?: any) {
  if (!params?.limit) {
    return posts;
  }
  const getPosts: any = [];
  let counter = 0;
  posts.map((post: any) => {
    if (counter < params?.limit) {
      counter++;
      getPosts.push(post);
    }
  });
  return getPosts;
}

export function getPostsPaginatedIds() {
  return getPostsPaginated({ limit: 3 }).map((post: any) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
```

Now in `blog/pages/posts/[id].tsx`, in function `getStaticPaths` I just define `const paths = getPostsPaginatedIds();`:

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Link from 'next/link';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import { getPostsPaginatedIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  /* Keep the existing code here */
}

export async function getStaticPaths() {
  // const paths = getAllPostIds();
  const paths = getPostsPaginatedIds();
  return {
    paths,
    fallback: false,
    // fallback: true,
  };
}

/* Keep the existing code here */
```

I also need to do same thing in `blog/pages/posts/index.tsx`:

```typescript
// blog/pages/posts/index.tsx

import Home from '../index';
// import { getPosts } from '../../lib/posts';
import { getPostsPaginated } from '../../lib/posts';

export async function getStaticProps() {
  // const posts = getPosts();
  const posts = getPostsPaginated({ limit: 3 });
  return {
    props: {
      posts,
    },
  };
}

export default Home;
```

And in `blog/pages/index.tsx`:

```typescript
// blog/pages/index.tsx

import Layout from '../components/Layout';
import Posts from '../components/Posts';

// import { getPosts } from '../lib/posts';
import { getPostsPaginated } from '../lib/posts';

export async function getStaticProps() {
  // const posts = getPosts();
  const posts = getPostsPaginated({ limit: 3 });
  return {
    props: {
      posts,
    },
  };
}

/* Keep the existing code here */
```

## 10.2 fallback true or false

When I do run `yarn build` and then `yarn start`, I check `blog/.next/server/pages/posts` and I see Html files corresponding to first 3 posts:

- blog/.next/server/pages/posts/blog-next-js-10-pagination.html
- blog/.next/server/pages/posts/blog-next-js-9-tags.html
- blog/.next/server/pages/posts/blog-next-js-8-categories.html

So when I go to [http://localhost:3000/posts/blog-next-js-1-setup](http://localhost:3000/posts/blog-next-js-1-setup), which is last post in reverse chronological order list of posts, it returns 404 page not found, logically.

Changing `fallback: false` to `fallback: true` in `getStaticPaths` function into `blog/pages/posts/[id].tsx` file, when I stop server and run again `yarn build` it throws an error, as long as Next.js is trying to reach posts where they are not defined:

To avoid that error I just need to make sure `postData` is defined as follows:

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Link from 'next/link';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
// import { getAllPostIds, getPostData } from '../../lib/posts';
import { getPostsPaginatedIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  {/* make sure `postData` is defined */}
  if (!postData) {
    return <h1>Loading...</h1>;
  }

  return (

    /* Keep the existing code here */

  );
}

export async function getStaticPaths() {
  // const paths = getAllPostIds();
  const paths = getPostsPaginatedIds();
  return {
    paths,
    // fallback: false,
    fallback: true,
  };
}

/* Keep the existing code here */
```

Now after I run `yarn build` and then `yarn start`, when I browse [http://localhost:3000/posts/blog-next-js-1-setup](http://localhost:3000/posts/blog-next-js-1-setup) I see that `<h1>Loading...</h1>` before the corresponding post, no 404 plus when I check `blog/.next/server/pages/posts` I can also see the corresponding Html file `blog/.next/server/pages/posts/blog-next-js-1-setup.html`, that is what I want.

Changing `fallback: true` to `fallback: 'blocking'` I won't see that `<h1>Loading...</h1>`.

## 10.1 Refactoring `getPosts` and `getAllPostIds`

I don't want to have these two functions `getPosts` and `getPostsPaginated` but instead only one `getPosts`.

By now I don't want to paginate list of categories or paths, so in `blog/lib/posts.tsx`:

```typescript
export function getPosts(params?: any) {
  if (!params?.category && !params?.tag && !params?.limit) {
    return posts;
  }
  const getPosts: any = [];
  let counter = 0;
  posts.map((post: any) => {
    if (
      (params?.category && post.categories.includes(params?.category)) ||
      (params?.tag && post.tags.includes(params?.tag)) ||
      (params?.limit && counter < params?.limit)
    ) {
      counter++;
      getPosts.push(post);
    }
  });
  return getPosts;
}

/*
export function getPostsPaginated(params?: any) {
  if (!params?.limit) {
    return posts;
  }
  const getPosts: any = [];
  let counter = 0;
  posts.map((post: any) => {
    if (counter < params?.limit) {
      counter++;
      getPosts.push(post);
    }
  });
  return getPosts;
}
*/
```

Now I need to adapt `blog/pages/posts/index.tsx` and `blog/pages/index.tsx`:

```typescript
// blog/pages/posts/index.tsx

import Home from '../index';
import { getPosts } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: 3 });

  /* Keep the existing code here */
```

```typescript
// blog/pages/index.tsx

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: 3 });

  /* Keep the existing code here */
```

Similarly I don't want to have these two functions `getAllPostIds` and `getPostsPaginatedIds` but instead only one `getAllPostIds`, so in `blog/lib/posts.tsx`:
