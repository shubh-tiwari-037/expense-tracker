# Expense Tracker Development Progress

> Existing code (backend auth/wallet/transaction basics, frontend login/signup/history/add-balance/add-expense) was kept and extended in place, not rewritten from scratch.

## Phase 1 - Backend Foundation
- [x] Initialize Backend
- [x] Configure Express
- [x] Configure MongoDB
- [x] Environment Variables (+ .env.example added for both apps)
- [x] Folder Structure (controllers/routes/middleware/models/db)
- [x] Add constants folder (categories, roles)
- [x] Add utils folder (ApiResponse, ApiError, asyncHandler)
- [x] Add validators folder
- [x] Standardize every response to { success, message, ...data } + global error handler
- [x] CORS origin made configurable via CLIENT_URL env var (was hardcoded to one port)

## Authentication
- [x] Register API
- [x] Login API
- [x] JWT Middleware
- [x] Protected Routes
- [x] Role Based Authorization (User/Admin) middleware (isAdmin)
- [x] Logout API
- [x] GET /api/auth/me
- [x] Refresh Token API
- [x] Mount auth routes at /api/auth (was /api/v1/users)
- [x] Input validation on register/login
- [x] PATCH /api/auth/profile (edit full name)
- [x] PATCH /api/auth/change-password
- [x] Fixed: /me and login responses no longer leak refreshToken to the client

## Wallet
- [x] Wallet Model
- [x] Wallet Controller (summary)
- [x] Wallet Routes
- [x] Auto Update Balance on income/expense
- [x] Fix rollback on transaction delete (was missing - fixed and verified live)
- [x] Mount at GET /api/wallet per spec

## Transactions
- [x] Transaction Model
- [x] Add Income (addBalance / unified createTransaction)
- [x] Add Expense (addExpense / unified createTransaction)
- [x] Delete Transaction (now rolls back wallet)
- [x] Get Own Transaction History
- [x] Fix category enum to match spec categories
- [x] Fix security bug: any user could read everyone's transactions - now scoped/admin-only
- [x] Unified POST /api/transaction (type: income/expense)
- [x] GET /api/transaction/:id (single transaction)
- [x] Search transactions
- [x] Filter by type/category/date
- [x] Sort (newest/oldest/highest/lowest)
- [x] Pagination
- [x] GET /api/transaction/export/csv

## Admin
- [x] GET /api/admin/users
- [x] GET /api/admin/transactions
- [x] DELETE /api/admin/user/:id (cascades wallet + transactions)
- [x] DELETE /api/admin/transaction/:id (rolls back owner's wallet)
- [x] Dashboard Stats (totalUsers, totalTransactions, totalIncome, totalExpense)
- [x] Role-based access verified: non-admin gets 403 on /api/admin/*

## Frontend
- [x] React Setup (Vite + Tailwind)
- [x] Routing (protected + admin-gated)
- [x] Authentication Pages (Login/Signup) - react-hook-form + toast
- [x] Add Transaction Forms (Add Balance/Add Expense) - share QuickAddForm
- [x] History Table - search/filter/sort/pagination/delete
- [x] Restructure into components/layouts/pages/hooks/context/apis/constants/routes
- [x] AuthContext + useAuth hook (GET /api/auth/me)
- [x] Protected routes + role-based route guard
- [x] Logout wired to backend
- [x] Dashboard page (balance/income/expense cards, latest transactions, quick add, income vs expense chart, recent activity)
- [x] History page: search/filter/sort/pagination/delete
- [x] Admin panel pages (users, transactions, stats) - backend wired and verified live
- [x] react-hook-form on all forms
- [x] react-hot-toast instead of alert()
- [x] Dark mode (ThemeContext, toggle in navbar, applied across all pages incl. admin)
- [x] CSV export button on History page
- [x] Profile page (edit name, change password)

## Testing
- [x] API testing via curl: register/login/me/wallet/transaction CRUD/search/filter/sort/pagination/delete-rollback/logout/404/admin RBAC all verified against real local MongoDB
- [x] UI testing via Playwright against the live dev servers: signup → login → dashboard → quick-add income/expense → history search/filter → delete (wallet rollback confirmed in UI) → dark mode toggle → profile page → CSV export download → admin dashboard/users pages — all confirmed working with screenshots, no unexpected console errors
- [x] `npm run build` passes clean on frontend; all backend files pass `node --check`
- [x] Test/scratch data cleaned out of the real dev database after verification

## Bonus Features
- [x] Dark Mode
- [x] Export Transactions CSV
- [x] Income vs Expense Graph (pie chart via Recharts)
- [x] Profile Page
- [x] Change Password
- [x] Edit Profile
- [ ] Monthly Report (not implemented - no clear spec on grouping/format, skipped to avoid guessing)

## Documentation
- [x] README.md (installation, structure, API docs, env vars, deployment guide)
- [x] TODO_LIST.md

## Known gaps / follow-ups
- Responsive design polish pass wasn't done as a dedicated pass (Tailwind's flex/grid utilities give reasonable behavior at common breakpoints, but nothing was specifically tested on small viewports).
- "Monthly Report" bonus feature not implemented.
- Large JS bundle (~676kB) - no code-splitting done; fine for this app's scope but flagged by the Vite build output.
