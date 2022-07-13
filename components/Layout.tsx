import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';
import { useEffect, useRef } from "react";

export default function Layout ({ children, home }: any){

    const rootRef = useRef<HTMLDivElement>(null);

    function highlightCode(pre : any, highlightRanges : any, lineNumberRowsContainer : any) {
        const ranges = highlightRanges.split(",").filter((val: any) => val);
        const preWidth = pre.scrollWidth;

        for (const range of ranges) {
            let [start, end] = range.split("-");
            if (!start || !end) {
                start = range;
                end = range;
            }

            for (let i = +start; i <= +end; i++) {
                const lineNumberSpan: HTMLSpanElement = lineNumberRowsContainer.querySelector(`span:nth-child(${i})`);
                lineNumberSpan.style.setProperty("--highlight-background", "rgba(100, 100, 100, 0.5)");
                lineNumberSpan.style.setProperty("--highlight-width", `${preWidth}px`);
            }
        }
    }

    useEffect(() => {

        foo:HTMLCollection;
        const allPres = [].slice.call(
            rootRef.current?.querySelectorAll("pre")
        );
        allPres:HTMLCollection;

        const cleanup: (() => void)[] = [];
    
        if(allPres){
            for (const pre of allPres) {
                const code = pre['firstElementChild'];
                if (!code || !/code/i.test(code['tagName'])) {
                    continue;
                }

                const highlightRanges = pre['dataset']['line'];
                const lineNumbersContainer = (pre as HTMLElement).querySelector('.line-numbers-rows');

                if (!highlightRanges || !lineNumbersContainer) {
                    continue;
                }

                const runHighlight = () => highlightCode(pre, highlightRanges, lineNumbersContainer);
                runHighlight();

                const ro = new ResizeObserver(runHighlight);
                ro.observe(pre);

                cleanup.push(() => ro.disconnect());
            }
        }
        return () => cleanup.forEach(f => f());
    }, []);

    return (
        <div ref={rootRef} className='site-container'>
            <MetaData />
            <Header home={home} />
            <main className="site-main">{children}</main>
            {!home && (
                <Link href="/">
                    <a>← Back to home</a>
                </Link>
            )}
            <Footer />
        </div>
    );
}