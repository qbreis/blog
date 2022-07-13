// pages/404.tsx
import MetaData from '../components/MetaData';
import Layout from '../components/Layout';
import nextConfig from '../next.config';

export default function Custom404() {
    return (
        <Layout home siteTitle={nextConfig.siteTitle}>
            <MetaData />
            <section>
                <h1>404</h1>
                <div className="entry-meta">
                    <p>Page Not Found</p>
                </div>
                <p>From here I can go to the home page with the list of annotations or the list of categories.</p>


<div className="remark-highlight">
    <pre data-line="2" className="language-bash  line-numbers">
        <code className="language-bash">
            <span style={{display: 'block',}}>// pages/404.tsx</span>
            
            <span style={{display: 'block',}}>
                <span className="token function">import</span> MetaData from <span className="token string">'../components/MetaData'</span>
                <span className="token punctuation">;</span>
            </span>

            <span style={{display: 'block',}}>
                <span className="token function">import</span> MetaData from <span className="token string">'../components/MetaData'</span>
                <span className="token punctuation">;</span>
            </span>

            <span style={{display: 'block',}}>
                <span className="token function">import</span> MetaData from <span className="token string">'../components/MetaData'</span>
                <span className="token punctuation">;</span>
            </span>

            <span style={{display: 'block',}}>
                <span className="token punctuation">zas</span>
            </span>
            
            <span style={{display: 'block',}}>
                <span className="token punctuation">&nbsp;&nbsp;&nbsp;&nbsp;&#123;&#125;&#40;&#41;asd</span>
            </span>

            <span style={{display: 'block',}}>
                <span className="token punctuation">&#125;asd</span>
            </span>
            
            <span style={{display: 'block',}}>&#125;asd</span>
            
            

            
            
            <span aria-hidden="true" className="line-numbers-rows"><span className=""></span><span className=""></span><span className=""></span><span className=""></span></span>
        </code>
    </pre>
</div>















            </section>
        </Layout>
    )
}