import { parseISO, format } from 'date-fns';

export default function Date({ dateString, lastmod }: any) {
    const date = parseISO(dateString);
    return (
        <span className="posted-on">
            <time className="entry-date published" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
            {' '}
            (Last modified: <time className="entry-date lastmod" dateTime={lastmod}>{lastmod}</time>)
        </span>
    )
}