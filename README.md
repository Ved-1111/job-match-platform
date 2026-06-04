# HireBridge

HireBridge is a modern job matching platform connecting job seekers with recruiters using a beautiful UI and a robust MongoDB/Node.js backend.

## Features
- Seekers can browse and apply for jobs, manage skills, and receive algorithmic job matches.
- Recruiters can post jobs, manage company profiles, and discover matching talent.
- Secure JWT-based Authentication.
- Google OAuth 2.0 Integration.
- OTP Email Verification for manual registration.

## Tech Stack
- **Frontend**: React, Vite, React Router, Zustand, Axios, AOS (Animate On Scroll).
- **Backend**: Node.js, Express, MongoDB (Mongoose), JSON Web Tokens (JWT), Nodemailer, Google Auth Library.

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Ved-1111/job-match-platform.git
cd job-match-platform
```

### 2. Setup Environment Variables
Copy the `.env.example` file to a new `.env` file in the root directory:
```bash
cp .env.example .env
```
Fill in your actual MongoDB URI, Gmail credentials, and a strong JWT secret in `.env`.

### 3. Install Backend Dependencies
```bash
npm install
```

### 4. Install Frontend Dependencies
```bash
cd frontend
npm install
cd ..
```

### 5. Run the Application locally
Open two terminal windows.

Terminal 1 (Backend):
```bash
npm start
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

## Production Deployment
The frontend is optimized to be deployed to Vercel. The backend should be deployed to a Node.js hosting provider (like Render, Heroku, or an AWS EC2 instance). Ensure all environment variables from your `.env` are replicated in your hosting environment.
