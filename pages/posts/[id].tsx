import Layout from '../../components/Layout';
import MetaData from '../../components/MetaData';
import Date from '../../components/Date';
import Categories from '../../components/Categories';
import Repository from '../../components/Repository';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Link from 'next/link';

export default function Post({ postData }: any) {
    return (
        <Layout>
            <MetaData title={postData.title} description={postData.excerpt} />
            <article>
                <Repository repository={postData.repository} />
                <h1>{postData.title}</h1>
                <div className="entry-meta">
                    <Date dateString={postData.date} />
                    <Categories categories={postData.categories} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }: any) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostData(params.id);
    return {
        props: {
            postData,
        },
    };
}