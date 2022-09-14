import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

export default function Layout({ children }: any) {
  useEffect(() => {
    // hljs.initHighlighting(); // Deprecated as of 10.6.0. initHighlighting() deprecated.  Use highlightAll() now.
    hljs.highlightAll();
  }, []);

  return (
    <div className="site-container">
      <MetaData />
      <Header />
      <main className="site-main">{children}</main>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <Footer />
    </div>
  );
}
