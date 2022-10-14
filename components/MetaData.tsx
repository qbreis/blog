// blog/components/MetaData.tsx

import Head from 'next/head';

export default function MetaData({ title, description }: any) {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>qbreis — enric gatell</title>
      <meta
        name="description"
        content="This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things."
      />
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" href="/images/favicon.svg" />
      <link rel="mask-icon" href="/images/mask-icon.svg" color="#000000" />
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link rel="manifest" href="/images/manifest.json"></link>
    </Head>
  );
}
