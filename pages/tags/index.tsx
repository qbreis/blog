// blog/pages/tags/index.tsx

import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import { getTags } from '../../lib/posts';
import Link from 'next/link';

export default function catHome({ allTagIds }: any) {
  return (
    <Layout>
      <MetaData title="List of tags" description="List of tags" />
      <h2 className="h1">List of tags</h2>

      <div className="entry-meta posted-on">
        {allTagIds.length == 1
          ? allTagIds.length + ' tag'
          : allTagIds.length + ' tags'}
      </div>

      <section className="all-post-data">
        <ul>
          {allTagIds?.map((postTag: any) => (
            <li key={`${postTag.id}`}>
              <h2 className="h4">
                <Link href={`/tags/${postTag.id}`}>
                  <a>{postTag.id}</a>
                </Link>
              </h2>
              <div className="posted-on">
                {postTag.posts == 1
                  ? postTag.posts + ' post'
                  : postTag.posts + ' posts'}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const allTagIds = getTags();
  return {
    props: {
      allTagIds,
    },
  };
}
