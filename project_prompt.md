You are a Senior Full Stack Software Engineer with 10+ years of experience in MERN Stack applications.

Your task is to build a production-quality Expense Tracker application from scratch.

Think like a senior software architect, not just a coder.

Before writing code:
1. Analyze the complete project.
2. Design the architecture.
3. Create a development plan.
4. Generate a TODO_LIST.md file.
5. Implement features one by one.
6. Mark completed tasks in TODO_LIST.md after every feature.

======================================================
PROJECT NAME
======================================================

Expense Tracker (MERN Stack)

======================================================
PROJECT GOAL
======================================================

Develop a full-stack Expense Tracker web application that allows users to manage their personal finances by tracking income and expenses.

The application should help users

• Add income
• Add expenses
• Categorize transactions
• Track balance
• View history
• Delete transactions
• View financial summary
• Use a clean responsive dashboard

The project should be production ready and follow best practices.

======================================================
TECH STACK
======================================================

Frontend
- React.js
- React Router
- React Query (TanStack Query)
- Axios
- Tailwind CSS
- React Hook Form
- React Hot Toast

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt
- cookie-parser
- dotenv
- CORS

======================================================
PROJECT FEATURES
======================================================

Authentication

✓ Register
✓ Login
✓ Logout
✓ JWT Authentication
✓ Protected Routes
✓ Role Based Authorization
(User/Admin)

======================================================

Wallet

Each user has one wallet.

Wallet stores

- Current Balance
- Total Income
- Total Expense

Whenever

Income is added

Current Balance += amount
Total Income += amount

Expense is added

Current Balance -= amount
Total Expense += amount

Deleting Transactions should also rollback wallet values.

======================================================

Transactions

Each transaction contains

- Title
- Amount
- Type
    Income
    Expense
- Category
- Description
- Date
- Wallet
- User

Categories examples

Income
- Salary
- Freelancing
- Investment
- Bonus
- Other

Expense
- Food
- Rent
- Shopping
- Entertainment
- Medical
- Transport
- Education
- Bills
- Other

======================================================

Dashboard

Dashboard shows

Current Balance

Total Income

Total Expense

Latest Transactions

Quick Add Income

Quick Add Expense

Charts

Recent Activity

======================================================

Transaction History

User can

View all transactions

Search transactions

Filter by

Income

Expense

Category

Date

Sort

Newest

Oldest

Highest Amount

Lowest Amount

Pagination

Delete transaction

======================================================

Admin Panel

Admin can

View all users

View all transactions

Delete users

Delete transactions

Dashboard statistics

Total Users

Total Transactions

Total Income

Total Expense

======================================================

API REQUIREMENTS

Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout

GET /api/auth/me

======================================================

Wallet

GET /api/wallet

======================================================

Transaction

POST /api/transaction

GET /api/transaction

GET /api/transaction/:id

DELETE /api/transaction/:id

======================================================

Admin

GET /api/admin/users

GET /api/admin/transactions

DELETE /api/admin/user/:id

DELETE /api/admin/transaction/:id

======================================================

DATABASE DESIGN

User

_id

name

email

password

role

createdAt

Wallet

_id

user

currentBalance

totalIncome

totalExpense

createdAt

Transaction

_id

title

amount

type

category

description

wallet

user

date

createdAt

======================================================

BACKEND ARCHITECTURE

Use proper folder structure

controllers

routes

middlewares

models

config

utils

services

validators

constants

======================================================

FRONTEND STRUCTURE

src

components

layouts

pages

hooks

context

apis

utils

constants

routes

assets

======================================================

CODE QUALITY

Use

Clean Architecture

Reusable Components

Reusable Hooks

Proper Error Handling

HTTP Status Codes

Async Await

MVC Pattern

Environment Variables

Input Validation

Response Standardization

======================================================

RESPONSE FORMAT

Every API should return

{
success,
message,
data
}

======================================================

SECURITY

Hash Password

JWT

HTTP Only Cookies

Validation

Protected Routes

Authorization

Rate Limiting (optional)

======================================================

BONUS FEATURES

Dark Mode

Export Transactions CSV

Charts

Monthly Report

Profile Page

Change Password

Edit Profile

Income vs Expense Graph

======================================================

README

Generate complete README.md

Installation

Project Structure

API Documentation

Environment Variables

Screenshots Placeholder

Deployment Guide

======================================================

IMPORTANT

Create a file named

TODO_LIST.md

Before writing code.

The TODO should contain all development tasks.

Example

# Expense Tracker Development Progress

## Phase 1
- [ ] Initialize Backend
- [ ] Configure Express
- [ ] Configure MongoDB
- [ ] Environment Variables
- [ ] Folder Structure

## Authentication
- [ ] Register API
- [ ] Login API
- [ ] Logout API
- [ ] JWT Middleware
- [ ] Protected Routes

## Wallet
- [ ] Wallet Model
- [ ] Wallet Controller
- [ ] Wallet Routes
- [ ] Auto Update Balance

## Transactions
- [ ] Transaction Model
- [ ] Add Transaction
- [ ] Delete Transaction
- [ ] Get Transaction
- [ ] Search
- [ ] Filter
- [ ] Sort
- [ ] Pagination

## Admin
- [ ] Users API
- [ ] Transactions API
- [ ] Dashboard Stats

## Frontend
- [ ] React Setup
- [ ] Routing
- [ ] Authentication Pages
- [ ] Dashboard
- [ ] Wallet Card
- [ ] Add Transaction Form
- [ ] History Table
- [ ] Charts
- [ ] Responsive Design

## Testing
- [ ] API Testing
- [ ] UI Testing
- [ ] Bug Fixes

## Documentation
- [ ] README
- [ ] Deployment Guide

Whenever a task is completed, automatically update TODO_LIST.md and change

[ ]

to

[x]

======================================================

FINAL EXPECTATION

Build this project exactly like a real-world production application.

Use senior-level coding standards, scalable folder structure, reusable components, optimized APIs, proper comments only where necessary, and maintain clean, readable code.

Always update TODO_LIST.md after every completed feature before moving to the next task.