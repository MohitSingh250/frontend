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
| `/problems` | Problem List | Main problem library with advanced filters |
| `/daily` | Daily Problem | Daily physics challenge |
| `/problems/:id` | Problem Detail | Solve a specific problem |
| `/dashboard` | Dashboard | User stats & heatmap (Protected) |
| `/contests` | Contest List | Upcoming and past contests |
| `/contest/:contestId` | Contest Detail | Contest info & registration |
| `/contest/:contestId/arena` | Contest Arena | Live contest environment (Protected) |
| `/list/:listId?` | My Lists | Custom problem collections & favorites |
| `/notebook` | Notebook | Personal notes on problems |
| `/progress` | Progress | Detailed analytics and solve statistics |
| `/points` | Points | OrbitCoin balance and transaction history |
| `/store` | Store | Redeem OrbitCoins for study materials & swag |
| `/settings` | Settings | Profile management & customization |
| `/features` | Beta Lab | Preview upcoming and experimental features |
| `/premium` | Premium | Subscription plans and benefits |
| `/discuss` | Discuss | Community discussions and solutions |
| `/quest` | Quest | Structured learning paths |
| `/study-plan` | Study Plan | Curated study tracks |
| `/admin` | Admin Dashboard | Admin controls & content management |

⭐ Features

- **Daily Problem Feed**: Fresh physics challenges every day.
- **Interactive Problem Solving**: LaTeX support for equations, markdown descriptions.
- **Contest System**: Real-time contests with live leaderboards and auto-scheduling.
- **Custom Lists**: Create, manage, and fork problem collections (LeetCode-style).
- **Notebook**: Save and manage personal notes for any problem.
- **Progress Analytics**: Deep dive into your solve stats, difficulty breakdown, and ranking.
- **Orbit Store**: Earn OrbitCoins through missions and redeem them for rewards.
- **Theme Support**: Full compatibility with Light and Dark themes (Pure Black mode available).
- **Premium Features**: Early access to beta features and exclusive study materials.
- **Responsive Design**: Optimized for all screen sizes with a premium, modern UI.
- **Smooth Animations**: Powered by Framer Motion for an interactive user experience.

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
