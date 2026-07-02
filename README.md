# Expense Tracker (MERN Stack)

A full-stack expense tracker that lets users track income and expenses, see
a live wallet balance, and review transaction history — with an admin panel
for managing users and transactions platform-wide.

## Tech Stack

**Frontend:** React, React Router, TanStack Query, Axios, Tailwind CSS,
React Hook Form, React Hot Toast, Recharts

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT auth, bcrypt,
cookie-parser, dotenv, CORS

## Project Structure

```
expense-management/
├── backend/
│   ├── constants/       # categories, roles
│   ├── controllers/     # request handlers
│   ├── db/               # mongoose connection
│   ├── middleware/       # auth, isAdmin, error handler
│   ├── models/            # User, Wallet, Transaction schemas
│   ├── routes/             # /api/auth, /api/wallet, /api/transaction, /api/admin
│   ├── utils/               # ApiError, ApiResponse, asyncHandler
│   ├── validators/           # request body validation
│   ├── app.js
│   └── index.js
└── frontend/
    └── src/
        ├── apis/          # axios calls per resource
        ├── components/    # reusable UI pieces
        ├── constants/     # categories, roles
        ├── context/       # AuthContext, ThemeContext
        ├── hooks/         # useAuth, useTheme
        ├── layouts/       # MainLayout, Navbar
        ├── pages/         # route-level pages (+ pages/admin)
        ├── routes/        # ProtectedRoute, AdminRoute
        └── App.jsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- A running MongoDB instance (local or Atlas)

### Backend

```bash
cd backend
npm install
cp .env.example .env   # then fill in real values
npm run dev             # or: node index.js
```

Backend runs on `http://localhost:5000` by default.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs on `http://localhost:5173` by default (Vite).

> If the frontend runs on a different port, update `CLIENT_URL` in
> `backend/.env` to match — the API only accepts requests from that origin.

### Creating an admin user

There's no public "become admin" endpoint (by design). Promote a user
manually after they've signed up:

```js
// in a mongo shell / Compass, against your database:
db.users.updateOne({ email: "you@example.com" }, { $set: { role: "Admin" } })
```

## Environment Variables

### backend/.env

| Variable | Description |
|---|---|
| `PORT` | Port the API listens on (default `5000`) |
| `CLIENT_URL` | Allowed CORS origin(s), comma-separated for multiple |
| `MONGODB_URI` | MongoDB connection string |
| `ACCESS_TOKEN_SECRET` | JWT secret for short-lived access tokens |
| `ACCESS_TOKEN_EXPIRY` | e.g. `15m` |
| `REFRESH_TOKEN_SECRET` | JWT secret for refresh tokens |
| `REFRESH_TOKEN_EXPIRY` | e.g. `7d` |

### frontend/.env

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL the frontend calls, e.g. `http://localhost:5000/api` |

## API Documentation

All responses follow `{ success, message, ...data }`. Authenticated routes
read the JWT from an `httpOnly` cookie (`accessToken`) set on login.

### Auth — `/api/auth`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/register` | - | Create a user + wallet |
| POST | `/login` | - | Log in, sets cookies |
| POST | `/logout` | ✓ | Clear session |
| GET | `/me` | ✓ | Current user |
| PATCH | `/profile` | ✓ | Update full name |
| PATCH | `/change-password` | ✓ | Change password |
| POST | `/refresh-token` | - | Exchange refresh token for a new access token |

### Wallet — `/api/wallet`

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/` | ✓ | Current balance, total income, total expense |

### Transactions — `/api/transaction`

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/` | ✓ | Create a transaction (`{ title, amount, type, category, description?, date? }`) |
| GET | `/` | ✓ | List own transactions — query: `search, type, category, startDate, endDate, sort, page, limit` |
| GET | `/export/csv` | ✓ | Download own transactions as CSV |
| GET | `/:id` | ✓ | Get one transaction |
| DELETE | `/:id` | ✓ | Delete a transaction (rolls back wallet) |
| POST | `/balance` | ✓ | Quick-add income (dashboard shortcut) |
| POST | `/expense` | ✓ | Quick-add expense (dashboard shortcut) |

`sort` accepts `newest \| oldest \| highest \| lowest`.

### Admin — `/api/admin` (requires `role: "Admin"`)

| Method | Route | Description |
|---|---|---|
| GET | `/users` | List all users |
| GET | `/transactions` | List every user's transactions |
| GET | `/dashboard` | Platform stats: users, transactions, income, expense |
| DELETE | `/user/:id` | Delete a user (cascades their wallet + transactions) |
| DELETE | `/transaction/:id` | Delete any transaction (rolls back the owner's wallet) |

## Features

- JWT auth with access + refresh tokens, httpOnly cookies
- Role-based access control (User / Admin)
- Wallet auto-updates on every income/expense, with rollback on delete
- Search, filter, sort, and pagination on transaction history
- Dashboard with balance/income/expense cards, income-vs-expense chart, quick add, recent activity
- Admin panel: manage users and transactions, platform-wide stats
- Dark mode (persisted in `localStorage`)
- CSV export of your transaction history
- Profile page: edit name, change password

## Deployment Guide

1. **Database**: provision a MongoDB instance (e.g. MongoDB Atlas) and set
   `MONGODB_URI` accordingly.
2. **Backend**: deploy `backend/` to any Node host (Render, Railway, EC2,
   etc.). Set all `backend/.env` variables in the host's environment
   config — including `CLIENT_URL` pointing at your deployed frontend
   origin. Run `npm install && node index.js` (or add a process manager
   like `pm2`).
3. **Frontend**: set `VITE_API_BASE_URL` to your deployed backend's
   `/api` URL, then `npm run build` and deploy the `dist/` folder to a
   static host (Vercel, Netlify, S3 + CloudFront, etc.).
4. **Cookies in production**: the auth cookies are set with
   `secure: true`, so both frontend and backend must be served over
   HTTPS in production for login to work.

## Screenshots

_Add screenshots of the Dashboard, History, and Admin panel here._
