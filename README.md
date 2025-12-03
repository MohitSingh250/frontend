Orbit – Physics Learning Platform (Frontend)

This repository contains the React + Vite frontend for Orbit — featuring daily physics challenges, dashboards, contests, animations, LaTeX equation rendering, and a clean dark UI.

🚀 Tech Stack

- **React 19**
- **React Router DOM 7**
- **TailwindCSS 4**
- **Vite**
- **Axios**
- **Framer Motion**
- **Google OAuth** (@react-oauth/google)
- **jwt-decode**
- **date-fns**
- **react-tooltip**, **lucide-react**

📁 Project Structure

```
frontendOrbit/
├─ src/
│ ├─ admin/
│ ├─ assets/
│ ├─ components/
│ ├─ context/
│ ├─ pages/
│ │ ├─ contest/
│ │ └─ ...
│ ├─ routes/
│ ├─ utils/
│ ├─ App.jsx
│ └─ main.jsx
├─ .env
├─ package.json
└─ README.md
```

🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:4000/api
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

📌 Frontend Routes

| Route | Page | Description |
| :--- | :--- | :--- |
| `/` | Home | Landing page |
| `/daily` | Daily Problem | Daily physics challenge |
| `/problems/:id` | Problem Detail | Solve a specific problem |
| `/dashboard` | Dashboard | User stats & heatmap (Protected) |
| `/contests` | Contest List | Upcoming and past contests |
| `/contest/:contestId` | Contest Detail | Contest info & registration |
| `/contest/:contestId/arena` | Contest Arena | Live contest environment (Protected) |
| `/contest/:contestId/leaderboard` | Contest Leaderboard | Live rankings |
| `/admin` | Admin Dashboard | Admin controls |
| `/login` | Login | User authentication |
| `/signup` | Signup | New user registration |

⭐ Features

- **Daily Problem Feed**: Fresh physics challenges every day.
- **Interactive Problem Solving**: LaTeX support for equations, markdown descriptions.
- **Contest System**: Real-time contests with live leaderboards and arenas.
- **User Dashboard**: Track progress with streak heatmaps and solve statistics.
- **Authentication**: Secure Google OAuth and JWT-based login.
- **Responsive Design**: Fully responsive dark-themed UI built with TailwindCSS.
- **Smooth Animations**: Powered by Framer Motion for a premium feel.

🛠️ Setup Instructions

1. **Clone repository**
   ```bash
   git clone https://github.com/MohitSingh250/frontendorbit.git
   cd frontendorbit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview build**
   ```bash
   npm run preview
   ```

🌐 Deployment

Recommended: **Vercel**

1. Import repository to Vercel.
2. Add environment variables (`VITE_API_URL`, `VITE_GOOGLE_CLIENT_ID`).
3. Deploy!
