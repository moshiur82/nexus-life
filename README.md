# NEXUS // LIFE — AI Biological Intelligence SaaS

NEXUS // LIFE is an advanced AI-powered biological intelligence platform designed for understanding, simulating, and optimizing personal health trajectories.

## Key Features
- **Biological Twin:** A real-time living digital representation of your biological data.
- **NOVA AI Intelligence:** A neural-linked AI copilot providing scientific health insights.
- **Scenario Simulator:** Predictive modeling using Deep Learning to project longevity impact based on lifestyle changes.
- **Dynamic Dashboard:** High-end data visualization of neural flow, cardiac rhythm, and metabolic signals.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons.
- **Backend:** Python, Django, Django REST Framework.
- **AI/ML:** PyTorch (Neural Networks), Scikit-learn, Pandas.
- **Database:** PostgreSQL.
- **DevOps:** Docker, Docker Compose.

## Local Setup

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `.\venv\Scripts\activate`
4. `pip install -r requirements.txt`
5. `python manage.py migrate`
6. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## Docker Deployment
Run the entire stack with a single command:
```bash
docker-compose up --build