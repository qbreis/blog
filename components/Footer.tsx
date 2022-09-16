import Link from 'next/link';
import Image from 'next/image';
export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        If you want to contact me you can do it through{' '}
        <Link href="https://es.linkedin.com/in/enricgatell">
          <a target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </Link>{' '}
        o{' '}
        <Link href="https://github.com/qbreis/blog/issues">
          <a target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Link>{' '}
        (new issue).
      </p>
      <ul className="contact-links">
        <li>
          <Link href="https://es.linkedin.com/in/enricgatell">
            <a target="_blank" rel="noopener noreferrer">
              <Image
                priority
                src="/images/logo-linkedin.svg"
                height={60}
                width={60}
                alt="LinkedIn"
                className="color-text-screen-filter"
              />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://github.com/qbreis/blog">
            <a target="_blank" rel="noopener noreferrer">
              <Image
                priority
                src="/images/logo-github.svg"
                height={60}
                width={60}
                alt="GitHub"
                className="color-text-screen-filter"
              />
            </a>
          </Link>
        </li>
      </ul>
    </footer>
  );
}
