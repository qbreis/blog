// blog/components/PostsNavigation.tsx

import Link from 'next/link';

export default function PostsNavigation({ posts, currentPostId }: any) {
    // Find the current post index
    const currentIndex = posts.findIndex((post: any) => post.id === currentPostId);

    // Determine previous and next posts
    const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const previousPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    return (
        <ul className="posts-navigation">
            {/* Previous Post Link */}
            {previousPost ? (
                <li className="previous-post has-icon-arrow-pointing-left">
                    <Link href={`/posts/${previousPost.id}`} className="icon-arrow align-left pointing-left">
                        {previousPost.title}
                    </Link>
                </li>
            ) : (
                <li className="disabled">No previous post</li>
            )}

            {/* Next Post Link */}
            {nextPost ? (
                <li className="next-post has-icon-arrow-pointing-right">
                    <Link href={`/posts/${nextPost.id}`} className="icon-arrow align-left pointing-right">
                        {nextPost.title}
                    </Link>
                </li>
            ) : (
                <li className="disabled">No next post</li>
            )}
        </ul>
    );
}