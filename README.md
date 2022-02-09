This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

To run the app, you need to add some environment vars to configure (1) a local database connection and (2) Auth0:

For the database, make sure you have postgresql installed, and then create a db. If on macOS:
```
brew install postgresql
brew services start postgresql
createdb simple-marketplace
```

Then create a `.env` file at the root of the project that looks like (if on macOS, replace {your-user-name} with your macOS username):
```
DATABASE_URL="postgres://{your-user-name}@localhost:5432/simple-marketplace?connection_limit=1"

# Auth0
# Custom secret known by server only
AUTH0_SECRET=abc123
# The base url of your application
AUTH0_BASE_URL=http://localhost:3000
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL=https://dev-12345.us.auth0.com
# Your Auth0 application's Client ID
AUTH0_CLIENT_ID=def456
# Your Auth0 application's Client Secret
AUTH0_CLIENT_SECRET=12345678abcdefg
```

Ask a Lifelike dev for the Auth0 environment variable values.

To confirm the database is setup correctly and to create your initial DB, run: `npx prisma db push` 

Once local variables are setup, you can run the app from the root of the directory:
```
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Project Structure

### Next.js Basics
The basic structure of the repo follows the standard structure of a [Next.js](https://nextjs.org/docs) project.

### Structure Overview
Most code is split between 3 directories, `pages`, `backend`, and `frontend`: 

`pages` is a standard Next.js structure which hosts all of the _pages_ in the app. Pages can be react routes or API endpoints. Practically, you can think of these files as entry points to the app (either URLs a user would visit or API URLs that would be used by frontend code) Files in `pages/api` directory include all the [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages. 

`backend` contains code that is used in the backend of the app (at the top level, mostly APIs in `pages/api`). 
* `backend/db` contains the [Prisma](https://www.prisma.io/) Schema file which is used for defining the DB tables and generating an ORM-like "Prisma client". 
* `backend/models` contains classes related to key entities in the app. These classes wrap the Prisma client so we can access entities in the DB, but they are also a good place to put business logic, validation, etc.

`frontend` contains code that is used by the frontend of the app (at the top level, mostly non-API `pages`):
* `frontend/components` contains, as you might guess, react components. 
* `frontend/data` contains client code that uses [SWR](https://swr.vercel.app/) for fetching and managing data in the front end. 
* `frontend/styles` contains some configuration code used by [MUI](https://mui.com/) for theming a baseline component library.  
