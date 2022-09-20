---
title: 'Blog - Next.js - Chapter #6 - Header, Footer and MetaData'
excerpt: 'In this chapter I arrange Header, Footer and MetaData Components.'
date: '2021-09-14'
categories: ['nextjs', 'test']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-6-header-and-footer'
draft: false
---

## 6.1 Header

```typescript
// blog/components/Header.tsx

import Image from 'next/image';

export default function Header() {
  /*return (
    <header className="site-header">site-header in Hedaer Component</header>
  );*/

  return (
    <header className="site-header">
      <Image
        priority
        src="/images/favicon.svg"
        height={40}
        width={40}
        alt={'qbreis — enric gatell'}
        className="color-text-screen-filter"
      />
      <h1>qbreis — enric gatell</h1>
    </header>
  );
}
```

I want to link the header logo and site title on top left, but not when we are already in home page.

First I update `blog/pages/index.tsx` to pass prop home as attribute home to Layout component `/* 1 */`:

```typescript
// blog/pages/index.tsx

import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';
import Posts from '../components/Posts';

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }: any) {
  // I pass prop home as attribute home to Layout component: <Layout home> /* 1 */
  return (
    <Layout home>
      <section className="all-post-data">
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}
```

Now I update `blog/components/Layout.tsx` to get prop home and pass as attribute home to Header component `/* 1 */`:

```typescript
// blog/components/Layout.tsx

import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

// Layout component expect a prop called home: Layout({ children, home }: any) /* 1 */
export default function Layout({ children, home }: any) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="site-container">
      <MetaData />
      {/* I pass prop home as attribute home to Header component: <Header home={home} /> */
      /* 1 */}
      <Header home={home} />
      <main className="site-main">{children}</main>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <Footer />
    </div>
  );
}
```

Finally, in `blog/components/Header.tsx` - `/* 1 */`:

```typescript
// blog/components/Header.tsx

import Image from 'next/image';

// Header component expect a prop called home: Header({ home }: any) /* 1 */
export default function Header({ home }: any) {
  return (
    <header className="site-header">
      <Image
        priority
        src="/images/favicon.svg"
        height={40}
        width={40}
        alt={'qbreis — enric gatell'}
        className="color-text-screen-filter"
      />
      <h1>
        {/* I get home prop: {home ? 'Y' : 'N'} */
        /* 1 */}
        qbreis — enric gatell - home is {home ? 'Y' : 'N'}
      </h1>
    </header>
  );
}
```

Now I can link header logo and site title on top left when we are not in home page:

```typescript
// blog/components/Header.tsx

import Image from 'next/image';
import Link from 'next/link';

// Header component expect a prop called home
export default function Header({ home }: any) {
  return (
    <header className="site-header">
      {home ? (
        <>
          <Image
            priority
            src="/images/favicon.svg"
            height={40}
            width={40}
            alt={'qbreis — enric gatell'}
            className="color-text-screen-filter"
          />
          <h1>qbreis — enric gatell</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/favicon.svg"
                height={40}
                width={40}
                alt={'qbreis — enric gatell'}
                className="color-text-screen-filter"
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a>qbreis — enric gatell</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
```

## 6.2 Link back to home

Now it is very easy not to show link to go bach home when you are in home page in `blog/components/Layout.tsx`:

```typescript
// blog/components/Layout.tsx

import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

export default function Layout({ children, home }: any) {
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <div className="site-container">
      <MetaData />
      <Header home={home} />
      <main className="site-main">{children}</main>
      {/*
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      */}
      {!home && (
        <Link href="/">
          <a>← Back to home</a>
        </Link>
      )}
      <Footer />
    </div>
  );
}
```

## 6.3 Footer

For the footer I add two Svg files and update `blog/components/Footer.tsx`, I can check them in github:

- [blog/components/Footer.tsx](https://github.com/qbreis/blog/blob/dev-chapter-6-header-and-footer/components/Footer.tsx)
- [blog/public/images/logo-github.svg](https://github.com/qbreis/blog/blob/dev-chapter-6-header-and-footer/public/images/logo-github.svg)
- [blog/public/images/logo-linkedin.svg](https://github.com/qbreis/blog/blob/dev-chapter-6-header-and-footer/public/images/logo-linkedin.svg)

## 6.3 MetaData

I want to add default props and type into `blog/components/MetaData.tsx`:

```typescript
// blog/components/MetaData.tsx

import Head from 'next/head';
import PropTypes from 'prop-types';

// export default function MetaData() {
export default function MetaData({ title, description }: any) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="mask-icon" href="/images/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/images/manifest.json"></link>
    </Head>
  );
}

MetaData.defaultProps = {
  title: 'qbreis — enric gatell',
  description:
    'This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.',
};

MetaData.propTypes = {
  title: PropTypes.string, // title: PropTypes.string.isRequired,
  description: PropTypes.string, // description: PropTypes.string.isRequired,
};
```

### 6.3.1 MetaData title and description for each post

Now it is quite easy to add title and description Metadata to each single post in `blog/pages/posts/[id].tsx`:

```typescript
// blog/pages/posts/[id].tsx

import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import MetaData from '../../components/MetaData';

export default function Post({ postData }: any) {
  return (
    <Layout>
      <article>
        <MetaData title={postData.title} description={postData.excerpt} />
        <h1>{postData.title}</h1>
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

## 6.4 Some site constants

I want to have some constants for site info, I can use [Environment Variables](https://nextjs.org/docs/api-reference/next.config.js/environment-variables), so I update `blog/next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    siteInfoTitle: siteInfoTitle,
    siteInfoDescription: siteInfoDescription,
  },
};

module.exports = nextConfig;
```

Then I also update `blog/components/Header.tsx` to use `process.env.siteInfoTitle`:

```typescript
// blog/components/Header.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function Header({ home }: any) {
  return (
    <header className="site-header">
      {home ? (
        <>
          <Image
            priority
            src="/images/favicon.svg"
            height={40}
            width={40}
            alt={process.env.siteInfoTitle}
            className="color-text-screen-filter"
          />
          <h1>{process.env.siteInfoTitle}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/favicon.svg"
                height={40}
                width={40}
                alt={process.env.siteInfoTitle}
                className="color-text-screen-filter"
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a>{process.env.siteInfoTitle}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
```

And also `blog/components/MetaData.tsx` to use `process.env.siteInfoTitle` and `process.env.siteInfoDescription`:

```typescript
// blog/components/MetaData.tsx

import Head from 'next/head';
import PropTypes from 'prop-types';

export default function MetaData({ title, description }: any) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>
        {title !== process.env.siteInfoTitle
          ? process.env.siteInfoTitle + ' | ' + title
          : title}
      </title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="mask-icon" href="/images/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/images/manifest.json"></link>
    </Head>
  );
}

MetaData.defaultProps = {
  title: process.env.siteInfoTitle,
  description: process.env.siteInfoDescription,
};

MetaData.propTypes = {
  title: PropTypes.string, // title: PropTypes.string.isRequired,
  description: PropTypes.string, // description: PropTypes.string.isRequired,
};
```

In order to include a general description `/* 1 */` in home page I also want to use `process.env.siteInfoDescription` into `blog/pages/index.tsx`:

```typescript
// blog/pages/index.tsx

import Layout from '../components/Layout';
import { getPosts } from '../lib/posts';
import Posts from '../components/Posts';

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
    <Layout home>
      <div className="excerpt">{process.env.siteInfoDescription}</div>
      <section className="all-post-data">
        <Posts posts={posts} />
      </section>
    </Layout>
  );
}
```

## Reference links

- [Environment Variables in next.config.js](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) - To add environment variables to the JavaScript bundle, by adding the `env` config into `next.config.js`.

## External links

- [Metadata](https://en.wikipedia.org/wiki/Metadata).
- [Environment Variables in next.js versions 9.4 and up](https://nextjs.org/docs/api-reference/next.config.js/environment-variables) - Since the release of Next.js 9.4 I now have a more intuitive and ergonomic experience for adding environment variables. Maybe I can give it a try in the future!
