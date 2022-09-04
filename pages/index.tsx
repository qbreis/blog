import type { NextPage } from 'next';
import Image from 'next/image'; /* 1 */
import Link from 'next/link'; /* 2 */

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
                <a href="/tags/tag-name">nextjs</a>
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
              {/*Do not use `<img>` element. 
              Use `<Image />` from `next/image` instead. 
              See: https://nextjs.org/docs/messages/no-img-element  
              @next/next/no-img-element*/}
              {/*
              <img src="/images/nextjs-logo.svg" alt="Next.js" />
              */}
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

            <hr />

            <h4>Heading 4 - Ordered lists</h4>

            <ol>
              <li>list 1</li>
              <li>list 2</li>
              <li>list 3</li>
            </ol>
          </div>
        </article>
      </main>
      {/* 2 */}
      {/*Do not use an `<a>` element to navigate to `/`.
      Use `<Link />` from `next/link` instead.
      See: https://nextjs.org/docs/messages/no-html-link-for-pages 
      @next/next/no-html-link-for-pages*/}
      {/*<a href="/">← Back to home</a>*/}
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <footer className="site-footer">site-footer</footer>
    </div>
  );
};

export default Home;
