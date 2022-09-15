---
title: 'Blog - Next.js - Chapter #2 - Styles'
excerpt: 'In this chapter I migrate from Css to Scss and prepare one Html simple template for my single post view to see how all the elements are rendered, including links, images and Highlight for pieces of code.'
date: '2021-08-26'
categories: ['nextjs', 'bulma', 'test']
tags: ['dos', 'tres']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-2-scss'
draft: false
---

## 2.1 Css to Scss

![Sass](/images/sass-logo.svg)

In order to install Sass I run:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-2-styles) $ yarn add sass</code></pre>

I want to rename file `blog/styles/globals.css` to `globals.scss /* 1 */` and update `blog/pages/_app.tsx` accordingly:

```
import '../styles/globals.scss'; // import '../styles/globals.css'; /* 1 */
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## 2.2 Simple post template

I want to prepare one simple template for my single post view, so I update `blog/pages/index.tsx`:

```typescript
import type { NextPage } from 'next';
import Image from 'next/image'; /* 1 */
import Link from 'next/link'; /* 2 */

const Home: NextPage = () => {
  return (
    <div className="site-container">
      <header className="site-header">site-header</header>
      <main className="site-main">
        <article>
          <h1>Heading 1 - Post simple template</h1>

          <div className="entry-meta">
            <ul className="posted-on">
              <li>
                <time className="entry-date published">July 31, 2021</time>
              </li>
              <li>
                (Last modified:{' '}
                <time className="entry-date lastmod">July 31, 2021</time>)
              </li>
            </ul>
            <ul className="post-categories">
              <li>
                <a href="/categories/category-name">category</a>
              </li>
              <li>
                <a href="/categories/category-name">category</a>
              </li>
            </ul>
            <ul className="post-tags">
              <li>
                <a href="/tags/tag-name">tag</a>
              </li>
              <li>
                <a href="/tags/tag-name">tag</a>
              </li>
            </ul>
          </div>

          <div>
            <div className="excerpt">
              This is just <strong>plain Html</strong> simple template to show
              most of the styles I want to use for my anotations.
            </div>
            <h2>Heading 2 - Title</h2>
            {/*
            Note I add inline style css here because I still don't have
            enough Css support structures
            */}
            <p style={{ textAlign: 'center' }}>
              {/* 1 */}
              {/*<img src="/images/nextjs-logo.svg" alt="Next.js" />*/}
              <Image
                src="/images/nextjs-logo.svg"
                height={500}
                width={(1212 * 500) / 734}
                alt="Next.js"
                className="color-text-screen-filter"
              />
            </p>
            <p>
              For simple console commands I will use <code>code Html tag</code>.
            </p>
            <pre className="highlighjs">
              <code className="typescript">
                {`const Home: NextPage = () => {
import '../styles/globals.scss'; /*{ 1 }*/
import type { AppProps } from 'next/app'; /*{ 2 }*/

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;`}
              </code>
            </pre>
            <p>
              <code>
                {/*Comments inside children section of tag should be placed inside braces
                react/jsx-no-comment-textnodes*/}
                {'/'}*{1}*{'/'}
              </code>{' '}
              I want to do specific comments to some code lines.
            </p>
            <p>
              <code>
                {'/'}*{2}*{'/'}
              </code>{' '}
              I want to do specific comments to some code lines.
            </p>
            <pre>
              <code className="bash">{`yarn dev`}</code>
            </pre>
            <blockquote>
              I want to use Html <code>blockquote</code> as well.
            </blockquote>
            <h3>Heading 3 - Unordered lists</h3>

            <ul>
              <li>uno</li>
              <li>dos</li>
              <li>tres</li>
            </ul>

            <h4>Heading 4 - Ordered lists</h4>

            <hr />

            <ol>
              <li>list 1</li>
              <li>list 2</li>
              <li>list 3</li>
            </ol>
          </div>
        </article>
      </main>
      {/* 2 */}
      {/*<a href="/">← Back to home</a>*/}
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <footer className="site-footer">site-footer</footer>
    </div>
  );
};

export default Home;
```

This is just plain html template to see how I want to render all possible html tags in any post, including basically:

- Headings: (Remember line break in Markdown is two or more spaces at the end of the line)
  `<h1>`, `<h2>`, `<h3>`, `<h4>`

- Links:  
  `<a>`

- Blockquotes:  
  `<blockquote>`

- Horizontal rule:  
  `<hr>`

- Unordered and ordered lists:  
  `<ul>`, `<ol>`

- Code and preformatted text:  
  `<code>`, `<pre>`

- Paragraphs:  
  `<p>`

- Images:  
  `<img>`

### 2.2.1 Svg images

To see how images are rendered i also include new Svg file in `blog/public/images/nextjs-logo.svg` in which I've recreated the Next.js logo myself:

```svg
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   width="1212.2428"
   height="734.28168"
   viewBox="0 0 320.73924 194.2787"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:svg="http://www.w3.org/2000/svg">
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 145.38925,51.36502 c 17.93955,24.88523 60.10357,87.10579 63.86926,90.21949" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="M 142.62081,139.6091 C 157.88996,120.98151 235.77325,11.58027 242.17853,2.3812499" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;stroke-linejoin:round;"
     d="M 2.3812499,141.06804 C 4.5155099,113.91862 5.7817659,74.46688 3.4891839,51.88185 18.506696,71.51447 73.564593,163.33349 98.619519,191.89744" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;stroke-linejoin:round;"
     d="M 135.81833,53.29224 H 79.464092 c -1.912236,14.19094 1.740617,64.75503 -1.567066,83.21049 24.039114,0 43.210054,-0.42687 55.766134,1.16129" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="M 75.466256,94.70942 C 91.170829,91.74558 129.39201,91.43381 135.04046,93.28824" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 212.33832,55.01549 c 12.83047,-0.33107 59.63207,-1.56141 65.36141,-0.51732" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 247.85674,52.42948 c 3.2254,17.61345 3.37224,69.01632 -0.29337,84.22343" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 278.00529,132.52946 c 0.82418,-1.54154 5.84724,-4.63148 5.84724,-0.27435" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 300.77486,110.20393 c 1.12401,6.05568 0.79352,22.13927 -2.63384,22.76372 -3.42736,0.62444 -8.74072,-4.36621 -8.26601,-7.34677" />
  <path
     style="fill:none;stroke:#000000;stroke-width:4.7625;stroke-linecap:round;"
     d="m 318.35801,110.03221 c -5.53484,0.72912 -14.17809,8.62325 -7.6767,10.73119 6.5014,2.10793 8.25762,7.16052 0.95004,10.20524" />
</svg>
```

> At this point, clean code standards are claimed as well for Svg files!

### 2.2.2 Styles

All the classes in this template are defined in styles folder, in the corresponding [dev-chapter-2 branch](https://github.com/qbreis/blog/tree/setup/styles), up in my repository at GitHub. So I will just download `styles` directory from this branch into my `blog/styles` folder, making sure to replace `blog/styles/globals.scss` file.

#### 2.2.2.1 Minireset

In `blog/styles/normalize/_normalize.scss` I am using [minireset.css](https://github.com/jgthms/minireset.css) by [Jeremy Thomas](https://github.com/jgthms) with some small modifications by myself.

#### 2.2.2.2 Nord

I also include [Nord theme](https://www.nordtheme.com/), and specifically [Nord highlight.js](https://www.nordtheme.com/ports/highlightjs), including [nord.css](https://unpkg.com/nord-highlightjs@0.1.0/dist/nord.css) code into `blog/styles/nord-highlightjs/_nord.scss`.

#### 2.2.2.3 "Transform black into any given color using only CSS filters" strategy.

In order to change Svg color I will use same strategy implemenmted in this other repo [Css Filter Generator](https://github.com/qbreis/css-filter-generator) by [myself](https://github.com/qbreis/).

## 2.3 Highlight.js

I want to use Highlight.js, so following [How to use Highlight.js on a Next.js site](https://dev.to/kontent_ai/how-to-use-highlight-js-on-a-next-js-site-f9) fisrt I run:

```bash[class="line-numbers"][class="contained"][class="hide-numbers"]
yarn add highlight.js
```

And then I update my `blog/pages/index.tsx`:

```typescript
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

const Home: NextPage = () => {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <div className="site-container">
      <header className="site-header">site-header</header>
      {/* Keep the existing code here */}
```

## Reference links

- [Minireset - GitHub](https://github.com/jgthms/minireset.css) - A tiny modern CSS reset by Jeremy Thomas.
- [Nord theme](https://www.nordtheme.com/) - An arctic, north-bluish color palette.
- [Nord highlight.js](https://www.nordtheme.com/ports/highlightjs) - An arctic, north-bluish clean and elegant highlight.js theme.
- [Css Filter Generator](https://github.com/qbreis/css-filter-generator) - "Transform black into any given color using only CSS filters" strategy.
- [How to use Highlight.js on a Next.js site](https://dev.to/kontent_ai/how-to-use-highlight-js-on-a-next-js-site-f9).

## External links

- [Css - Wikipedia](https://en.wikipedia.org/wiki/CSS) - Cascading Style Sheets.
- [Sass - Wikipedia](https://es.wikipedia.org/wiki/Sass) - To know about Sass and Scss, and what is the difference.
- [Svg - Wikipedia](https://en.wikipedia.org/wiki/Scalable_Vector_Graphics) - Scalable Vector Graphics.
- [highlight.js](https://highlightjs.org/) - JavaScript syntax highlighter with language auto-detection and zero dependencies.
- [highlight.js - GitHub](https://github.com/highlightjs/highlight.js/).
