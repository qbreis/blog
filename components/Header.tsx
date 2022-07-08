import Image from 'next/image';

export default function Header (){
    return <header className="site-header">
        <Image
            priority
            src="/images/favicon.svg"
            height={40}
            width={40}
            alt={'qbreis — enric gatell'}
            className="color-text-screen-filter"
        />
        <h1>qbreis — enric gatell</h1>
    </header>
}
