# World of Nuclear

Welcome to the code that powers Zanzibar's World of Nuclear Energy, or [World of Nuclear](https://worldofnuclear.com) for short (WoN). We are here to encourage and promote productive uses of nuclear energy. Power generation, medicine, and other applications of nuclear energy can help humanity thrive. We just need to embrace them and continue to advance the science and engineering that makes miracles possible.

## Dev Setup

If you want to run this code yourself, you will run into trouble. Regardless, these are the basics for getting things working on a local dev environment.

We favor `npm` because it works everywhere we need it (local dev and Cloudflare). Other module managers are nifty but have not worked reliably. `pnpm` looks promising. Feel free to use `yarn` if that makes you happy. Your mileage may vary.

Install the dependencies:

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

WoN is backed by Supabase, a Postgres database host that adds extensive support for user authentication. It also has an annoying approach to security, and it does not seem to work well with database migration tools. Plus, to get some features to work, you have to pay. So, at some point it might make sense to switch to self-hosted databases.

That said, today it's Supabase. We only have one environment for development, staging, and production. This is less of a problem than you might think at the moment. Once another developer becomes active or things get serious in production, we will need to invest the time to build out the environments, including support for multiple database instances.

## Authentication

OAuth logic is provided by Supabase. We have configured Google, X, and GitHub as identity providers. It might make sense to add a few more to widen the net for users.

## Email

To send confirmation email and invitations to join, this app uses Resend, an awesome little service for handling massive amounts of email. You get the first one for free, and that's all we need for now.

## Hosting

We are hosting on Cloudflare, and a little bit on AWS. An earlier iteration was built with AWS Amplify. Let's say we had problems as things got more complex.

Cloudflare has a limitation with the size of the worker file. We had to uninstall icons after hitting the limit once. With more functionality, that may force us to split this app or do our own hosting.
