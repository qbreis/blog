import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section>
        <h1>Home</h1>
        <Link href="/custom-template">
          <a>Custom template</a>
        </Link>
      </section>
    </Layout>
  );
}
