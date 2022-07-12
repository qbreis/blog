import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import { getSortedCategories } from '../../lib/posts';
import Link from 'next/link';

export default function catHome({ allCategoryIds }: any) {
    return (
        <Layout>
            <MetaData 
                title="List of categories"
                description="List of categories" 
            />
            <h2 className="h1">List of categories</h2>
            
            <section className="all-post-data">
                <ul>
                    {allCategoryIds?.map((postCategory: any) => 
                        (
                            <li key={`${postCategory.id}`}>
                                <h2 className="h4">
                                    <Link href={`/categories/${postCategory.id}`}>
                                        {/*<a>{postCategory.id} - ({postCategory.posts} posts)</a>*/}
                                        <a>
                                            {postCategory.id}
                                            {' '}
                                            {
                                                (postCategory.posts == 1) 
                                                ? 
                                                '('+postCategory.posts+'post)' 
                                                : 
                                                '('+postCategory.posts+'(posts)'
                                            }
                                        </a>
                                    </Link>
                                </h2>
                            </li>
                        )
                    )}
                </ul>
            </section>
        </Layout>
    );
}

export async function getStaticProps() {
    const allCategoryIds = getSortedCategories();
    return {
        props: {
            allCategoryIds
        },
    };
}