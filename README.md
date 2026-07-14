# ✦ CreativeHub

A full stack community platform where creators can share ideas, publish posts, and engage through comments.

🔗 **Live Demo:** https://creative-hub-iota-teal.vercel.app/

---

## Tech Stack

**Frontend** — React, Vite, React Router, Axios
**Backend** — Node.js, Express, JWT, bcrypt
**Database** — PostgreSQL
**Deployed on** — Vercel (frontend) and Render (backend + database)

---

## Features

- Signup and login with JWT authentication
- Create, edit and delete posts
- Comment on posts
- Protected routes
- Real time UI updates and toast notifications

---

## Running Locally

### Backend
```bash
cd server
npm install
node index.js
```
Create a `.env` file in `server/`:
```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=creative_hub
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_secret
PORT=5000
```

### Frontend
```bash
cd client
npm install
npm run dev
```
Create a `.env.local` file in `client/`:
```
VITE_API_URL=http://localhost:5000/api
```

---

## Author

**Your Name** — [GitHub:https-famous]  · [LinkedIn:www.linkedin.com/in/famous-okolocha-125004295]
