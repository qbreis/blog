// pages/404.tsx
import MetaData from '../components/MetaData';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Custom404() {
    return (
        <Layout siteTitle="404 - Page Not Found">
            <MetaData />
            <section>
                <h1>404</h1>
                <div className="entry-meta posted-on">
                    Page Not Found
                </div>

                <div className="remark-highlight">
                    <pre data-line="1, 12, 15, 18" className="language-bash  line-numbers">
                        <code className="language-bash">
                            <span style={{display: 'block',}}>// pages/404.tsx</span>
                            
                            <span style={{display: 'block',}}>
                                <span className="token function">import</span> MetaData from <span className="token string">'../components/MetaData'</span>
                                <span className="token punctuation">;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token function">import</span> Layout from <span className="token string">'../components/Layout'</span>
                                <span className="token punctuation">;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token function">import</span> nextConfig from <span className="token string">'../next.config'</span>
                                <span className="token punctuation">;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                &nbsp;
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token builtin class-name">export</span> default <span className="token keyword">function</span>
                                <span className="token function-name function">&nbsp;Custom404</span>
                                <span className="token punctuation">()&nbsp;&#123;</span>
                            </span>
                            
                            <span style={{display: 'block',}}>
                                <span className="token builtin class-name">&nbsp;&nbsp;&nbsp;&nbsp;return</span>
                                <span className="token punctuation">&nbsp;&#40;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>Layout 
                                <span className="token assign-left variable">&nbsp;siteTitle</span>
                                <span className="token operator">=</span>
                                <span className="token string">"404 - Page Not Found"</span>
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>MetaData 
                                <span className="token operator">&nbsp;/&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>section 
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>h1 
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;404
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>/h1 
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>div&nbsp;
                                <span className="token assign-left variable">className</span>
                                <span className="token operator">=</span>
                                <span className="token string">"entry-meta posted-on"</span>
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Page not found
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>/div
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;</span>p
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;From here I can go to the&nbsp;
                                <Link href='/'>
                                    <a style={{color: '#3f9fc7'}}>home page</a>
                                </Link>
                                &nbsp;with the list of annotations or the list of&nbsp;
                                <Link href='/categories'>
                                    <a style={{color: '#3f9fc7'}}>categories</a>
                                </Link>.
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>p
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>section 
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token operator">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/</span>Layout 
                                <span className="token operator">&gt;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token punctuation">&nbsp;&nbsp;&nbsp;&nbsp;&#41;</span>
                            </span>

                            <span style={{display: 'block',}}>
                                <span className="token punctuation">&#125;</span>
                            </span>

                            <span aria-hidden="true" className="line-numbers-rows">
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                                <span className=""></span>
                            </span>
                        </code>
                    </pre>
                </div>

            </section>
        </Layout>
    )
}