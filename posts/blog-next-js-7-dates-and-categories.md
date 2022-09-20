---
title: 'Blog - Next.js - Chapter #7 - Dates and categories'
excerpt: 'In this chapter I add the date for each single post in list of posts as well as in every single post page after the title.'
date: '2021-09-19'
categories: ['nextjs', 'test']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-6-header-and-footer'
draft: false
---

## 7.1 Date Component

I want to ceate a Date Component to show for each post the date. Keep following tutorial indications in [Polishing the Post Page - Formatting the Date](https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page) I install date-fns library in order to format the date:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-7) $ yarn add date-fns</code></pre>

I create Date Component in `blog/components/Date.tsx`:

```typescript
// blog/components/Date.tsx

import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: any) {
  const date = parseISO(dateString);
  return (
    <ul className="posted-on">
      <li>
        <time className="entry-date published" dateTime={dateString}>
          {format(date, 'LLLL d, yyyy')}
        </time>
      </li>
    </ul>
  );
}
```

I want to add the post date for each post in list of posts `/* 1 */`:

```typescript
// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date'; /* 1 */

export default function Posts({ posts }: any) {
  return (
    <ul>
      {posts.map((post: any) => {
        return (
          post.id && (
            <li key={post.id}>
              <h2 className="h4">
                <Link href={`/posts/${post.id}`}>
                  <a>{post.title}</a>
                </Link>
              </h2>

              {/* 1 */}
              <Date dateString={post.date} />
            </li>
          )
        );
      })}
    </ul>
  );
}
```

To show the date in single post page, I update `blog/pages/posts/[id].tsx`:

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        <h1>{postData.title}</h1>
        <div className="entry-meta">
          <Date dateString={postData.date} />
        </div>
        <div className="excerpt">{postData.excerpt}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

## 7.2 Categories Component

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
            <li key={post.id}>
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

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';

import { getAllPostIds, getPostData } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        <h1>{postData.title}</h1>
        <div className="entry-meta">
          <Date dateString={postData.date} />
          <Categories categories={postData.categories} />
        </div>
        <div className="excerpt">{postData.excerpt}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}
```

### 7.2.1 Category page with posts list

I want one page for each category showing list of all posts with this one category.

I start adding following code to `blog/lib/posts.tsx` to get all categories:

```typescript
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

console.log(allCategories);

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

## Reference links

- [Polishing the Post Page](https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page) - Formatting the Date

## External links

- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library.
