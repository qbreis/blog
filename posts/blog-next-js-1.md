---
title: 'Blog - Next.js - Chapter #1 - Setup'
excerpt: 'In this chapter I just setup new Next.js app from scratch using Typescript and Sass, apart from establishing a hierarchical criteria for some general styles. So I can use it in the future as a boilerplate for any website based on Next.js.'
date: '2021-07-31'
categories: ['nextjs', 'bulma', 'test']
tags: ['dos', 'tres']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-1-setup'
draft: false
---
## 1.1 Setting up my work env

I want to use for my work environment the <a href="https://github.com/isfegu/misenplace.node" target="_blank" rel="nofollow noreferrer">Mise en place</a> proposed by <a href="https://github.com/isfegu" target="_blank" rel="nofollow noreferrer">isfegu</a>.

I go to <a href="https://github.com/isfegu/misenplace.node" target="_blank" rel="nofollow noreferrer">Mise en place</a> and I choose to download repo into local new empty folder `misenplace.node-main`.

I open folder `misenplace.node-main` in Visual Studio Code using the remote container and I install dependencies by running for the first time:

```bash[class="line-numbers"][class="contained"][class="hide-numbers"]
node ➜ /workspaces/misenplace.node-main $ yarn
```

## 1.2 Create Next.js App

I will start, more or less, following documentation in <a href="https://nextjs.org/learn" target="_blank" rel="nofollow noreferrer">https://nextjs.org/learn</a>, so I run:

```bash[class="line-numbers"][class="contained"][class="hide-numbers"]
node ➜ /workspaces/misenplace.node-main $ yarn create next-app --typescript blog
```

In this case I want to use typescript and the name for the app will be just blog.

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

I create still a new git branch by running: `git checkout -b 'setup`.

I update `blog/pages/index.tsx`:

```js[class="line-numbers"][data-line="2-4,7"]
import type { NextPage } from 'next';
// import Head from 'next/head';
// import Image from 'next/image';
// import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return <>Hola</>;
};

export default Home;
```

I delete files:
- `blog/styles/Home.module.css`
- `blog/public/favicon.ico`
- `blog/public/vercel.svg`

Finaly I do my first git commit by running:

```bash[class="line-numbers"][class="contained"][class="hide-numbers"]
git add .
git commit -m 'feat: first setup'
git push origin setup
```

## 1.5 Css to Scss