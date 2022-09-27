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
          <a className="icon-arrow align-left pointing-left">Back to home</a>
        </Link>
      )}
      <Footer />
    </div>
  );
}
