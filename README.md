Orbit – Physics Learning Platform (Frontend)
This repository contains the React + Vite frontend for Orbit — featuring daily physics challenges, dashboards, contests, animations, LaTeX equation rendering, and a clean dark UI.

🚀 Tech Stack
React 19
React Router DOM 7
TailwindCSS 4
Vite
Axios
Framer Motion
Google OAuth (@react-oauth/google)
jwt-decode
date-fns
react-tooltip, lucide-react

📁 Project Structure

src/
├─ components/
├─ pages/
├─ context/
├─ routes/
├─ utils/
├─ assets/
├─ App.jsx
└─ main.jsx

🔧 Environment Variables
Create .env:

VITE_API_URL=https://your-backend-url.com
VITE_GOOGLE_CLIENT_ID=your-google-client-id

📌 Frontend Routes (Updated from Your Code)
Route	Page
/	Home
/daily	Daily Physics Problem
/problems/:id	Problem Detail
/dashboard	Dashboard (Private)
/contests	Contest list
/ContestDetail	Contest detail
/contestpage	Live contest page
/login	Login
/signup	Signup
⭐ Features

Daily Problem Feed
Problem Detail with LaTeX & Markdown
Dashboard with streak heatmap
Contest system UI
Google OAuth login
JWT Auth + Protected Routes
Animations (Framer Motion)
Fully responsive dark UI
Header + global layout system
Bookmark system (if implemented in UI)

🛠️ Setup
1. Clone repo
git clone https://github.com/MohitSingh250/frontendorbit.git
cd frontendorbit

2. Install dependencies
npm install

3. Run dev server
npm run dev

4. Build
npm run build

5. Preview
npm run preview

🌐 Deployment

Recommended: Vercel

Import repo

Add environment variables

Deploy
