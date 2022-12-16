---
title: 'Blog - Next.js - Chapter #9 - Tags'
excerpt: 'In this chapter I add the tags for each single post in list of posts as well as in every single post page after the title. I also add page to list all post for one single tag as well as the page with list of all tags.'
date: '2021-09-21'
categories: ['nextjs', 'test']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-9-tags'
draft: false
---

## 9.1 Component Tags

I create new Component to show tags for each post, `blog/components/Tags.tsx`:

```typescript
// blog/components/Tags.tsx

import Link from 'next/link';

export default function Tags({ tags }: any) {
  if (!tags) {
    return <></>;
  }
  return (
    <ul className="post-tags">
      {tags?.map((postTag: any) => (
        <li key={`${postTag}`}>
          <Link href={`/tags/${postTag}`}>
            <a>{postTag}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
```

And then I update `blog/components/Posts.tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 5 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 21 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';
import Tags from '../components/Tags';

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
              <Tags tags={post.tags} />
            </li>
          )
        );
      })}
    </ul>
  );
}
```

To show tags in single post page, I update `blog/pages/posts/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 7 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 34 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/pages/posts/[id].tsx

import Link from 'next/link';
import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';
import Tags from '../../components/Tags';
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
          <Tags tags={postData.tags} />
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

## 9.2 Tags page with posts list

I want one page for each tag showing list of all posts with this one tag.

At this point I find small thing to refactor and that is; in `blog/lib/posts.tsx` function `getPosts` now has optionally one param to specify one single category and now I want to specify, optionally, one single category or one single tag, so I will refactor this function as follows:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 0 + 10px);height: calc(1.26em * 2);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 7 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
export function getPosts(params?: any) {
  if (!params?.category && !params?.tag) {
    return posts;
  }
  const getPosts: any = [];
  posts.map((post: any) => {
    if (
      (params?.category && post.categories.includes(params?.category)) ||
      (params?.tag && post.tags.includes(params?.tag))
    ) {
      getPosts.push(post);
    }
  });
  return getPosts;
}
```

Still in the same `blog/lib/posts.tsx` file:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 4 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
// count number of posts for each category
const categories = allCategories.map((category: any) => {
  return {
    id: category,
    // posts: getPosts(category).length,
    posts: getPosts({ category: category }).length,
  };
});
```

And in `blog/pages/categories/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 3 + 10px);height: calc(1.26em * 2);"></div>
</div>

```typescript
export async function getStaticProps({ params }: any) {
  const postsByCategoryData = {
    id: params.id,
    // allPostsData: getPosts(params.id),
    allPostsData: getPosts({ category: params.id }),
  };
  return {
    props: {
      postsByCategoryData,
    },
  };
}
```

Now I can add following code to `blog/lib/posts.tsx` to get all tags:

```typescript
/*********************
Tags
*/

const allTags: any = [];

// get all tags like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.tags.map((postTag: any) => {
    if (!allTags.includes(postTag)) {
      allTags.push(postTag);
    }
  });
});

export function getAllTagIds() {
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
  Otherwise, getStaticPaths in pages/tags/[id].tsx will fail.
  */
  return allTags.map((tag: any) => {
    return {
      params: {
        id: tag,
      },
    };
  });
}
```

Now I can create new `blog/pages/tags/[id].tsx`:

```typescript
// blog/pages/tags/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Posts from '../../components/Posts';

import { getAllTagIds, getPosts } from '../../lib/posts';

export default function Tag({ postsByTagData }: any) {
  return (
    <Layout>
      <MetaData
        title={`Tag: ${postsByTagData.id}`}
        description={`Posts by tag ${postsByTagData.id}`}
      />
      <h2 className="h1">Tag: {postsByTagData.id}</h2>
      <div className="entry-meta posted-on">
        {postsByTagData.allPostsData.length == 1
          ? postsByTagData.allPostsData.length + ' post'
          : postsByTagData.allPostsData.length + ' posts'}
      </div>
      <section className="all-post-data">
        <Posts posts={postsByTagData.allPostsData} />
      </section>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllTagIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const postsByTagData = {
    id: params.id,
    allPostsData: getPosts({ tag: params.id }),
  };
  return {
    props: {
      postsByTagData,
    },
  };
}
```

## 9.3 Tags page with all tags list

I also want one page to list all tags, this will be [localhost:3000/tags](localhost:3000/tags) which now is one page not found.

First I will add some functions to `blog/lib/posts.tsx` to count number of posts for each tag, sort by number of posts for each tag and get all tags list:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 17 + 10px);height: calc(1.26em * 7);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 25 + 10px);height: calc(1.26em * 10);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 36 + 10px);height: calc(1.26em * 3);"></div>
</div>

```typescript
/* Keep the existing code here */

/*********************
Tags
*/

const allTags: any = [];

// get all tags like this: [ 'nextjs', 'test' ]
posts.map((post: any) => {
  post.tags.map((postTag: any) => {
    if (!allTags.includes(postTag)) {
      allTags.push(postTag);
    }
  });
});

// count number of posts for each category
const tags = allTags.map((tag: any) => {
  return {
    id: tag,
    posts: getPosts({ tag: tag }).length,
  };
});

// sort by number of posts for each category
tags.sort(({ posts: a }: any, { posts: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

export function getTags() {
  return tags;
}

export function getAllTagIds() {

/* Keep the existing code here */
```

And `blog/pages/tags/index.tsx`:

```typescript
// blog/pages/tags/index.tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import { getTags } from '../../lib/posts';
import Link from 'next/link';

export default function catHome({ allTagIds }: any) {
  return (
    <Layout>
      <MetaData title="List of tags" description="List of tags" />
      <h2 className="h1">List of tags</h2>

      <div className="entry-meta posted-on">
        {allTagIds.length == 1
          ? allTagIds.length + ' tag'
          : allTagIds.length + ' tags'}
      </div>

      <section className="all-post-data">
        <ul>
          {allTagIds?.map((postTag: any) => (
            <li key={`${postTag.id}`}>
              <h2 className="h4">
                <Link href={`/tags/${postTag.id}`}>
                  <a>{postTag.id}</a>
                </Link>
              </h2>
              <div className="posted-on">
                {postTag.posts == 1
                  ? postTag.posts + ' post'
                  : postTag.posts + ' posts'}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allTagIds = getTags();
  return {
    props: {
      allTagIds,
    },
  };
}
```
