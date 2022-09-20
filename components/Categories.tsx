// blog/components/Categories.tsx

import Link from 'next/link';

export default function Categories({ categories }: any) {
  if (!categories) {
    return <></>;
  }
  return (
    <ul className="post-categories">
      {categories?.map((postCategory: any) => (
        <li key={`${postCategory}`}>
          <Link href={`/categories/${postCategory}`}>
            <a>{postCategory}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
}
