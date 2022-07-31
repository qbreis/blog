import Link from 'next/link';
const Categories = ({categories}: any) => {
    if(!categories) {
        return <></>
    }
    return (
        <div className="post-categories">
            {categories?.map((postCategory: any) => 
                (
                    <Link href={`/categories/${postCategory}`} key={`${postCategory}`}>
                        <a>{postCategory}</a>
                    </Link>
                )
            )}
        </div>   
    );
}
    
export default Categories;