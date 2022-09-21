---
title: 'Blog - Next.js - Chapter #5 - Markdown'
excerpt: 'In this chapter I read all Markdown posts and adapt to Html.'
date: '2021-09-12'
categories: ['nextjs']
tags: ['nextjs', 'typescript', 'markdown', 'yaml']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-5-markdown'
draft: false
---

## 5.1 List of MD posts

I create one first post in Markdown into `blog/posts\hola-world.md`:

```md
---
title: 'Hola world'
excerpt: 'Excerpt test for hola mundo'
date: '2022-07-08'
categories: ['nextjs', 'bulma', 'test']
tags: ['dos', 'tres', 'cuatro']
draft: true
---

## This is an example blog post

This is sample content. The section above is called Frontmatter where we can add post metadata like title and date. You can add as little or as many properties in the frontmatter using YAML syntax.
```

Each markdown file has a metadata section at the top containing title and date among other parameters or keywords. This is called YAML Front Matter, which can be parsed using a library called [gray-matter](https://github.com/jonschlinkert/gray-matter).

Now, following tutorial indications in [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching/blog-data) I install gray-matter to parse the metadata in each Markdown file:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-5-markdown) $ yarn add gray-matter</code></pre>

I also create file and folder `blog/lib/posts.tsx`:

```typescript
import fs from 'fs'; // fs is a Node.js module that let's you read files from the file system. /* 1 */
import path from 'path'; // path is a Node.js module that let's you manipulate file paths. /* 2 */
import matter from 'gray-matter'; // matter is a library that let's you parse the metadata in each markdown file./* 3 */

/*********************
Posts
*/

const postsDirectory = path.join(process.cwd(), 'posts'); /* 2 */

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory); /* 1 */

const posts = fileNames.map((fileName) => {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '');

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName); /* 2 */
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents); /* 3 */

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
});

// Sort posts by date
posts.sort(({ date: a }: any, { date: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

/*********************
Functions
*/

export function getPosts() {
  const getPosts = posts.map((post: any) => {
    return post;
  });
  return getPosts;
}
```

And finally I update `blog/pages/index.tsx` to show list of all posts:

```typescript
import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  return (
    <Layout>
      <section className="all-post-data">
        <ul>
          {posts.map((post: any) => {
            return (
              post.id && (
                <li key={post.id}>
                  <h2 className="h4">
                    {post.title} ({post.id}) - {post.date}
                    <hr />
                  </h2>
                </li>
              )
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
```

## 5.2 Single MD post - Dynamic Routes

Following [Dynamic Routes - Page Path Depends on External Data](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data), I update now `blog/lib/posts.tsx` with `getAllPostIds` `/* 4 */` and `getPostData` `/* 5 */` functions:

```typescript
import fs from 'fs'; // fs is a Node.js module that let's you read files from the file system. /* 1 */
import path from 'path'; // path is a Node.js module that let's you manipulate file paths. /* 2 */
import matter from 'gray-matter'; // matter is a library that let's you parse the metadata in each markdown file./* 3 */

/*********************
Posts
*/

const postsDirectory = path.join(process.cwd(), 'posts'); /* 2 */

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory); /* 1 */

const posts = fileNames.map((fileName) => {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '');

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName); /* 2 */
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents); /* 3 */

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
});

// Sort posts by date
posts.sort(({ date: a }: any, { date: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

/*********************
Functions
*/

export function getPosts() {
  const getPosts = posts.map((post: any) => {
    return post;
  });
  return getPosts;
}

export function getAllPostIds() {
  /* 4 */
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
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: any) {
  /* 5 */
  // Fetch necessary data for the blog post using params.id
  // in pages/posts/[id].tsx.
  // Return the post data based on id.
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id and contentHtml
  return {
    id,
    ...matterResult.data,
  };
}
```

Now I create new file and folder `blog/pages/posts/[id].tsx`:

```typescript
import Layout from '../../components/Layout';
import { getAllPostIds /* 1 */, getPostData /* 2 */ } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds(); /* 1 */
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id); /* 2 */
  return {
    props: {
      postData,
    },
  };
}
```

I will finally update `blog/pages/index.tsx` to add a link `/* 1 */` to each single post:

```typescript
import Link from 'next/link'; /* 1 */
import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  return (
    <Layout>
      <section className="all-post-data">
        <ul>
          {posts.map((post: any) => {
            return (
              post.id && (
                <li key={post.id}>
                  <h2 className="h4">
                    {/* 1 */}
                    <Link href={`/posts/${post.id}`}>
                      <a>
                        {post.title} - {post.date}
                      </a>
                    </Link>
                  </h2>
                </li>
              )
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
```

## 5.3 Markdown

Following [Render Markdown](https://nextjs.org/learn/basics/dynamic-routes/render-markdown) suggestions I install [remark](https://github.com/remarkjs/remark):

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-5-markdown) $ yarn add remark remark-html</code></pre>

I update `blog/lib/posts.tsx` to convert markdown into HTML string using remark library `/* 6 */`:

```typescript
import fs from 'fs'; // fs is a Node.js module that let's you read files from the file system. /* 1 */
import path from 'path'; // path is a Node.js module that let's you manipulate file paths. /* 2 */
import matter from 'gray-matter'; // matter is a library that let's you parse the metadata in each markdown file./* 3 */

import { remark } from 'remark'; // remark is a library to render Markdown /* 6 */
import html from 'remark-html';

/*********************
Posts
*/

const postsDirectory = path.join(process.cwd(), 'posts'); /* 2 */

// Get file names under /posts
const fileNames = fs.readdirSync(postsDirectory); /* 1 */

const posts = fileNames.map((fileName) => {
  // Remove ".md" from file name to get id
  const id = fileName.replace(/\.md$/, '');

  // Read markdown file as string
  const fullPath = path.join(postsDirectory, fileName); /* 2 */
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents); /* 3 */

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
});

// Sort posts by date
posts.sort(({ date: a }: any, { date: b }: any) => {
  if (a < b) {
    return 1;
  } else if (a > b) {
    return -1;
  } else {
    return 0;
  }
});

/*********************
Functions
*/

export function getPosts() {
  const getPosts = posts.map((post: any) => {
    return post;
  });
  return getPosts;
}

export function getAllPostIds() {
  /* 4 */
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
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: any) {
  /* 5 */
  // Fetch necessary data for the blog post using params.id
  // in pages/posts/[id].tsx.
  // Return the post data based on id.
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string /* 6 */
  const processedContent = await remark()
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
```

Now I update `blog/pages/posts/[id].tsx`:

```typescript
import Layout from '../../components/Layout';
import { getAllPostIds /* 1 */, getPostData /* 2 */ } from '../../lib/posts';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <h1>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds(); /* 1 */
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  // Fetch necessary data for the blog post using params.id
  const postData = await getPostData(params.id); /* 2 */
  return {
    props: {
      postData,
    },
  };
}
```

I want each single post to be optionally attached to a GitHub repo. For that I add corresponding repository keyword into my gray-matter for each post and I update `blog/pages/posts/[id].tsx`:

```typescript
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
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
        {/* Keep the existing code here */}
```

## 5.4 Component Posts for posts list

I create new component `blog/components/Posts.tsx`:

```typescript
import Link from 'next/link';

const Posts = ({ posts }: any) => {
  return (
    <ul>
      {posts.map((post: any) => {
        return (
          post.id && (
            <li key={post.id}>
              <h2 className="h4">
                <Link href={`/posts/${post.id}`}>
                  <a>
                    {post.title} - {post.date}
                  </a>
                </Link>
              </h2>
            </li>
          )
        );
      })}
    </ul>
  );
};

export default Posts;
```

And I import into `blog/pages/index.tsx` - `/* 1 */`:

```typescript
// import Link from 'next/link';
import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';
import Posts from '../components/Posts'; /* 1 */

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  return (
    <Layout>
      <section className="all-post-data">
        {/* 1 */}
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}
```

I can now update the annotations on how I'm building this blog.

## Reference links

- [Pre-rendering and Data Fetching](https://nextjs.org/learn/basics/data-fetching/blog-data) - Installing gray-matter.
- [Dynamic Routes](https://nextjs.org/learn/basics/dynamic-routes/page-path-external-data) - Page Path Depends on External Data.
- [Render Markdown](https://nextjs.org/learn/basics/dynamic-routes/render-markdown) - How to transform Markdown into Html.

## External links

- [Markdown - Wikipedia](https://en.wikipedia.org/wiki/Markdown).
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Parse front-matter from a string or file. Fast, reliable and easy to use. Parses YAML front matter by default.
- [YAML](https://en.wikipedia.org/wiki/YAML) - Yet Another Markup Language, repurposed as YAML Ain't Markup Language, a [recursive acronym](https://en.wikipedia.org/wiki/Recursive_acronym).
- [remark](https://github.com/remarkjs/remark) - Library to render Markdown.
