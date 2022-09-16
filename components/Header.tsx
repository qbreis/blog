// blog/components/Header.tsx

import Image from 'next/image';
import Link from 'next/link';
import nextConfig from '../next.config';

export default function Header({ home }: any) {
  return (
    <header className="site-header">
      {home ? (
        <>
          <Image
            priority
            src="/images/favicon.svg"
            height={40}
            width={40}
            alt={nextConfig.siteInfo.title}
            className="color-text-screen-filter"
          />
          <h1>{nextConfig.siteInfo.title}</h1>
        </>
      ) : (
        <>
          <Link href="/">
            <a>
              <Image
                priority
                src="/images/favicon.svg"
                height={40}
                width={40}
                alt={nextConfig.siteInfo.title}
                className="color-text-screen-filter"
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a>{nextConfig.siteInfo.title}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
