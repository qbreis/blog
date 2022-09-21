// blog/components/Date.tsx

import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: any) {
  const date = parseISO(dateString);
  return (
    <ul className="posted-on">
      <li>
        <time className="entry-date published" dateTime={dateString}>
          {format(date, 'LLLL d, yyyy')}
        </time>
      </li>
    </ul>
  );
}
