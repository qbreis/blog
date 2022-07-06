import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';

export default function Layout ({ children }: any){
    return (
        <div className='site-container'>
            <MetaData />
            <Header />
            <main className="site-main">{children}</main>
            <Footer />
        </div>
    );
}