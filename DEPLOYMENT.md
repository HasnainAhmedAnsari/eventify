# Development and Vercel Deployment

## Local development

From the repository root, run `npm install` once, then `npm run dev` to start the Vite client and Express server together. The client is available at `http://localhost:5173` and `/api` requests are proxied to `http://localhost:5000`.

## Vercel

Import the repository as a Vercel project with the repository root as the project root. The root `vercel.json` builds the client to `client/dist`, serves SPA routes through `index.html`, and sends `/api/*` requests to the Express function in `api/[...path].js`.

Add these environment variables in the Vercel project settings:

- `MONGODB_URI`
- `JWT_SECRET`
- `EMAIL_USER`
- `EMAIL_PASS`

`DNS_SERVERS` is optional. Do not commit real credentials in either `.env` file.