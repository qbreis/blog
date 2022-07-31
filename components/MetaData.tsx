import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import nextConfig from '../next.config';

export default function MetaData ({title, description,}: any){
    const staticStylesCss = '../'.repeat(useRouter().asPath.split('/').length) + 'static-styles.css';
    return (
        <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <title>
                {
                    (title !== nextConfig.siteInfo.title)
                    ?
                    nextConfig.siteInfo.title + ' | ' + title
                    :
                    title
                }
            </title>
            <meta name="description" content={description} />
            <link href={staticStylesCss} rel="stylesheet" />
            <link rel="icon" href="/images/logo.svg" />
        </Head>
    );
}

MetaData.defaultProps = {
    title: nextConfig.siteInfo.title,
    description: nextConfig.siteInfo.description,
}

MetaData.propTypes = {
    title: PropTypes.string, // title: PropTypes.string.isRequired,
    description: PropTypes.string, // description: PropTypes.string.isRequired,
}