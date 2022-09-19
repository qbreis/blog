// blog/components/Header.tsx

import Image from 'next/image';
import Link from 'next/link';

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
            alt={process.env.siteInfoTitle}
            className="color-text-screen-filter"
          />
          <h1>{process.env.siteInfoTitle}</h1>
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
                alt={process.env.siteInfoTitle}
                className="color-text-screen-filter"
              />
            </a>
          </Link>
          <h2>
            <Link href="/">
              <a>{process.env.siteInfoTitle}</a>
            </Link>
          </h2>
        </>
      )}
    </header>
  );
}
