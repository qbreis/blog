---
title: 'Blog - Next.js - Chapter #8 - Categories'
excerpt: 'In this chapter I add the categories for each single post in list of posts as well as in every single post page after the title. I also add page to list all post for one single category as well as the page with list of all categories.'
date: '2021-09-22'
categories: ['nextjs', 'test']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-8-categories'
draft: false
---

## 8.1 Component Categories

I create new Component to show categories for each post, `blog/components/Categories.tsx`:

```typescript
// blog/components/Categories.tsx

import Link from 'next/link';

export default function Categories({ categories }: any) {
  if (!categories) {
    return <></>;
  }
  return (
    <ul className="post-categories">
      {categories?.map((postCategory: any) => (
        <li key={`${postCategory}`}>
          <Link href={`/categories/${postCategory}`}>
            <a>{postCategory}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

And then I update `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 4 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 19 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';

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
            </li>
          )
        );
      })}
    </ul>
  );
}
```

To show categories in single post page, I update `blog/pages/posts/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 6 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 32 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/pages/posts/[id].tsx

import Link from 'next/link';
import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';
import { getAllPostIds, getPostData } from '../../lib/posts';
import { newLinesIntoParagraphs } from '../../lib/functions';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        {postData.repository && (
          <>
            <span style={{ fontSize: '0.7em' }}>Repository: </span>
            <Link href={postData.repository}>
              <a
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '0.7em', textDecoration: 'none' }}
              >
                {postData.repository}
              </a>
            </Link>
          </>
        )}
        <h1>{postData.title}</h1>
        <div className="entry-meta">
          <Date dateString={postData.date} />
          <Categories categories={postData.categories} />
        </div>
        <div className="excerpt">
          {newLinesIntoParagraphs(postData.excerpt)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

/* Keep the existing code here */
```

## 8.2 Category page with posts list

I want one page for each category showing list of all posts with this one category.

I start adding following code to `blog/lib/posts.tsx` to get all categories:

```typescript
/* Keep the existing code here */

/*********************
Categories
*/

const allCategories: any = [];

// get all categories like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.categories.map((postCategory: any) => {
    if (!allCategories.includes(postCategory)) {
      allCategories.push(postCategory);
    }
  });
});

export function getAllCategoryIds() {
  // Returns an array of possible value for id that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'nextjs'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'test'
  //     }
  //   }
  // ]
  /*
  Important: The returned list is not just an array of strings —
  it must be an array of objects that look like the comment above.
  Each object must have the params key and contain an object with
  the id key (because we’re using [id] in the file name).
  Otherwise, getStaticPaths in pages/categories/[id].tsx will fail.
  */
  return allCategories.map((category: any) => {
    return {
      params: {
        id: category,
      },
    };
  });
}
```

Now I create new file and folder `pages\categories\[id].tsx`:

```typescript
// blog/pages/categories/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';

import { getAllCategoryIds } from '../../lib/posts';

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Category: ${postsByCategoryData.id}`}
        description={`Posts by category ${postsByCategoryData.id}`}
      />
      <h2 className="h1">Category: {postsByCategoryData.id}</h2>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategoryIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByCategoryData = {
    id: params.id,
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}
```

In `blog/lib/posts.tsx`, function `getPosts` now retrieves all posts, I want, optionally, to return all posts for one category. So I update `blog/lib/posts.tsx`:

```typescript
export function getPosts(categoryId?: any) {
  if (!categoryId) {
    return posts;
  }
  const getPosts: any = [];
  posts.map((post: any) => {
    if (post.categories.includes(categoryId)) {
      getPosts.push(post);
    }
  });
  return getPosts;
}
```

Now in `blog/pages/categories/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 4 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 6 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 17 + 10px);height: calc(1.26em * 8);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 40 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/pages/categories/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Posts from '../../components/Posts'; /* 1 */

import { getAllCategoryIds /* 2 */, getPosts /* 3 */ } from '../../lib/posts';

export default function Category({ postsByCategoryData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Category: ${postsByCategoryData.id}`}
        description={`Posts by category ${postsByCategoryData.id}`}
      />
      <h2 className="h1">Category: {postsByCategoryData.id}</h2>

      <div className="entry-meta posted-on">
        {postsByCategoryData.allPostsData /* 4 */.length == 1
          ? postsByCategoryData.allPostsData /* 4 */.length + ' post'
          : postsByCategoryData.allPostsData /* 4 */.length + ' posts'}
      </div>
      <section className="all-post-data">
        <Posts /* 1 */ posts={postsByCategoryData.allPostsData /* 4 */} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllCategoryIds(); /* 2 */
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByCategoryData = {
    id: params.id,
    allPostsData /* 4 */: getPosts(params.id) /* 3 */,
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}
```

## 8.3 Category page with all categories list

I also want one page to list all categories, this will be [localhost:3000/categories](localhost:3000/categories) which now is one page not found.

First I will add some functions to `blog/lib/posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 17 + 10px);height: calc(1.26em * 7);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 25 + 10px);height: calc(1.26em * 10);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 36 + 10px);height: calc(1.26em * 3);"></div>
</div>

```typescript
/* Keep the existing code here */

/*********************
Categories
*/

const allCategories: any = [];

// get all categories like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.categories.map((postCategory: any) => {
    if (!allCategories.includes(postCategory)) {
      allCategories.push(postCategory);
    }
  });
});

// count number of posts for each category
const categories = allCategories.map((category: any) => {
  return {
    id: category,
    posts: getPosts(category).length,
  };
});

// sort by number of posts for each category
categories.sort(({ posts: a }: any, { posts: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

export function getCategories() {
  return categories;
}

export function getAllCategoryIds() {

/* Keep the existing code here */
```

And `blog/pages/categories/index.tsx`:

```typescript
// blog/pages/categories/index.tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import { getCategories } from '../../lib/posts';
import Link from 'next/link';

export default function catHome({ allCategoryIds }: any) {
  return (
    <Layout>
      <MetaData title="List of categories" description="List of categories" />
      <h2 className="h1">List of categories</h2>

      <div className="entry-meta posted-on">
        {allCategoryIds.length == 1
          ? allCategoryIds.length + ' category'
          : allCategoryIds.length + ' categories'}
      </div>

      <section className="all-post-data">
        <ul>
          {allCategoryIds?.map((postCategory: any) => (
            <li key={`${postCategory.id}`}>
              <h2 className="h4">
                <Link href={`/categories/${postCategory.id}`}>
                  <a>{postCategory.id}</a>
                </Link>
              </h2>
              <div className="posted-on">
                {postCategory.posts == 1
                  ? postCategory.posts + ' post'
                  : postCategory.posts + ' posts'}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCategoryIds = getCategories();
  return {
    props: {
      allCategoryIds,
    },
  };
}
```

## 8.4 Index page with all posts list

Similarly, now I realize, route [localhost:3000/posts](localhost:3000/posts) is also a 404 page not found. I can solve that by creating a new index file in `blog/pages/posts/index.tsx` as follows:

```typescript
// blog/pages/posts/index.tsx

import Home from '../index';
import { getPosts } from '../../lib/posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default Home;
```
