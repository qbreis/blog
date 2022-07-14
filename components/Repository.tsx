import Link from 'next/link';

const Repository = ({repository}: any) => {
    if(!repository) {
        return <></>
    }
    return (
        <>
           <span style={{fontSize: '0.7em'}}>Repository: </span>
            <Link href={repository}>
                <a 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{fontSize: '0.7em', textDecoration: 'none'}}
                >
                    {repository}
                </a>
            </Link>
        </>   
    );
}
    
export default Repository;