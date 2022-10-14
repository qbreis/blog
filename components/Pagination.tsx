//blog/components/Pagination.tsx

export default function Pagination({
  listOfPosts,
  totalOfPosts,
  onClick,
}: any) {
  return (
    <>
      {listOfPosts.length < totalOfPosts && ( // I only want to show this if there is something to show
        <p className="pagination">
          Showing {listOfPosts.length} posts out of {totalOfPosts}
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
