import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';

export default function Layout({ children }: any) {
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
