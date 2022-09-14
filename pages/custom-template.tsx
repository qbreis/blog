import Image from 'next/image';
import Layout from '../components/Layout';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    hljs.initHighlighting();
  }, []);

  return (
    <Layout>
      <section>
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
          <p style={{ textAlign: 'center' }}>
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
      </section>
    </Layout>
  );
}
