// blog/pages/categories/index.tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import { getCategories } from '../../lib/posts';
import Link from 'next/link';

export default function catHome({ allCategoryIds }: any) {
  return (
    <Layout>
      <MetaData title="List of categories" description="List of categories" />
      <h2 className="h1">List of categories</h2>

      <div className="entry-meta posted-on">
        {allCategoryIds.length == 1
          ? allCategoryIds.length + ' category'
          : allCategoryIds.length + ' categories'}
      </div>

      <section className="all-post-data">
        <ul>
          {allCategoryIds?.map((postCategory: any) => (
            <li key={`${postCategory.id}`}>
              <h2 className="h4">
                <Link href={`/categories/${postCategory.id}`}>
                  <a>{postCategory.id}</a>
                </Link>
              </h2>
              <div className="posted-on">
                {postCategory.posts == 1
                  ? postCategory.posts + ' post'
                  : postCategory.posts + ' posts'}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allCategoryIds = getCategories();
  return {
    props: {
      allCategoryIds,
    },
  };
}
