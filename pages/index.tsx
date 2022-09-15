import Link from 'next/link';

import Header from '../components/Header'; /* 1 */

export default function Home() {
  return (
    <>
      {/* 1 */}
      <Header />
      <Link href="/custom-template">
        <a>Custom template</a>
      </Link>
    </>
  );
}
