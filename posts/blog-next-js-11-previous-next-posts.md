---
title: 'Blog - Next.js - Chapter #11 - Previous and Next Posts Navigation'
excerpt: 'In this chapter I cover previous and next posts navigation.'
date: '2025-06-27'
categories: ['nextjs']
tags: ['nextjs', 'typescript', 'pagination']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-11-previous-next-post-nav'
draft: false
---

## 11.1 New Posts Navigation component

I want to add new component `components\PostsNavigation.tsx`, I can find the source code online [https://github.com/qbreis/blog/blob/main/components/PostsNavigation.tsx](https://github.com/qbreis/blog/blob/main/components/PostsNavigation.tsx).

## 11.2 Include new Posts Navigation component

I include new posts navigation compoennt in `blog\pages\posts\[id].tsx`:

```typescript
/* Keep the existing code here */

import { 
  getAllPostIds, 
  getPostData, 
  getPosts // ........ To get posts for navigation
} from '../../lib/posts';
import PostsNavigation from '../../components/PostsNavigation'; // ........ Importing the PostsNavigation component
import { newLinesIntoParagraphs } from '../../lib/functions';

export default function Post({ 
  postData,
  posts // ........ If I want to use posts for navigation, I can pass them here
}: any) {
  if (!postData) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout>

      {/* ........ Add navigation to previous and next posts */}
      <PostsNavigation posts={posts} currentPostId={postData.id} />

/* Keep the existing code here */

      {/* ........ Add navigation to previous and next posts */}
      <PostsNavigation posts={posts} currentPostId={postData.id} />

    </Layout>

/* Keep the existing code here */


export async function getStaticProps({ params }: any) {
  const postData = await getPostData(params.id);
  const posts = getPosts(); // ........ get full list of posts here
  return {
    props: {
      postData,
      posts, // ........ Pass the posts to the component for navigation
    },
  };
}
```

## 11.3 Style Posts Navigation component

I add to `blog\styles\site\_site.scss`:

```scss
/* Keep the existing code here */

@import 'posts-nav-prev-next'; // ........ Posts navigation (prev/next)

@import 'footer';
```

And new scss file `blog\styles\site\_posts-nav-prev-next.scss`, I can find the source code online [https://github.com/qbreis/blog/blob/main/styles/site/_posts-nav-prev-next.scss](https://github.com/qbreis/blog/blob/main/styles/site/_posts-nav-prev-next.scss).