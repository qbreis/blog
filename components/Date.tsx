import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: any) {
    const date = parseISO(dateString);
    return (
        <span className="posted-on">
            <time className="entry-date published" dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
        </span>
    )
}