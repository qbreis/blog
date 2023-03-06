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

- On the left side, under Application, I choose Applications and click "+Create Application".
- Name: react-auth0
- Choose an application type: Single Page Web Applications
- What technology are you using for your web app: React
- Settings / Application URIs:
  - Allowed Callback URLs: http://localhost:3000/
  - Allowed Logout URLs: http://localhost:3000/
  - Allowed Web Origins: http://localhost:3000
- I do Save Changes
- In this same window, in tab Connections, i want to uncheck google-oauth2 (Google / Gmail), as long as I don't want users to log in into my new app through Gmail.

I still want to do one thing here:

- On the left side, under Authentication, I choose Database.
- In Database Connections, I click on Username-Password-Authentication
- In default Settings tab, down, I want to check the option Disable Sign Ups, as it says, to:
  - Prevent new user sign ups to your application from public (unauthenticated) endpoints. You will still be able to create users with your API credentials or from the Management dashboard.




On the left side, under Application, I choose Applications and click my "react-auth0" application.
Next under default tab Settings I copy Domain and Client ID.
In root folder I will create new file .env:
REACT_APP_AUTH0_DOMAIN=DOMAIN
REACT_APP_AUTH0_CLIENT_ID=CLIENT_ID
I will change in previous file, DOMAIN and CLIENT_ID for the values I did copy.

In index.tsx I will do something like:
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
[...]
<Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >

## 2. Create React App

To start a new Create React App project with [TypeScript](https://www.typescriptlang.org/), I can run:

<pre><code class="language-bash contained">yarn create react-app react-auth0 typescript</code></pre>

Once installed, in order to start the development server, I run:

<pre><code class="language-bash contained">cd reac-auth0
yarn start</code></pre>

## Reference links

- [Auth0](https://auth0.com/) - Rapidly integrate authentication and authorization for web, mobile, and legacy applications so you can focus on your core business.

## External links

- [TypeScript - Wikipedia](https://en.wikipedia.org/wiki/TypeScript) - Just to know a bit more about Typescript programming language.
