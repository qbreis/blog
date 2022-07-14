import Link from 'next/link';
import Date from '../components/Date';
import Categories from '../components/Categories';

const Posts = ({posts}: any) => {
    return (
        <ul>
            {posts.map((post: any) => 
            {
                /*if(post.draft) {
                    return <></>
                }*/
                return (post.id) && (
                    <li key={post.id}>
                        <h2 className="h4">
                            <Link href={`/posts/${post.id}`}>
                                <a>{post.title}</a>
                            </Link>
                        </h2>
                        <p>{(post.draft)?'draft':'not draft'}</p>
                        <Date dateString={post.date} />
                        <Categories categories={post.categories} />
                    </li>
                )
            }
            )}
        </ul>
    );
}

export default Posts;