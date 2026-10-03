# Development and Backend Deployment

## Local development

From the repository root, run `npm install` once, then `npm run dev` to start the Vite client and Express server together. The client is available at `http://localhost:5173` and `/api` requests are proxied to `http://localhost:5000`.

## Deploy the backend to Vercel

The Express app is exposed as a Vercel serverless function by `server/api/[...path].js`. Deploy it as its own Vercel project:

1. In Vercel, choose **Add New > Project** and import this repository.
2. In the project's configuration, set **Root Directory** to `server`. Leave **Include files outside the root directory** disabled; the backend is self-contained.
3. Select the **Other** framework preset. Leave the Build Command and Output Directory empty. Vercel should use the `server/package.json` and `server/package-lock.json` to install dependencies. Do not override the install command to run from the repository root.
4. Under **Settings > Environment Variables**, add these values for Production (and Preview too if you will test preview deployments):

	- `MONGODB_URI`: MongoDB Atlas connection string, including the database name.
	- `JWT_SECRET`: a long, random signing secret.
	- `EMAIL_USER`: the email account used for verification and booking emails.
	- `EMAIL_PASS`: the account's app password, not its normal password.

	`DNS_SERVERS` is optional; the server uses platform DNS normally, and falls back to `8.8.8.8,1.1.1.1` only when Node is configured with loopback-only DNS. Set `DNS_SERVERS` to a comma-separated resolver list only if your host requires a specific override. In Atlas, make sure the database user has the required permissions and the cluster's network access rules allow connections from Vercel.
5. Deploy the project. Your API routes will be available under the deployment URL, for example `https://your-project.vercel.app/api/events`, `/api/auth/login`, and `/api/bookings`.
6. Open `https://your-project.vercel.app/api/events` to verify it. A successful response is JSON (possibly an empty array). A `503` means the function ran but could not connect to MongoDB; check the Vercel function logs and your Atlas URI, credentials, and network access rules.

Do not commit credentials in `.env` files. The standalone `server/index.js` remains useful for local development; Vercel invokes the serverless function instead. When you deploy the frontend separately, its build-time `VITE_API_URL` should point to the backend origin plus `/api` (for example, `https://your-project.vercel.app/api`); do not put backend secrets in frontend environment variables.