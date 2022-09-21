// blog/components/Tags.tsx

import Link from 'next/link';

export default function Tags({ tags }: any) {
  if (!tags) {
    return <></>;
  }
  return (
    <ul className="post-tags">
      {tags?.map((postTag: any) => (
        <li key={`${postTag}`}>
          <Link href={`/tags/${postTag}`}>
            <a>{postTag}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
