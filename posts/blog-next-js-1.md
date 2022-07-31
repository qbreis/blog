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

I will start more or less following documentation in <a href="https://nextjs.org/learn" target="_blank" rel="nofollow noreferrer">https://nextjs.org/learn</a>, so I run:

```bash[class="line-numbers"][class="contained"][class="hide-numbers"]
node ➜ /workspaces/misenplace.node-main $ yarn create next-app --typescript blog
```

In this case I want to use typescript and the name for the app will be just blog.

 
