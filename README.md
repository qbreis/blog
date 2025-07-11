# Blog - Next.js

This is a static [Next.js](https://nextjs.org/) site blog project deployment, connected to a [Github](https://github.com/) repo to [Vercel](https://vercel.com/).

This repo contains all the code for my first-person-singular [personal blog](https://blog-qbreis.vercel.app), including all the posts in [Markdown](https://www.markdownguide.org/), consisting in my own step-by-step annotations of what I learn and consolidate, day by day, in terms of coding and web design, among other things.

## Step-by-step, Chapters, Branches

This is an ongoing project, which I started in summer 2022 as an own personal commitment. Soon I decided to maintain all the clean dev branches I was using to build the entire thing, so I could check them out in order to understand, learn some more, improve and enjoy. Here is the list so far:

- [Chapter #1 - Setup](https://github.com/qbreis/blog/tree/dev-chapter-1-setup)
- [Chapter #2 - Styles](https://github.com/qbreis/blog/tree/dev-chapter-2-styles)
- [Chapter #3 - Typefaces](https://github.com/qbreis/blog/tree/dev-chapter-3-typefaces)
- [Chapter #4 - Components](https://github.com/qbreis/blog/tree/dev-chapter-4-components)
- [Chapter #5 - Markdown](https://github.com/qbreis/blog/tree/dev-chapter-5-markdown)
- [Chapter #6 - Header, Footer and Metadata](https://github.com/qbreis/blog/tree/dev-chapter-6-header-and-footer)
- [Chapter #7 - Dates](https://github.com/qbreis/blog/tree/dev-chapter-7-dates)
- [Chapter #8 - Categories](https://github.com/qbreis/blog/tree/dev-chapter-8-categories)
- [Chapter #9 - Tags](https://github.com/qbreis/blog/tree/dev-chapter-9-tags)
- [Chapter #10 - Pagination](https://github.com/qbreis/blog/tree/dev-chapter-10-pagination)

## Deploy on Vercel

This blog is deployed on [Vercel](https://vercel.com/) every time I push some code to main branch in this same repo.

The temporary URL of this blog is [https://blog-qbreis.vercel.app](https://blog-qbreis.vercel.app), where I can read the step-by-step annotations for each stage, chapter or branch of the project.

## Install

To get started, clone the repository and install the dependencies.

### 1. Clone the repository

Using SSH:

```bash
git clone git@github.com:qbreis/blog.git
```

This will create a new folder named `blog` containing the project files.

### 2. Navigate into the project folder

```bash
cd blog
```

### 3. Install dependencies

Using npm:

```bash
npm install
```

### 4. Run the development server

```bash
npm run dev
```

This will start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### 5. Build and run for production

To build the app for production:

```bash
npm run build
```

Then start the production server:

```bash
npm run start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
