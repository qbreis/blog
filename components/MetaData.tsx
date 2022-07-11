import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

export default function MetaData ({title, description,}: any){
    const staticStylesCss = '../'.repeat(useRouter().asPath.split('/').length) + 'static-styles.css';
    return (
        <Head>
            <meta charSet='utf-8' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <title>{title}</title>
            <meta name="description" content={description} />
            <link href={staticStylesCss} rel="stylesheet" />
            <link rel="icon" href="/images/logo.svg" />
        </Head>
    );
}

MetaData.defaultProps = {
    title: 'qbreis — enric gatell',
    description: 'This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things.',
}

MetaData.propTypes = {
    title: PropTypes.string, // title: PropTypes.string.isRequired,
    description: PropTypes.string, // description: PropTypes.string.isRequired,
}