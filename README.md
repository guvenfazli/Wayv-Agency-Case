# Wayv Agency Case – Music Campaign Admin Dashboard

Music Campaign Admin Dashboard is a modern web application built to help manage music campaigns, artists, and promotional activities with ease and clarity. It streamlines campaign creation, secure login, and user-friendly data visualization for agency admins.

Built using modern technologies—Next.js, Tailwind CSS, TypeScript, Node.js (Express), and Supabase—the dashboard offers performance, scalability, and a clean developer experience.

🚀 Live Demo
🔗 https://wayv-agency-case.vercel.app

### Test Credentials
```bash
admin@example.com
admin12345
```

## Features

### Admin Authentication
- Admins can log in using email and password.
- Session managed via secure httpOnly JWT cookies.
- Redirects to dashboard upon successful login.

### Campaign Management
- Create new campaigns.
- View a list of campaigns.
- Ready for expansion with edit/delete capabilities.

### Authentication & Security
- Secure authentication via JWT cookies (httpOnly, secure, sameSite: 'none').
- Form validation and error handling.
- CORS configuration for safe cross-origin communication between frontend and backend.


### Folder Structure
```bash
/wavy-agency-case
  ├── frontend     # Next.js + Tailwind CSS based admin interface
  └── backend      # Express.js + Supabase based REST API
```
## Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ShadCN/UI
- DayJS

### Backend
- Node.js + Express.js
- Supabase (PostgreSQL backend)
- JWT – for secure auth sessions
- cookie-parser, cors, body-parser
- bcryptjs, express-validator


## Local Setup

```bash
git clone https://github.com/your-username/wavy-agency-case.git
cd wavy-agency-case
```
## Install Dependencies

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install

```

## Environment Variables
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
```

## Running Locally
### Start Backend (8080)

```bash
cd backend
npm run dev
```

### Start Frontend (Port: 3000)
```bash
cd frontend
npm run dev
```
