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

            </section>
        </Layout>
    )
}