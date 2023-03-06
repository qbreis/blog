---
title: 'React Authentication App with typescript and auth0'
excerpt: 'In this chapter I build a simple React app to authenticate using auth0, an authentication and authorization service for application developers.'
date: '2023-03-06'
categories: ['react']
tags: ['react', 'typescript', 'authentication', 'auth0']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

## 1 Auth0

First I go [Auth0](https://auth0.com/) to Sign up for free providing my email account and one password.

### 1.1 Auth0 - Sign Up

- I choose Account Type: Other (not Company).
- I check "I need advanced settings" - We’ve assigned your data region to the United States and given you a tenant name. Check this box If you need to process your data in a different region to comply with privacy laws.
- Next you can change Tenant Domain, as long as it is not already taken: dev-b7f3v3uw3gj53q1y(.us.auth0.com).
- I also want to select Region: EU

### 1.1 Auth0 - Create Application

Next I want to create new Application:

- On the left side, under Application, I choose Application and click "+Create Application".
- Name: react-auth0
- Choose an application type: Single Page Web Applications
- What technology are you using for your web app: React
- Settings / Application URIs:
  - Allowed Callback URLs: http://localhost:3000/
  - Allowed Logout URLs: http://localhost:3000/
  - Allowed Web Origins: http://localhost:3000

## Reference links

- [Auth0](https://auth0.com/) - Rapidly integrate authentication and authorization for web, mobile, and legacy applications so you can focus on your core business.

## External links

- [TypeScript - Wikipedia](https://en.wikipedia.org/wiki/TypeScript) - Just to know a bit more about Typescript programming language.