---
title: 'Blog - Next.js - Chapter #10 - Pagination'
excerpt: 'In this chapter I cover pagination functionality for list of posts.'
date: '2021-09-24'
categories: ['nextjs']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

I found this quite useful for my purpose, although it is not a master class at all, it gives me some useful clues for what I want:

[Next.js SSG(static site generation) : getStaticProps(), getStaticPaths(), pagination and ISR](https://www.youtube.com/watch?v=kawwRJO5yZ8)

For a better understanding I am going to focus more on _how_ than _what_ and from there I will try to refactor the best I know.

## 10.1 Get only 3 posts (limit)

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

I also need to do in `blog/pages/posts/index.tsx`:

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

## 10.3 Refactoring `getPosts` and `getAllPostIds`

I don't want to have these two functions `getPosts` and `getPostsPaginated` but instead only one `getPosts`.

By now I don't want to paginate list of categories or paths, so in `blog/lib/posts.tsx`:

```typescript
export function getPosts(params?: any) {
  if (!params?.category && !params?.tag && !params?.limit) {
    return posts;
  }
  let getPosts = posts
    .map((post: any) => {
      return (params?.category && post.categories.includes(params?.category)) ||
        (params?.tag && post.tags.includes(params?.tag))
        ? post
        : '';
    })
    .filter((element) => {
      return element !== '';
    });
  return params?.limit ? posts.slice(0, params?.limit) : getPosts;
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

```typescript
/*
export function getPostsPaginatedIds() {
  return getPosts({ limit: 3 }).map((post: any) => {
    return {
      params: {
        id: post.id,
      },
    };
  });
}
*/

export function getAllPostIds(params?: any) {
  // Returns an array of possible value for id that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  /*
  Important: The returned list is not just an array of strings —
  it must be an array of objects that look like the comment above.
  Each object must have the params key and contain an object with
  the id key (because we’re using [id] in the file name).
  Otherwise, getStaticPaths in pages/posts/[id].tsx will fail.
  */
  return params?.limit
    ? getPosts({ limit: params?.limit }).map((post: any) => {
        return {
          params: {
            id: post.id,
          },
        };
      })
    : fileNames.map((fileName) => {
        return {
          params: {
            id: fileName.replace(/\.md$/, ''),
          },
        };
      });
}
```

And then in `blog/pages/posts/[id].tsx`:

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Link from 'next/link';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
import { getAllPostIds, getPostData } from '../../lib/posts';
// import { getPostsPaginatedIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  /* Keep the existing code here */
}

export async function getStaticPaths() {
  const paths = getAllPostIds({ limit: 3 });
  //const paths = getPostsPaginatedIds();
  return {
    paths,
    fallback: 'blocking',
  };
}

/* Keep the existing code here */
```

Also `blog/pages/posts/index.tsx`:

```typescript
// blog/pages/posts/index.tsx

import Home from '../index';
import { getPosts } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: 3 });
  return {
    props: {
      posts,
    },
  };
}

export default Home;
```

## 10.4 Get only 3 posts (limit) starting at 4 (start)

Preventing what I will need for pagination, not only do I want to get 3 posts (limit), but I also want to specify from how many (start).

So in `blog/lib/posts.tsx`:

```typescript
/* Keep the existing code here */

export function getPosts(params?: any) {
  if (!params?.category && !params?.tag && !params?.limit) {
    return posts;
  }

  let getPosts = posts
    .map((post: any) => {
      return (params?.category && post.categories.includes(params?.category)) ||
        (params?.tag && post.tags.includes(params?.tag))
        ? post
        : '';
    })
    .filter((element) => {
      return element !== '';
    });

  return params?.limit
    ? posts.slice(params?.start ? params?.start : 0, params?.limit)
    : getPosts;
}

/* Keep the existing code here */

export function getAllPostIds(params?: any) {
  return params?.limit
    ? getPosts({
        limit: params?.limit,
        start: params?.start ? params?.start : 0,
      }).map((post: any) => {
        return {
          params: {
            id: post.id,
          },
        };
      })
    : fileNames.map((fileName) => {
        return {
          params: {
            id: fileName.replace(/\.md$/, ''),
          },
        };
      });
}

/* Keep the existing code here */
```

And then also update in `blog/pages/index.tsx` and `blog/pages/posts/index.tsx` to set start to 4:

```typescript
export async function getStaticProps() {
  const posts = getPosts({ limit: 3, start: 4 });
  return {
    props: {
      posts,
    },
  };
}
```

I want to set pagination limit in `blog/next.config.js`:

```javascript
env: {
  siteInfoTitle: siteInfoTitle,
  siteInfoDescription: siteInfoDescription,
  paginationLimit: 3,
},
```

And then in `blog/pages/posts/index.tsx` and `blog/pages/index.tsx`, in `getStaticProps`:

```typescript
const posts = getPosts({ limit: process.env.paginationLimit, start: 4 });
```

## 10.5 Api endpoint

I prepare api endpoint in `blog/pages/api/posts/[page].tsx`:

```typescript
// blog/pages/api/posts/[page].tsx
import type { NextApiRequest, NextApiResponse } from 'next';
import { getPosts } from '../../../lib/posts';

export default function getPaginatedPosts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const posts = getPosts({
    limit: process.env.paginationLimit,
    start: req.query.page ? req.query.page : 0,
  });
  res.status(200).json({ posts, method: req.method });
}
```

So now, having set pagination limit to 3 posts I can browse [http://localhost:3000/api/posts](http://localhost:3000/api/posts) to get first three posts and after I can browse [http://localhost:3000/api/posts/3](http://localhost:3000/api/posts/3) to get next three posts in the list and [http://localhost:3000/api/posts/6](http://localhost:3000/api/posts/6) to get next and so on.

I still want to adjust page to browse [http://localhost:3000/api/posts](http://localhost:3000/api/posts) to get first three posts and [http://localhost:3000/api/posts/2](http://localhost:3000/api/posts/2) to get next three, so what comes after [http://localhost:3000/api/posts/](http://localhost:3000/api/posts/) to be the _page_ instead of _start_, so in `blog/pages/api/posts/[page].tsx`, when I specify start I do:

```typescript
start: req.query.page
  ? (Number(req.query.page) - 1) * Number(process.env.paginationLimit)
  : 0;
```

## 10.6 Load more posts

I add in `blog/components/Posts.tsx` after unordered list `<ul>` of posts, a button to load more posts:

```typescript
/* Keep the existing code here */
</ul>
<button onClick={loadMorePosts}>Load more posts</button>
/* Keep the existing code here */
```

In order to load more posts I want to use two state variables; one to hold the page number which will be `paginationPage` and it will be set initially to `1`, and yet another one to hold the posts to add to the list, which will be `listOfPosts` and it will be set initially to `posts`.

So in `blog/components/Posts.tsx`:

```typescript
// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';

import { useState } from 'react';

export default function Posts({ posts }: any) {
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
        paginationPage: {paginationPage}
        <br />
        posts: {listOfPosts.length} out of 10
      </p>
      <ul>
/* Keep the existing code here */
```

I also want to know total of posts, for that purpose I update `/* 1 */` in `blog/pages/index.tsx`:

```typescript
// blog/pages/index.tsx

import Layout from '../components/Layout';
import Posts from '../components/Posts';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts({ limit: process.env.paginationLimit, start: 0 });
  const totalOfPosts = getPosts().length; /* 1 */
  return {
    props: {
      posts,
      totalOfPosts /* 1 */,
    },
  };
}

export default function Home({ posts, totalOfPosts }: any) {
  /* 1 */
  return (
    <Layout home>
      <div className="excerpt">{process.env.siteInfoDescription}</div>
      <section className="all-post-data">
        {/* Add totalOfPosts attribute to Posts component */
        /* 1 */}
        <Posts posts={posts} totalOfPosts={totalOfPosts} />
      </section>
    </Layout>
  );
}
```

And then in `blog/components/Posts.tsx`:

```typescript
/* Keep the existing code here */

export default function Posts({ posts, totalOfPosts }: any) {

/* Keep the existing code here */

  return (
    <>
      <p className="pagination">
        {listOfPosts.length} posts out of {totalOfPosts}
      </p>

/* Keep the existing code here */
```

## 10.7 Component 'Load more posts'

I create new file `blog/components/Pagination.tsx`:

```typescript
//blog/components/Pagination.tsx
export default function Pagination({
  listOfPosts,
  totalOfPosts,
  onClick,
}: any) {
  return (
    <>
      {listOfPosts.length < totalOfPosts && ( // I only want to show this if there is something to show
        <p className="pagination">
          Showing {listOfPosts.length} posts out of {totalOfPosts}
          {onClick && <span onClick={onClick}>Load more posts</span>}
        </p>
      )}
    </>
  );
}
```

and I update `blog/components/Posts.tsx`:

```typescript
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
```

> Note that I want to read how many posts are showing out of how many, on the top, before the unordered list and at the end, and I want to show button 'Load more posts' only at the bottom, and only when there are more posts to load.
