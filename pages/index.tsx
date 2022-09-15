import Link from 'next/link';

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href="/custom-template">
        <a>Custom template</a>
      </Link>
    </>
  );
}
