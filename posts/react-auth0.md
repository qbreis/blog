---
title: 'React Authentication App with typescript and auth0'
excerpt: 'In this chapter I build a simple React app to authenticate using auth0, an authentication and authorization service for application developers.'
date: '2023-03-06'
categories: ['react']
tags: ['react', 'typescript', 'authentication', 'auth0']
repository: 'https://github.com/qbreis/blog/tree/dev-chapter-10-pagination'
draft: false
---

## 1.1 Create React App

To start a new Create React App project with [TypeScript](https://www.typescriptlang.org/), I can run:

<pre><code class="language-bash contained">yarn create react-app react-auth0 --template typescript</code></pre>

Once installed, in order to start the development server, I run:

<pre><code class="language-bash contained">cd reac-auth0
yarn start</code></pre>

## 1.2 Clean Up

I create `src\components\Header.tsx`:

```typescript
export default function Header() {
    return (
        <header>
            <h1>React Auth0</h1>
            <nav>
                Nav
            </nav>
        </header>
    );
}
```

And in `src\App.tsx`:

```typescript
import "./App.css";
import Header from "./components/Header";

export default function App() {
    return (
        <>
            <Header />
        </>
    );
}
```

I also do some cleaning in `src\App.css`, I can check in [repository file](https://github.com/qbreis/react-auth0/blob/dev-chapter-1-setup/src/App.css).


## 2. Setting up Github Repo

Once in my project directory I check:

To check git I run `git status`.\
To check what is my Github user is set to I run: `git config user.name`.\
To check what is my Github email is set to I run: `git config user.email`.\
To change my Github user: `git config --local user.name "username"`.\
To change my Github user: `git config --local user.email "username@gmail.com"`.

I go to my Github account to create a new repository for my blog, I will name it just "react-auth0" and I will choose "public".

Description: "Testing login with auth0 in React."

Adding a README file to adapt later.

I will use no .gitignore template and I select MIT license.

Once I have created my repo I run: `git remote add origin git@github.com:qbreis/react-auth0.git`.

Finally I create dev branch: `git checkout -b dev-chapter-1-setup`.

## 3. Auth0 Account

First I go [Auth0](https://auth0.com/) to Sign up for free providing my email account and one password.

### 3.1 Auth0 - Sign Up

- I choose Account Type: Other (not Company).
- I check "I need advanced settings" - We’ve assigned your data region to the United States and given you a tenant name. Check this box If you need to process your data in a different region to comply with privacy laws.
- Next you can change Tenant Domain, as long as it is not already taken: dev-b7f3v3uw3gj53q1y(.us.auth0.com).
- I also want to select Region: EU
- Do click Create Account

### 3.2 Auth0 - Create Application

Next I want to create new Application:

- On the left side, under Application, I choose Applications and click "+Create Application".
- Name: react-auth0
- Choose an application type: Single Page Web Applications
- What technology are you using for your web app: React
- I click tab Settings, down to Application URIs:
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

### 3.3 Auth0 Domain and Client ID

To get Auth0 Domain and Client ID, in my Auth0 Dashboard:

- On the left side, under Application, I choose Applications and click my "react-auth0" application.
- Next under default tab Settings I copy Domain and Client ID.
- in my `.gitignore` file I add `.env`.
- In root folder I create new file `.env`:

```typescript
REACT_APP_AUTH0_DOMAIN=DOMAIN
REACT_APP_AUTH0_CLIENT_ID=CLIENT_ID
```

- I must change in previous file, DOMAIN and CLIENT_ID for the values I did copy.

### 3.2 Auth0 - User Management

Finally i want to create a unic user to log into my new Reaact app.

- On the left side, under User Management, I choose Users and click "+ Create User".
- I fill in Email, Password and Connection (Username-Password-Authentication).

## 4. Auth0 Login Authentication

Install Auth0 Package:

<pre><code class="language-bash contained">yarn add @auth0/auth0-react</code></pre>

After that, in `src\index.tsx`:

```typescript
import ReactDOM from "react-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import "./index.css";

const domain:string = process.env.REACT_APP_AUTH0_DOMAIN!; // Use type string + non-null assertion operator !
const clientId:string = process.env.REACT_APP_AUTH0_CLIENT_ID!; // Use type string + non-null assertion operator !

ReactDOM.render(
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
            redirect_uri: window.location.origin,
        }}
    >
        <App />
    </Auth0Provider>,
    document.getElementById("root")
);

/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/
```

In `src\components\Header.tsx`:

```typescript
import { useAuth0 } from "@auth0/auth0-react";
export default function Header() {
    // const { isAuthenticated, logout } = useAuth0();
    // const { loginWithRedirect } = useAuth0();

    const {
        /* Documentation: https://auth0.com/docs/libraries/auth0-react */
        isAuthenticated,
        logout,
        loginWithRedirect,
    } = useAuth0();

    return (
        <header>
            <h1>React Auth0</h1>
            <nav>
                {isAuthenticated ? (
                    <button
                        onClick={() => {
                            logout();
                        }}
                    >
                        Sign Out
                    </button>
                ) : (
                    /* Documentation: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application */
                    <button onClick={() => loginWithRedirect()}>Log In</button>
                )}
            </nav>
        </header>
    );
}
```













## Reference links

- [Auth0](https://auth0.com/) - Rapidly integrate authentication and authorization for web, mobile, and legacy applications so you can focus on your core business.

## External links

- [TypeScript - Wikipedia](https://en.wikipedia.org/wiki/TypeScript) - Just to know a bit more about Typescript programming language.
