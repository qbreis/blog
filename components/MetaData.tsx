// blog/components/MetaData.tsx

import Head from 'next/head';
import PropTypes from 'prop-types';
import nextConfig from '../next.config';

export default function MetaData({ title, description }: any) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="mask-icon" href="/images/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/images/manifest.json"></link>
    </Head>
  );
}

MetaData.defaultProps = {
  title: nextConfig.siteInfo.title,
  description: nextConfig.siteInfo.description,
};

MetaData.propTypes = {
  title: PropTypes.string, // title: PropTypes.string.isRequired,
  description: PropTypes.string, // description: PropTypes.string.isRequired,
};
