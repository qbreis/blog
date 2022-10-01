---
title: 'Blog - Next.js - Chapter #1 - Setup'
excerpt: 'In this chapter, first I setup my dev environment, after I just setup new Next.js app from scratch using Typescript.'
date: '2021-08-26'
categories: ['nextjs']
tags: ['nextjs', 'typescript']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-1-setup'
draft: false
---

<img src="/images/droste-effect.svg" alt="Droste Effect" style="height: 25em;" />

This is part of a series of annotations, about building a blog to explain how to build a blog to explain how to build a blog to explain... This has something to do with [Droste Effect](https://en.wikipedia.org/wiki/Droste_effect).

## 1.1 Setting up my work env

I want to use for my work environment the [Mise en place](https://github.com/isfegu/misenplace.node) proposed by [isfegu](https://github.com/isfegu).

I go to [Mise en place](https://github.com/isfegu/misenplace.node) and I choose to download repo into local new empty folder `misenplace.node-main`.

I open folder `misenplace.node-main` in Visual Studio Code using the remote container and I install dependencies by running for the first time:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main $ yarn</code></pre>

## 1.2 Create Next.js App

![Next.js](/images/nextjs-logo-3.svg)

I will start, more or less, following documentation in [https://nextjs.org/learn](https://nextjs.org/learn), so I run:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main $ yarn create next-app --typescript blog</code></pre>

In this case I want to use typescript and the name for the app will be just "blog".

## 1.3 Setting up Github Repo

Once in my project directory `misenplace.node-main/blog` I check:

To check git I run `git status`.\
To check what is my Github user is set to I run: `git config user.name`.\
To check what is my Github email is set to I run: `git config user.email`.\
To change my Github user: `git config --local user.name "username"`.\
To change my Github user: `git config --local user.email "username@gmail.com"`.

I go to my Github account to create a new repository for my blog, I will name it just "blog" and I will choose "public".

Description: "This blog contains the step-by-step annotations of everything I am learning and consolidating in programming and web design."

Adding a README file to adapt later.

I will use no .gitignore template and I select MIT license.

Once I have created my repo I run: `git remote add origin git@github.com:qbreis/blog.git`.

Finally I create dev branch: `git checkout -b dev`.

## 1.4 First cleaning

I create still a new git branch by running: `git checkout -b 'dev-chapter-1-setup`.

I feel more comfortable not defining NextPage type and use function declaration instead of arrow function, so I update `blog/pages/index.tsx`:

```typescript
// import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

//  Home: NextPage = () => { // arrow function vs function declaration in Next.js
export default function Home() {
  return <>Hola</>;
}

// export default Home;
```

I delete files:

- `blog/styles/Home.module.css`
- `blog/public/favicon.ico`
- `blog/public/vercel.svg`

Finaly I do my first git commit by running:

<pre><code class="language-bash contained">node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-1-setup) $ git add .
node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-1-setup) $ git commit -m 'feat: first setup'
node ➜ /workspaces/misenplace.node-main/blog (dev-chapter-1-setup) $ git push origin dev-chapter-1-setup
</code></pre>

> From now on I will not write my git commits in these annotations but I just want to make clear how to start. Just remember to use clean ordered branches and [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Reference links

- [Learn Next.js](https://nextjs.org/learn) - As a good starting point.
- [Mise en place](https://github.com/isfegu/misenplace.node) - Repository by [isfegu](https://github.com/isfegu), containing the basis to start the development of a project based on Node.js and Typescript.
- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) - As a must.

## External links

- [TypeScript - Wikipedia](https://en.wikipedia.org/wiki/TypeScript) - Just to know a bit more about Typescript programming language.
- [Next.js by Vercel](https://nextjs.org/) - The React framework.
- [Next.js - Wikipedia](https://en.wikipedia.org/wiki/Next.js) - To know about Next.js.
- [Git - Wikipedia](https://en.wikipedia.org/wiki/Git) - Maybe I want to read about Git.
- [GitHub - Wikipedia](https://en.wikipedia.org/wiki/GitHub) - Maybe I want to know more about the hosting service I am using.
- [Droste Effect](https://en.wikipedia.org/wiki/Droste_effect) - ... is the effect of a picture recursively appearing within itself...
