---
title: 'Blog - Next.js - Chapter #4 - Components'
excerpt: 'In this chapter I create main components.'
date: '2021-09-10'

draft: false
---

## 4.1 Component Header

I want to create new file and folder `blog/components/Header.tsx`:

```js
export default function Header() {
  return (
    <header className="site-header">site-header in Hedaer Component</header>
  );
}
```

I do import Header component into `blog/pages/index.tsx` `/* 1 */`:

```typescript
import Link from 'next/link';

import Header from '../components/Header'; /* 1 */

export default function Home() {
  return (
    <div className="site-container">
      {/*<header className="site-header">site-header</header>*/}
      {/* 1 */}
      <Header />

      <main className="site-main">
        <article>
          <h1>Home</h1>
          <Link href="/custom-template">
            <a>Custom template</a>
          </Link>
        </article>
      </main>

      <footer className="site-footer">site-footer</footer>
    </div>
  );
}
```

## 4.2 Comonent Footer

I do same thing with `blog/components/Footer.tsx`:

```js
export default function Footer() {
  return (
    <footer className="site-footer">
      Footer component in Footer Component
    </footer>
  );
}
```

I do import Footer component into `blog/pages/index.tsx` `/* 2 */`:

```js
import Link from 'next/link';

import Header from '../components/Header'; /* 1 */
import Footer from '../components/Footer'; /* 2 */

export default function Home() {
  return (
    <div className="site-container">
      {/*<header className="site-header">site-header</header>*/}
      {/* 1 */}
      <Header />

      <main className="site-main">
        <article>
          <h1>Home</h1>
          <Link href="/custom-template">
            <a>Custom template</a>
          </Link>
        </article>
      </main>

      {/*<footer className="site-footer">site-footer</footer>*/}
      {/* 2 */}
      <Footer />
    </div>
  );
}
```

## 4.3 Component MetaData

I create new component file`blog/components/MetaData.tsx`:

```js
import Head from 'next/head';

export default function MetaData() {
  return (
    <Head>
      <title>qbreis — enric gatell</title>
      <meta
        name="description"
        content="This blog contains the step-by-step annotations of what I learn and consolidate, day by day, in terms of programming and web design, among other things."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
```

I do import MetaData component into `pages/index.tsx` `/* 1 */`:

```typescript
import Link from 'next/link';

import MetaData from '../components/MetaData'; /* 3 */
import Header from '../components/Header'; /* 1 */
import Footer from '../components/Footer'; /* 2 */

export default function Home() {
  return (
    <div className="site-container">
      {/* 3 */}
      <MetaData />

      {/*<header className="site-header">site-header</header>*/}
      {/* 1 */}
      <Header />

      <main className="site-main">
        <article>
          <h1>Home</h1>
          <Link href="/custom-template">
            <a>Custom template</a>
          </Link>
        </article>
      </main>

      {/*<footer className="site-footer">site-footer</footer>*/}
      {/* 2 */}
      <Footer />
    </div>
  );
}
```

I want to do the same thing into `blog/pages/custom-template.tsx`:

```typescript
import Image from 'next/image';
import Link from 'next/link';

import MetaData from '../components/MetaData'; /* 3 */
import Header from '../components/Header'; /* 1 */
import Footer from '../components/Footer'; /* 2 */

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

export default function CustomTemplate() {
  useEffect(() => {
    // hljs.initHighlighting(); // Deprecated as of 10.6.0. initHighlighting() deprecated.  Use highlightAll() now.
    hljs.highlightAll();
  }, []);

  return (
    <div className="site-container">
      {/* 3 */}
      <MetaData />

      {/*<header className="site-header">site-header</header>*/}
      {/* 1 */}
      <Header />
      <main className="site-main">
        <article>
          <h1>Heading 1 - Post simple template</h1>
          {/* Keep the existing code here */}
        </article>
      </main>
      <Link href="/">
        <a>← Back to home</a>
      </Link>

      {/*<footer className="site-footer">site-footer</footer>*/}
      {/* 2 */}
      <Footer />
    </div>
  );
}
```

### 4.3.1 Favicon

I want Favicon to be Svg as suggested in this post by [Antoine Boulanger](https://antoineboulanger.medium.com/):

[Are you using SVG favicons yet? A guide for modern browsers](https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df).

So I add file `blog/public/images/favicon.svg`:

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="686.875" height="735.83337" viewBox="0 0 515.15625 551.87503"><g transform="translate(-103.59375,-264.09375)"><path fill="rgba(0,0,0,1)" d="m 420.21875,264.09375 0,127.90625 c 13.63973,6.78504 25.63307,15.55789 36,26.34375 12.04033,12.52838 21.49954,27.01242 28.375,43.46875 6.87464,16.45693 10.31207,34.27456 10.3125,53.4375 -4.1e-4,24.57648 -6.38119,48.28085 -19.15625,71.125 -12.77584,22.84453 -31.18392,40.16805 -55.25,51.96875 l 0,-64.125 -119.40625,0 0,64.125 C 278.49658,627.0379 260.44752,610.32855 246.9375,588.21875 233.42715,566.1093 226.6561,541.79077 226.65625,515.25 c -1.5e-4,-19.16292 3.4373,-37.10814 10.3125,-53.8125 6.87489,-16.70375 16.3341,-31.1878 28.375,-43.46875 C 275.69821,407.40811 287.69196,398.75202 301.3125,392 l 0,-127.875 c -13.93119,3.29468 -27.51731,7.74894 -40.75,13.4375 -31.44397,13.51816 -58.72083,31.81492 -81.8125,54.90625 -23.09187,23.0922 -41.39611,50.36905 -54.90625,81.8125 -13.51023,31.44414 -20.25003,64.8466 -20.25,100.21875 -2e-5,29.97456 4.89721,58.47229 14.71875,85.5 9.82146,27.02803 23.58748,51.4816 41.28125,73.34375 17.69361,21.86229 38.58219,40.54931 62.65625,56.03125 24.07378,15.48201 50.3537,26.63244 78.84375,33.5 l 0,53.09375 119.40625,0 0,-53.09375 c 28.00967,-5.8929 54.17825,-16.68431 78.5,-32.40625 24.32091,-15.72187 45.31332,-34.6403 63,-56.75 17.68571,-22.10953 31.55557,-46.79457 41.625,-74.0625 10.06839,-27.26762 15.12445,-55.66152 15.125,-85.15625 -5.4e-4,-35.37214 -6.77157,-68.77462 -20.28125,-100.21875 -13.5107,-31.44344 -31.94251,-58.7203 -55.28125,-81.8125 -23.33964,-23.09134 -50.71285,-41.38809 -82.15625,-54.90625 -13.25145,-5.69652 -26.86346,-10.17281 -40.8125,-13.46875 z "/></g></svg>
```

#### 4.3.1.1 Mask icon

Following same post suggestions, as long as this same file `blog/public/images/favicon.svg` is made of a single colour and placed on a transparent background, I will save it exactly as `blog/public/images/mask-icon.svg`.

#### 4.3.1.2 Touch Icon

The icon for iOS devices as well as favourites from browsers new tab page and more has to be Png 180n x 180 pixels. What I did here was follow this online free service:

[Favicon Generator - Image to Favicon](https://favicon.io/favicon-converter)

I upload this same file `blog/public/images/favicon.svg` and from downloaded Zip file `favicon_io.zip` I just copy `apple-touch-icon.png` to `blog/public/images/apple-touch-icon.png`.

#### 4.3.1.3 Manifest

I create new file `blog/public/images/manifest.json`:

```json
{
  "name": "Starter",
  "short_name": "Starter",
  "icons": [
    {
      "src": "android-chrome-512x512.png",
      "sizes": "512x512"
    }
  ],
  "background_color": "#ffffff",
  "theme_color": "#ffffff",
  "display": "fullscreen"
}
```

From downloaded Zip file `favicon_io.zip` I also want to copy `android-chrome-512x512.png` to `blog/public/images/android-chrome-512x512.png`.

#### 4.3.1.4 Favicon.ico

From downloaded Zip file `favicon_io.zip` I also want to copy `favicon.ico` to `blog/public/favicon.ico`.

#### 4.3.1.5 Dark mode

In this same post its author offers me a nice tip for dark mode that I plan following, so I will update my Svg file `blog/public/images/favicon.svg`:

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="686.875" height="735.83337" viewBox="0 0 515.15625 551.87503">
  <style>
    path {
      fill: #000000;
    }
    @media (prefers-color-scheme: dark) {
      path {
        fill: #ffffff;
      }
    }
  </style>
  <g transform="translate(-103.59375,-264.09375)">
    <path d="m 420.21875,264.09375 0,127.90625 c 13.63973,6.78504 25.63307,15.55789 36,26.34375 12.04033,12.52838 21.49954,27.01242 28.375,43.46875 6.87464,16.45693 10.31207,34.27456 10.3125,53.4375 -4.1e-4,24.57648 -6.38119,48.28085 -19.15625,71.125 -12.77584,22.84453 -31.18392,40.16805 -55.25,51.96875 l 0,-64.125 -119.40625,0 0,64.125 C 278.49658,627.0379 260.44752,610.32855 246.9375,588.21875 233.42715,566.1093 226.6561,541.79077 226.65625,515.25 c -1.5e-4,-19.16292 3.4373,-37.10814 10.3125,-53.8125 6.87489,-16.70375 16.3341,-31.1878 28.375,-43.46875 C 275.69821,407.40811 287.69196,398.75202 301.3125,392 l 0,-127.875 c -13.93119,3.29468 -27.51731,7.74894 -40.75,13.4375 -31.44397,13.51816 -58.72083,31.81492 -81.8125,54.90625 -23.09187,23.0922 -41.39611,50.36905 -54.90625,81.8125 -13.51023,31.44414 -20.25003,64.8466 -20.25,100.21875 -2e-5,29.97456 4.89721,58.47229 14.71875,85.5 9.82146,27.02803 23.58748,51.4816 41.28125,73.34375 17.69361,21.86229 38.58219,40.54931 62.65625,56.03125 24.07378,15.48201 50.3537,26.63244 78.84375,33.5 l 0,53.09375 119.40625,0 0,-53.09375 c 28.00967,-5.8929 54.17825,-16.68431 78.5,-32.40625 24.32091,-15.72187 45.31332,-34.6403 63,-56.75 17.68571,-22.10953 31.55557,-46.79457 41.625,-74.0625 10.06839,-27.26762 15.12445,-55.66152 15.125,-85.15625 -5.4e-4,-35.37214 -6.77157,-68.77462 -20.28125,-100.21875 -13.5107,-31.44344 -31.94251,-58.7203 -55.28125,-81.8125 -23.33964,-23.09134 -50.71285,-41.38809 -82.15625,-54.90625 -13.25145,-5.69652 -26.86346,-10.17281 -40.8125,-13.46875 z " />
  </g>
</svg>
```

#### 4.3.1.5 All together

Finally I do update `blog/components/MetaData.tsx`:

```js
import Head from 'next/head';

export default function MetaData() {
  return (
    <Head>
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
```

## 4.4 Component Layout

I create new file `blog/components/Layout.tsx`:

```js
import Header from '../components/Header';
import Footer from '../components/Footer';
import MetaData from '../components/MetaData';
import Link from 'next/link';

import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';

export default function Layout({ children }: any) {
  useEffect(() => {
    // hljs.initHighlighting(); // Deprecated as of 10.6.0. initHighlighting() deprecated.  Use highlightAll() now.
    hljs.highlightAll();
  }, []);

  return (
    <div className="site-container">
      <MetaData />
      <Header />
      <main className="site-main">{children}</main>
      <Link href="/">
        <a>← Back to home</a>
      </Link>
      <Footer />
    </div>
  );
}
```

I also want to update `blog/pages/index.tsx`:

```typescript
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <section>
        <h1>Home</h1>
        <Link href="/custom-template">
          <a>Custom template</a>
        </Link>
      </section>
    </Layout>
  );
}
```

I also want to update `blog/pages/custom-template.tsx`:

```typescript
import Image from 'next/image';
// import Link from 'next/link';

import Layout from '../components/Layout';
// import MetaData from '../components/MetaData'; /* 3 */
// import Header from '../components/Header'; /* 1 */
// import Footer from '../components/Footer'; /* 2 */

/*
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
hljs.registerLanguage('javascript', javascript);

import React, { useEffect } from 'react';
*/
export default function CustomTemplate() {
  /*
  useEffect(() => {
    // hljs.initHighlighting(); // Deprecated as of 10.6.0. initHighlighting() deprecated.  Use highlightAll() now.
    hljs.highlightAll();
  }, []);
  */

  return (
    <Layout>
      {/*<div className="site-container">*/}
      {/*<MetaData />*/}
      {/*<Header />*/}
      {/*<main className="site-main">*/}
      {/*<article>*/}
      <h1>Heading 1 - Post simple template</h1>

      {/* Keep the existing code here */}

      {/*</article>*/}
      {/*</main>*/}
      {/*<Link href="/">*/}
      {/*<a>← Back to home</a>*/}
      {/*</Link>*/}
      {/*<Footer />*/}
      {/*</div>*/}
    </Layout>
  );
}
```

## Reference links

- [Are you using SVG favicons yet? A guide for modern browsers](https://medium.com/swlh/are-you-using-svg-favicons-yet-a-guide-for-modern-browsers-836a6aace3df).
- [Favicon Generator - Image to Favicon](https://favicon.io/favicon-converter).

## External links

- [Antoine Boulanger](https://antoineboulanger.medium.com/) - Front-end Engineer site.
- [Favicon - Wikipedia](https://en.wikipedia.org/wiki/Favicon).
- [Png - Portable Network Graphics - Wikipedia](https://en.wikipedia.org/wiki/Portable_Network_Graphics).
- [Json - JavaScript Object Notation - Wikipedia](https://en.wikipedia.org/wiki/JSON).
