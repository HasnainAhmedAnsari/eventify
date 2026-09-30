# Development and Vercel Deployment

## Local development

From the repository root, run `npm install` once, then `npm run dev` to start the Vite client and Express server together. The client is available at `http://localhost:5173` and `/api` requests are proxied to `http://localhost:5000`.

## Vercel

Deploy this as one Vercel project, not as separate frontend and backend projects. The repository root contains the workspace lockfile, Vercel config, and `api/` function; `api/[...path].js` exports the Express app, while the client calls the same deployment at `/api`.

1. Import the repository and set **Root Directory** to the repository root (the directory containing this file).
2. Use the **Other** framework preset. Keep the root config's install command (`npm install`), build command (`npm run build`), and output directory (`client/dist`). Do not set the Vercel root to `client/` or `server/`.
3. In **Settings > Environment Variables**, add these server-only values for every environment you deploy (Production, Preview, and Development as needed):

	- `MONGODB_URI`: MongoDB Atlas connection string, including the database name.
	- `JWT_SECRET`: a long, random signing secret.
	- `EMAIL_USER`: the Gmail account used to send verification and booking emails.
	- `EMAIL_PASS`: that account's Google app password, not its normal password.

	Leave `DNS_SERVERS` unset unless you have a specific DNS issue to work around. The server uses the platform's default resolver unless this optional override is set. In Atlas, make sure the database user has the needed permissions and the cluster's network access rules allow connections from your hosting setup.
4. Leave `VITE_API_URL` unset for this single-project deployment; the client defaults to the same-origin `/api` URL. It is a client build-time setting, not a place for secrets.
5. Deploy, then open `/api/events`. A successful response is JSON (possibly an empty array); a `503` means the API function ran but could not connect to MongoDB. Check **Vercel > Project > Logs** for the matching function invocation. Also open a client route such as `/login` directly and refresh it to verify the SPA fallback.

The root `package.json` currently allows Node.js 20, 22, or 24, and Vercel supports all three (24 is the current default). The local production build was verified on Node.js 24.14.0. The Vercel API runs as a serverless function; `server/index.js` is for local/standalone hosting and is not the Vercel entry point.

Do not commit credentials in `.env` files. Run `npm run build` from the repository root before deploying to reproduce Vercel's configured frontend build locally.