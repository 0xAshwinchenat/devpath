# devpath


DevPath is a project I built to improve the way I prepare for interviews, track my DSA progress, organize job applications, and stay consistent with weekly goals.
Instead of using scattered notes, Google Sheets, or random apps, I wanted one dedicated place where everything is connected — problems, interviews, goals, analytics, reminders.

This is my attempt at building a clean, practical full-stack productivity tool using the MERN stack.

✨ Why I Built This

While preparing for interviews, I realized I was constantly switching between:

LeetCode history

Sheets for tracking progress

Notes for interview rounds

Calendar reminders

Analytics dashboards online

It was messy.
So I wanted one unified dashboard where I can:

✔ Log DSA problems
✔ Track interview pipelines
✔ Set weekly/monthly goals
✔ View analytics about my prep
✔ See upcoming interview reminders
✔ Keep everything tied to my own user account

DevPath is the result of that idea.

🧠 Features
🔐 Authentication (JWT-based)

Register & Login with email + password

Password hashing using bcrypt

Auth-protected routes

Token persisted in localStorage

🧩 DSA Problems Tracker

Track every problem you solve (or want to solve):

Title

Topic (Array, DP, Graph...)

Difficulty (Easy / Medium / Hard)

Platform (LeetCode, Codeforces, etc.)

Status (Todo / In Progress / Done)

Notes

Date solved

✔ Filters for topic, difficulty, and status
✔ User-specific data stored in MongoDB
✔ Fully CRUD (Create / Read / Update / Delete)

💼 Interview Tracker

A clean way to organize your job applications:

Company

Role

Location

Application status (Applied → OA → Interview → Offer, etc.)

Next round date

Notes

Source (LinkedIn, Referral, Company Website…)

Plus:

✔ In-dashboard reminders for interviews happening in the next 7 days
✔ Quick status updates
✔ Easy filtering and editing

🎯 Goals (Weekly / Monthly Targets)

I wanted something that motivates me consistently, not just random numbers.
So Goals has:

Title (e.g., “Solve 20 problems this week”)

Target number

Start & end date

Automatic progress calculation

Auto status → Active / Completed / Failed

And it even calculates:

How many problems you solved during that period

% progress with a visual progress bar

📊 Analytics Dashboard

A simple but meaningful way to reflect on my prep:

Total problems

Problems solved in last 7 days

Breakdown by difficulty

Top topics

Visual charts using Recharts

List of upcoming interviews

Everything updates based on your own activity.

🛠 Tech Stack
Frontend

React (Vite)

React Router

Axios

TailwindCSS

Recharts

Backend

Node.js

Express.js

MongoDB + Mongoose

JSON Web Tokens

bcryptjs

📁 Folder Structure
devpath/
  backend/
    src/
      controllers/
      models/
      routes/
      middleware/
      server.js
    package.json
    .env (not included in repo)

  frontend/
    src/
    package.json
    tailwind.config.js
    postcss.config.js

  README.md
  .gitignore

⚙️ How to Run Locally
1. Clone the repo
git clone https://github.com/YOUR_USERNAME/devpath.git
cd devpath

2. Backend Setup
cd backend
npm install


Create .env:

MONGO_URI=mongodb://localhost:27017/devpath
JWT_SECRET=yourSecret
PORT=5000


Run backend:

npm run dev

3. Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:5000

🌱 Future Plans

I want to expand DevPath into a more polished productivity tool.
Some things I’m planning:

A cleaner dashboard UI (sidebar layout)

More analytics (weekly streaks, heatmaps)

Dark mode

Export data (PDF/CSV)

Chrome extension to save LeetCode problems with one click

Email or Discord notifications for interview reminders

Deployment to Render + Vercel

🙌 Final Thoughts

DevPath started as a small idea to organize my interview prep, but it has grown into a full MERN project that I’m genuinely proud of.
It’s not perfect, but it's something I use daily and continue improving.

If you're checking out this repo — feel free to fork it, give suggestions, or reach out.
Happy coding! 🚀
