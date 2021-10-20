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

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project Structure

### Next.js Basics
The basic structure of the repo follows the standard structure of a [Next.js](https://nextjs.org/docs) project.

### Lib
`lib` is where most _non-react-component_ code lives. There is an onion architecture layered in the following way (starting from center and going out)

* The `db` directory contains the [Prisma](https://www.prisma.io/) Schema file which is used for generating ORM, defining the DB tables, etc.

* The `domains` directory contains methods pertaining to core business logic and services. There are no references to Next.js API routes, react components, etc. Methods in `domains` interface with the Prisma ORM to read and write to the database and [Nextjs-auth0](https://github.com/auth0/nextjs-auth0) sessions to extract user data (and in the future other 3rd party services). (Note: Because Next.js blurs the line between front and back-end, methods in this directory could be called directly from Next.js Pages via methods like [`getStaticProps`](https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation), when data does not require authentication)

* The `apiHelpers` directory contains methods for handling Next.js API Route requests. It is responsible for mapping requests from Next.js API routes (found in `pages/api/`) to core logic in `domains`. 

* The `frontend` directory hosts code exclusively used in the front end. The `data` directory contains methods _used within the react app_ for interacting with Next.js APIs (and possibly other data sources in the future). SWR is used for querying and caching data. The `mui` directory contains some helper functions and the UI Theme file for [MUI](https://mui.com/), which is the library we use for React UI components and styling

