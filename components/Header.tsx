import Image from 'next/image';
import Link from 'next/link';

export default function Header ({home}: any){
    return <header className="site-header">
        {home ? (
            <>
                <Image
                    priority
                    src="/images/logo.svg"
                    height={40}
                    width={40}
                    alt={'qbreis — enric gatell'}
                    className="color-text-screen-filter"
                />
                <h1>qbreis — enric gatell</h1>
            </>
            ) : (
            <>
                <Link href="/">
                    <a>
                        <Image
                        priority
                        src="/images/logo.svg"
                        height={40}
                        width={40}
                        alt={'qbreis — enric gatell'}
                        className="color-text-screen-filter"
                        />
                    </a>
                </Link>
                <h2>
                    <Link href="/">
                        <a>qbreis — enric gatell</a>
                    </Link>
                </h2>
            </>
        )}
    </header>
}
