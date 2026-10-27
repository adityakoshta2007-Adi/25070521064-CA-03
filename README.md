# LIFEOS: The Human Upgrade Protocol

A cinematic, game-inspired full-stack personal growth dashboard. Built with React + Vite, Node.js, Express and MongoDB. It includes real account signup/login, JWT-protected routes, quest CRUD, live search/filters, progress/XP, a Mind Lab, protocol guide, seeded sample quests and one-click professor demo access. No external AI API key is required.

## Features
- Cinematic landing page and premium dark dashboard.
- Signup/login with bcrypt password hashing and JWT sessions.
- One-click **Professor Demo** account; demo quests are seeded in MongoDB.
- Quest CRUD: create, read, edit, update status and delete.
- Search by quest title, description and domain; filter by domain, status and difficulty.
- XP, level, completion-rate and domain-progress calculations.
- Mind Lab, domain shortcuts and Protocol Guide for professor exploration.
- Responsive desktop/mobile layout. MongoDB stores user and quest records.

## Requirements
- Node.js 20+ recommended (Node 26 should also work)
- npm
- MongoDB Community Server running locally, **or** a MongoDB Atlas cluster

## 1. Open in VS Code
Unzip the project, then VS Code → File → Open Folder → choose `LIFEOS`. Open Terminal → New Terminal. Run commands from the root folder containing the root `package.json`.

## 2. Install dependencies
```bash
npm install
npm --prefix server install
npm --prefix client install
```

## 3. Configure MongoDB
### Option A — Local MongoDB (recommended for a live lab demo)
Make sure MongoDB Community Server is installed and running. The default URI is already set to:
`mongodb://127.0.0.1:27017/lifeos`

Create the server environment file:
```bash
cp server/.env.example server/.env
```
You may keep the default URI for local MongoDB. Edit `server/.env` if needed.

### Option B — MongoDB Atlas
1. In Atlas, create a cluster and a database user.
2. In **Network Access**, allow your current IP address. Avoid `0.0.0.0/0` except as a temporary classroom troubleshooting measure.
3. Copy the Node.js connection string. Replace the sample URI in `server/.env` with it, URL-encoding special characters in the database password.
4. Keep credentials private; do not commit `server/.env`.

Example `server/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/lifeos
JWT_SECRET=replace_this_with_a_long_random_secret
```

## 4. Seed demo data (optional but recommended)
With MongoDB running and `server/.env` configured:
```bash
npm run seed
```
This creates the demo user and 10 sample quests if they do not already exist. Demo credentials:
- Email: `professor@lifeos.demo`
- Password: `LifeOSDemo2026!`

Alternatively, open the site and click **Explore demo**; the API creates a demo account and a small starter set automatically if absent.

## 5. Start the website
From the project root:
```bash
npm run dev
```
Open **http://localhost:5173**. The API runs on **http://localhost:5000**. Keep this terminal open while using the app.

If port 5000 is already occupied on macOS:
```bash
lsof -ti :5000
kill $(lsof -ti :5000)
```
Only kill the listed process if you recognize it as an old copy of this project. Then restart `npm run dev`.

## 6. MongoDB Shell (mongosh) verification
Open a second terminal:
```bash
mongosh
```
Then:
```javascript
show dbs
use lifeos
show collections
db.users.find({}, {name:1, email:1, demo:1}).pretty()
db.quests.find({}, {title:1, category:1, status:1, xp:1}).pretty()
```
To inspect the API, open `http://localhost:5000/api/health`; it should return JSON with `"ok": true` and `"database": "connected"`.

## Troubleshooting
- **MongoDB connection failed:** verify MongoDB service is running, URI is correct, Atlas IP is allowed and database credentials are valid.
- **EADDRINUSE :5000:** another process uses the API port. Stop the old API or update `PORT` in `server/.env` and update the frontend API URL if you changed the port.
- **npm JSON parse error:** run commands in the project root and do not paste shell commands into `package.json`. This archive includes valid JSON manifests.
- **Demo data not visible:** ensure MongoDB is connected, then run `npm run seed` and refresh the browser.
- **Dependencies:** run the three install commands again from the root if `node_modules` is missing.

## API routes
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/health` | API/database status |
| POST | `/api/auth/signup` | Create account |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/demo` | One-click demo login |
| GET | `/api/quests` | List/search/filter quests (JWT) |
| POST | `/api/quests` | Create quest (JWT) |
| PATCH | `/api/quests/:id` | Edit quest/status (JWT) |
| DELETE | `/api/quests/:id` | Delete quest (JWT) |

Search/filter query parameters: `q`, `category`, `status`, `difficulty`. Use `All` or omit a filter to show every value.

## Viva / submission notes
**Problem statement:** People often set broad personal goals but lack a practical system to break them into actions and monitor consistency. LIFEOS turns goals into manageable quests with progress feedback.

**Objectives:**
1. Build an interactive, multi-section personal growth website.
2. Implement secure signup/login and protected user-specific data.
3. Persist quests with MongoDB CRUD operations.
4. Provide search, filters and progress/XP feedback.
5. Make the project easy to demonstrate without third-party API keys.

**Technology:** React and Vite for UI; Node.js and Express for REST API; MongoDB with Mongoose for persistence; bcryptjs for password hashing; JWT for authentication; CSS for responsive styling.

**Database:** `users` stores name, email, password hash and demo flag. `quests` stores title, category, description, difficulty, XP, status, optional due date and owner reference.

**Viva quick answers:**
- **What is CRUD?** Create, Read, Update and Delete — the core database operations used for quests.
- **Why MongoDB?** It stores flexible JSON-like documents and integrates naturally with JavaScript objects.
- **What is Express?** A Node.js framework for defining HTTP routes and middleware.
- **What is JWT?** A signed token used here to authenticate API requests after login.
- **Why bcrypt?** It hashes passwords before storage instead of saving plain text.
- **How do filters work?** React controls search/filter state; the current interface filters the fetched records instantly, while the API also supports server-side query parameters.
- **Does it need an AI API key?** No. All core features and demo data work locally; Mind Lab contains built-in productivity prompts, not an external AI model.

## Security note
This is a student demonstration project. Set a strong `JWT_SECRET`, use HTTPS and appropriate rate limiting before public deployment. Demo credentials are intentionally visible for assessment; do not use them for private data.
