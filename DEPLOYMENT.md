# Development and Backend Deployment

## Local development

From the repository root, run `npm install` once, then `npm run dev` to start the Vite client and Express server together. The client is available at `http://localhost:5173` and `/api` requests are proxied to `http://localhost:5000`.

## Deploy the backend to Vercel

The backend uses Vercel's Express framework support. Deploy it as its own Vercel project:

1. In Vercel, choose **Add New > Project** and import this repository.
2. Set **Root Directory** to `server`. Leave **Include files outside the root directory** disabled; the backend is self-contained.
3. Select the **Express** framework preset. Keep the Build Command, Output Directory, and Install Command at their defaults so Vercel detects `server/index.js` and uses `server/package.json`.
4. Under **Settings > Environment Variables**, add these values for Production (and Preview too if you will test preview deployments):

	- `MONGODB_URI`: MongoDB Atlas connection string, including the database name.
	- `JWT_SECRET`: a long, random signing secret.
	- `EMAIL_USER`: the email account used for verification and booking emails.
	- `EMAIL_PASS`: the account's app password, not its normal password.

	`DNS_SERVERS` is optional; the server uses platform DNS normally, and falls back to `8.8.8.8,1.1.1.1` only when Node is configured with loopback-only DNS. Set `DNS_SERVERS` to a comma-separated resolver list only if your host requires a specific override. In Atlas, make sure the database user has the required permissions and the cluster's network access rules allow connections from Vercel.
5. Make sure production **Deployment Protection** does not block public API requests from the frontend. Preview deployments may remain protected if desired.
6. Deploy the project and verify these routes on the production domain:

	- `GET /api/events` returns a JSON array.
	- `GET /api/events/<event-id>` returns a JSON event.
	- `POST /api/auth/login` with invalid credentials returns an Express JSON error, not a Vercel HTML page.
	- `GET /api/bookings` returning 404 is expected because the booking router has no root GET handler. Authenticated booking endpoints are `/api/bookings/my` and `/api/bookings/all`.

Do not commit credentials in `.env` files. Locally, `server/index.js` starts the Express server. When you deploy the frontend separately, set its build-time `VITE_API_URL` to the backend production origin plus `/api` (for example, `https://your-backend.vercel.app/api`), then redeploy the frontend. Do not put backend secrets in frontend environment variables.