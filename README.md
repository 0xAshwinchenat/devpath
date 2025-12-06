# devpath

# DevPath — MERN Stack Interview Prep Tracker

DevPath is a full-stack MERN application built to streamline technical interview preparation.  
It combines DSA problem tracking, interview management, weekly goals, and analytics into one centralized dashboard.

---

##  Features

### DSA Problem Tracker
- Log problems with difficulty, topic, platform, status, and notes  
- Track solved dates  
- Filter by difficulty, topic, and status  
- User-specific database entries

###  Interview Tracker
- Manage job applications (company, role, location, status)  
- Next round date & notes  
- Upcoming interview reminders (next 7 days)  
- Status updates in one click

###  Goals (Weekly / Monthly)
- Set targets like “Solve 20 problems this week”  
- Automatic progress calculation  
- Completed / Failed / Active states  
- Visual progress bars

###  Analytics Dashboard
- Problems solved this week  
- Difficulty breakdown  
- Topic distribution  
- Charts using Recharts  
- Upcoming interviews panel

###  Authentication
- JWT-based login  
- Protected API routes  
- Password hashing with bcrypt  
- Secure token storage

---

##  Tech Stack

**Frontend:** React (Vite), Tailwind CSS, Axios, Recharts  
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT  
**Other:** bcryptjs, middleware architecture, REST APIs

---

##  Setup Guide

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/devpath.git
cd devpath

2. Backend Setup
cd backend
npm install
npm run dev


Create a .env file:

MONGO_URI=mongodb://localhost:27017/devpath
JWT_SECRET=yourSecret123
PORT=5000

3. Frontend Setup
cd ../frontend
npm install
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:5000
