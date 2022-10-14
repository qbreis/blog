---
title: 'Blog - Next.js - Chapter #7 - Dates'
excerpt: 'In this chapter I add the date for each single post in list of posts as well as in every single post page after the title.'
date: '2021-09-19'
categories: ['nextjs', 'test']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-7-dates'
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

I want to add the post date for each post in list of posts:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 3 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 17 + 10px);height: calc(1.26em * 1);"></div>
</div>

```typescript
// blog/components/Posts.tsx

import Link from 'next/link';
import Date from '../components/Date';

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
            </li>
          )
        );
      })}
    </ul>
  );
}
```

To show the date in single post page, I update `blog/pages/posts/[id].tsx`:

<div class="hljs-wrapper">
<div class="hljs-lines" style="top: calc(1.26em * 5 + 10px);height: calc(1.26em * 1);"></div>
<div class="hljs-lines" style="top: calc(1.26em * 29 + 10px);height: calc(1.26em * 3);"></div>
</div>

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Link from 'next/link';
import Date from '../../components/Date';
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

## Reference links

- [Polishing the Post Page](https://nextjs.org/learn/basics/dynamic-routes/polishing-post-page) - Formatting the Date

## External links

- [date-fns](https://date-fns.org/) - Modern JavaScript date utility library.
