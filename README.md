# SpecForge — AI Engineering Brief Generator

> From startup idea to full engineering spec in seconds, powered by GPT-4o.

![Stack](https://img.shields.io/badge/Backend-Python%20%2B%20Flask-blue)
![Stack](https://img.shields.io/badge/Frontend-React-61dafb)
![Stack](https://img.shields.io/badge/Database-SQLite-orange)
![Stack](https://img.shields.io/badge/AI-GPT--4o-green)

---

## What It Does

SpecForge takes a startup product idea as input (name, description, target users) and generates a complete, structured engineering specification including:

- Executive summary & problem statement
- MVP feature list with priorities (Must Have / Should Have / Nice to Have)
- User stories in standard agile format
- Tech stack recommendations with reasoning
- Data models with typed fields
- API endpoint design with auth requirements
- Risk analysis with mitigations
- Project milestones & deliverables
- Success metrics & out-of-scope items

All briefs are saved to a SQLite database and accessible from the sidebar for future reference.

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Backend | Python + Flask | Lightweight, fast API setup with minimal boilerplate |
| Frontend | React + Framer Motion | Smooth animations, component-based UI |
| Database | SQLite | Zero-config relational DB, perfect for this scale |
| AI | OpenAI GPT-4o | Best JSON instruction-following, structured output support |
| Styling | CSS Variables + inline styles | No build complexity, full design control |

---

## Project Structure

```
project-brief-generator/
├── backend/
│   ├── app.py              # Flask app, routes, CORS
│   ├── models.py           # SQLAlchemy Brief model
│   ├── ai_service.py       # GPT-4o prompt engineering + API call
│   ├── requirements.txt
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── App.js          # Root component, state management
│   │   ├── index.js
│   │   ├── index.css       # CSS variables, global styles
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── Sidebar.jsx       # Brief history, delete
│   │       ├── BriefForm.jsx     # Input form with examples
│   │       └── BriefOutput.jsx   # Spec display with collapsible sections
│   └── package.json
├── claude.md               # AI usage documentation
└── README.md
```

---

## Setup & Running Locally

### Prerequisites
- Python 3.9+
- Node.js 18+
- An OpenAI API key ([get one here](https://platform.openai.com))

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# Edit .env and add your OPENAI_API_KEY

python app.py
# API running at http://localhost:5000
```

### Frontend

```bash
cd frontend
npm install
npm start
# App running at http://localhost:3000
```

---

## API Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/briefs` | List all saved briefs |
| GET | `/api/briefs/:id` | Get single brief |
| POST | `/api/briefs` | Generate + save new brief |
| DELETE | `/api/briefs/:id` | Delete a brief |

### POST `/api/briefs` — Request Body

```json
{
  "app_name": "TaskFlow",
  "description": "A kanban tool for remote teams",
  "target_users": "Remote software teams of 5-50",
  "extra_context": "Optional: constraints, competitors, integrations"
}
```

---

## Key Technical Decisions

### 1. JSON-enforced AI output
Using `response_format: { type: "json_object" }` from the OpenAI SDK guarantees parseable output, eliminating brittle string parsing.

### 2. Schema-driven prompting
The output JSON schema was carefully designed to mirror real engineering artifacts. Each section has a deliberate reason (see `claude.md`).

### 3. SQLite over PostgreSQL
For a demo/MVP context, SQLite is zero-config and ships as a single file. The SQLAlchemy ORM means swapping to PostgreSQL later is a one-line change.

### 4. Framer Motion for all transitions
All view transitions, sidebar animations, and list entries use `framer-motion` for a polished, app-like feel without custom CSS animation complexity.

### 5. Sidebar with confirmation-delete
Delete requires two clicks to prevent accidental loss — first click shows the red state, second confirms. 3-second timeout resets it.

---

## Risks & Mitigations

| Risk | Mitigation |
|---|---|
| OpenAI API down | Clear error message returned to user, form stays intact |
| Invalid JSON from GPT | Round-trip JSON validation in `ai_service.py` before storing |
| Missing API key | Descriptive error on startup, `.env.example` provided |
| CORS issues | `flask-cors` applied globally |

---

## How to Extend

1. **Authentication** — Add Flask-JWT-Extended for user accounts; each user sees only their briefs
2. **Export to PDF** — Use `jsPDF` on the frontend to export the spec as a downloadable PDF
3. **Streaming** — Use OpenAI's streaming API to show the spec generating word by word
4. **Spec versioning** — Allow editing and regenerating sections of an existing brief
5. **Team sharing** — Add a `shared_link` UUID field to briefs for read-only sharing
6. **PostgreSQL** — Change `SQLALCHEMY_DATABASE_URI` to a PostgreSQL connection string; zero code changes needed
