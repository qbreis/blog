---
title: 'Blog - Next.js - Chapter #3 - Typefaces'
excerpt: 'In this chapter I introduce JetBrains Mono and Mallory typefaces.'
date: '2021-09-02'
categories: ['nextjs']
tags: ['nextjs', 'typescript', 'typefaces', 'ttf']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-3-typefaces'
draft: false
---

## 3.1 JetBrains Mono

I recently discovered [JetBrains Mono](https://www.jetbrains.com/lp/mono/), a typeface for developers, by the Russians Philipp Nurullin, designer, and Konstantin Bulenkov, JetBrains project manager. And it is at [Google Font](https://fonts.google.com/specimen/JetBrains+Mono).

Following [Font Optimization](https://nextjs.org/docs/basic-features/font-optimization) I add this font to a custom document in `blog/pages/_document.tsx`:

```typescript
// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=optional"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

I check that JetBrains Mono is first option in font code list `/* 1 */` in `blog/styles/variables-site/_typography.scss`:

```scss
/* 
Variables - Typography
*/

$font__serif: Georgia, Cambria, 'Times New Roman', Times, serif;
$font__sans: $font__serif;
$font__code: 'JetBrains Mono', Monaco, Consolas, 'Andale Mono',
  'DejaVu Sans Mono', monospace; /* 1 */
$font__pre: 'Courier 10 Pitch', Courier, monospace;
$font__line-height-body: 1.5;
$font__line-height-pre: 1.6;
```

## 3.2 Mallory

After some research I found the font I want for this project and it is called [Mallory](https://frerejones.com/families/mallory), an [autobiographical typeface](https://www.wired.com/2015/12/tobias-frere-jones-designs-mallory-an-autobiographical-typeface/) by American type designer Tobias Frere-Jones.

Further research about Mallory:

- [Tobias Frere-Jones recounts the personal history behind the Mallory family](https://frerejones.com/blog/mallory-drawn-out-from-memory).
- [Mallory MicroPlus](https://frerejones.com/blog/introducing-microplus)

### 3.2.1 Custom font

I can not find Mallory in GoogleFonts, so I download the package from [Dfonts](https://www.dfonts.org/fonts/mallory-font-family/).

Unzip just downloaded file `Mallory-Dfonts.org_.zip` and in folder `Mallory-Dfonts.org` I see two folders, in folder `Mallory` I can see all ttf files, I will focus only in:

- Mallory Bold.ttf
- Mallory Bold Italic.ttf
- Mallory Book.ttf
- Mallory Book Italic.ttf

I will use one of many ttf to woff webfont generators, as in this case [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator). I will select ttf files I want to convert (see previous list) and download corresponding fonts in new Zip file `webfontkit-whatever.zip`.

After unzip just downloaded file `webfontkit-whatever.zip` I copy these files and paste them in new folder `blog/public/fonts` in my project:

- mallory_bold_italic-webfont.woff
- mallory_bold_italic-webfont.woff2
- mallory_bold-webfont.woff
- mallory_bold-webfont.woff2
- mallory_book_italic-webfont.woff
- mallory_book_italic-webfont.woff2
- mallory_book-webfont.woff
- mallory_book-webfont.woff2

I can read this article by Thierry Blancpain: [Understanding Web Fonts and Getting the Most Out of Them ](https://css-tricks.com/understanding-web-fonts-getting/).

Now I can open file `stylesheet.css` I just unzipped from `webfontkit-whatever.zip`, copy css code, paste in `blog/styles/typography/_typography.scss` and adapt a bit:

```scss
/*
Typography
*/

@font-face {
  font-family: Mallory;
  src: url('/../fonts/mallory_book-webfont.woff2') format('woff2'), url('/../fonts/mallory_book-webfont.woff')
      format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Mallory;
  src: url('/../fonts/mallory_book_italic-webfont.woff2') format('woff2'), url('/../fonts/mallory_book_italic-webfont.woff')
      format('woff');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: Mallory;
  src: url('/../fonts/mallory_bold-webfont.woff2') format('woff2'), url('/../fonts/mallory_bold-webfont.woff')
      format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: Mallory;
  src: url('/../fonts/mallory_bold_italic-webfont.woff2') format('woff2'), url('/../fonts/mallory_bold_italic-webfont.woff')
      format('woff');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

/*
Typography
*/

body,
button,
input,
select,
textarea {
  color: $color__text-main;
  font-family: $font__sans;
  font-weight: 400;
  @include font-size(0.9);
  line-height: $font__line-height-body;

  @media screen and (min-width: $query__small) {
    @include font-size(1);
  }
}

@import 'headings';
```

I also want to add Mallory `/* 1 */` into `blog/styles/variables-site/_typography.scss`:

```scss
/* 
Variables - Typography
*/

$font__serif: Mallory, Georgia, Cambria, 'Times New Roman', Times, serif; /* 1 */
$font__sans: $font__serif;
$font__code: 'JetBrains Mono', Monaco, Consolas, 'Andale Mono',
  'DejaVu Sans Mono', monospace;
$font__pre: 'Courier 10 Pitch', Courier, monospace;
$font__line-height-body: 1.5;
$font__line-height-pre: 1.6;
```

## Reference links

- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) - A free and open source typeface for developers.
- [Font Optimization](https://nextjs.org/docs/basic-features/font-optimization) for Next.js.
- [Mallory Font Family - Dfonts](https://www.dfonts.org/fonts/mallory-font-family/).
- [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator).

## External links

- [Tobias Frere-Jones recounts the personal history behind the Mallory family](https://frerejones.com/blog/mallory-drawn-out-from-memory).
- [Mallory, an autobiographical typeface](https://www.wired.com/2015/12/tobias-frere-jones-designs-mallory-an-autobiographical-typeface/).
- [Mallory MicroPlus](https://frerejones.com/blog/introducing-microplus).
- [Understanding Web Fonts and Getting the Most Out of Them ](https://css-tricks.com/understanding-web-fonts-getting/).
- [True Type fonts - Wikipedia](https://en.wikipedia.org/wiki/TrueType) - An outline font standard originally developed by Apple.
- [Stop using Open Sans – Why your font choice matters - Post](https://pimpmytype.com/open-sans/) - By [Pimp My Type](https://pimpmytype.com/).
- [Free Quality Fonts - Post](https://pimpmytype.com/free-quality-fonts/) - By [Pimp My Type](https://pimpmytype.com/).
