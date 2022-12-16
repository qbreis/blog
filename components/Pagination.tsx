//blog/components/Pagination.tsx

export default function Pagination({ limit, posts, onClick }: any) {
  return (
    <>
      {limit < posts.length && (
        <p className="pagination">
          Showing {limit < posts.length ? limit : posts.length}{' '}
          {posts.length > 1 ? 'posts' : 'post'} out of {posts.length}
          {onClick && (
            <span
              className="icon-arrow pointing-right align-left link-alike"
              onClick={onClick}
            >
              Load more posts
            </span>
          )}
        </p>
      )}
    </>
  );
}
