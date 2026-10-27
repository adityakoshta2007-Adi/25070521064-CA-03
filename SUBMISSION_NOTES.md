# LIFEOS — Submission & Demo Checklist

## 2-minute professor walkthrough
1. Start MongoDB and `npm run dev`.
2. Open `http://localhost:5173` and describe the cinematic landing page.
3. Click **Explore demo** to log in without a third-party API key.
4. Show Overview metrics, quest preview, domain shortcuts and progress circle.
5. Open Quest Board; search a word, combine category/status/difficulty filters.
6. Create a quest, edit it, advance Available → In Progress → Completed, and delete a disposable quest.
7. Open Progress and Mind Lab; finish on Protocol Guide.
8. Show `http://localhost:5000/api/health`, then `mongosh` with `use lifeos` and `db.quests.find().pretty()` to demonstrate persistence.

## Assessment mapping
- React frontend / multiple sections: landing, overview, Quest Board, Mind Lab, Progress, Protocol Guide.
- Backend: Express REST API.
- Database: MongoDB + Mongoose models.
- Authentication: signup/login, bcrypt password hashes, JWT-protected routes.
- CRUD: quest creation, listing, editing/status update and deletion.
- Search and filters: text, category, status, difficulty.
- Professor exploration: one-click demo, seeded sample data, no external API keys.

## Important honesty note
The Mind Lab uses bundled static educational prompts rather than a live AI/LLM. The app does not require or claim an external AI integration.
