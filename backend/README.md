# LeoCare Backend

## 1) Install dependencies

```bash
cd backend
npm install
```

## 2) Configure environment

Create/update `backend/.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FRONTEND_URL=http://localhost:3000
# Optional: comma-separated list when multiple frontend domains are used
# FRONTEND_URLS=https://your-app.vercel.app,https://www.yourdomain.com
```

## 3) Start backend

```bash
npm run dev
```

For production:

```bash
npm run start
```

## Render deployment (backend folder)

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm run start`
- Required env vars:
	- `MONGODB_URI`
	- `FRONTEND_URL` (or `FRONTEND_URLS`)
	- `PORT` is optional on Render (auto-provided)

## API

- `GET /api/health` health check
- `GET /api/appointments` list appointments
- `POST /api/appointments` create appointment and auto-generate/reuse customer token
