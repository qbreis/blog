import Link from 'next/link';

import Header from '../components/Header'; /* 1 */

export default function Home() {
  return (
    <div className="site-container">
      <header className="site-header">site-header</header>
      <main className="site-main">
        <article>
          <h1>Home</h1>
          <Link href="/custom-template">
            <a>Custom template</a>
          </Link>
        </article>
      </main>
      <footer className="site-footer">site-footer</footer>
    </div>
  );
}
