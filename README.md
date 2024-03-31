# World of Nuclear project

This is the Nuxt client to the World of Nuclear. Everything here is for delivering a great user experience.

## Dev Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Database connectivity

WoN is backed by a Postgres database provided by Supabase. Accordingly, this project connects to Postgres using the Supabase client.

We want to be able to rebuild the database for different environments: DEV, TEST, STAGE, PROD.

At some point, we will add database migrations to make it easy to modify the schema and modify data records.

## Authentication

OAuth logic is provided by Supabase.

## Hosting

We are hosting the app on Cloudflare.
