// pages/404.tsx
import MetaData from '../components/MetaData';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
    return (
        <Layout>
            <MetaData title="404 - Page Not Found" />
            <section>
                <h1>404</h1>
                <div className="entry-meta posted-on">
                    Page Not Found
                </div>
                <div className="post-categories">
                    <Link href='/'>
                        <a>home page</a>
                    </Link>
                    <Link href='/categories'>
                        <a>categories</a>
                    </Link>
                </div>

            </section>
        </Layout>
    )
}